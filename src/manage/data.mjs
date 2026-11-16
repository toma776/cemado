// Cifrele panoului, calculate din data/entitati.json
import {load} from '../core/store.mjs';
import {GROUPS, OPEN, tone} from '../registry/groups.mjs';

export async function stats() {
  const data = await load();
  const by = {};
  for (const g of GROUPS) by[g.key] = {total: 0, open: 0, stari: {}};
  for (const e of data.entitati) {
    const s = by[e.grup];
    if (!s) continue;
    s.total++;
    s.stari[e.stare] = (s.stari[e.stare] ?? 0) + 1;
    if (OPEN.includes(e.stare)) s.open++;
  }
  const total = data.entitati.length;
  const open = data.entitati.filter(e => OPEN.includes(e.stare));
  return {data, by, total, open, actualizat: data.actualizat, sursa: data.sursa};
}

// „De făcut”: tot ce nu e verificat, cu problemele (lipsește) primele
export function todo(open) {
  const rank = {bad: 0, warn: 1, grey: 2};
  return [...open].sort((a, b) => rank[tone(a.stare)] - rank[tone(b.stare)] || a.id - b.id);
}
