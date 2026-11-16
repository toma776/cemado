// Asigurări (pagina principală a liniei). Parcurs: hero + formular rapid → tipurile de asigurări (RCA are pagină,
// restul deschid formularul cu tipul ales, fără pagini goale) → metoda pe asigurări → de ce prin CEMADO → cross-sell → FAQ.
// Conformitate: CEMADO e asistent în brokeraj, Destine Broker e brokerul; nu promitem prețuri sau soluționarea daunelor.
import {siteData} from '../../../site/brain.mjs';
import {icon} from '../../../site/menu.mjs';
import {PE_LINII} from '../../../site/home/metoda.mjs';
import Icon, {I} from '../../../site/ui/Icon.jsx';
import LeadButton from '../../../site/ui/LeadButton.jsx';
import QuickForm from '../../../site/ui/QuickForm.jsx';
import '../../../site/home/home.css';
import '../../../site/service.css';

export const metadata = {title: 'Asigurări RCA, CASCO, locuință, viață · CEMADO Buftea', description: 'Compari oferte de asigurare de la mai mulți asigurători, cu un consultant CEMADO: RCA, CASCO, locuință, viață și sănătate, călătorie, pensie privată.', robots: {index: false, follow: false}};

const NOTA = 'Asigurările sunt intermediate prin Destine Broker de Asigurare-Reasigurare; CEMADO activează ca asistent în brokeraj.';

const TIPURI = [
  {id: 'rca', titlu: 'RCA', text: 'Asigurarea obligatorie pentru orice mașină înmatriculată. Comparăm prețurile mai multor asigurători.', href: '/asigurari/rca/', cta: 'Ofertă RCA', main: true},
  {id: 'casco', titlu: 'CASCO', text: 'Protecție pentru daunele propriei mașini, în condițiile fiecărei polițe.', detaliu: 'CASCO'},
  {id: 'locuinta', titlu: 'Locuință', text: 'Asigurarea obligatorie PAD și asigurarea facultativă pentru casă și bunuri.', detaliu: 'Locuință'},
  {id: 'viata-sanatate', titlu: 'Viață și sănătate', text: 'Siguranță și încredere pentru tine și pentru cei dragi.', detaliu: 'Viață și sănătate'},
  {id: 'calatorie', titlu: 'Călătorie', text: 'Asigurare medicală și storno, oriunde pleci.', detaliu: 'Călătorie'},
  {id: 'pensie-privata', titlu: 'Pensie privată', text: 'Investește din timp în viitorul tău.', detaliu: 'Pensie privată'},
  {id: 'firme', titlu: 'Pentru firme', text: 'Sediu, bunuri, marfă, asigurări profesionale și flotă auto.', href: '/firme/', cta: 'Asigurări pentru firme'},
  {id: 'nu-stiu', titlu: 'Nu știi ce îți trebuie?', text: 'Spune-ne ce vrei să protejezi, iar consultantul îți spune ce asigurare ți se potrivește.', detaliu: ''}
];

const FAQ = [
  {q: 'De ce prin CEMADO și nu direct la asigurător?', a: 'Pentru că vezi mai multe oferte într-un singur loc, cu un om care îți explică diferențele de preț și de acoperire. Nu mai cauți singur pe la fiecare asigurător.'},
  {q: 'Ce înseamnă că CEMADO e „asistent în brokeraj”?', a: 'Asigurările sunt intermediate de Destine Broker de Asigurare-Reasigurare, brokerul autorizat. CEMADO lucrează alături de Destine ca asistent în brokeraj: te consiliază, îți aduce ofertele și te ajută la emiterea poliței.'},
  {q: 'Pot rezolva totul fără să vin în magazin?', a: 'Da. Trimiți cererea de pe site, primești variantele la telefon sau pe WhatsApp, iar consultantul îți explică pașii pentru emitere. Dacă preferi, te așteptăm în magazinul din Buftea.'},
  {q: 'Ce informații îți trebuie pentru o ofertă?', a: 'Depinde de asigurare: pentru RCA, datele mașinii și ale proprietarului; pentru locuință, tipul și suprafața; pentru călătorie, destinația și perioada. Consultantul îți spune exact ce trebuie, fără documente în plus.'}
];

export default async function Asigurari() {
  const c = await siteData();
  const pasi = PE_LINII.find(l => l.key === 'asigurari').pasi;
  return (
    <>
      <section className="p-hero">
        <div className="s-wrap p-hero-in">
          <nav className="p-crumbs" aria-label="Unde ești"><a href="/">Acasă</a><span>›</span>Asigurări</nav>
          <div className="p-hero-text">
            <p className="s-eyebrow">Asigurări · prin Destine Broker</p>
            <h1>Compari asigurări de la mai mulți asigurători, <em>cu un consultant lângă tine.</em></h1>
            <p className="p-lead">RCA, CASCO, locuință, viață, călătorie sau pensie privată. Îți arătăm variantele, îți explicăm diferențele înainte să semnezi și rămânem alături pe toată durata poliței.</p>
            <ul className="p-trust">
              <li><span className="h-ico"><Icon d={icon('asigurari')} size={20}/></span><span><b>Mai mulți asigurători comparați</b>Prețuri și acoperiri, una lângă alta.</span></li>
              <li><span className="h-ico"><Icon d={I.check} size={20}/></span><span><b>Condiții explicate clar</b>Fără clauze ascunse, înainte de semnare.</span></li>
              <li><span className="h-ico"><Icon d={I.pin} size={20}/></span><span><b>Online sau în magazin</b>{c.magazin.adresa}, {c.magazin.oras}.</span></li>
            </ul>
          </div>
          <QuickForm serviciu="asigurari" sursa="formular-asigurari" telefon={c.telefon}
            titlu="Cere o ofertă de asigurare" intro="Alege tipul și lasă-ne datele de contact. Consultantul îți spune ce acte îi trebuie și îți pregătește variantele de la mai mulți asigurători."
            intrebare="Ce vrei să asiguri?" optiuni={['RCA', 'CASCO', 'Locuință', 'Viață și sănătate', 'Călătorie', 'Pensie privată', 'Firmă']}
            nota={NOTA}/>
        </div>
      </section>

      <section className="h-sec" aria-labelledby="tipuri-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Tipuri de asigurări</p><h2 id="tipuri-title" className="h-h2">Ce putem asigura pentru tine</h2></div>
            <p className="h-lead">Pentru fiecare tip comparăm ofertele mai multor asigurători și îți explicăm ce acoperă fiecare.</p>
          </div>
          <div className="p-types">
            {TIPURI.map(t => (
              <article key={t.id} id={t.id} className={`p-type ${t.main ? 'is-main' : ''}`}>
                <span className="h-ico"><Icon d={t.id === 'firme' ? icon('firme') : icon('asigurari')} size={22}/></span>
                <h3>{t.titlu}</h3>
                <p>{t.text}</p>
                <div className="p-type-cta">
                  {t.href
                    ? <a className={`s-btn ${t.main ? 's-btn-primary' : 'h-btn-ghost'}`} href={t.href}>{t.cta}</a>
                    : <LeadButton serviciu="asigurari" detaliu={t.detaliu} sursa="card-asigurare" className="s-btn h-btn-ghost">{t.detaliu ? `Ofertă ${/^[A-Z]+$/.test(t.titlu) ? t.titlu : t.titlu.toLowerCase()}` : 'Cere o recomandare'}</LeadButton>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-metoda" aria-labelledby="cum-title">
        <div className="s-wrap">
          <div className="h-head"><div><p className="s-eyebrow">Cum lucrăm</p><h2 id="cum-title" className="h-h2">Simplu, în patru pași</h2></div></div>
          <div className="h-steps">
            {['Ne spui ce vrei să asiguri', 'Comparăm ofertele', 'Emitem polița', 'Rămânem alături'].map((t, i) => (
              <div key={t} className="h-step"><span className="h-step-n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{pasi[i]}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec" aria-label="Alte servicii">
        <div className="s-wrap p-cross">
          <div>
            <div><h3>Pleci în vacanță?</h3><p>Te ajutăm cu vacanța prin Destine Holidays și cu asigurarea de călătorie, la același consultant.</p></div>
            <LeadButton serviciu="vacante" sursa="cross-asigurari" className="s-btn s-btn-dark">Planifică vacanța</LeadButton>
          </div>
          <div>
            <div><h3>Ai o firmă?</h3><p>Asigurări pentru sediu, bunuri, marfă și flota auto, plus telefonie și energie.</p></div>
            <a className="s-btn s-btn-dark" href="/firme/">Soluții pentru firme</a>
          </div>
        </div>
      </section>

      <section className="h-sec h-faq" aria-labelledby="faq-title">
        <div className="s-wrap h-faq-in">
          <div>
            <p className="s-eyebrow">Întrebări frecvente</p>
            <h2 id="faq-title" className="h-h2">Despre asigurări</h2>
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
