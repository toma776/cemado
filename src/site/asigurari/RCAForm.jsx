'use client';
// Formularul RCA: datele care permit o ofertă reală (PF / PJ, vehicul, nr. înmatriculare, data expirării, perioadă,
// decontare directă) + contact. Data expirării ajută consultantul să prioritizeze cererile urgente.
// Reminder-ul pentru reînnoire e un acord SEPARAT (contact viitor), nu face parte din acordul pentru cererea de acum.
import {useState} from 'react';
import {sendLead} from '../ui/sendLead.mjs';
import Icon, {I} from '../ui/Icon.jsx';

const VEHICULE = ['Autoturism', 'Autoutilitară', 'Motocicletă', 'Altul'];
const PERIOADE = ['12 luni', '6 luni', 'Altă perioadă'];

export default function RCAForm({telefon}) {
  const [v, setV] = useState({tip: 'Persoană fizică', vehicul: 'Autoturism', nr: '', expira: '', perioada: '12 luni', decontare: false, reminder: false, nume: '', telefon: '', canal: 'whatsapp', acord: false, website: ''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form');
  const [msg, setMsg] = useState('');
  const set = (k, val) => setV(o => ({...o, [k]: val}));

  async function submit(e) {
    e.preventDefault();
    setState('trimite'); setMsg('');
    const mesaj = [
      `Client: ${v.tip}`, `Vehicul: ${v.vehicul}`, v.nr && `Nr. înmatriculare: ${v.nr.trim().toUpperCase()}`,
      v.expira && `RCA actual expiră: ${v.expira}`, `Perioadă dorită: ${v.perioada}`,
      `Decontare directă: ${v.decontare ? 'da' : 'nu'}`, `Reminder la expirare: ${v.reminder ? 'DA (acord separat)' : 'nu'}`
    ].filter(Boolean).join('\n');
    const r = await sendLead({serviciu: 'asigurari', detaliu: 'RCA', mesaj, nume: v.nume, telefon: v.telefon, canal: v.canal, acord: v.acord, website: v.website, sursa: 'formular-rca'});
    if (r.ok) setState('gata'); else { setState('form'); setErrors(r.errors); setMsg(r.error); }
  }

  if (state === 'gata') return (
    <div className="f-form f-light f-done" role="status">
      <span className="s-done-ico"><Icon d={I.check} size={30}/></span>
      <h3>Am primit datele, {v.nume.split(' ')[0]}!</h3>
      <p>Un consultant îți trimite variantele RCA {v.canal === 'whatsapp' ? 'pe WhatsApp' : 'la telefon'}, la {v.telefon}.</p>
      <p className="s-muted s-small">Ai nevoie urgent? Sună-ne la <a href={telefon.href}>{telefon.afisat}</a> sau treci pe la magazin cu talonul.</p>
    </div>
  );

  const pills = (k, list, label) => (
    <fieldset className="s-choices">
      <legend>{label}</legend>
      <div>{list.map(x => { const [o, l] = Array.isArray(x) ? x : [x, x]; return <label key={o} className={v[k] === o ? 'on' : ''}><input type="radio" name={`rca-${k}`} value={o} checked={v[k] === o} onChange={() => set(k, o)}/>{l}</label>; })}</div>
    </fieldset>
  );
  const check = (k, label) => (
    <label className="s-consent"><input type="checkbox" checked={v[k]} onChange={e => set(k, e.target.checked)}/><span>{label}</span></label>
  );

  return (
    <form className="f-form f-light" data-lead-form onSubmit={submit} noValidate aria-labelledby="rca-title">
      <h2 id="rca-title">Primește oferte RCA</h2>
      <p className="s-muted s-small">Durează un minut. Talonul nu e obligatoriu acum: îl cerem doar la emiterea poliței.</p>
      {pills('tip', ['Persoană fizică', 'Firmă'], 'Mașina e pe')}
      <div className="f-row">
        <div className="s-field">
          <label htmlFor="rca-vehicul">Tip vehicul</label>
          <select id="rca-vehicul" value={v.vehicul} onChange={e => set('vehicul', e.target.value)}>{VEHICULE.map(o => <option key={o}>{o}</option>)}</select>
        </div>
        <div className="s-field">
          <label htmlFor="rca-nr">Nr. înmatriculare <span className="s-muted">(opțional)</span></label>
          <input id="rca-nr" value={v.nr} onChange={e => set('nr', e.target.value)} placeholder="IF 00 ABC" autoCapitalize="characters"/>
        </div>
      </div>
      <div className="f-row">
        <div className="s-field">
          <label htmlFor="rca-expira">Când îți expiră RCA-ul?</label>
          <input id="rca-expira" type="date" value={v.expira} onChange={e => set('expira', e.target.value)}/>
        </div>
        <div className="s-field">
          <label htmlFor="rca-perioada">Perioadă</label>
          <select id="rca-perioada" value={v.perioada} onChange={e => set('perioada', e.target.value)}>{PERIOADE.map(o => <option key={o}>{o}</option>)}</select>
        </div>
      </div>
      {check('decontare', 'Vreau și variante cu decontare directă')}
      <div className="f-row">
        <div className={`s-field ${errors.nume ? 'has-err' : ''}`}>
          <label htmlFor="rca-nume">Nume</label>
          <input id="rca-nume" autoComplete="name" value={v.nume} onChange={e => set('nume', e.target.value)} placeholder="Numele tău"/>
          {errors.nume && <span className="s-err">{errors.nume}</span>}
        </div>
        <div className={`s-field ${errors.telefon ? 'has-err' : ''}`}>
          <label htmlFor="rca-tel">Telefon</label>
          <input id="rca-tel" type="tel" inputMode="tel" autoComplete="tel" value={v.telefon} onChange={e => set('telefon', e.target.value)} placeholder="07xx xxx xxx"/>
          {errors.telefon && <span className="s-err">{errors.telefon}</span>}
        </div>
      </div>
      {pills('canal', [['whatsapp', 'WhatsApp'], ['telefon', 'Telefon']], 'Unde vrei ofertele?')}
      <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={e => set('website', e.target.value)} name="website"/>
      <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
        <input type="checkbox" checked={v.acord} onChange={e => set('acord', e.target.checked)}/>
        <span>Sunt de acord să fiu contactat de CEMADO în legătură cu această cerere, conform <a href="/politica-de-confidentialitate/" target="_blank">Politicii de confidențialitate</a>.</span>
      </label>
      {errors.acord && <span className="s-err">{errors.acord}</span>}
      {check('reminder', 'Opțional: vreau să fiu anunțat înainte de expirarea RCA-ului, de acum înainte.')}
      {msg && !Object.keys(errors).length && <p className="s-err" role="alert">{msg}</p>}
      <button type="submit" className="s-btn s-btn-primary s-btn-block" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Primește ofertele'}</button>
      <p className="f-note">Prin Destine Broker de Asigurare-Reasigurare; CEMADO activează ca asistent în brokeraj.</p>
    </form>
  );
}
