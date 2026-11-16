// PUT / DELETE /api/manage/entitati/<grup>/<id>/ → salvează sau șterge o entitate în data/entitati.json (doar local)
import {update, remove} from '../../../../../../core/store.mjs';
import {handle} from '../../../../../../manage/api.mjs';

export async function PUT(request, {params}) {
  const {tip, id} = await params;
  return handle(request, async () => update(tip, id, await request.json()));
}

export async function DELETE(request, {params}) {
  const {tip, id} = await params;
  return handle(request, () => remove(tip, id));
}
