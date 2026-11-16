// Baza de date pentru datele operaționale (cererile din site). Un singur client libSQL pentru ambele medii:
// - local: fișierul data/leads.db (în afara git: date personale), fără nicio configurare;
// - Vercel: Turso, din TURSO_DATABASE_URL și TURSO_AUTH_TOKEN (integrarea Turso din Vercel Marketplace).
// Entitățile brandului rămân în data/entitati.json (vezi store.mjs); aici stau doar datele care vin din site.
import {createClient} from '@libsql/client';
import {mkdirSync} from 'node:fs';
import {join} from 'node:path';

const DATA_DIR = join(process.cwd(), 'data');

export function openDb({url = process.env.TURSO_DATABASE_URL, authToken = process.env.TURSO_AUTH_TOKEN} = {}) {
  if (!url) {
    // Pe Vercel discul nu persistă: fără Turso refuzăm, în loc să pierdem cereri într-un fișier temporar
    if (process.env.VERCEL) throw new Error('TURSO_DATABASE_URL lipsește: conectează baza Turso la proiectul Vercel.');
    mkdirSync(DATA_DIR, {recursive: true});
    url = `file:${join(DATA_DIR, 'leads.db')}`;
  }
  return createClient({url, authToken});
}

// Schema, creată la prima conexiune (idempotent)
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT,
    status TEXT NOT NULL DEFAULT 'nou',
    serviciu TEXT NOT NULL,
    detaliu TEXT, mesaj TEXT,
    nume TEXT NOT NULL, telefon TEXT NOT NULL, canal TEXT NOT NULL DEFAULT 'telefon',
    sursa TEXT, pagina TEXT, acord INTEGER NOT NULL DEFAULT 0,
    note TEXT NOT NULL DEFAULT '[]',
    notificat_la TEXT, notificare_eroare TEXT
  )`,
  'CREATE INDEX IF NOT EXISTS leads_status ON leads(status)',
  'CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at)'
];

async function prepare(client) {
  for (const sql of SCHEMA) await client.execute(sql);
  return client;
}

// O singură conexiune pe proces (o instanță de funcție pe Vercel, procesul de dezvoltare local)
let shared;
export const getDb = () => (shared ??= prepare(openDb()));

export const one = async (db, sql, args = []) => {
  const r = (await db.execute({sql, args})).rows[0];
  return r ? {...r} : null;
};
export const all = async (db, sql, args = []) => (await db.execute({sql, args})).rows.map(r => ({...r}));
