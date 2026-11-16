'use client';
// Header-ul site-ului umbrelă: bara de încredere (magazin, telefon, WhatsApp, magtel.ro),
// bara principală cu cele 4 linii de business în mega-meniu și „Cere ofertă” mereu vizibil,
// meniul de pe mobil (ecran întreg, acordeon) și bara fixă de jos cu Sună / WhatsApp / Cere ofertă.
import {useEffect, useRef, useState} from 'react';
import {LINII, LINKURI, icon} from '../menu.mjs';
import LeadButton, {openLead} from './LeadButton.jsx';
import Icon, {I} from './Icon.jsx';

export default function Header({c}) {
  const [open, setOpen] = useState(null);      // linia cu mega-meniul deschis (desktop)
  const [mobile, setMobile] = useState(false); // meniul de pe mobil
  const [acc, setAcc] = useState(null);        // linia deschisă în acordeonul de pe mobil
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = e => { if (e.key === 'Escape') { setOpen(null); setMobile(false); } };
    const onDown = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, []);

  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; }, [mobile]);

  // Deschidere la hover cu o mică întârziere (fără „pâlpâit” când mouse-ul trece peste meniu), clic pentru tastatură și touch
  const openedAt = useRef(0);
  const show = k => { if (k !== open) openedAt.current = Date.now(); setOpen(k); };
  const enter = k => { clearTimeout(timer.current); timer.current = setTimeout(() => show(k), 90); };
  const leave = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 160); };
  // Clicul imediat după deschiderea la hover nu trebuie să închidă meniul
  const toggle = k => { clearTimeout(timer.current); if (open === k && Date.now() - openedAt.current > 500) setOpen(null); else show(k); };
  const linie = LINII.find(l => l.key === open);

  const actiune = (a, close) => a.href
    ? <a className="s-btn s-btn-primary" href={a.href} onClick={close}>{a.cta} <Icon d={I.arrow} size={18}/></a>
    : <LeadButton serviciu={a.serviciu} sursa="meniu" onClick={close}>{a.cta} <Icon d={I.arrow} size={18}/></LeadButton>;

  return (
    <>
      <header ref={ref} className={`s-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`} onMouseLeave={leave}>
        <div className="s-topbar">
          <div className="s-wrap s-topbar-in">
            <a className="s-top-store" href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii">
              <Icon d={I.pin} size={15}/><span><b>Magazin CEMADO Buftea</b><span className="s-hide-sm"> · {c.magazin.adresa}</span></span>
              {c.magazin.program && <span className="s-hide-sm"> · {c.magazin.program}</span>}
            </a>
            <div className="s-top-links">
              <a href="https://www.magtel.ro/" target="_blank" rel="noopener" data-ev="click_magtel"><Icon d={I.cart} size={15}/>magtel.ro<span className="s-hide-sm">, magazin online</span><Icon d={I.ext} size={13}/></a>
              <a href={c.whatsapp} target="_blank" rel="noopener" data-ev="click_whatsapp" className="s-hide-sm"><Icon d={I.whatsapp} size={15}/>WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="s-bar">
          <div className="s-wrap s-bar-in">
            <a className="s-logo" href="/" aria-label="CEMADO, pagina principală"><img src="/brand/logo-fundal-rosu.png" alt="CEMADO – Rezolvă, asigură, trăiește" width="138" height="48"/></a>

            <nav className="s-nav" aria-label="Meniu principal">
              <ul>
                {LINII.map(l => (
                  <li key={l.key} onMouseEnter={() => enter(l.key)}>
                    <button type="button" className={`s-nav-btn ${open === l.key ? 'on' : ''}`} aria-expanded={open === l.key} aria-controls={`mega-${l.key}`}
                      onClick={() => toggle(l.key)}>
                      {l.label}<Icon d={I.chevron} size={16} className="s-chev"/>
                    </button>
                  </li>
                ))}
                {LINKURI.map(l => <li key={l.href} onMouseEnter={leave}><a className="s-nav-link" href={l.href}>{l.label}</a></li>)}
              </ul>
            </nav>

            <div className="s-bar-cta">
              <a className="s-phone" href={c.telefon.href} data-ev="click_telefon"><span className="s-phone-ico"><Icon d={I.phone} size={18}/></span><span><small>Sună-ne</small>{c.telefon.afisat}</span></a>
              <LeadButton sursa="header"/>
              <button type="button" className="s-burger" aria-label="Deschide meniul" aria-expanded={mobile} onClick={() => setMobile(true)}><Icon d={I.menu} size={24}/></button>
            </div>
          </div>
        </div>

        {/* Mega-meniu: un singur panou, conținutul liniei active */}
        {linie && (
          <div className="s-mega" id={`mega-${linie.key}`} onMouseEnter={() => enter(linie.key)}>
            <div className="s-wrap s-mega-in">
              <div className="s-mega-intro">
                <span className="s-mega-ico"><Icon d={icon(linie.icon)} size={26}/></span>
                <h2>{linie.label}</h2>
                <p>{linie.intro}</p>
                <a className="s-link" href={linie.href} onClick={() => setOpen(null)}>Tot despre {linie.label.toLowerCase()} <Icon d={I.arrow} size={16}/></a>
              </div>
              <ul className="s-mega-items">
                {linie.items.map(it => (
                  <li key={it.href}><a href={it.href} onClick={() => setOpen(null)}><b>{it.label}</b><span>{it.desc}</span></a></li>
                ))}
              </ul>
              <div className="s-mega-card">
                <p className="s-eyebrow">Cel mai rapid</p>
                <h3>{linie.actiune.titlu}</h3>
                <p>{linie.actiune.text}</p>
                {actiune(linie.actiune, () => setOpen(null))}
                <a className="s-mega-call" href={c.telefon.href} data-ev="click_telefon">sau sună: <b>{c.telefon.afisat}</b></a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Meniul de pe mobil */}
      <div className={`s-sheet ${mobile ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Meniu" hidden={!mobile}>
        <div className="s-sheet-head">
          <img src="/brand/logo-fundal-rosu.png" alt="CEMADO" width="115" height="40"/>
          <button type="button" className="s-burger" aria-label="Închide meniul" onClick={() => setMobile(false)}><Icon d={I.close} size={24}/></button>
        </div>
        <div className="s-sheet-body">
          {LINII.map(l => (
            <div key={l.key} className={`s-acc ${acc === l.key ? 'on' : ''}`}>
              <button type="button" aria-expanded={acc === l.key} onClick={() => setAcc(acc === l.key ? null : l.key)}>
                <span className="s-acc-ico"><Icon d={icon(l.icon)} size={20}/></span>{l.label}<Icon d={I.chevron} size={18} className="s-chev"/>
              </button>
              {acc === l.key && (
                <ul>
                  <li><a href={l.href}><b>Tot despre {l.label.toLowerCase()}</b></a></li>
                  {l.items.map(it => <li key={it.href}><a href={it.href}>{it.label}</a></li>)}
                  <li className="s-acc-cta">{actiune(l.actiune, () => setMobile(false))}</li>
                </ul>
              )}
            </div>
          ))}
          {LINKURI.map(l => <a key={l.href} className="s-sheet-link" href={l.href}>{l.label}<Icon d={I.arrow} size={18}/></a>)}
          <a className="s-sheet-link" href="https://www.magtel.ro/" target="_blank" rel="noopener">magtel.ro, magazin online<Icon d={I.ext} size={16}/></a>
        </div>
        <div className="s-sheet-foot">
          <LeadButton sursa="meniu-mobil" className="s-btn s-btn-primary s-btn-block" onClick={() => setMobile(false)}>Cere o ofertă</LeadButton>
          <div className="s-sheet-contact">
            <a href={c.telefon.href} data-ev="click_telefon"><Icon d={I.phone} size={18}/>{c.telefon.afisat}</a>
            <a href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii"><Icon d={I.pin} size={18}/>{c.magazin.oras}</a>
          </div>
        </div>
      </div>

      {/* Bara fixă de jos, doar pe mobil: cele trei acțiuni care aduc lead-uri */}
      <div className="s-mbar" aria-label="Contact rapid">
        <a href={c.telefon.href} data-ev="click_telefon"><Icon d={I.phone} size={20}/>Sună</a>
        <a href={c.whatsapp} target="_blank" rel="noopener" data-ev="click_whatsapp"><Icon d={I.whatsapp} size={20}/>WhatsApp</a>
        <button type="button" className="s-mbar-cta" onClick={() => openLead(null, 'bara-mobil')}>Cere ofertă</button>
      </div>
    </>
  );
}
