'use client';
// „Te sunăm noi”: formularul scurt din footer (nume, telefon, serviciu). Ultima șansă de conversie a paginii.
import {useState} from 'react';
import {SERVICII} from '../menu.mjs';
import Icon, {I} from './Icon.jsx';

export default function CallbackForm() {
  const [v, setV] = useState({nume: '', telefon: '', serviciu: '', acord: false, website: ''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form');
  const [msg, setMsg] = useState('');
  const set = (k, val) => setV(o => ({...o, [k]: val}));

  async function submit(e) {
    e.preventDefault();
    setState('trimite'); setMsg('');
    const r = await fetch('/api/leads/', {method: 'POST', headers: {'content-type': 'application/json'},
      body: JSON.stringify({...v, serviciu: v.serviciu || 'altceva', canal: 'telefon', sursa: 'footer-callback', pagina: location.pathname})}).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r?.ok) { setState('gata'); window.dataLayer?.push({event: `lead_${v.serviciu || 'altceva'}`, sursa: 'footer-callback'}); }
    else { setState('form'); setErrors(j.errors ?? {}); setMsg(j.error ?? 'Nu am putut trimite cererea.'); }
  }

  if (state === 'gata') return (
    <div className="s-cb-done" role="status"><span className="s-done-ico"><Icon d={I.check} size={26}/></span><div><b>Mulțumim, {v.nume.split(' ')[0]}!</b><p>Te sunăm la {v.telefon} cât de curând.</p></div></div>
  );

  return (
    <form className="s-cb" onSubmit={submit} noValidate>
      <div className="s-cb-row">
        <div className={`s-field ${errors.nume ? 'has-err' : ''}`}>
          <label htmlFor="cb-nume">Nume</label>
          <input id="cb-nume" autoComplete="name" value={v.nume} onChange={e => set('nume', e.target.value)} placeholder="Numele tău"/>
        </div>
        <div className={`s-field ${errors.telefon ? 'has-err' : ''}`}>
          <label htmlFor="cb-tel">Telefon</label>
          <input id="cb-tel" type="tel" inputMode="tel" autoComplete="tel" value={v.telefon} onChange={e => set('telefon', e.target.value)} placeholder="07xx xxx xxx"/>
        </div>
        <div className="s-field">
          <label htmlFor="cb-serv">Despre ce vorbim?</label>
          <select id="cb-serv" value={v.serviciu} onChange={e => set('serviciu', e.target.value)}>
            <option value="">Alege (opțional)</option>
            {SERVICII.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
        <button type="submit" className="s-btn s-btn-light" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Sună-mă'}</button>
      </div>
      <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={e => set('website', e.target.value)} name="website"/>
      <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
        <input type="checkbox" checked={v.acord} onChange={e => set('acord', e.target.checked)}/>
        <span>Sunt de acord să fiu contactat de CEMADO, conform <a href="/politica-de-confidentialitate/">Politicii de confidențialitate</a>.</span>
      </label>
      {(Object.keys(errors).length > 0 || msg) && <p className="s-err" role="alert">{Object.values(errors)[0] ?? msg}</p>}
    </form>
  );
}
