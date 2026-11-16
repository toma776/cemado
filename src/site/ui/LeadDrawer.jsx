'use client';
// Panoul „Cere ofertă”, în 2 pași: (1) alegi serviciul, (2) o întrebare de calificare + nume și telefon.
// Se deschide din orice buton LeadButton (eveniment „cemado:lead”); dacă serviciul vine preselectat, începe direct cu pasul 2.
import {useEffect, useRef, useState} from 'react';
import {SERVICII, icon} from '../menu.mjs';
import Icon, {I} from './Icon.jsx';

const EMPTY = {serviciu: null, detaliu: '', mesaj: '', nume: '', telefon: '', canal: 'telefon', acord: false, website: ''};

export default function LeadDrawer({c}) {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState(EMPTY);
  const [sursa, setSursa] = useState('');
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('form'); // form | trimite | gata
  const [msg, setMsg] = useState('');
  const panel = useRef(null);
  const last = useRef(null);
  const set = (k, val) => setV(o => ({...o, [k]: val}));
  const s = SERVICII.find(x => x.key === v.serviciu);

  useEffect(() => {
    const onOpen = e => {
      last.current = document.activeElement;
      setV({...EMPTY, serviciu: e.detail?.serviciu ?? null, detaliu: e.detail?.detaliu ?? ''});
      setSursa(e.detail?.sursa ?? '');
      setErrors({}); setMsg(''); setState('form'); setOpen(true);
    };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('cemado:lead', onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('cemado:lead', onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) setTimeout(() => panel.current?.querySelector('button, input, select')?.focus(), 50);
    else last.current?.focus?.();
  }, [open, v.serviciu, state]);

  async function submit(e) {
    e.preventDefault();
    setState('trimite'); setMsg('');
    const r = await fetch('/api/leads/', {method: 'POST', headers: {'content-type': 'application/json'},
      body: JSON.stringify({...v, sursa, pagina: location.pathname})}).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r?.ok) {
      setState('gata');
      window.dataLayer?.push({event: `lead_${v.serviciu}`, sursa});
    } else { setState('form'); setErrors(j.errors ?? {}); setMsg(j.error ?? 'Nu am putut trimite cererea. Sună-ne direct.'); }
  }

  if (!open) return null;
  return (
    <div className="s-drawer-wrap" onPointerDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <aside ref={panel} className="s-drawer" role="dialog" aria-modal="true" aria-labelledby="lead-title">
        <div className="s-drawer-head">
          <div>
            <p className="s-eyebrow">{state === 'gata' ? 'Cerere trimisă' : v.serviciu ? 'Pasul 2 din 2' : 'Pasul 1 din 2'}</p>
            <h2 id="lead-title">{state === 'gata' ? 'Mulțumim! Te contactăm noi.' : v.serviciu ? (s?.key === 'altceva' ? 'Spune-ne cu ce te ajutăm' : `Ofertă: ${s.label.toLowerCase()}`) : 'Cu ce te putem ajuta?'}</h2>
          </div>
          <button type="button" className="s-icon-btn" aria-label="Închide" onClick={() => setOpen(false)}><Icon d={I.close} size={22}/></button>
        </div>
        <div className="s-progress" aria-hidden="true"><i style={{width: state === 'gata' ? '100%' : v.serviciu ? '66%' : '33%'}}/></div>

        {state === 'gata' ? (
          <div className="s-drawer-body s-done">
            <span className="s-done-ico"><Icon d={I.check} size={30}/></span>
            <p>Un consultant CEMADO te {v.canal === 'whatsapp' ? 'contactează pe WhatsApp' : 'sună'} la <b>{v.telefon}</b> cât de curând, cu variantele potrivite.</p>
            <p className="s-muted">Dacă e urgent, sună-ne acum la <a href={c.telefon.href}>{c.telefon.afisat}</a> sau treci pe la magazinul din {c.magazin.oras}.</p>
            <button type="button" className="s-btn s-btn-dark" onClick={() => setOpen(false)}>Închide</button>
          </div>
        ) : !v.serviciu ? (
          <div className="s-drawer-body">
            <div className="s-tiles">
              {SERVICII.map(x => (
                <button key={x.key} type="button" className="s-tile" onClick={() => set('serviciu', x.key)}>
                  {icon(x.key) && <span className="s-tile-ico"><Icon d={icon(x.key)} size={22}/></span>}
                  <b>{x.label}</b><span>{x.hint}</span>
                </button>
              ))}
            </div>
            <p className="s-muted s-small">Preferi să vorbim direct? <a href={c.telefon.href} data-ev="click_telefon">{c.telefon.afisat}</a> · <a href={c.whatsapp} target="_blank" rel="noopener" data-ev="click_whatsapp">WhatsApp</a></p>
          </div>
        ) : (
          <form className="s-drawer-body s-form" onSubmit={submit} noValidate>
            <button type="button" className="s-back" onClick={() => set('serviciu', null)}>← Alt serviciu</button>
            {s?.intrebare && (
              <fieldset className="s-choices">
                <legend>{s.intrebare.label}</legend>
                <div>{s.intrebare.options.map(o => (
                  <label key={o} className={v.detaliu === o ? 'on' : ''}><input type="radio" name="detaliu" value={o} checked={v.detaliu === o} onChange={() => set('detaliu', o)}/>{o}</label>
                ))}</div>
              </fieldset>
            )}
            <div className={`s-field ${errors.nume ? 'has-err' : ''}`}>
              <label htmlFor="ld-nume">Nume</label>
              <input id="ld-nume" autoComplete="name" value={v.nume} onChange={e => set('nume', e.target.value)} placeholder="Numele tău"/>
              {errors.nume && <span className="s-err">{errors.nume}</span>}
            </div>
            <div className={`s-field ${errors.telefon ? 'has-err' : ''}`}>
              <label htmlFor="ld-tel">Telefon</label>
              <input id="ld-tel" type="tel" inputMode="tel" autoComplete="tel" value={v.telefon} onChange={e => set('telefon', e.target.value)} placeholder="07xx xxx xxx"/>
              {errors.telefon && <span className="s-err">{errors.telefon}</span>}
            </div>
            <fieldset className="s-choices s-inline">
              <legend>Cum preferi să te contactăm?</legend>
              <div>{[['telefon', 'Telefon'], ['whatsapp', 'WhatsApp']].map(([k, l]) => (
                <label key={k} className={v.canal === k ? 'on' : ''}><input type="radio" name="canal" value={k} checked={v.canal === k} onChange={() => set('canal', k)}/>{l}</label>
              ))}</div>
            </fieldset>
            <div className="s-field">
              <label htmlFor="ld-mesaj">Detalii <span className="s-muted">(opțional)</span></label>
              <textarea id="ld-mesaj" rows={3} value={v.mesaj} onChange={e => set('mesaj', e.target.value)} placeholder={v.serviciu === 'asigurari' ? 'ex. nr. înmatriculare, data expirării RCA' : v.serviciu === 'energie' ? 'ex. factura medie lunară, localitatea' : 'Orice ne ajută să-ți pregătim oferta'}/>
            </div>
            <input className="s-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={e => set('website', e.target.value)} name="website"/>
            <label className={`s-consent ${errors.acord ? 'has-err' : ''}`}>
              <input type="checkbox" checked={v.acord} onChange={e => set('acord', e.target.checked)}/>
              <span>Sunt de acord să fiu contactat de CEMADO în legătură cu această cerere, conform <a href="/politica-de-confidentialitate/" target="_blank">Politicii de confidențialitate</a>.</span>
            </label>
            {errors.acord && <span className="s-err">{errors.acord}</span>}
            {msg && <p className="s-err" role="alert">{msg}</p>}
            <button type="submit" className="s-btn s-btn-primary s-btn-block" disabled={state === 'trimite'}>{state === 'trimite' ? 'Se trimite…' : 'Trimite cererea'}</button>
            <p className="s-muted s-small s-center">Fără obligații. Primești oferta și decizi tu.</p>
          </form>
        )}
      </aside>
    </div>
  );
}
