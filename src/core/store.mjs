// Stocarea entităților: un singur fișier JSON în repo (data/entitati.json), fără bază de date.
// Panoul scrie aici doar local; modificările ajung pe GitHub prin commit.
import {readFile, writeFile, rename} from 'node:fs/promises';
import path from 'node:path';
import {group, fieldsOf, STARI} from '../registry/groups.mjs';

const FILE = path.join(process.cwd(), 'data', 'entitati.json');

export class StoreError extends Error {
  constructor(message, status = 400, errors) { super(message); this.status = status; this.errors = errors; }
}

export async function load() {
  return JSON.parse(await readFile(FILE, 'utf8'));
}

// Scriere atomică: fișier temporar + redenumire, ca o eroare la mijloc să nu strice JSON-ul
async function save(data) {
  data.actualizat = new Date().toISOString().slice(0, 10);
  const tmp = `${FILE}.tmp`;
  await writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  await rename(tmp, FILE);
}

export async function list(grup) {
  return (await load()).entitati.filter(e => e.grup === grup);
}

export async function get(grup, id) {
  return (await list(grup)).find(e => e.id === Number(id)) ?? null;
}

// Păstrăm doar câmpurile declarate în registru pentru grup, plus id, grup și stare
function clean(grup, input) {
  const out = {};
  for (const f of fieldsOf(grup)) {
    const v = input[f.key];
    if (v === undefined) continue;
    out[f.key] = typeof v === 'string' ? v.trim() : v;
  }
  if (input.stare !== undefined) out.stare = input.stare;
  return out;
}

function validate(grup, e) {
  const errors = {};
  if (!String(e.nume ?? '').trim()) errors.nume = 'Numele e obligatoriu.';
  if (e.stare && !STARI.some(s => s.key === e.stare)) errors.stare = 'Stare necunoscută.';
  if (Object.keys(errors).length) throw new StoreError('Verifică câmpurile marcate.', 422, errors);
}

export async function create(grup, input = {}) {
  if (!group(grup)) throw new StoreError('Grup necunoscut.', 404);
  const data = await load();
  const id = Math.max(0, ...data.entitati.map(e => e.id)) + 1;
  const e = {id, grup, nume: `${group(grup).one[0].toUpperCase()}${group(grup).one.slice(1)} nou`, stare: 'de confirmat', ...clean(grup, input)};
  validate(grup, e);
  data.entitati.push(e);
  await save(data);
  return e;
}

export async function update(grup, id, input) {
  const data = await load();
  const i = data.entitati.findIndex(e => e.id === Number(id) && e.grup === grup);
  if (i < 0) throw new StoreError('Entitatea nu există.', 404);
  const next = {...data.entitati[i], ...clean(grup, input)};
  // Câmpurile golite dispar din fișier, ca JSON-ul să rămână curat
  for (const k of Object.keys(next)) if (next[k] === '') delete next[k];
  validate(grup, next);
  data.entitati[i] = next;
  await save(data);
  return next;
}

export async function remove(grup, id) {
  const data = await load();
  const before = data.entitati.length;
  data.entitati = data.entitati.filter(e => !(e.id === Number(id) && e.grup === grup));
  if (data.entitati.length === before) throw new StoreError('Entitatea nu există.', 404);
  await save(data);
  return {ok: true};
}
