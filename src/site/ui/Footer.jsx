// Footer-ul site-ului umbrelă, în trei straturi:
// (1) banda „Te sunăm noi”: a doua șansă de conversie, pentru cine a ajuns la final fără să acționeze;
// (2) harta site-ului: liniile de business, compania, magazinul și contactul direct;
// (3) conformitate: mențiunile despre parteneri (asigurări, turism, rate), date firmă, legal, ANPC / SOL.
import {LINII, FOOTER_COMPANIE, LEGAL} from '../menu.mjs';
import CallbackForm from './CallbackForm.jsx';
import Icon, {I} from './Icon.jsx';

export default function Footer({c}) {
  const an = new Date().getFullYear();
  return (
    <footer className="s-footer">
      <section className="s-cb-band" aria-labelledby="cb-title">
        <div className="s-wrap s-cb-in">
          <div className="s-cb-text">
            <p className="s-eyebrow">Nu știi de unde să începi?</p>
            <h2 id="cb-title">Lasă-ne numărul. Te sunăm noi și găsim împreună varianta potrivită.</h2>
            <p>Telefon, asigurare, vacanță sau energie solară: un singur consultant pentru toate.</p>
          </div>
          <CallbackForm/>
        </div>
      </section>

      <div className="s-wrap s-foot">
        <div className="s-foot-brand">
          <img src="/brand/logo-fundal-rosu.png" alt="CEMADO – Rezolvă, asigură, trăiește" width="161" height="56"/>
          <p>Din {c.firma.an}, CEMADO aduce sub același acoperiș telefonia, asigurările, vacanțele și energia solară, cu un consultant care îți explică opțiunile.</p>
          <a className="s-foot-phone" href={c.telefon.href} data-ev="click_telefon"><Icon d={I.phone} size={20}/>{c.telefon.afisat}</a>
          <div className="s-foot-quick">
            <a href={c.whatsapp} target="_blank" rel="noopener" data-ev="click_whatsapp"><Icon d={I.whatsapp} size={17}/>WhatsApp</a>
            <a href={`mailto:${c.email}`}><Icon d={I.mail} size={17}/>{c.email}</a>
          </div>
        </div>

        <nav className="s-foot-nav" aria-label="Servicii">
          {LINII.map(l => (
            <div key={l.key}>
              <h3><a href={l.href}>{l.label}</a></h3>
              <ul>{l.items.map(it => <li key={it.href}><a href={it.href}>{it.label}</a></li>)}</ul>
            </div>
          ))}
          <div>
            <h3>CEMADO</h3>
            <ul>
              {FOOTER_COMPANIE.map(it => <li key={it.href}><a href={it.href}>{it.label}</a></li>)}
              <li><a href="https://www.magtel.ro/" target="_blank" rel="noopener" data-ev="click_magtel">magtel.ro ↗</a></li>
            </ul>
          </div>
        </nav>

        <div className="s-foot-store">
          <h3>Vino în magazin</h3>
          <p><b>{c.magazin.nume}</b><br/>{c.magazin.adresa}<br/>{c.magazin.oras}, {c.magazin.judet}</p>
          {c.magazin.program && <p className="s-foot-prog"><Icon d={I.clock} size={16}/>{c.magazin.program}</p>}
          <a className="s-btn s-btn-outline-light s-btn-sm" href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii"><Icon d={I.pin} size={16}/>Indicații rutiere</a>
          <p className="s-foot-small">Plăți facturi, reîncărcare prepay și colete, direct în magazin.</p>
        </div>
      </div>

      <div className="s-wrap s-foot-legal">
        <p className="s-foot-note">
          Asigurările sunt intermediate prin Destine Broker de Asigurare-Reasigurare; CEMADO activează ca asistent în brokeraj.
          {' '}Vacanțele sunt oferite prin Destine Holidays. Finanțarea în rate se acordă de partenerii financiari, în condițiile fiecăruia.
        </p>
        <div className="s-foot-bottom">
          <p>© {an} {c.firma.nume} · CUI {c.firma.cui} · {c.firma.regCom} · Sediu: {c.sediu.adresa}, {c.sediu.oras}</p>
          <ul>{LEGAL.map(l => <li key={l.href}><a href={l.href} {...(l.ext ? {target: '_blank', rel: 'noopener'} : {})}>{l.label}</a></li>)}</ul>
        </div>
      </div>
    </footer>
  );
}
