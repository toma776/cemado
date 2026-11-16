'use client';
// Calculatorul din hero-ul paginii Energie solară: segment → consum (kWh sau factura în lei) → estimarea sistemului
// → „Vreau oferta exactă” (nume, telefon, localitate, canal). Estimarea ajunge în cerere, deci consultantul pornește
// discuția cu datele clientului. Marcat data-lead-form: butoanele generice „Cere ofertă” de pe pagină duc aici.
import {useMemo, useState} from 'react';
import {SEGMENTE, IPOTEZE, estimare, kwhDinFactura} from './calcul.mjs';
import {sendLead} from '../ui/sendLead.mjs';
import Canal from '../ui/Canal.jsx';
import Icon, {I} from '../ui/Icon.jsx';

const nr = n => n.toLocaleString('ro-RO');

export default function Calculator({telefon}) {
  const [seg, setSeg] = useState('casa');
  const s = SEGMENTE.find(x => x.key === seg);
  const [mod, setMod] = useState('kwh'); // kwh | lei
  const [kwh, setKwh] = useState(s.implicit);
  const [lei, setLei] = useState(Math.round(s.implicit * IPOTEZE.pretMediuKwhLei));
  const [v, setV] = useState({nume: '', telefon: '', email: '', localitate: '', canal: 'telefon', acord: false, website: ''});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form');
  const [msg, setMsg] = useState('');
  const set = (k, val) => setV(o => ({...o, [k]: val}));

  const consum = mod === 'kwh' ? kwh : kwhDinFactura(lei);
  const e = useMemo(() => estimare(consum), [consum]);

  const pickSeg = k => { const n = SEGMENTE.find(x => x.key === k); setSeg(k); setKwh(n.implicit); setLei(Math.round(n.implicit * IPOTEZE.pretMediuKwhLei)); };

  async function submit(ev) {
    ev.preventDefault();
    setState('trimite'); setMsg('');
    const mesaj = [
      `Segment: ${s.label}`, v.localitate && `Localitate: ${v.localitate.trim()}`,
      `Consum declarat: ${nr(consum)} kWh/lună${mod === 'lei' ? ` (din factura de ${nr(lei)} lei/lună)` : ''}`,
      `Estimare calculator: ~${e.kwp} kWp, ~${e.panouri} panouri, ~${e.suprafata} m², ~${nr(e.productie)} kWh/an`
    ].filter(Boolean).join('\n');
    const r = await sendLead({serviciu: 'energie', detaliu: s.label, mesaj, nume: v.nume, telefon: v.telefon, email: v.email, canal: v.canal, acord: v.acord, website: v.website, sursa: 'calculator-energie'});
    if (r.ok) setState('gata'); else { setState('form'); setErrors(r.errors); setMsg(r.error); }
  }

  if (state === 'gata') return (
    <div className="f-form f-light f-done e-calc" role="status">
      <span className="s-done-ico"><Icon d={I.check} size={30}/></span>
      <h3>Mulțumim, {v.nume.split(' ')[0]}!</h3>
      <p>Un consultant te contactează {v.canal === 'email' ? `pe email, la ${v.email}` : v.canal === 'whatsapp' ? `pe WhatsApp, la ${v.telefon}` : `la ${v.telefon}`} pentru oferta exactă, pornind de la estimarea de ~{e.kwp} kWp.</p>
      <p className="s-muted s-small">Pregătește ultimele facturi la energie: din ele dimensionăm corect sistemul. Urgent? <a href={telefon.href}>{telefon.afisat}</a>.</p>
    </div>
  );

  return (
    <form className="f-form f-light e-calc" data-lead-form id="calculator" onSubmit={submit} noValidate aria-labelledby="calc-title">
      <h2 id="calc-title">Ce sistem ți se potrivește?</h2>
      <p className="s-muted s-small">Estimare orientativă în 30 de secunde, pornind de la consumul tău.</p>

      <div className="h-switch e-seg" role="radiogroup" aria-label="Pentru ce e sistemul">
        {SEGMENTE.map(x => <button key={x.key} type="button" role="radio" aria-checked={seg === x.key} className={seg === x.key ? 'on' : ''} onClick={() => pickSeg(x.key)}>{x.label}</button>)}
      </div>

      <div className="e-input">
        <div className="e-input-head">
          <label htmlFor="calc-val">{mod === 'kwh' ? 'Consum lunar mediu' : 'Factura lunară medie'}</label>
          <button type="button" className="e-mod" onClick={() => setMod(mod === 'kwh' ? 'lei' : 'kwh')}>{mod === 'kwh' ? 'Știu doar suma din factură' : 'Știu consumul în kWh'}</button>
        </div>
        <div className="e-val">
          <input id="calc-val" type="number" inputMode="numeric" min={mod === 'kwh' ? s.min : 10} value={mod === 'kwh' ? kwh : lei}
            onChange={ev => { const n = Math.max(0, Number(ev.target.value) || 0); mod === 'kwh' ? setKwh(n) : setLei(n); }}/>
          <span>{mod === 'kwh' ? 'kWh / lună' : 'lei / lună'}</span>
        </div>
        <input type="range" aria-label="Ajustează valoarea" min={mod === 'kwh' ? s.min : Math.round(s.min * IPOTEZE.pretMediuKwhLei)} max={mod === 'kwh' ? s.max : Math.round(s.max * IPOTEZE.pretMediuKwhLei)} step={s.pas}
          value={mod === 'kwh' ? kwh : lei} onChange={ev => (mod === 'kwh' ? setKwh : setLei)(Number(ev.target.value))}/>
        <small>{mod === 'kwh' ? 'Îl găsești pe factură, la „consum” (kWh).' : `Convertim la ~${nr(consum)} kWh/lună, la un preț mediu de ~${String(IPOTEZE.pretMediuKwhLei).replace('.', ',')} lei/kWh.`}</small>
      </div>

      <div className="e-result" aria-live="polite">
        <div><b>~{String(e.kwp).replace('.', ',')} kWp</b><span>sistem recomandat</span></div>
        <div><b>~{nr(e.panouri)}</b><span>panouri</span></div>
        <div><b>~{nr(e.suprafata)} m²</b><span>suprafață necesară</span></div>
        <div><b>~{nr(e.productie)}</b><span>kWh produși pe an</span></div>
      </div>
      <p className="f-note" style={{textAlign: 'left'}}>Estimare pentru acoperirea consumului anual, la ~{nr(IPOTEZE.productieKwhPeKwp)} kWh/an pe kWp în zona Ilfov. Prețul și oferta exactă le stabilim după analiza facturilor și o vizită la fața locului.</p>

      <div className="e-lead">
        <h3>Vreau oferta exactă</h3>
        <div className="f-row">
          <div className={`s-field ${errors.nume ? 'has-err' : ''}`}>
            <label htmlFor="calc-nume">Nume</label>
            <input id="calc-nume" autoComplete="name" value={v.nume} onChange={ev => set('nume', ev.target.value)} placeholder="Numele tău"/>
            {errors.nume && <span className="s-err">{errors.nume}</span>}
          </div>
          <div className={`s-field ${errors.telefon ? 'has-err' : ''}`}>
            <label htmlFor="calc-tel">Telefon</label>
            <input id="calc-tel" type="tel" inputMode="tel" autoComplete="tel" value={v.telefon} onChange={ev => set('telefon', ev.target.value)} placeholder="07xx xxx xxx"/>
            {errors.telefon && <span className="s-err">{errors.telefon}</span>}
          </div>
        </div>
        <div className="s-field">
          <label htmlFor="calc-loc">Localitatea instalării <span className="s-muted">(opțional)</span></label>
          <input id="calc-loc" autoComplete="address-level2" value={v.localitate} onChange={ev => set('localitate', ev.target.value)} placeholder="ex. Buftea"/>
        </div>
        <Canal id="calc" v={v} set={set} errors={errors}/>
        <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={ev => set('website', ev.target.value)} name="website"/>
        <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
          <input type="checkbox" checked={v.acord} onChange={ev => set('acord', ev.target.checked)}/>
          <span>Sunt de acord să fiu contactat de CEMADO în legătură cu această cerere, conform <a href="/politica-de-confidentialitate/" target="_blank">Politicii de confidențialitate</a>.</span>
        </label>
        {errors.acord && <span className="s-err">{errors.acord}</span>}
        {msg && !Object.keys(errors).length && <p className="s-err" role="alert">{msg}</p>}
        <button type="submit" className="s-btn s-btn-primary s-btn-block" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Trimite estimarea și cere oferta'}</button>
      </div>
    </form>
  );
}
