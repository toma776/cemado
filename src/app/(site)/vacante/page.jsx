// Vacanțe. Parcurs: hero + formularul de vacanță (tip, destinație, când, cât, câte persoane, buget) →
// tipurile de vacanță (ancorele din mega-meniu) → ce include un pachet → cum lucrăm → cross-sell asigurare de călătorie → FAQ.
// Conformitate: ofertele vin prin Destine Holidays, CEMADO e promoter de turism. Fără prețuri sau destinații inventate.
import {siteData} from '../../../site/brain.mjs';
import {icon} from '../../../site/menu.mjs';
import {PE_LINII} from '../../../site/home/metoda.mjs';
import Icon, {I} from '../../../site/ui/Icon.jsx';
import LeadButton from '../../../site/ui/LeadButton.jsx';
import VacanteForm from '../../../site/vacante/VacanteForm.jsx';
import '../../../site/home/home.css';
import '../../../site/service.css';
import '../../../site/vacante/vacante.css';

export const metadata = {title: 'Vacanțe: sejururi, circuite, city break, last minute · CEMADO Buftea', description: 'Spune-ne cum arată vacanța ta ideală și primești variante personalizate prin Destine Holidays: litoral, circuite, city break, early booking și last minute, cu asistență până la întoarcere.', robots: {index: false, follow: false}};

const TIPURI = [
  {id: 'sejururi', titlu: 'Litoral și sejururi', text: 'Vacanțe la mare sau la munte, cu cazarea și transportul alese după preferințele tale.', detaliu: 'Litoral / sejur'},
  {id: 'circuite', titlu: 'Circuite', text: 'Circuite culturale, cu mai multe orașe într-o singură călătorie, organizate cap-coadă.', detaliu: 'Circuit'},
  {id: 'city-break', titlu: 'City break', text: 'Escapade scurte, de câteva zile, pentru o pauză rapidă într-un oraș nou.', detaliu: 'City break'},
  {id: 'exotic', titlu: 'Destinații exotice', text: 'Vacanțe departe de casă, cu tot ce trebuie pregătit dinainte.', detaliu: 'Exotic'}
];

const INCLUS = [
  ['Transport', 'Zbor, autocar sau variante pentru cine pleacă cu mașina.'],
  ['Cazare', 'Hotelul potrivit bugetului și stilului de vacanță.'],
  ['Transferuri', 'De la aeroport la hotel și înapoi, combinate în aceeași ofertă.'],
  ['Documente', 'Ne ocupăm de rezervări și de documentele de călătorie.']
];

const FAQ = [
  {q: 'Cine organizează vacanța?', a: 'Ofertele sunt prin Destine Holidays, iar fiecare pachet are un organizator (tour-operator). Consultantul CEMADO îți spune cine e organizatorul, ce include oferta și ce condiții are contractul, înainte să rezervi.'},
  {q: 'Cum aflu de ofertele early booking și last minute?', a: 'Spune-ne în formular perioada și bugetul, iar consultantul îți trimite variantele disponibile atunci, inclusiv ofertele speciale comparate.'},
  {q: 'Ce acte îmi trebuie?', a: 'Depinde de destinație: pentru multe țări din Europa ajunge cartea de identitate, pentru altele ai nevoie de pașaport sau viză. Îți spunem exact ce îți trebuie odată cu oferta.'},
  {q: 'Mă ajutați dacă apare o problemă în vacanță?', a: 'Te sprijinim de la prima discuție până la întoarcerea acasă. Îți recomandăm și o asigurare de călătorie, ca să fii protejat medical și la anulare.'}
];

export default async function Vacante() {
  const c = await siteData();
  const pasi = PE_LINII.find(l => l.key === 'vacante').pasi;
  return (
    <>
      <section className="p-hero">
        <div className="s-wrap p-hero-in">
          <nav className="p-crumbs" aria-label="Unde ești"><a href="/">Acasă</a><span>›</span>Vacanțe</nav>
          <div className="p-hero-text">
            <p className="s-eyebrow">Vacanțe · prin Destine Holidays</p>
            <h1>Vacanțe memorabile, <em>planificate fără niciun stres.</em></h1>
            <p className="p-lead">Spune-ne cum arată vacanța ta ideală, iar noi ne ocupăm de restul. Căutăm destinația potrivită, comparăm ofertele partenerilor și îți propunem un pachet pe bugetul tău.</p>
            <div className="p-chips"><a href="#sejururi">Litoral</a><a href="#circuite">Circuite</a><a href="#city-break">City break</a><a href="#oferte">Early booking și last minute</a></div>
            <ul className="p-trust">
              <li><span className="h-ico"><Icon d={I.check} size={20}/></span><span><b>Pachete personalizate</b>Transport, cazare și transferuri, într-o singură ofertă.</span></li>
              <li><span className="h-ico"><Icon d={I.check} size={20}/></span><span><b>Oferte comparate</b>Early booking, last minute și promoții sezoniere.</span></li>
              <li><span className="h-ico"><Icon d={I.phone} size={20}/></span><span><b>Asistență completă</b>De la prima discuție până te întorci acasă.</span></li>
            </ul>
          </div>
          <VacanteForm telefon={c.telefon}/>
        </div>
      </section>

      <section className="h-sec" aria-labelledby="tipuri-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Destinații de vis</p><h2 id="tipuri-title" className="h-h2">Ce fel de vacanță îți dorești?</h2></div>
            <p className="h-lead">Alese exact după preferințele tale: de la o săptămână la mare la un circuit prin Europa.</p>
          </div>
          <div className="p-types">
            {TIPURI.map(t => (
              <article key={t.id} id={t.id} className="p-type">
                <span className="h-ico"><Icon d={icon('vacante')} size={22}/></span>
                <h3>{t.titlu}</h3>
                <p>{t.text}</p>
                <div className="p-type-cta"><LeadButton serviciu="vacante" detaliu={t.detaliu} sursa="card-vacanta" className="s-btn h-btn-ghost">Cere variante</LeadButton></div>
              </article>
            ))}
          </div>
          <div className="h-b2b" id="oferte">
            <div>
              <p className="s-eyebrow">Oferte speciale</p>
              <h3>Early booking, last minute și promoții sezoniere</h3>
              <p>Le analizăm și le comparăm pentru tine, ca să prinzi cel mai bun moment pentru rezervare.</p>
            </div>
            <div className="h-b2b-cta"><LeadButton serviciu="vacante" sursa="oferte-speciale" className="s-btn s-btn-dark">Vreau ofertele momentului</LeadButton></div>
          </div>
        </div>
      </section>

      <section className="h-sec h-dark" aria-labelledby="inclus-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Pachete personalizate</p><h2 id="inclus-title" className="h-h2">Totul organizat, tu te ocupi doar de bagaje</h2></div>
            <p className="h-lead">Combinăm inteligent transportul, cazarea și transferurile într-o ofertă creată pentru tine.</p>
          </div>
          <div className="v-inclus">
            {INCLUS.map(([t, p], i) => <div key={t}><span className="e-ben-n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="h-sec h-metoda" aria-labelledby="cum-title">
        <div className="s-wrap">
          <div className="h-head"><div><p className="s-eyebrow">Cum lucrăm</p><h2 id="cum-title" className="h-h2">De la idee la vacanță, în patru pași</h2></div></div>
          <div className="h-steps">
            {['Ne spui ce îți dorești', 'Primești variantele', 'Rezervăm pentru tine', 'Pleci liniștit'].map((t, i) => (
              <div key={t} className="h-step"><span className="h-step-n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{pasi[i]}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec" aria-label="Alte servicii">
        <div className="s-wrap p-cross">
          <div>
            <div><h3>Asigurare de călătorie</h3><p>Medicală și storno, de la același consultant, ca să pleci protejat.</p></div>
            <LeadButton serviciu="asigurari" detaliu="Călătorie" sursa="cross-vacante" className="s-btn s-btn-dark">Ofertă asigurare</LeadButton>
          </div>
          <div>
            <div><h3>Pleci cu mașina?</h3><p>Verifică dacă RCA-ul e valabil pe toată durata vacanței.</p></div>
            <a className="s-btn s-btn-dark" href="/asigurari/rca/">Ofertă RCA</a>
          </div>
        </div>
      </section>

      <section className="h-sec h-faq" aria-labelledby="faq-title">
        <div className="s-wrap h-faq-in">
          <div>
            <p className="s-eyebrow">Întrebări frecvente</p>
            <h2 id="faq-title" className="h-h2">Despre vacanțe</h2>
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
