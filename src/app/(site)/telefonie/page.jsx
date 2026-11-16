// Telefonie: afacerea de bază CEMADO și linia care trăiește cel mai mult în magazin.
// Parcurs: hero + formular rapid (abonament, portare, telefon în rate) → cele 4 zone (abonamente, telefoane în rate,
// accesorii, servicii în magazin), fiecare cu ancora ei din mega-meniu → telefon în rate în 3 pași →
// serviciile rapide din magazin (cu indicații) → magtel.ro → cross-sell → FAQ.
import {siteData} from '../../../site/brain.mjs';
import {icon} from '../../../site/menu.mjs';
import Icon, {I} from '../../../site/ui/Icon.jsx';
import LeadButton from '../../../site/ui/LeadButton.jsx';
import QuickForm from '../../../site/ui/QuickForm.jsx';
import '../../../site/home/home.css';
import '../../../site/service.css';
import '../../../site/telefonie/telefonie.css';

export const metadata = {title: 'Telefonie Buftea: abonamente Vodafone, telefoane în rate, plată facturi · CEMADO', description: 'Abonamente și internet Vodafone, telefoane și gadgeturi în rate doar cu buletinul, accesorii, plata facturilor de utilități, reîncărcare prepay și colete, în magazinul CEMADO din Buftea.', robots: {index: false, follow: false}};

const ZONE = [
  {id: 'abonamente', titlu: 'Abonamente și internet', text: 'Telefonie mobilă, internet și servicii Vodafone, explicate clar, cu condiții transparente.', serviciu: 'Abonament nou',
    puncte: ['Abonament nou sau schimbarea celui actual', 'Portare de la alt operator, cu numărul tău', 'Pentru persoane fizice și firme']},
  {id: 'telefoane-in-rate', titlu: 'Telefoane în rate', text: 'Telefoane, tablete, gadgeturi și electrocasnice, cu plata cash sau în rate prin partenerii noștri.', serviciu: 'Telefon sau gadget în rate', main: true,
    puncte: ['În rate doar cu buletinul', 'Prin TBI Bank și Card Avantaj', 'Te ajutăm să alegi după buget și utilizare']},
  {id: 'accesorii', titlu: 'Accesorii și configurare', text: 'Tot ce trebuie ca telefonul să fie protejat și să funcționeze din prima zi.', serviciu: 'Altceva',
    puncte: ['Huse, folii, încărcătoare, căști', 'Configurarea telefonului nou', 'Asistență după cumpărare']},
  {id: 'servicii-magazin', titlu: 'Servicii în magazin', text: 'Plățile și serviciile de zi cu zi, rezolvate într-un singur drum.', magazin: true,
    puncte: ['Plata facturilor de utilități', 'Reîncărcare prepay pentru toți operatorii', 'Coletărie']}
];

const RAPIDE = [
  ['Plată facturi', 'Facturile de utilități și alte servicii, plătite la ghișeu.'],
  ['Reîncărcare prepay', 'Cartele și credit pentru toți operatorii de telefonie.'],
  ['Coletărie', 'Trimiți sau ridici colete din magazin.'],
  ['Accesorii pe loc', 'Folii, huse, încărcătoare, cu montaj și configurare.']
];

const FAQ = [
  {q: 'Pot să-mi păstrez numărul dacă schimb operatorul?', a: 'Da. Prin portare îți păstrezi numărul de telefon când treci la alt operator. Te ajutăm cu cererea și cu pașii, iar consultantul îți spune cât durează și ce trebuie să faci cu abonamentul vechi.'},
  {q: 'Ce îmi trebuie pentru un telefon în rate?', a: 'Pentru majoritatea ofertelor, doar buletinul. Aprobarea și condițiile finanțării sunt ale partenerului (TBI Bank sau Card Avantaj); te ajutăm cu cererea direct în magazin.'},
  {q: 'Pot cumpăra un telefon fără abonament?', a: 'Da. Găsești telefoane, tablete și gadgeturi și fără abonament, cu plata integrală sau în rate.'},
  {q: 'Ce facturi pot plăti în magazin?', a: 'Facturile de utilități și alte servicii, prin rețeaua de plăți disponibilă în magazin. Lista furnizorilor acceptați o găsești la ghișeu; dacă nu ești sigur, sună-ne înainte să vii.'}
];

export default async function Telefonie() {
  const c = await siteData();
  return (
    <>
      <section className="p-hero">
        <div className="s-wrap p-hero-in">
          <nav className="p-crumbs" aria-label="Unde ești"><a href="/">Acasă</a><span>›</span>Telefonie</nav>
          <div className="p-hero-text">
            <p className="s-eyebrow">Telefonie · din 2007 în telecom</p>
            <h1>Abonamente, telefoane în rate și plăți, <em>într-un singur loc.</em></h1>
            <p className="p-lead">Îți explicăm clar variantele de abonament, te ajutăm să alegi telefonul potrivit bugetului și rezolvi pe loc plățile de zi cu zi, în magazinul din {c.magazin.oras}.</p>
            <div className="p-chips"><a href="#abonamente">Abonamente</a><a href="#telefoane-in-rate">Telefoane în rate</a><a href="#accesorii">Accesorii</a><a href="#servicii-magazin">Servicii în magazin</a></div>
            <ul className="p-trust">
              <li><span className="h-ico"><Icon d={I.check} size={20}/></span><span><b>Telefoane în rate doar cu buletinul</b>Prin TBI Bank și Card Avantaj.</span></li>
              <li><span className="h-ico"><Icon d={I.clock} size={20}/></span><span><b>Din {c.firma.an} în telecom</b>Cosmote, Telekom, iar acum Vodafone.</span></li>
              <li><span className="h-ico"><Icon d={I.pin} size={20}/></span><span><b>Magazin fizic</b>{c.magazin.adresa}, {c.magazin.oras}.</span></li>
            </ul>
          </div>
          <QuickForm serviciu="telefonie" sursa="formular-telefonie" telefon={c.telefon}
            titlu="Cere o ofertă" intro="Spune-ne ce te interesează. Consultantul îți explică variantele și îți spune ce acte trebuie."
            intrebare="Ce te interesează?" optiuni={['Abonament nou', 'Portare de la alt operator', 'Telefon sau gadget în rate', 'Altceva']}/>
        </div>
      </section>

      <section className="h-sec" aria-labelledby="zone-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Ce găsești la noi</p><h2 id="zone-title" className="h-h2">Universul tău digital, într-un singur loc</h2></div>
            <p className="h-lead">Pentru persoane fizice și companii, cu consultanță și suport pe tot parcursul.</p>
          </div>
          <div className="p-types">
            {ZONE.map(z => (
              <article key={z.id} id={z.id} className={`p-type ${z.main ? 'is-main' : ''}`}>
                <span className="h-ico"><Icon d={z.magazin ? I.pin : icon('telefonie')} size={22}/></span>
                <h3>{z.titlu}</h3>
                <p>{z.text}</p>
                <ul className="t-list">{z.puncte.map(p => <li key={p}><Icon d={I.check} size={16}/>{p}</li>)}</ul>
                <div className="p-type-cta">
                  {z.magazin
                    ? <a className="s-btn h-btn-ghost" href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii">Indicații spre magazin</a>
                    : <LeadButton serviciu="telefonie" detaliu={z.serviciu} sursa="card-telefonie" className={`s-btn ${z.main ? 's-btn-primary' : 'h-btn-ghost'}`}>{z.main ? 'Vreau un telefon în rate' : 'Cere ofertă'}</LeadButton>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-metoda" aria-labelledby="rate-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Telefon nou în rate</p><h2 id="rate-title" className="h-h2">Doar cu buletinul, în trei pași</h2></div>
            <p className="h-lead">Finanțarea o acordă partenerii noștri, TBI Bank și Card Avantaj, în condițiile fiecăruia. Noi te ajutăm cu tot restul.</p>
          </div>
          <div className="h-steps t-steps">
            <div className="h-step"><span className="h-step-n">01</span><h3>Alegi telefonul</h3><p>În magazin sau ne spui de acasă ce model și ce buget ai, iar noi îți propunem variante.</p></div>
            <div className="h-step"><span className="h-step-n">02</span><h3>Aplici pentru rate</h3><p>Cu buletinul, direct în magazin. Îți explicăm condițiile partenerului înainte să semnezi.</p></div>
            <div className="h-step"><span className="h-step-n">03</span><h3>Pleci configurat</h3><p>Îți configurăm telefonul nou și îți recomandăm accesoriile potrivite.</p></div>
          </div>
          <div className="h-metoda-cta">
            <p>Vrei să afli dinainte ce variante ai? <b>Lasă-ne modelul dorit și te sunăm.</b></p>
            <LeadButton serviciu="telefonie" detaliu="Telefon sau gadget în rate" sursa="rate-telefonie">Vreau un telefon în rate</LeadButton>
          </div>
        </div>
      </section>

      <section className="h-sec h-dark" aria-labelledby="rapide-title">
        <div className="s-wrap t-store">
          <div>
            <p className="s-eyebrow">În magazin, pe loc</p>
            <h2 id="rapide-title" className="h-h2">Plățile de zi cu zi, rezolvate într-un singur drum</h2>
            <div className="t-rapide">
              {RAPIDE.map(([t, p]) => <div key={t}><Icon d={I.check} size={20}/><h3>{t}</h3><p>{p}</p></div>)}
            </div>
          </div>
          <div className="t-store-card">
            <img src="/brand/fatada-buftea.jpg" alt="Magazinul CEMADO din Buftea" loading="lazy" width="1492" height="1150"/>
            <div>
              <h3>{c.magazin.nume}</h3>
              <p>{c.magazin.adresa}, {c.magazin.oras}, {c.magazin.judet}</p>
              {c.magazin.program && <p><Icon d={I.clock} size={16}/> {c.magazin.program}</p>}
              <div className="h-store-cta">
                <a className="s-btn s-btn-primary" href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii">Indicații rutiere</a>
                <a className="s-btn s-btn-outline-light" href={c.telefon.href} data-ev="click_telefon"><Icon d={I.phone} size={18}/>{c.telefon.afisat}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-sec" aria-label="Alte servicii">
        <div className="s-wrap p-cross">
          <div>
            <div><h3>Preferi să cumperi online?</h3><p>Telefoane, accesorii, gadgeturi și electrocasnice pe magtel.ro, magazinul nostru online.</p></div>
            <a className="s-btn s-btn-dark" href="https://www.magtel.ro/" target="_blank" rel="noopener" data-ev="click_magtel">Mergi pe magtel.ro ↗</a>
          </div>
          <div>
            <div><h3>Ai nevoie de mai multe linii?</h3><p>Abonamente business pentru echipă, plus asigurări și energie pentru firmă.</p></div>
            <a className="s-btn s-btn-dark" href="/firme/">Soluții pentru firme</a>
          </div>
        </div>
      </section>

      <section className="h-sec h-faq" aria-labelledby="faq-title">
        <div className="s-wrap h-faq-in">
          <div>
            <p className="s-eyebrow">Întrebări frecvente</p>
            <h2 id="faq-title" className="h-h2">Despre telefonie</h2>
            <p className="h-lead">Altă întrebare? Sună-ne la <a href={c.telefon.href}>{c.telefon.afisat}</a> sau scrie-ne pe <a href={c.whatsapp} target="_blank" rel="noopener">WhatsApp</a>.</p>
          </div>
          <div className="h-faq-list">
            {FAQ.map(f => <details key={f.q}><summary>{f.q}<Icon d={I.chevron} size={20}/></summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}
