'use client';
// Fișa unei entități: câmpurile comune + cele specifice grupului, starea de validare, salvare și ștergere.
import {useState} from 'react';

export default function Editor({grup, entity, base, extra, stari}) {
  const [v, setV] = useState(entity);
  const [saved, setSaved] = useState(entity);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const dirty = JSON.stringify(v) !== JSON.stringify(saved);
  const set = (k, val) => setV(o => ({...o, [k]: val}));

  async function save() {
    setBusy(true); setMsg(null);
    const r = await fetch(`/api/manage/entitati/${grup}/${entity.id}/`, {method: 'PUT', headers: {'content-type': 'application/json'}, body: JSON.stringify(v)});
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) { setV(j); setSaved(j); setErrors({}); setMsg({ok: true, text: 'Salvat în data/entitati.json'}); }
    else { setErrors(j.errors ?? {}); setMsg({ok: false, text: j.error ?? 'Nu s-a putut salva.'}); }
  }

  async function del() {
    if (!confirm(`Ștergi „${saved.nume}”? Se scoate din data/entitati.json (rămâne în istoricul git).`)) return;
    const r = await fetch(`/api/manage/entitati/${grup}/${entity.id}/`, {method: 'DELETE'});
    if (r.ok) location.href = `/manage/entitati/${grup}/`;
    else setMsg({ok: false, text: (await r.json().catch(() => ({}))).error ?? 'Nu s-a putut șterge.'});
  }

  const field = f => {
    const id = `f-${f.key}`;
    const val = v[f.key] ?? '';
    return (
      <div key={f.key} className={`f ${errors[f.key] ? 'has-err' : ''}`}>
        <label htmlFor={id}>{f.label}{f.required && <span className="req" title="obligatoriu">*</span>}</label>
        {f.type === 'textarea'
          ? <textarea id={id} rows={f.rows ?? 4} value={val} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)}/>
          : f.type === 'select'
            ? <select id={id} value={val} onChange={e => set(f.key, e.target.value)}><option value="">—</option>{f.options.map(o => <option key={o}>{o}</option>)}</select>
            : <input id={id} type="text" value={val} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)}/>}
        {f.help && <small>{f.help}</small>}
        {errors[f.key] && <span className="err">{errors[f.key]}</span>}
      </div>
    );
  };

  const [main, side] = [base.filter(f => !['sursa', 'note', 'imagine', 'url'].includes(f.key)), base.filter(f => ['url', 'imagine', 'sursa', 'note'].includes(f.key))];

  return (
    <>
      <div className="split">
        <div>
          <div className="fs"><h4>Conținut</h4>{main.map(field)}</div>
          {extra.length > 0 && <div className="fs"><h4>Câmpuri specifice</h4><div className="f2">{extra.map(field)}</div></div>}
        </div>
        <div>
          <div className="fs">
            <h4>Validare</h4>
            <div className="f">
              <label htmlFor="f-stare">Stare</label>
              <select id="f-stare" value={v.stare ?? ''} onChange={e => set('stare', e.target.value)}>
                {stari.map(s => <option key={s.key}>{s.key}</option>)}
              </select>
              <small>„verificat” = confirmat din sursă sau de client. Restul apar în „De făcut”.</small>
            </div>
          </div>
          <div className="fs"><h4>Sursă și legături</h4>{side.map(field)}</div>
          {v.imagine && <div className="fs"><h4>Previzualizare</h4><img src={v.imagine} alt="" style={{width: '100%', borderRadius: 8, display: 'block'}}/></div>}
        </div>
      </div>
      <div className="stickybar">
        <span className={msg ? (msg.ok ? 'tag ok' : 'tag bad') : 'muted small'} role="status">{msg ? msg.text : dirty ? 'Modificări nesalvate' : `#${entity.id} · ${grup}`}</span>
        <span className="grow"/>
        <button type="button" className="danger" onClick={del}>Șterge</button>
        <button type="button" onClick={() => { setV(saved); setErrors({}); setMsg(null); }} disabled={!dirty || busy}>Renunță</button>
        <button type="button" className="primary" onClick={save} disabled={!dirty || busy}>{busy ? 'Se salvează…' : 'Salvează'}</button>
      </div>
    </>
  );
}
