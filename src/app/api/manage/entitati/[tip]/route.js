// POST /api/manage/entitati/<grup>/ → creează o entitate nouă în grup (doar local)
import {create} from '../../../../../core/store.mjs';
import {handle} from '../../../../../manage/api.mjs';

export async function POST(request, {params}) {
  const {tip} = await params;
  return handle(request, async () => create(tip, await request.json().catch(() => ({}))));
}
