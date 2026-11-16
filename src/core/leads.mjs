// Cererile venite din formularele site-ului: validare, salvare în baza libSQL (vezi db.mjs) și lucrul cu ele din panou.
import {getDb, one, all} from './db.mjs';
import {SERVICII} from '../site/menu.mjs';

export const CANALE = {telefon: 'Telefon', whatsapp: 'WhatsApp', email: 'Email'};

// Etapele unei cereri în panou, în ordinea firească
export const STATUSURI = [
  {key: 'nou', label: 'Nou', tone: 'bad'},
  {key: 'contactat', label: 'Contactat', tone: 'warn'},
  {key: 'oferta', label: 'Ofertă trimisă', tone: 'warn'},
  {key: 'castigat', label: 'Câștigat', tone: 'ok'},
  {key: 'pierdut', label: 'Pierdut', tone: 'grey'}
];

export class LeadError extends Error {
  constructor(message, errors, status = 422) { super(message); this.errors = errors; this.status = status; }
}

const clip = (s, n) => String(s ?? '').trim().slice(0, n);

export function validate(input) {
  const errors = {};
  const lead = {
    serviciu: SERVICII.some(s => s.key === input.serviciu) ? input.serviciu : 'altceva',
    detaliu: clip(input.detaliu, 120),
    mesaj: clip(input.mesaj, 1000),
    nume: clip(input.nume, 80),
    telefon: clip(input.telefon, 20),
    email: clip(input.email, 120).toLowerCase(),
    canal: ['telefon', 'whatsapp', 'email'].includes(input.canal) ? input.canal : 'telefon',
    sursa: clip(input.sursa, 40),
    pagina: clip(input.pagina, 200),
    acord: input.acord === true
  };
  if (lead.nume.length < 2) errors.nume = 'Spune-ne cum te numești.';
  if (!/^(\+?40|0)7\d{8}$|^(\+?40|0)[23]\d{8}$/.test(lead.telefon.replace(/[\s.-]/g, ''))) errors.telefon = 'Verifică numărul de telefon (ex. 0722 123 456).';
  // Emailul e opțional, dar obligatoriu dacă clientul a ales să primească ofertele pe email
  if (lead.canal === 'email' && !lead.email) errors.email = 'Scrie adresa de email la care vrei ofertele.';
  else if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = 'Verifică adresa de email.';
  if (!lead.acord) errors.acord = 'Avem nevoie de acordul tău ca să te putem contacta.';
  if (Object.keys(errors).length) throw new LeadError('Verifică câmpurile marcate.', errors);
  return lead;
}

const parse = r => r && {...r, note: JSON.parse(r.note || '[]'), acord: !!r.acord};

export async function add(lead) {
  const db = await getDb();
  const r = await db.execute({
    sql: `INSERT INTO leads (serviciu, detaliu, mesaj, nume, telefon, email, canal, sursa, pagina, acord)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`,
    args: [lead.serviciu, lead.detaliu, lead.mesaj, lead.nume, lead.telefon, lead.email || null, lead.canal, lead.sursa, lead.pagina, lead.acord ? 1 : 0]
  });
  return parse({...r.rows[0]});
}

export async function list({status} = {}) {
  const db = await getDb();
  const rows = status
    ? await all(db, 'SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC', [status])
    : await all(db, 'SELECT * FROM leads ORDER BY created_at DESC');
  return rows.map(parse);
}

export async function get(id) {
  return parse(await one(await getDb(), 'SELECT * FROM leads WHERE id = ?', [Number(id)]));
}

export async function counts() {
  const rows = await all(await getDb(), 'SELECT status, count(*) n FROM leads GROUP BY status');
  const by = Object.fromEntries(rows.map(r => [r.status, Number(r.n)]));
  return {by, total: Object.values(by).reduce((a, b) => a + b, 0)};
}

// Din panou: schimbarea etapei și/sau o notă nouă (notele se adaugă, nu se rescriu)
export async function update(id, {status, nota}) {
  const cur = await get(id);
  if (!cur) throw new LeadError('Cererea nu există.', null, 404);
  if (status && !STATUSURI.some(s => s.key === status)) throw new LeadError('Etapă necunoscută.', {status: 'Etapă necunoscută.'});
  const note = [...cur.note];
  const text = clip(nota, 2000);
  if (text) note.push({text, la: new Date().toISOString()});
  if (status && status !== cur.status) note.push({text: `Etapă: ${STATUSURI.find(s => s.key === cur.status)?.label} → ${STATUSURI.find(s => s.key === status).label}`, la: new Date().toISOString(), sistem: true});
  await (await getDb()).execute({
    sql: `UPDATE leads SET status = ?, note = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?`,
    args: [status ?? cur.status, JSON.stringify(note), cur.id]
  });
  return get(id);
}

export async function remove(id) {
  const r = await (await getDb()).execute({sql: 'DELETE FROM leads WHERE id = ?', args: [Number(id)]});
  if (!r.rowsAffected) throw new LeadError('Cererea nu există.', null, 404);
  return {ok: true};
}

export async function markNotified(id, error) {
  await (await getDb()).execute({
    sql: error ? 'UPDATE leads SET notificare_eroare = ? WHERE id = ?' : `UPDATE leads SET notificat_la = strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), notificare_eroare = NULL WHERE id = ?`,
    args: error ? [String(error).slice(0, 500), id] : [id]
  });
}
