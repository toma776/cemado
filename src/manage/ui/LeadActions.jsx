'use client';
// Fișa unei cereri: etapa (pipeline), notele interne și ștergerea (GDPR: la cererea clientului)
import {useState} from 'react';

export default function LeadActions({lead, statusuri}) {
  const [l, setL] = useState(lead);
  const [nota, setNota] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function patch(body) {
    setBusy(true); setErr('');
    const r = await fetch(`/api/manage/cereri/${l.id}/`, {method: 'PATCH', headers: {'content-type': 'application/json'}, body: JSON.stringify(body)});
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) { setL(j); setNota(''); } else setErr(j.error ?? 'Nu s-a putut salva.');
  }

  async function del() {
    if (!confirm(`Ștergi definitiv cererea lui ${l.nume}? Datele personale dispar din baza de date și nu se pot recupera.`)) return;
    const r = await fetch(`/api/manage/cereri/${l.id}/`, {method: 'DELETE'});
    if (r.ok) location.href = '/manage/cereri/'; else setErr('Nu s-a putut șterge.');
  }

  return (
    <div className="split">
      <div>
        <div className="fs">
          <h4>Etapa</h4>
          <div className="pills" style={{margin: 0}}>
            {statusuri.map(s => (
              <a key={s.key} href="#" className={l.status === s.key ? 'on' : ''} aria-pressed={l.status === s.key}
                onClick={e => { e.preventDefault(); if (!busy && s.key !== l.status) patch({status: s.key}); }}>{s.label}</a>
            ))}
          </div>
        </div>
        <div className="fs">
          <h4>Note interne <span className="muted small">{l.note.length}</span></h4>
          <div className="f">
            <label htmlFor="nota">Notă nouă</label>
            <textarea id="nota" rows={3} value={nota} onChange={e => setNota(e.target.value)} placeholder="ex. A cerut ofertă RCA și CASCO, revenim marți"/>
          </div>
          <div><button type="button" className="primary" disabled={busy || !nota.trim()} onClick={() => patch({nota})}>{busy ? 'Se salvează…' : 'Adaugă nota'}</button></div>
          {err && <span className="tag bad">{err}</span>}
          {[...l.note].reverse().map((n, i) => (
            <div key={i} className="obs" style={{display: 'block'}}>
              <span className="muted small">{new Date(n.la).toLocaleString('ro-RO', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'})}</span>
              <p style={{margin: '2px 0 0', whiteSpace: 'pre-line', color: n.sistem ? 'var(--muted)' : undefined}}>{n.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="fs">
          <h4>Date personale</h4>
          <p className="muted small" style={{margin: 0}}>Clientul și-a dat acordul să fie contactat pentru această cerere. Dacă cere ștergerea datelor, șterge cererea de aici.</p>
          <div><button type="button" className="danger" onClick={del}>Șterge cererea</button></div>
        </div>
      </div>
    </div>
  );
}
