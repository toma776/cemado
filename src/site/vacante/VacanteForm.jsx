'use client';
// Formularul de vacanță: tipul, destinația (opțional), luna, durata, câte persoane și bugetul.
// Fără ele, consultantul nu poate trimite variante utile; cu ele, prima ofertă e deja pe măsura clientului.
import {useState} from 'react';
import {sendLead} from '../ui/sendLead.mjs';
import Canal from '../ui/Canal.jsx';
import Icon, {I} from '../ui/Icon.jsx';

const TIPURI = ['Litoral / sejur', 'Circuit', 'City break', 'Exotic', 'Încă nu știu'];
const DURATE = ['Weekend prelungit', 'O săptămână', '10–14 zile', 'Altă durată'];
const BUGETE = ['Sub 500 € / pers.', '500–1.000 € / pers.', '1.000–2.000 € / pers.', 'Peste 2.000 € / pers.', 'Nu știu încă'];

// Lunile următoare, pentru alegerea perioadei („Flexibil” primul)
const luni = () => {
  const out = ['Flexibil'];
  const d = new Date();
  for (let i = 0; i < 12; i++) {
    const m = new Date(d.getFullYear(), d.getMonth() + i, 1);
    out.push(m.toLocaleDateString('ro-RO', {month: 'long', year: 'numeric'}).replace(/^./, c => c.toUpperCase()));
  }
  return out;
};

// „1 adult, 2 copii”: acordul la singular / plural
const persoane = (a, c) => [`${a} ${a === 1 ? 'adult' : 'adulți'}`, c ? `${c} ${c === 1 ? 'copil' : 'copii'}` : null].filter(Boolean).join(' și ');

function Stepper({id, label, value, set, min}) {
  return (
    <div className="s-field">
      <label id={`${id}-l`}>{label}</label>
      <div className="v-step" role="group" aria-labelledby={`${id}-l`}>
        <button type="button" aria-label={`Mai puțini: ${label.toLowerCase()}`} onClick={() => set(Math.max(min, value - 1))} disabled={value <= min}>−</button>
        <output aria-live="polite">{value}</output>
        <button type="button" aria-label={`Mai mulți: ${label.toLowerCase()}`} onClick={() => set(Math.min(12, value + 1))}>+</button>
      </div>
    </div>
  );
}

export default function VacanteForm({telefon}) {
  const [LUNI] = useState(luni);
  const [v, setV] = useState({tip: '', destinatie: '', luna: 'Flexibil', durata: 'O săptămână', adulti: 2, copii: 0, buget: 'Nu știu încă', nume: '', telefon: '', email: '', canal: 'whatsapp', acord: false, website: ''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form');
  const [msg, setMsg] = useState('');
  const set = (k, val) => setV(o => ({...o, [k]: val}));

  async function submit(e) {
    e.preventDefault();
    setState('trimite'); setMsg('');
    const mesaj = [
      v.destinatie && `Destinație: ${v.destinatie.trim()}`, `Perioadă: ${v.luna}`, `Durată: ${v.durata}`,
      `Persoane: ${persoane(v.adulti, v.copii)}`, `Buget: ${v.buget}`
    ].filter(Boolean).join('\n');
    const r = await sendLead({serviciu: 'vacante', detaliu: v.tip || 'Încă nu știu', mesaj, nume: v.nume, telefon: v.telefon, email: v.email, canal: v.canal, acord: v.acord, website: v.website, sursa: 'formular-vacante'});
    if (r.ok) setState('gata'); else { setState('form'); setErrors(r.errors); setMsg(r.error); }
  }

  if (state === 'gata') return (
    <div className="f-form f-light f-done" role="status">
      <span className="s-done-ico"><Icon d={I.check} size={30}/></span>
      <h3>Mulțumim, {v.nume.split(' ')[0]}! Începem să căutăm.</h3>
      <p>Un consultant îți trimite variantele {v.canal === 'email' ? `pe email, la ${v.email}` : v.canal === 'whatsapp' ? `pe WhatsApp, la ${v.telefon}` : `la telefon, la ${v.telefon}`}, potrivite pentru {persoane(v.adulti, v.copii)}{v.destinatie ? `, cu destinația ${v.destinatie.trim()}` : ''}.</p>
      <p className="s-muted s-small">Ai o întrebare între timp? <a href={telefon.href}>{telefon.afisat}</a>.</p>
    </div>
  );

  return (
    <form className="f-form f-light" data-lead-form onSubmit={submit} noValidate aria-labelledby="vac-title">
      <h2 id="vac-title">Spune-ne cum arată vacanța ta</h2>
      <p className="s-muted s-small">Durează un minut. Primești variante alese după preferințele și bugetul tău.</p>
      <fieldset className="s-choices">
        <legend>Ce fel de vacanță cauți?</legend>
        <div>{TIPURI.map(o => <label key={o} className={v.tip === o ? 'on' : ''}><input type="radio" name="vac-tip" value={o} checked={v.tip === o} onChange={() => set('tip', o)}/>{o}</label>)}</div>
      </fieldset>
      <div className="s-field">
        <label htmlFor="vac-dest">Destinație <span className="s-muted">(opțional)</span></label>
        <input id="vac-dest" value={v.destinatie} onChange={e => set('destinatie', e.target.value)} placeholder="ex. Grecia, Antalya, „undeva cald”"/>
      </div>
      <div className="f-row">
        <div className="s-field">
          <label htmlFor="vac-luna">Când?</label>
          <select id="vac-luna" value={v.luna} onChange={e => set('luna', e.target.value)}>{LUNI.map(o => <option key={o}>{o}</option>)}</select>
        </div>
        <div className="s-field">
          <label htmlFor="vac-durata">Cât timp?</label>
          <select id="vac-durata" value={v.durata} onChange={e => set('durata', e.target.value)}>{DURATE.map(o => <option key={o}>{o}</option>)}</select>
        </div>
      </div>
      <div className="f-row v-row">
        <Stepper id="vac-adulti" label="Adulți" value={v.adulti} set={n => set('adulti', n)} min={1}/>
        <Stepper id="vac-copii" label="Copii" value={v.copii} set={n => set('copii', n)} min={0}/>
      </div>
      <div className="s-field">
        <label htmlFor="vac-buget">Buget orientativ</label>
        <select id="vac-buget" value={v.buget} onChange={e => set('buget', e.target.value)}>{BUGETE.map(o => <option key={o}>{o}</option>)}</select>
      </div>
      <div className="f-row">
        <div className={`s-field ${errors.nume ? 'has-err' : ''}`}>
          <label htmlFor="vac-nume">Nume</label>
          <input id="vac-nume" autoComplete="name" value={v.nume} onChange={e => set('nume', e.target.value)} placeholder="Numele tău"/>
          {errors.nume && <span className="s-err">{errors.nume}</span>}
        </div>
        <div className={`s-field ${errors.telefon ? 'has-err' : ''}`}>
          <label htmlFor="vac-tel">Telefon</label>
          <input id="vac-tel" type="tel" inputMode="tel" autoComplete="tel" value={v.telefon} onChange={e => set('telefon', e.target.value)} placeholder="07xx xxx xxx"/>
          {errors.telefon && <span className="s-err">{errors.telefon}</span>}
        </div>
      </div>
      <Canal id="vac" v={v} set={set} errors={errors} legend="Unde vrei variantele?"/>
      <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={e => set('website', e.target.value)} name="website"/>
      <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
        <input type="checkbox" checked={v.acord} onChange={e => set('acord', e.target.checked)}/>
        <span>Sunt de acord să fiu contactat de CEMADO în legătură cu această cerere, conform <a href="/politica-de-confidentialitate/" target="_blank">Politicii de confidențialitate</a>.</span>
      </label>
      {errors.acord && <span className="s-err">{errors.acord}</span>}
      {msg && !Object.keys(errors).length && <p className="s-err" role="alert">{msg}</p>}
      <button type="submit" className="s-btn s-btn-primary s-btn-block" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Vreau variante de vacanță'}</button>
      <p className="f-note">Vacanțele sunt oferite prin Destine Holidays; CEMADO activează ca promoter de turism.</p>
    </form>
  );
}
