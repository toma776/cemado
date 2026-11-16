// Branding › Culori: paleta primară, culorile de suport (propuse în designul v1) și culorile din afara brandului.
import {CULORI, SURSE} from '../../../../../manage/brand.mjs';
import CopyCode from '../../../../../manage/ui/CopyCode.jsx';

const light = hex => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 160; };
const rgb = hex => { const n = parseInt(hex.slice(1), 16); return `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})`; };
const ETICHETA = {logo: 'din logo', propus: 'propus', observat: 'observat, aproximativ'};

function Swatches({items}) {
  return (
    <div className="bb-swatches">
      {items.map(c => (
        <div key={c.hex} className="bb-sw">
          <div className="chip big" style={{background: c.hex, color: light(c.hex) ? '#161616' : '#fff', border: light(c.hex) ? '1px solid var(--line)' : 0}}>HEX: {c.hex}<br/>{rgb(c.hex).toUpperCase()}</div>
          <div className="cap"><b>{c.nume} <span className={`tag ${c.sursa === 'logo' ? 'ok' : 'grey'}`}>{ETICHETA[c.sursa]}</span></b><span>{c.rol}</span><div className="bb-codes"><CopyCode value={c.hex}/><CopyCode value={rgb(c.hex)}/></div></div>
        </div>
      ))}
    </div>
  );
}

export default function Culori() {
  return (
    <>
      <section><h2>Paleta primară</h2><Swatches items={CULORI.primare}/></section>
      <section><h2>Culori de suport <span className="n">din designul v1, de aprobat</span></h2><Swatches items={CULORI.suport}/></section>
      <section>
        <h2>În afara brandului <span className="n">apar în materialele existente</span></h2>
        <Swatches items={CULORI.inAfaraBrandului}/>
        <p className="muted small" style={{marginTop: 8}}>Valorile sunt aproximate din {SURSE.fatada.toLowerCase()} și din {SURSE.pliant}; nu sunt coduri oficiale.</p>
      </section>
    </>
  );
}
