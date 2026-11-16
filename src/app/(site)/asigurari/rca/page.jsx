// Asigurare RCA: pagina de produs cu cea mai mare frecvență (și destinația campaniilor Google Ads pe „rca buftea”).
// Parcurs: hero + formular RCA (datele pentru o ofertă reală) → ce îți trebuie → cum funcționează → ce trebuie să știi
// despre RCA + FAQ (conținut util, fără prețuri fixe) → cross-sell CASCO / locuință.
import {siteData} from '../../../../site/brain.mjs';
import Icon, {I} from '../../../../site/ui/Icon.jsx';
import LeadButton from '../../../../site/ui/LeadButton.jsx';
import RCAForm from '../../../../site/asigurari/RCAForm.jsx';
import '../../../../site/home/home.css';
import '../../../../site/service.css';

export const metadata = {title: 'Asigurare RCA Buftea · compari oferte de la mai mulți asigurători · CEMADO', description: 'Trimite datele mașinii și primești variantele RCA de la mai mulți asigurători, pe WhatsApp sau la telefon. Persoane fizice și firme, cu sau fără decontare directă.', robots: {index: false, follow: false}};

const DOC = 'M6 3h9l3 3v15H6zM14 3v4h4M9 12h6M9 16h4';
const ID = 'M3 6h18v12H3zM8.5 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5.5 16a3 3 0 0 1 6 0M14 10h4M14 14h3';

const FAQ = [
  {q: 'Pot face RCA pentru o mașină înmatriculată pe firmă?', a: 'Da. Alege „Firmă” în formular; pentru emitere avem nevoie de datele firmei (CUI) în loc de cele ale persoanei fizice.'},
  {q: 'Ce este decontarea directă și merită?', a: 'Cu decontare directă, dacă nu ești vinovat de accident, repari mașina prin propriul asigurător, nu prin cel al șoferului vinovat. Costă în plus față de RCA-ul simplu; îți arătăm ambele variante ca să decizi.'},
  {q: 'Ce se întâmplă dacă am avut daune?', a: 'Istoricul de daune influențează clasa bonus-malus și deci prețul. Spune-ne în formular sau la telefon, ca oferta să fie corectă de la început.'},
  {q: 'Când ar trebui să fac RCA-ul nou?', a: 'Înainte să expire cel actual: o mașină înmatriculată trebuie să aibă RCA valabil tot timpul. Dacă bifezi reminder-ul în formular, te anunțăm din timp data viitoare.'}
];

export default async function RCA() {
  const c = await siteData();
  return (
    <>
      <section className="p-hero">
        <div className="s-wrap p-hero-in">
          <nav className="p-crumbs" aria-label="Unde ești"><a href="/">Acasă</a><span>›</span><a href="/asigurari/">Asigurări</a><span>›</span>RCA</nav>
          <div className="p-hero-text">
            <p className="s-eyebrow">Asigurare RCA · Buftea și online</p>
            <h1>RCA comparat de la mai mulți asigurători, <em>cu ofertele pe WhatsApp.</em></h1>
            <p className="p-lead">Ne trimiți datele mașinii, iar noi îți trimitem variantele, explicate clar. Alegi tu, emitem polița și te anunțăm înainte de următoarea expirare, dacă vrei.</p>
            <div className="p-chips"><span>Cu sau fără decontare directă</span><span>6 sau 12 luni</span><span>Persoane fizice și firme</span></div>
            <ul className="p-trust">
              <li><span className="h-ico"><Icon d={I.whatsapp} size={20}/></span><span><b>Ofertele pe WhatsApp</b>Sau la telefon, cum preferi.</span></li>
              <li><span className="h-ico"><Icon d={I.check} size={20}/></span><span><b>Fără talon acum</b>Îl cerem doar când emitem polița.</span></li>
              <li><span className="h-ico"><Icon d={I.pin} size={20}/></span><span><b>Sau vino în magazin</b>{c.magazin.adresa}, {c.magazin.oras}.</span></li>
            </ul>
          </div>
          <RCAForm telefon={c.telefon}/>
        </div>
      </section>

      <section className="h-sec" aria-labelledby="acte-title">
        <div className="s-wrap">
          <div className="h-head"><div><p className="s-eyebrow">Pregătește</p><h2 id="acte-title" className="h-h2">Ce îți trebuie pentru emitere</h2></div><p className="h-lead">Pentru ofertă ajung câteva date. Documentele de mai jos le cerem doar când alegi varianta.</p></div>
          <div className="p-docs">
            <div><span className="h-ico"><Icon d={DOC} size={22}/></span><div><h3>Talonul mașinii</h3><p>Sau seria de șasiu și numărul de înmatriculare.</p></div></div>
            <div><span className="h-ico"><Icon d={ID} size={22}/></span><div><h3>Act de identitate</h3><p>Cartea de identitate a proprietarului sau datele firmei (CUI).</p></div></div>
            <div><span className="h-ico"><Icon d={I.check} size={22}/></span><div><h3>RCA-ul anterior</h3><p>Opțional, ca să știm clasa bonus-malus.</p></div></div>
          </div>
        </div>
      </section>

      <section className="h-sec h-metoda" aria-labelledby="cum-title">
        <div className="s-wrap">
          <div className="h-head"><div><p className="s-eyebrow">Cum funcționează</p><h2 id="cum-title" className="h-h2">Trei pași până la poliță</h2></div></div>
          <div className="h-steps" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))'}}>
            <div className="h-step"><span className="h-step-n">01</span><h3>Ne trimiți datele</h3><p>Prin formular, la telefon sau direct în magazinul din {c.magazin.oras}.</p></div>
            <div className="h-step"><span className="h-step-n">02</span><h3>Primești variantele</h3><p>Prețurile mai multor asigurători, una lângă alta, cu și fără decontare directă.</p></div>
            <div className="h-step"><span className="h-step-n">03</span><h3>Alegi, emitem polița</h3><p>Îți explicăm pașii și rămânem alături pe toată durata poliței.</p></div>
          </div>
        </div>
      </section>

      <section className="h-sec" aria-labelledby="despre-title">
        <div className="s-wrap p-split">
          <div className="p-prose">
            <p className="s-eyebrow">Bine de știut</p>
            <h2 id="despre-title" className="h-h2">Ce trebuie să știi despre RCA</h2>
            <p>RCA (asigurarea de răspundere civilă auto) este obligatorie pentru orice vehicul înmatriculat în România. Acoperă pagubele pe care le provoci altor persoane într-un accident, nu și pe cele ale propriei mașini: pentru acestea există CASCO.</p>
            <h3>Decontarea directă</h3>
            <p>Dacă nu ești vinovat de accident, cu decontare directă repari mașina prin propriul asigurător, fără să aștepți după asigurătorul celuilalt șofer. Se adaugă la RCA, contra cost.</p>
            <h3>De ce diferă prețul</h3>
            <p>Prețul RCA ține de vehicul (tip, capacitate), de proprietar (vârstă, localitate) și de istoricul de daune, exprimat prin clasa bonus-malus. De aceea nu afișăm prețuri fixe: îți trimitem oferte calculate pentru mașina ta.</p>
          </div>
          <div>
            <h2 className="h-h2" style={{fontSize: 28, marginBottom: 20}}>Întrebări frecvente</h2>
            <div className="h-faq-list">
              {FAQ.map(f => <details key={f.q}><summary>{f.q}<Icon d={I.chevron} size={20}/></summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </div>
      </section>

      <section className="h-sec" style={{paddingTop: 0}} aria-label="Alte asigurări">
        <div className="s-wrap p-cross">
          <div>
            <div><h3>Ai nevoie și de CASCO?</h3><p>Cere ambele oferte deodată, pentru aceeași mașină.</p></div>
            <LeadButton serviciu="asigurari" detaliu="CASCO" sursa="cross-rca" className="s-btn s-btn-dark">Ofertă CASCO</LeadButton>
          </div>
          <div>
            <div><h3>Și casa e asigurată?</h3><p>Asigurarea obligatorie PAD și cea facultativă, de la același consultant.</p></div>
            <LeadButton serviciu="asigurari" detaliu="Locuință" sursa="cross-rca" className="s-btn s-btn-dark">Ofertă locuință</LeadButton>
          </div>
        </div>
      </section>
    </>
  );
}
