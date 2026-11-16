// Energie solară. E o investiție mare, cu decizie lentă: vizitatorul vrea întâi să afle „ce sistem mi-ar trebui?”.
// Parcurs: hero + calculator orientativ (lead din rezultat) → casă / fermă / firmă → beneficii → finanțare →
// cum lucrăm (cine face ce) → de ce CEMADO → FAQ. Fără prețuri, economii în lei sau amortizare (nu avem date reale).
import {siteData} from '../../../site/brain.mjs';
import {PE_LINII} from '../../../site/home/metoda.mjs';
import Icon, {I} from '../../../site/ui/Icon.jsx';
import LeadButton from '../../../site/ui/LeadButton.jsx';
import Calculator from '../../../site/energie/Calculator.jsx';
import '../../../site/home/home.css';
import '../../../site/service.css';
import '../../../site/energie/energie.css';

export const metadata = {title: 'Panouri fotovoltaice pentru casă, fermă și firmă · CEMADO Buftea', description: 'Sisteme fotovoltaice la cheie pentru case, ferme și firme, cu sprijin la finanțare (Casa Verde, AFIR, rate, leasing). Calculează orientativ ce sistem ți se potrivește.', robots: {index: false, follow: false}};

const SEG = [
  {id: 'casa', img: '/media/eg-rezidential.jpg', eticheta: 'Sistem rezidențial', titlu: 'Pentru casa ta', serviciu: 'Casă', cta: 'Ofertă pentru casă',
    puncte: ['Panouri fotovoltaice de înaltă eficiență', 'Invertor performant', 'Monitorizare prin aplicație', 'Opțional: baterii de stocare'],
    tag: 'Confort, economie și siguranță pentru familia ta.'},
  {id: 'ferma', img: '/media/eg-agricol.jpg', eticheta: 'Sistem agricol', titlu: 'Pentru ferme și gospodării', serviciu: 'Fermă / gospodărie', cta: 'Ofertă pentru fermă',
    puncte: ['Reduce costurile de producție', 'Alimentează pompe, irigații, grajduri', 'Soluții adaptate consumului tău', 'Posibilitate de sisteme hibride, cu baterii'],
    tag: 'Mai multă producție, costuri mai mici.'},
  {id: 'firma', img: '/media/eg-comercial.jpg', eticheta: 'Sistem comercial', titlu: 'Pentru afacerea ta locală', serviciu: 'Firmă', cta: 'Ofertă pentru firmă',
    puncte: ['Soluții scalabile, de la 10 kW la sute de kW', 'Reduce semnificativ costurile operaționale', 'Consultanță și proiectare dedicată', 'Suport tehnic și mentenanță'],
    tag: 'Energie pentru dezvoltarea comunității tale.'}
];

const BENEFICII = [
  ['Facturi mai mici', 'Energia produsă pe acoperiș o consumi direct, în loc să o cumperi din rețea.'],
  ['Independență energetică', 'Mai puțină dependență de prețul energiei, pentru familia sau afacerea ta.'],
  ['Energie curată', 'O sursă regenerabilă, pentru un mediu mai sănătos.'],
  ['Valoarea proprietății crește', 'O casă cu sistem fotovoltaic e mai atractivă și mai valoroasă.']
];

const FINANTARE = [
  ['Casa Verde Fotovoltaice', 'Persoane fizice', 'Verificăm dacă te încadrezi și te ajutăm cu dosarul, când programul are sesiune deschisă.'],
  ['Finanțări AFIR', 'Fermieri și afaceri din mediul rural', 'Consultanță pentru accesarea fondurilor pentru proiecte agricole.'],
  ['Rate prin TBI Bank', 'Persoane fizice', 'Plata sistemului în rate, în condițiile TBI Bank.'],
  ['Leasing Grenke', 'Firme', 'Leasing pentru sisteme comerciale și agricole, în condițiile Grenke.'],
  ['Integral', 'Toți', 'Ofertă la cheie, de la proiectare la punerea în funcțiune.']
];

const DE_CE = ['Soluții complete, de la proiectare la punerea în funcțiune', 'Echipamente de la producători recunoscuți', 'Oferte personalizate pentru fiecare client',
  'Sprijin în accesarea programelor de finanțare (Casa Verde, AFIR)', 'Montaj profesionist, suport tehnic și mentenanță', 'Partener de încredere, aproape de tine'];

const FAQ = [
  {q: 'Ce înseamnă să fii prosumator?', a: 'Prosumatorul produce și consumă energie. Ce produci și nu consumi pe loc ajunge în rețea, iar furnizorul ți-o compensează în factură, după regulile în vigoare. Te ajutăm cu pașii de racordare și cu actele.'},
  {q: 'Am nevoie de baterii?', a: 'Nu neapărat. Bateriile te ajută să folosești seara energia produsă ziua sau să ai curent la o pană. Le recomandăm în funcție de consum și de cât de des ești acasă ziua; pentru ferme pot fi utile la pompe și irigații.'},
  {q: 'Cine face montajul?', a: 'Proiectarea, montajul și punerea în funcțiune le fac partenerii noștri autorizați din domeniul energetic. CEMADO te consiliază, coordonează proiectul și rămâne interlocutorul tău.'},
  {q: 'Cât de precis e calculatorul?', a: 'E o estimare orientativă, pornind de la consumul tău și de la producția medie în zona Ilfov. Oferta exactă ține cont de acoperiș (orientare, înclinare, umbrire), de consumul real din facturi și de echipamentele alese.'}
];

export default async function Energie() {
  const c = await siteData();
  const pasi = PE_LINII.find(l => l.key === 'energie').pasi;
  return (
    <>
      <section className="p-hero">
        <div className="s-wrap p-hero-in">
          <nav className="p-crumbs" aria-label="Unde ești"><a href="/">Acasă</a><span>›</span>Energie solară</nav>
          <div className="p-hero-text">
            <p className="s-eyebrow">Sisteme fotovoltaice · casă, fermă, firmă</p>
            <h1>Energia soarelui, pentru facturi mai mici <em>și un viitor mai bun.</em></h1>
            <p className="p-lead">Soluții fotovoltaice complete pentru case, ferme și afaceri, în special din mediul rural. De la analiza consumului până la finanțare și montaj, suntem alături de tine la fiecare pas.</p>
            <div className="p-chips"><a href="#casa">Casă</a><a href="#ferma">Fermă</a><a href="#firma">Firmă</a><a href="#finantare">Finanțare</a></div>
            <ul className="p-trust">
              <li><span className="h-ico"><Icon d={I.check} size={20}/></span><span><b>La cheie</b>De la proiectare la punerea în funcțiune.</span></li>
              <li><span className="h-ico"><Icon d={I.check} size={20}/></span><span><b>Sprijin la finanțare</b>Casa Verde, AFIR, rate TBI, leasing Grenke.</span></li>
              <li><span className="h-ico"><Icon d={I.pin} size={20}/></span><span><b>Aproape de tine</b>Te așteptăm în {c.magazin.oras} să discutăm proiectul.</span></li>
            </ul>
          </div>
          <Calculator telefon={c.telefon}/>
        </div>
      </section>

      <section className="h-sec" aria-labelledby="seg-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Soluții pentru nevoile tale</p><h2 id="seg-title" className="h-h2">Indiferent de mărimea proiectului, avem soluția potrivită</h2></div>
          </div>
          <div className="e-segs">
            {SEG.map(s => (
              <article key={s.id} id={s.id} className="e-segment">
                <img src={s.img} alt="" loading="lazy" width="1200" height="750"/>
                <div>
                  <small>{s.eticheta}</small>
                  <h3>{s.titlu}</h3>
                  <ul>{s.puncte.map(p => <li key={p}><Icon d={I.check} size={16}/>{p}</li>)}</ul>
                  <p className="e-tag">{s.tag}</p>
                  <LeadButton serviciu="energie" detaliu={s.serviciu} sursa="segment-energie" className="s-btn h-btn-ghost">{s.cta}</LeadButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-dark" aria-labelledby="ben-title">
        <div className="s-wrap">
          <div className="h-head"><div><p className="s-eyebrow">Beneficii</p><h2 id="ben-title" className="h-h2">Din energia soarelui, creștem comunități</h2></div></div>
          <div className="h-values f-values">
            {BENEFICII.map(([t, p]) => <div key={t}><Icon d={I.check} size={22}/><h3>{t}</h3><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="h-sec" id="finantare" aria-labelledby="fin-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Finanțare</p><h2 id="fin-title" className="h-h2">Cum poți plăti</h2></div>
            <p className="h-lead">Investiția nu trebuie plătită dintr-odată. Îți arătăm variantele pentru care te încadrezi.</p>
          </div>
          <div className="e-fin-wrap">
            <table className="e-fin">
              <thead><tr><th>Variantă</th><th>Pentru cine</th><th>Ce face CEMADO</th></tr></thead>
              <tbody>{FINANTARE.map(([a, b, d]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{d}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="e-fin-note">Programele de stat au sesiuni și condiții care se schimbă. Îți spunem la ofertă ce e disponibil în acel moment.</p>
        </div>
      </section>

      <section className="h-sec h-metoda" aria-labelledby="cum-title">
        <div className="s-wrap">
          <div className="h-head"><div><p className="s-eyebrow">Cum lucrăm</p><h2 id="cum-title" className="h-h2">De la factură la panouri pe acoperiș</h2></div></div>
          <div className="h-steps">
            {['Analiza consumului', 'Sistemul potrivit', 'Finanțarea', 'Montaj și suport'].map((t, i) => (
              <div key={t} className="h-step"><span className="h-step-n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{pasi[i]}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec" aria-labelledby="dece-title">
        <div className="s-wrap h-store-in">
          <div>
            <p className="s-eyebrow">De ce CEMADO</p>
            <h2 id="dece-title" className="h-h2">Investim în comunități durabile</h2>
            <p className="h-lead" style={{margin: '18px 0 28px'}}>Lucrăm cu parteneri autorizați din domeniul energetic, iar tu ai un singur interlocutor de la prima discuție până după montaj.</p>
            <ul className="h-store-list">{DE_CE.map(d => <li key={d}><Icon d={I.check} size={18}/>{d}</li>)}</ul>
          </div>
          <div className="h-store-card">
            <img src="/media/pliant-cemado-energie-verde-1.jpg" alt="Pliantul CEMADO pentru energie verde" loading="lazy" style={{borderRadius: 14, width: '100%'}}/>
            <a className="s-btn h-btn-ghost" href="/media/pliant-cemado-energie-verde-1.jpg" target="_blank" rel="noopener">Deschide pliantul</a>
          </div>
        </div>
      </section>

      <section className="h-sec h-faq" aria-labelledby="faq-title">
        <div className="s-wrap h-faq-in">
          <div>
            <p className="s-eyebrow">Întrebări frecvente</p>
            <h2 id="faq-title" className="h-h2">Despre energia solară</h2>
            <p className="h-lead">Altă întrebare? Sună-ne la <a href={c.telefon.href}>{c.telefon.afisat}</a>.</p>
            <a className="s-btn s-btn-primary" href="#calculator" style={{marginTop: 24}}>Calculează ce sistem îți trebuie</a>
          </div>
          <div className="h-faq-list">
            {FAQ.map(f => <details key={f.q}><summary>{f.q}<Icon d={I.chevron} size={20}/></summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}
