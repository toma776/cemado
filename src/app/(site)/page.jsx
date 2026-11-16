// Homepage-ul site-ului umbrelă CEMADO. Parcursul paginii:
// 1. Hero: ce face CEMADO + „ce te aduce azi?” (scurtături spre cele mai dese nevoi)
// 2. Dovezi rapide: din 2007, magazin fizic, compari furnizori, rate
// 3. Cele 4 linii de business, în carduri cu aceeași structură (+ banda pentru firme)
// 4. Metoda CEMADO: același parcurs pentru toate liniile (unifică experiența)
// 5. De ce CEMADO: valorile, apoi istoricul real (2007 → azi) și partenerii
// 6. Magazinul din Buftea, promoția activă, întrebări frecvente; footer-ul închide cu „Te sunăm noi”
import {siteData, homeData} from '../../site/brain.mjs';
import {LINII, icon} from '../../site/menu.mjs';
import LeadButton from '../../site/ui/LeadButton.jsx';
import Icon, {I} from '../../site/ui/Icon.jsx';
import Metoda from '../../site/home/Metoda.jsx';
import '../../site/home/home.css';

const NEVOI = [
  {label: 'Îmi expiră RCA-ul', serviciu: 'asigurari', detaliu: 'RCA'},
  {label: 'Vreau un telefon în rate', serviciu: 'telefonie', detaliu: 'Telefon sau gadget în rate'},
  {label: 'Caut o vacanță', serviciu: 'vacante'},
  {label: 'Vreau panouri solare', serviciu: 'energie'}
];

const ROL = {Telecom: 'Telefonie', Asigurări: 'Asigurări', Turism: 'Vacanțe', Finanțare: 'Rate și leasing'};

const FAQ = [
  {q: 'Trebuie să vin în magazin?', a: 'Nu. Trimiți cererea de pe site, te sună un consultant și primești variantele la telefon, pe WhatsApp sau pe email. Dacă preferi să vorbim față în față, te așteptăm în magazinul din Buftea.'},
  {q: 'Pot rezolva mai multe lucruri deodată?', a: 'Da. Același consultant te poate ajuta cu abonamentul, asigurarea mașinii și vacanța, într-o singură discuție.'},
  {q: 'Cum pot plăti?', a: 'Integral sau, pentru anumite produse, în rate, prin partenerii noștri financiari (TBI Bank, Card Avantaj, Grenke), în condițiile fiecăruia.'},
  {q: 'Lucrați și cu firme?', a: 'Da: abonamente business, asigurări pentru firmă și flotă și sisteme fotovoltaice comerciale sau agricole. Vezi pagina Pentru firme.'}
];

export default async function Home() {
  const [c, h] = [await siteData(), await homeData()];
  const ani = new Date().getFullYear() - Number(c.firma.an);
  const grupe = Object.entries(h.parteneri.reduce((a, p) => ((a[p.rol] ??= []).push(p.nume), a), {}));
  return (
    <>
      {/* 1 · Hero */}
      <section className="h-hero">
        <div className="s-wrap h-hero-in">
          <div className="h-hero-text">
            <p className="h-pill"><i aria-hidden="true"/>Buftea · Ilfov · din {c.firma.an}</p>
            <h1>Telefonie, asigurări, vacanțe și energie solară. <em>Toate într-un singur loc.</em></h1>
            <p className="h-hero-lead">Compari variantele mai multor furnizori, primești explicații clare și plătești cum îți convine. Online sau la magazinul nostru din {c.magazin.oras}.</p>
            <div className="h-hero-cta">
              <LeadButton sursa="hero">Cere o ofertă <Icon d={I.arrow} size={18}/></LeadButton>
              <a className="s-btn h-btn-ghost" href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii"><Icon d={I.pin} size={18}/>Vino în magazin</a>
            </div>
            <div className="h-nevoi">
              <span>Ce te aduce azi?</span>
              <div>{NEVOI.map(n => <LeadButton key={n.label} serviciu={n.serviciu} detaliu={n.detaliu} sursa="hero-nevoie" className="h-chip">{n.label}</LeadButton>)}</div>
            </div>
          </div>
          <div className="h-hero-media">
            <img src="/brand/fatada-buftea.jpg" alt="Magazinul CEMADO din Buftea, cu serviciile afișate pe fațadă" width="1492" height="1150"/>
            <div className="h-hero-badge"><b>{ani}</b><span>ani alături de clienți</span></div>
            <a className="h-hero-store" href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii">
              <span className="h-ico"><Icon d={I.pin} size={20}/></span>
              <span><b>{c.magazin.nume}</b><small>{c.magazin.adresa}</small></span>
            </a>
          </div>
        </div>
      </section>

      {/* 2 · Dovezi rapide */}
      <section className="h-proof" aria-label="De ce să ai încredere">
        <div className="s-wrap h-proof-in">
          <div><Icon d={I.clock} size={22}/><span><b>Din {c.firma.an}</b>în telecom și servicii</span></div>
          <div><Icon d={I.pin} size={22}/><span><b>Magazin fizic</b>în {c.magazin.oras}, {c.magazin.judet}</span></div>
          <div><Icon d={icon('asigurari')} size={22}/><span><b>Mai mulți furnizori</b>comparați pentru tine</span></div>
          <div><Icon d={I.check} size={22}/><span><b>Plata în rate</b>prin partenerii financiari</span></div>
        </div>
      </section>

      {/* 3 · Liniile de business */}
      <section className="h-sec" aria-labelledby="servicii-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">Servicii</p><h2 id="servicii-title" className="h-h2">Cu ce te putem ajuta?</h2></div>
            <p className="h-lead">Alege domeniul. În fiecare primești același lucru: un consultant care îți explică variantele și o ofertă pe măsura ta.</p>
          </div>
          <div className="h-cards">
            {LINII.map(l => (
              <article key={l.key} className="h-card">
                <span className="h-ico h-ico-lg"><Icon d={icon(l.icon)} size={26}/></span>
                <h3><a href={l.href}>{l.label}</a></h3>
                <p>{l.intro}</p>
                <ul>{l.items.slice(0, 3).map(it => <li key={it.href}><a href={it.href}><Icon d={I.check} size={16}/>{it.label}</a></li>)}</ul>
                <div className="h-card-cta">
                  {l.actiune.href
                    ? <a className="s-btn s-btn-primary" href={l.actiune.href}>{l.actiune.cta}</a>
                    : <LeadButton serviciu={l.actiune.serviciu} sursa="card-serviciu">{l.actiune.cta}</LeadButton>}
                  <a className="s-link" href={l.href}>Detalii <Icon d={I.arrow} size={16}/></a>
                </div>
              </article>
            ))}
          </div>
          <div className="h-b2b">
            <div>
              <p className="s-eyebrow">Pentru firme</p>
              <h3>Un singur partener pentru telefonia, asigurările și energia firmei tale</h3>
              <p>Abonamente business, asigurări pentru firmă și flotă, sisteme fotovoltaice comerciale de la 10 kW.</p>
            </div>
            <div className="h-b2b-cta">
              <LeadButton serviciu="firme" sursa="banda-firme" className="s-btn s-btn-dark">Cere o ofertă pentru firmă</LeadButton>
              <a className="s-link" href="/firme/">Soluții pentru firme <Icon d={I.arrow} size={16}/></a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Metoda CEMADO */}
      <Metoda/>

      {/* 5 · De ce CEMADO: valori, istoric, parteneri */}
      <section className="h-sec h-dark" aria-labelledby="dece-title">
        <div className="s-wrap">
          <div className="h-head">
            <div><p className="s-eyebrow">De ce CEMADO</p><h2 id="dece-title" className="h-h2">O firmă românească, construită pe relații de lungă durată</h2></div>
            <p className="h-lead">Am pornit în {c.firma.an} cu un magazin și doi oameni. De atunci ne-am adaptat la fiecare schimbare din piață, fără să schimbăm felul în care tratăm clienții.</p>
          </div>
          <div className="h-values">
            {h.valori.map(v => <div key={v.titlu}><Icon d={I.check} size={22}/><h3>{v.titlu}</h3><p>{v.text}</p></div>)}
          </div>

          <h3 className="h-sub">Parcursul nostru</h3>
          <ol className="h-timeline">
            {h.istoric.map(e => <li key={e.titlu}><span>{e.an}</span><b>{e.titlu}</b><p>{e.text}</p></li>)}
          </ol>

          <h3 className="h-sub">Lucrăm cu</h3>
          <div className="h-partners">
            {grupe.map(([rol, nume]) => (
              <div key={rol}><small>{ROL[rol] ?? rol}</small><p>{nume.join(' · ')}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Magazinul */}
      <section className="h-sec h-store" aria-labelledby="magazin-title">
        <div className="s-wrap h-store-in">
          <div>
            <p className="s-eyebrow">Magazinul nostru</p>
            <h2 id="magazin-title" className="h-h2">Vino să ne cunoști în {c.magazin.oras}</h2>
            <p className="h-lead">Tot ce găsești pe site rezolvi și la ghișeu, cu un om care îți explică. Plus serviciile rapide de zi cu zi.</p>
            <ul className="h-store-list">
              {['Plata facturilor de utilități', 'Reîncărcare prepay pentru toți operatorii', 'Coletărie', 'Telefoane în rate doar cu buletinul', 'Accesorii și configurare telefon'].map(s => <li key={s}><Icon d={I.check} size={18}/>{s}</li>)}
            </ul>
          </div>
          <div className="h-store-card">
            <span className="h-ico h-ico-lg"><Icon d={I.pin} size={26}/></span>
            <h3>{c.magazin.nume}</h3>
            <p>{c.magazin.adresa}<br/>{c.magazin.oras}, {c.magazin.judet}</p>
            {c.magazin.program && <p className="h-store-prog"><Icon d={I.clock} size={18}/>{c.magazin.program}</p>}
            <div className="h-store-cta">
              <a className="s-btn s-btn-primary" href={c.magazin.harta} target="_blank" rel="noopener" data-ev="click_directii">Indicații rutiere</a>
              <a className="s-btn h-btn-ghost" href={c.telefon.href} data-ev="click_telefon"><Icon d={I.phone} size={18}/>{c.telefon.afisat}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Promoția activă (din Brain; dispare când nu e niciuna) */}
      {h.promotie && (
        <section className="h-promo-wrap" aria-label="Promoție">
          <div className="s-wrap">
            <div className="h-promo">
              <span className="h-promo-tag">Acum în magazin</span>
              <div>
                <h3>{h.promotie.nume}</h3>
                <p>{h.promotie.descriere.replace(/\s*Data de încheiere.*$/, '')}</p>
              </div>
              <LeadButton sursa="promotie" className="s-btn s-btn-dark">Vreau oferta</LeadButton>
            </div>
          </div>
        </section>
      )}

      {/* 8 · Întrebări frecvente */}
      <section className="h-sec h-faq" aria-labelledby="faq-title">
        <div className="s-wrap h-faq-in">
          <div>
            <p className="s-eyebrow">Întrebări frecvente</p>
            <h2 id="faq-title" className="h-h2">Bine de știut</h2>
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
