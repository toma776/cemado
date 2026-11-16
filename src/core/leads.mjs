// Cererile venite din formularele site-ului. Local se adaugă în data/leads.json (în afara git: date personale).
// Pe Vercel discul e doar de citit; acolo cererile vor merge într-o bază de date sau pe email (pasul următor).
import {readFile, writeFile, rename} from 'node:fs/promises';
import path from 'node:path';
import {SERVICII} from '../site/menu.mjs';

const FILE = path.join(process.cwd(), 'data', 'leads.json');

export class LeadError extends Error {
  constructor(message, errors) { super(message); this.errors = errors; }
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
    canal: ['telefon', 'whatsapp'].includes(input.canal) ? input.canal : 'telefon',
    sursa: clip(input.sursa, 40),
    pagina: clip(input.pagina, 200),
    acord: input.acord === true
  };
  if (lead.nume.length < 2) errors.nume = 'Spune-ne cum te numești.';
  if (!/^(\+?40|0)7\d{8}$|^(\+?40|0)[23]\d{8}$/.test(lead.telefon.replace(/[\s.-]/g, ''))) errors.telefon = 'Verifică numărul de telefon (ex. 0722 123 456).';
  if (!lead.acord) errors.acord = 'Avem nevoie de acordul tău ca să te putem contacta.';
  if (Object.keys(errors).length) throw new LeadError('Verifică câmpurile marcate.', errors);
  return lead;
}

export async function add(lead) {
  let all = [];
  try { all = JSON.parse(await readFile(FILE, 'utf8')); } catch {}
  const row = {id: (all.at(-1)?.id ?? 0) + 1, data: new Date().toISOString(), status: 'nou', ...lead};
  all.push(row);
  const tmp = `${FILE}.tmp`;
  await writeFile(tmp, `${JSON.stringify(all, null, 2)}\n`, 'utf8');
  await rename(tmp, FILE);
  return row;
}
