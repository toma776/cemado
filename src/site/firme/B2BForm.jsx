'use client';
// Formularul B2B: firma, CUI, mărimea, serviciile (mai multe deodată) și persoana de contact.
// Trimite la același /api/leads (serviciu „firme”); serviciile ajung în „detaliu”, datele firmei în „mesaj”,
// ca să apară întregi în panou și în email fără să schimbăm schema bazei.
import {useState} from 'react';
import Icon, {I} from '../ui/Icon.jsx';
import {CANALE} from '../ui/Canal.jsx';

export const SERVICII_B2B = ['Abonamente și internet business', 'Asigurări pentru firmă', 'Flotă auto (RCA, CASCO)', 'Sisteme fotovoltaice'];
const MARIME = ['1–9 angajați', '10–49 angajați', '50–249 angajați', '250+ angajați'];

export default function B2BForm({telefon}) {
  const [v, setV] = useState({firma: '', cui: '', marime: '', servicii: [], nume: '', telefon: '', email: '', canal: 'telefon', mesaj: '', acord: false, website: ''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form');
  const [msg, setMsg] = useState('');
  const set = (k, val) => setV(o => ({...o, [k]: val}));
  const toggle = s => set('servicii', v.servicii.includes(s) ? v.servicii.filter(x => x !== s) : [...v.servicii, s]);

  async function submit(e) {
    e.preventDefault();
    const local = {};
    if (v.firma.trim().length < 2) local.firma = 'Numele firmei e necesar.';
    if (!v.servicii.length) local.servicii = 'Bifați cel puțin un serviciu.';
    if (Object.keys(local).length) { setErrors(local); setMsg(''); return; }
    setState('trimite'); setMsg('');
    const mesaj = [
      `Firmă: ${v.firma.trim()}`, v.cui && `CUI: ${v.cui.trim()}`, v.marime && `Mărime: ${v.marime}`, v.mesaj && `\n${v.mesaj.trim()}`
    ].filter(Boolean).join('\n');
    const r = await fetch('/api/leads/', {method: 'POST', headers: {'content-type': 'application/json'},
      body: JSON.stringify({serviciu: 'firme', detaliu: v.servicii.join(', '), mesaj, nume: v.nume, telefon: v.telefon, email: v.email, canal: v.canal, acord: v.acord, website: v.website, sursa: 'formular-firme', pagina: location.pathname})}).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r?.ok) { setState('gata'); window.dataLayer?.push({event: 'lead_firme', sursa: 'formular-firme'}); }
    else { setState('form'); setErrors(j.errors ?? {}); setMsg(j.error ?? 'Nu am putut trimite cererea.'); }
  }

  if (state === 'gata') return (
    <div className="f-form f-done" role="status">
      <span className="s-done-ico"><Icon d={I.check} size={30}/></span>
      <h3>Mulțumim! Am primit cererea pentru {v.firma}.</h3>
      <p>Un consultant CEMADO vă contactează {v.canal === 'email' ? `pe email, la ${v.email}` : v.canal === 'whatsapp' ? `pe WhatsApp, la ${v.telefon}` : `la ${v.telefon}`} ca să discutăm serviciile bifate și să pregătim oferta.</p>
      <p className="s-muted s-small">Urgent? Sunați-ne la <a href={telefon.href}>{telefon.afisat}</a>.</p>
    </div>
  );

  const field = (k, label, props = {}) => (
    <div className={`s-field ${errors[k] ? 'has-err' : ''}`}>
      <label htmlFor={`b2b-${k}`}>{label}</label>
      <input id={`b2b-${k}`} value={v[k]} onChange={e => set(k, e.target.value)} {...props}/>
      {errors[k] && <span className="s-err">{errors[k]}</span>}
    </div>
  );

  return (
    <form id="oferta-firma" data-lead-form className="f-form" onSubmit={submit} noValidate aria-labelledby="b2b-title">
      <h2 id="b2b-title">Cereți o ofertă pentru firmă</h2>
      <p className="s-muted s-small" style={{margin: '-6px 0 4px'}}>Bifați tot ce vă interesează: primiți o singură ofertă, de la un singur consultant.</p>
      <fieldset className={`f-checks ${errors.servicii ? 'has-err' : ''}`}>
        <legend>Ce servicii vă interesează?</legend>
        {SERVICII_B2B.map(s => (
          <label key={s} className={v.servicii.includes(s) ? 'on' : ''}>
            <input type="checkbox" checked={v.servicii.includes(s)} onChange={() => toggle(s)}/>
            <span className="f-box" aria-hidden="true"><Icon d={I.check} size={14}/></span>{s}
          </label>
        ))}
        {errors.servicii && <span className="s-err">{errors.servicii}</span>}
      </fieldset>
      <div className="f-row">
        {field('firma', 'Numele firmei', {autoComplete: 'organization', placeholder: 'ex. Agro Ilfov SRL'})}
        {field('cui', 'CUI (opțional)', {placeholder: 'RO…', inputMode: 'text'})}
      </div>
      <div className="s-field">
        <label htmlFor="b2b-marime">Mărimea firmei</label>
        <select id="b2b-marime" value={v.marime} onChange={e => set('marime', e.target.value)}>
          <option value="">Alegeți (opțional)</option>{MARIME.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="f-row">
        {field('nume', 'Persoană de contact', {autoComplete: 'name', placeholder: 'Nume și prenume'})}
        {field('telefon', 'Telefon', {type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '07xx xxx xxx'})}
      </div>
      {field('email', v.canal === 'email' ? 'Email' : 'Email (opțional)', {type: 'email', autoComplete: 'email', placeholder: 'nume@firma.ro'})}
      <fieldset className="s-choices s-inline">
        <legend>Cum preferați să vă contactăm?</legend>
        <div>{CANALE.map(([k, l]) => (
          <label key={k} className={v.canal === k ? 'on' : ''}><input type="radio" name="b2b-canal" value={k} checked={v.canal === k} onChange={() => set('canal', k)}/>{l}</label>
        ))}</div>
      </fieldset>
      <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={e => set('website', e.target.value)} name="website"/>
      <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
        <input type="checkbox" checked={v.acord} onChange={e => set('acord', e.target.checked)}/>
        <span>Sunt de acord să fiu contactat de CEMADO în legătură cu această cerere, conform <a href="/politica-de-confidentialitate/" target="_blank">Politicii de confidențialitate</a>.</span>
      </label>
      {(Object.keys(errors).length > 0 || msg) && <p className="s-err" role="alert">{msg || 'Verificați câmpurile marcate.'}</p>}
      <button type="submit" className="s-btn s-btn-primary s-btn-block" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Trimite cererea'}</button>
    </form>
  );
}
