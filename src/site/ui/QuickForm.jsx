'use client';
// Formularul rapid din hero-ul unei pagini de serviciu: o întrebare de calificare (pastile), nume, telefon, canal, acord.
// Același pentru toate liniile; diferă doar serviciul, titlul și opțiunile. Marcat data-lead-form, deci butoanele
// generice „Cere ofertă” de pe pagină duc aici.
import {useState} from 'react';
import {sendLead} from './sendLead.mjs';
import Icon, {I} from './Icon.jsx';
import Canal from './Canal.jsx';

export default function QuickForm({serviciu, titlu, intro, intrebare, optiuni, nota, telefon, sursa = 'formular-pagina', initial = ''}) {
  const [v, setV] = useState({detaliu: initial, nume: '', telefon: '', email: '', canal: 'telefon', mesaj: '', acord: false, website: ''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form');
  const [msg, setMsg] = useState('');
  const set = (k, val) => setV(o => ({...o, [k]: val}));

  async function submit(e) {
    e.preventDefault();
    setState('trimite'); setMsg('');
    const r = await sendLead({serviciu, sursa, ...v});
    if (r.ok) setState('gata'); else { setState('form'); setErrors(r.errors); setMsg(r.error); }
  }

  if (state === 'gata') return (
    <div className="f-form f-light f-done" role="status">
      <span className="s-done-ico"><Icon d={I.check} size={30}/></span>
      <h3>Mulțumim, {v.nume.split(' ')[0]}! Te contactăm noi.</h3>
      <p>Un consultant CEMADO te {v.canal === 'whatsapp' ? `contactează pe WhatsApp, la ${v.telefon}` : v.canal === 'email' ? `contactează pe email, la ${v.email}` : `sună la ${v.telefon}`}, ca să lămurim ce date îi trebuie și să-ți pregătească variantele{v.detaliu ? ` pentru ${/^[A-Z]+$/.test(v.detaliu) ? v.detaliu : v.detaliu.toLowerCase()}` : ''}.</p>
      <p className="s-muted s-small">Urgent? Sună-ne la <a href={telefon.href}>{telefon.afisat}</a>.</p>
    </div>
  );

  return (
    <form className="f-form f-light" data-lead-form onSubmit={submit} noValidate aria-labelledby={`qf-${serviciu}`}>
      <h2 id={`qf-${serviciu}`}>{titlu}</h2>
      {intro && <p className="s-muted s-small">{intro}</p>}
      <fieldset className="s-choices">
        <legend>{intrebare}</legend>
        <div>{optiuni.map(o => (
          <label key={o} className={v.detaliu === o ? 'on' : ''}><input type="radio" name={`qf-${serviciu}-d`} value={o} checked={v.detaliu === o} onChange={() => set('detaliu', o)}/>{o}</label>
        ))}</div>
      </fieldset>
      <div className="f-row">
        <div className={`s-field ${errors.nume ? 'has-err' : ''}`}>
          <label htmlFor={`qf-${serviciu}-nume`}>Nume</label>
          <input id={`qf-${serviciu}-nume`} autoComplete="name" value={v.nume} onChange={e => set('nume', e.target.value)} placeholder="Numele tău"/>
          {errors.nume && <span className="s-err">{errors.nume}</span>}
        </div>
        <div className={`s-field ${errors.telefon ? 'has-err' : ''}`}>
          <label htmlFor={`qf-${serviciu}-tel`}>Telefon</label>
          <input id={`qf-${serviciu}-tel`} type="tel" inputMode="tel" autoComplete="tel" value={v.telefon} onChange={e => set('telefon', e.target.value)} placeholder="07xx xxx xxx"/>
          {errors.telefon && <span className="s-err">{errors.telefon}</span>}
        </div>
      </div>
      <Canal id={`qf-${serviciu}`} v={v} set={set} errors={errors} legend="Unde vrei să primești variantele?"/>
      <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={e => set('website', e.target.value)} name="website"/>
      <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
        <input type="checkbox" checked={v.acord} onChange={e => set('acord', e.target.checked)}/>
        <span>Sunt de acord să fiu contactat de CEMADO în legătură cu această cerere, conform <a href="/politica-de-confidentialitate/" target="_blank">Politicii de confidențialitate</a>.</span>
      </label>
      {errors.acord && <span className="s-err">{errors.acord}</span>}
      {msg && !Object.keys(errors).length && <p className="s-err" role="alert">{msg}</p>}
      <button type="submit" className="s-btn s-btn-primary s-btn-block" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Vreau variantele'}</button>
      {nota && <p className="f-note">{nota}</p>}
    </form>
  );
}
