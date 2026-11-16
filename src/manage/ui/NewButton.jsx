'use client';
// „+ Element nou”: creează o entitate goală (stare „de confirmat”) și deschide fișa ei
import {useState} from 'react';

export default function NewButton({grup, label}) {
  const [busy, setBusy] = useState(false);
  async function create() {
    setBusy(true);
    const r = await fetch(`/api/manage/entitati/${grup}/`, {method: 'POST', headers: {'content-type': 'application/json'}, body: '{}'});
    const j = await r.json().catch(() => ({}));
    if (r.ok) location.href = `/manage/entitati/${grup}/${j.id}/`;
    else { setBusy(false); alert(j.error ?? 'Nu s-a putut crea.'); }
  }
  return <button className="primary" onClick={create} disabled={busy}>{busy ? 'Se creează…' : label}</button>;
}
