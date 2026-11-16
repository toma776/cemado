// Pagina „Pentru firme”. Parcursul unui decident B2B:
// 1. Hero + formularul B2B, vizibil imediat (dovezi B2B: divizia din 2016, partener direct 2017, franciza 2026)
// 2. Cele 4 zone pentru firme, cu aceeași structură de card ca pe homepage
// 3. De ce un singur partener · 4. Cum lucrăm cu firmele (4 pași) · 5. Pentru cine · 6. FAQ · CTA final
// Tonul e „dumneavoastră” (principiile de voce din /manage/branding/voce).
import {siteData, homeData} from '../../../site/brain.mjs';
import {icon} from '../../../site/menu.mjs';
import Icon, {I} from '../../../site/ui/Icon.jsx';
import B2BForm from '../../../site/firme/B2BForm.jsx';
import '../../../site/home/home.css';
import '../../../site/firme/firme.css';

export const metadata = {title: 'Pentru firme · CEMADO', description: 'Telefonie business, asigurări pentru firmă și flotă, sisteme fotovoltaice comerciale și agricole. Un singur partener pentru firma dumneavoastră.', robots: {index: false, follow: false}};

const ZONE = [
  {icon: 'telefonie', titlu: 'Telefonie și internet business', text: 'Abonamente Vodafone pentru firme, internet și telefoane pentru echipă, cu o singură ofertă pentru toate liniile.',
    puncte: ['Abonamente pentru mai mulți angajați', 'Portarea numerelor existente', 'Telefoane și accesorii pentru echipă']},
  {icon: 'asigurari', titlu: 'Asigurări pentru firmă', text: 'Prin Destine Broker, comparăm oferte de la mai mulți asigurători pentru riscurile afacerii.',
    puncte: ['Sediu, bunuri și echipamente', 'Marfă', 'Asigurări profesionale']},
  {icon: 'firme', titlu: 'Flotă auto', text: 'RCA și CASCO pentru toate mașinile firmei, comparate și gestionate într-un singur loc.',
    puncte: ['RCA și CASCO pentru persoane juridice', 'O singură discuție pentru toată flota', 'Credite și leasing, prin Destine']},
  {icon: 'energie', titlu: 'Energie solară pentru firme și ferme', text: 'Sisteme fotovoltaice comerciale și agricole, de la 10 kW la sute de kW, cu proiectare și mentenanță.',
    puncte: ['Hale, magazine, birouri', 'Ferme: pompe, irigații, grajduri', 'Leasing Grenke, rate TBI, finanțări AFIR']}
];

const PASI = [
  {t: 'Discutăm ce aveți acum', p: 'Abonamente, polițe, consum de energie: ne spuneți ce contracte are firma și ce vă deranjează la ele.'},
  {t: 'Comparăm variantele', p: 'Pregătim variante de la mai mulți furnizori, pentru fiecare serviciu bifat, cu costurile la vedere.'},
  {t: 'O singură ofertă', p: 'Primiți propunerea pe toate serviciile deodată și decideți ce păstrați și ce schimbați.'},
  {t: 'Implementare și suport', p: 'Ne ocupăm de portări, emiterea polițelor sau montaj și rămânem interlocutorul dumneavoastră.'}
];

const SEGMENTE = [
  ['IMM-uri și birouri', 'Telefonie pentru echipă, asigurarea sediului, energie pentru reducerea costurilor.'],
  ['Ferme și afaceri agricole', 'Fotovoltaice pentru pompe și irigații, finanțări AFIR, asigurări pentru bunuri.'],
  ['Comerț și service-uri locale', 'Abonamente, asigurări de bunuri și marfă, panouri pentru magazin sau atelier.'],
  ['Firme cu mașini de serviciu', 'RCA și CASCO pentru toată flota, plus telefoane pentru șoferi și agenți.']
];

const FAQ = [
  {q: 'Putem cere ofertă doar pentru un singur serviciu?', a: 'Da. Bifați doar ce vă interesează. Dacă mai târziu aveți nevoie și de altceva, discutați cu același consultant.'},
  {q: 'Ce informații ne trebuie pentru ofertă?', a: 'Pentru început, numele firmei și serviciile care vă interesează. Detaliile (numărul de linii, mașinile din flotă, facturile la energie) le stabilim împreună la telefon.'},
  {q: 'Se poate plăti în rate sau leasing?', a: 'Pentru anumite produse, da: sistemele fotovoltaice prin leasing Grenke sau rate TBI, în condițiile fiecărui partener. Pentru fermieri există și finanțări AFIR. Vă spunem la ofertă ce variante se aplică firmei dumneavoastră.'},
  {q: 'Lucrați și cu firme mici?', a: 'Da. Oferta se adaptează mărimii firmei și numărului de servicii, de la câteva linii de telefon până la un sistem fotovoltaic de sute de kW.'}
];

export default async function Firme() {
  const [c, h] = [await siteData(), await homeData()];
  const b2b = h.istoric.filter(e => /B2B|Partener direct|Franciză/i.test(e.titlu));
  return (
    <>
      {/* 1 · Hero + formular */}
      <section className="f-hero">
        <div className="s-wrap f-hero-in">
          <div className="f-hero-text">
            <p className="s-eyebrow">Pentru firme</p>
            <h1>Un singur partener pentru telefonia, asigurările și energia firmei dumneavoastră.</h1>
            <p className="f-hero-lead">În loc să discutați cu patru furnizori, discutați cu un singur consultant CEMADO. Comparăm variantele, vă facem o singură ofertă și rămânem interlocutorul firmei.</p>
            <ul className="f-proof">
              {b2b.map(e => <li key={e.titlu}><b>{e.an}</b><span>{e.titlu}</span></li>)}
            </ul>
            <a className="f-call" href={c.telefon.href} data-ev="click_telefon"><span className="h-ico"><Icon d={I.phone} size={20}/></span><span><small>Preferați să vorbim direct?</small>{c.telefon.afisat}</span></a>
          </div>
          <B2BForm telefon={c.telefon}/>
        </div>
      </section>

      {/* 2 · Zone */}
      <section className="h-sec" aria-labelledby="zone-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Ce preluăm</p><h2 id="zone-title" className="h-h2">Patru zone de costuri, un singur interlocutor</h2></div>
            <p className="h-lead">Alegeți una sau toate. Fiecare serviciu se poate prelua separat, dar câștigul real apare când le gestionăm împreună.</p>
          </div>
          <div className="h-cards">
            {ZONE.map(z => (
              <article key={z.titlu} className="h-card">
                <span className="h-ico h-ico-lg"><Icon d={icon(z.icon)} size={26}/></span>
                <h3>{z.titlu}</h3>
                <p>{z.text}</p>
                <ul>{z.puncte.map(p => <li key={p}><span className="f-li"><Icon d={I.check} size={16}/>{p}</span></li>)}</ul>
                <div className="h-card-cta"><a className="s-btn s-btn-primary" href="#oferta-firma">Cereți ofertă</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · De ce un singur partener */}
      <section className="h-sec h-dark" aria-labelledby="dece-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">De ce un singur partener</p><h2 id="dece-title" className="h-h2">Mai puține contracte de urmărit, mai mult timp pentru afacere</h2></div>
            <p className="h-lead">Lucrăm cu persoane juridice din {b2b[0]?.an?.split('–')[0] ?? '2016'}, când am deschis divizia de vânzări directe B2B.</p>
          </div>
          <div className="h-values f-values">
            <div><Icon d={I.phone} size={22}/><h3>Un singur interlocutor</h3><p>Același consultant pentru telefonie, asigurări și energie. Nu mai explicați de la zero fiecărui furnizor.</p></div>
            <div><Icon d={I.check} size={22}/><h3>Variante comparate</h3><p>Pentru fiecare serviciu vedeți mai multe oferte, cu prețuri și condiții clare, fără costuri ascunse.</p></div>
            <div><Icon d={icon('asigurari')} size={22}/><h3>Finanțare inclusă</h3><p>Rate și leasing prin partenerii noștri, ca investiția să nu blocheze bugetul firmei.</p></div>
            <div><Icon d={I.pin} size={22}/><h3>Aproape de dumneavoastră</h3><p>Ne găsiți în {c.magazin.oras}, {c.magazin.judet}: o adresă reală, unde puteți veni să discutăm față în față.</p></div>
          </div>
        </div>
      </section>

      {/* 4 · Cum lucrăm */}
      <section className="h-sec h-metoda" aria-labelledby="pasi-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Cum lucrăm cu firmele</p><h2 id="pasi-title" className="h-h2">De la discuție la contracte noi, în patru pași</h2></div>
          </div>
          <div className="h-steps">
            {PASI.map((p, i) => (
              <div key={p.t} className="h-step"><span className="h-step-n">{String(i + 1).padStart(2, '0')}</span><h3>{p.t}</h3><p>{p.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Pentru cine */}
      <section className="h-sec" aria-labelledby="cine-title">
        <div className="s-wrap">
          <div className="h-head"><div><p className="s-eyebrow">Pentru cine</p><h2 id="cine-title" className="h-h2">Lucrăm cu afaceri de toate mărimile</h2></div></div>
          <div className="f-segments">
            {SEGMENTE.map(([t, p]) => <div key={t}><h3>{t}</h3><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      {/* 6 · FAQ + CTA */}
      <section className="h-sec h-faq" aria-labelledby="faq-title">
        <div className="s-wrap h-faq-in">
          <div>
            <p className="s-eyebrow">Întrebări frecvente</p>
            <h2 id="faq-title" className="h-h2">Bine de știut pentru firme</h2>
            <p className="h-lead">Altă întrebare? Sunați-ne la <a href={c.telefon.href}>{c.telefon.afisat}</a>.</p>
            <a className="s-btn s-btn-primary" href="#oferta-firma" style={{marginTop: 24}}>Cereți oferta pentru firmă</a>
          </div>
          <div className="h-faq-list">
            {FAQ.map(f => <details key={f.q}><summary>{f.q}<Icon d={I.chevron} size={20}/></summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}
