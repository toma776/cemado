// PATCH / DELETE /api/manage/cereri/<id>/ → etapa și notele unei cereri, sau ștergerea ei (doar din panou)
import {update, remove, LeadError} from '../../../../../core/leads.mjs';
import {guard} from '../../../../../manage/api.mjs';

async function run(request, fn) {
  const denied = guard(request);
  if (denied) return denied;
  try { return Response.json(await fn()); }
  catch (e) {
    if (e instanceof LeadError) return Response.json({error: e.message, errors: e.errors}, {status: e.status});
    console.error(e);
    return Response.json({error: 'Eroare neașteptată.'}, {status: 500});
  }
}

export async function PATCH(request, {params}) {
  const {id} = await params;
  return run(request, async () => update(id, await request.json()));
}

export async function DELETE(request, {params}) {
  const {id} = await params;
  return run(request, () => remove(id));
}
