// POST /api/leads/ → o cerere din formularele site-ului („Cere ofertă”, „Te sunăm noi”)
import {validate, add, LeadError} from '../../../core/leads.mjs';

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== request.headers.get('host')) return Response.json({error: 'Cerere din alt site.'}, {status: 403});
  let input;
  try { input = await request.json(); } catch { return Response.json({error: 'Cerere invalidă.'}, {status: 400}); }
  // Câmp-capcană: oamenii nu-l văd, roboții îl completează
  if (input.website) return Response.json({ok: true});
  try {
    const lead = validate(input);
    const row = await add(lead);
    return Response.json({ok: true, id: row.id});
  } catch (e) {
    if (e instanceof LeadError) return Response.json({error: e.message, errors: e.errors}, {status: 422});
    console.error(e);
    return Response.json({error: 'Nu am putut trimite cererea. Sună-ne direct și te ajutăm.'}, {status: 500});
  }
}
