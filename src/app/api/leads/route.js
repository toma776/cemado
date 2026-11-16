// POST /api/leads/ → o cerere din formularele site-ului („Cere ofertă”, „Te sunăm noi”).
// Cererea se salvează întâi (nu se pierde niciodată), apoi emailul pleacă după răspuns, ca vizitatorul să nu aștepte.
import {after} from 'next/server';
import {validate, add, markNotified, LeadError} from '../../../core/leads.mjs';
import {notify} from '../../../core/notify.mjs';

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== request.headers.get('host')) return Response.json({error: 'Cerere din alt site.'}, {status: 403});
  let input;
  try { input = await request.json(); } catch { return Response.json({error: 'Cerere invalidă.'}, {status: 400}); }
  // Câmp-capcană: oamenii nu-l văd, roboții îl completează
  if (input.website) return Response.json({ok: true});
  try {
    const lead = await add(validate(input));
    after(async () => {
      const r = await notify(lead);
      if (r.ok) await markNotified(lead.id);
      else if (r.error) { console.error(`Lead #${lead.id}: ${r.error}`); await markNotified(lead.id, r.error); }
      else console.log(`Lead #${lead.id}: email netrimis (${r.skipped})`);
    });
    return Response.json({ok: true, id: lead.id});
  } catch (e) {
    if (e instanceof LeadError) return Response.json({error: e.message, errors: e.errors}, {status: 422});
    console.error(e);
    return Response.json({error: 'Nu am putut trimite cererea. Sună-ne direct și te ajutăm.'}, {status: 500});
  }
}
