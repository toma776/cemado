'use client';
// Formularul RCA, varianta „formular scurt + actele direct la consultant”.
// Un preț RCA real cere datele de pe talon și CNP-ul / CUI-ul proprietarului (vârstă, clasă bonus-malus).
// Nu le cerem în formular și nu stocăm acte pe site: pasul 1 e formularul, pasul 2 e trimiterea pozelor
// cu talonul și buletinul direct pe WhatsApp-ul sau emailul CEMADO, cu numărul cererii, ca să le lege de ea.
// Reminder-ul pentru reînnoire e un acord SEPARAT (contact viitor).
import {useState} from 'react';
import {sendLead} from '../ui/sendLead.mjs';
import Canal from '../ui/Canal.jsx';
import Icon, {I} from '../ui/Icon.jsx';

const VEHICULE = ['Autoturism', 'Autoutilitară', 'Motocicletă', 'Altul'];
const PERIOADE = ['12 luni', '6 luni', 'Altă perioadă'];

export default function RCAForm({c}) {
  const [v, setV] = useState({tip: 'Persoană fizică', vehicul: 'Autoturism', nr: '', expira: '', perioada: '12 luni', decontare: false, reminder: false, nume: '', telefon: '', email: '', canal: 'whatsapp', acord: false, website: ''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form');
  const [id, setId] = useState(null);
  const [msg, setMsg] = useState('');
  const set = (k, val) => setV(o => ({...o, [k]: val}));
  const nr = v.nr.trim().toUpperCase();

  async function submit(e) {
    e.preventDefault();
    if (nr.length < 4) { setErrors({nr: 'Scrie numărul de înmatriculare (ex. IF 12 ABC).'}); setMsg(''); return; }
    setState('trimite'); setMsg('');
    const mesaj = [
      `Client: ${v.tip}`, `Vehicul: ${v.vehicul}`, `Nr. înmatriculare: ${nr}`,
      v.expira && `RCA actual expiră: ${v.expira.split('-').reverse().join('.')}`, `Perioadă dorită: ${v.perioada}`,
      `Decontare directă: ${v.decontare ? 'da' : 'nu'}`, `Reminder la expirare: ${v.reminder ? 'DA (acord separat)' : 'nu'}`,
      'Actele (talon, CI/CUI) vin separat, pe WhatsApp sau email, cu numărul cererii.'
    ].filter(Boolean).join('\n');
    const r = await sendLead({serviciu: 'asigurari', detaliu: 'RCA', mesaj, nume: v.nume, telefon: v.telefon, email: v.email, canal: v.canal, acord: v.acord, website: v.website, sursa: 'formular-rca'});
    if (r.ok) { setId(r.id); setState('gata'); } else { setState('form'); setErrors(r.errors); setMsg(r.error); }
  }

  if (state === 'gata') {
    const ref = `Cerere RCA #${id ?? ''} · ${nr}`;
    const wa = `${c.whatsapp}?text=${encodeURIComponent(`Bună ziua! ${ref}. Vă trimit poza talonului și a ${v.tip === 'Firmă' ? 'certificatului de înregistrare (CUI)' : 'buletinului'} pentru oferta RCA.`)}`;
    const mail = `mailto:${c.email}?subject=${encodeURIComponent(ref)}&body=${encodeURIComponent('Bună ziua! Atașez poza talonului și a actului de identitate pentru oferta RCA.')}`;
    return (
      <div className="f-form f-light f-done" role="status">
        <span className="s-done-ico"><Icon d={I.check} size={30}/></span>
        <p className="s-eyebrow" style={{margin: 0}}>Pasul 1 din 2 · gata</p>
        <h3>Acum trimite talonul și {v.tip === 'Firmă' ? 'CUI-ul firmei' : 'buletinul'}</h3>
        <p>Din ele calculăm prețul: datele mașinii și ale proprietarului (vârsta, clasa bonus-malus). Fă câte o poză și trimite-le cu numărul cererii, <b>#{id}</b>.</p>
        <a className="s-btn s-btn-primary s-btn-block" href={wa} target="_blank" rel="noopener" data-ev="rca_acte_whatsapp"><Icon d={I.whatsapp} size={20}/>Trimite pe WhatsApp</a>
        <a className="s-btn h-btn-ghost s-btn-block" href={mail} data-ev="rca_acte_email"><Icon d={I.mail} size={20}/>Trimite pe email</a>
        <p className="s-muted s-small">Sau treci cu actele pe la magazin: {c.magazin.adresa}, {c.magazin.oras}. Dacă nu ajung actele, te contactăm noi {v.canal === 'email' ? 'pe email' : v.canal === 'whatsapp' ? 'pe WhatsApp' : 'la telefon'}.</p>
      </div>
    );
  }

  const pills = (k, list, label) => (
    <fieldset className="s-choices">
      <legend>{label}</legend>
      <div>{list.map(o => <label key={o} className={v[k] === o ? 'on' : ''}><input type="radio" name={`rca-${k}`} value={o} checked={v[k] === o} onChange={() => set(k, o)}/>{o}</label>)}</div>
    </fieldset>
  );
  const check = (k, label) => <label className="s-consent"><input type="checkbox" checked={v[k]} onChange={e => set(k, e.target.checked)}/><span>{label}</span></label>;
  const field = (k, label, props = {}) => (
    <div className={`s-field ${errors[k] ? 'has-err' : ''}`}>
      <label htmlFor={`rca-${k}`}>{label}</label>
      <input id={`rca-${k}`} value={v[k]} onChange={e => set(k, e.target.value)} {...props}/>
      {errors[k] && <span className="s-err">{errors[k]}</span>}
    </div>
  );

  return (
    <form className="f-form f-light" data-lead-form onSubmit={submit} noValidate aria-labelledby="rca-title">
      <p className="s-eyebrow" style={{margin: 0}}>Pasul 1 din 2</p>
      <h2 id="rca-title">Cere oferte RCA</h2>
      <p className="s-muted s-small">Lași datele de bază aici. La pasul 2 ne trimiți poza talonului și a buletinului, din care calculăm prețul exact.</p>
      {pills('tip', ['Persoană fizică', 'Firmă'], 'Mașina e pe')}
      <div className="f-row">
        {field('nr', 'Nr. înmatriculare', {placeholder: 'IF 12 ABC', autoCapitalize: 'characters'})}
        <div className="s-field">
          <label htmlFor="rca-vehicul">Tip vehicul</label>
          <select id="rca-vehicul" value={v.vehicul} onChange={e => set('vehicul', e.target.value)}>{VEHICULE.map(o => <option key={o}>{o}</option>)}</select>
        </div>
      </div>
      <div className="f-row">
        <div className="s-field">
          <label htmlFor="rca-expira">Când expiră RCA-ul actual?</label>
          <input id="rca-expira" type="date" value={v.expira} onChange={e => set('expira', e.target.value)}/>
        </div>
        <div className="s-field">
          <label htmlFor="rca-perioada">Perioadă</label>
          <select id="rca-perioada" value={v.perioada} onChange={e => set('perioada', e.target.value)}>{PERIOADE.map(o => <option key={o}>{o}</option>)}</select>
        </div>
      </div>
      {check('decontare', 'Vreau și variante cu decontare directă')}
      <div className="f-row">
        {field('nume', 'Nume', {autoComplete: 'name', placeholder: 'Numele tău'})}
        {field('telefon', 'Telefon', {type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '07xx xxx xxx'})}
      </div>
      <Canal id="rca" v={v} set={set} errors={errors} legend="Unde vrei ofertele?"/>
      <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={e => set('website', e.target.value)} name="website"/>
      <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
        <input type="checkbox" checked={v.acord} onChange={e => set('acord', e.target.checked)}/>
        <span>Sunt de acord să fiu contactat de CEMADO în legătură cu această cerere, conform <a href="/politica-de-confidentialitate/" target="_blank">Politicii de confidențialitate</a>.</span>
      </label>
      {errors.acord && <span className="s-err">{errors.acord}</span>}
      {check('reminder', 'Opțional: vreau să fiu anunțat înainte de expirarea RCA-ului, de acum înainte.')}
      {msg && !Object.keys(errors).length && <p className="s-err" role="alert">{msg}</p>}
      <button type="submit" className="s-btn s-btn-primary s-btn-block" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Continuă la pasul 2'}</button>
      <p className="f-note">Prin Destine Broker de Asigurare-Reasigurare; CEMADO activează ca asistent în brokeraj.</p>
    </form>
  );
}
