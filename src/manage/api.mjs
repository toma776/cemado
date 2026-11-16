// Apărarea rutelor /api/manage: scrierile sunt permise doar local și doar din același site (verificarea Origin).
import {StoreError} from '../core/store.mjs';
import {canManage} from './guard.mjs';

export function guard(request) {
  const host = request.headers.get('host') ?? '';
  if (!canManage(host)) return Response.json({error: 'Scrierile din /manage merg doar local.'}, {status: 403});
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== host) return Response.json({error: 'Cerere din alt site.'}, {status: 403});
  return null;
}

export async function handle(request, fn) {
  const denied = guard(request);
  if (denied) return denied;
  try {
    return Response.json(await fn());
  } catch (e) {
    if (e instanceof StoreError) return Response.json({error: e.message, errors: e.errors}, {status: e.status});
    console.error(e);
    return Response.json({error: 'Eroare neașteptată la salvare.'}, {status: 500});
  }
}
