// Branding › Aplicații: unde apare brandul azi (fațadă, pliant) și site-ul nou propus.
import {APLICATII, SURSE} from '../../../../../manage/brand.mjs';

export default function Aplicatii() {
  return (
    <div className="bb-apps">
      {APLICATII.map(a => (
        <div key={a.titlu} className="bb-app">
          <a href={a.href ?? a.img} target="_blank" rel="noopener"><img src={a.img} alt={a.titlu} loading="lazy"/></a>
          <div>
            <h3>{a.titlu} <span className="muted small">{SURSE[a.sursa]}</span></h3>
            <ul>{a.detalii.map(d => <li key={d}>{d}</li>)}</ul>
            {a.href && <a className="btn sm" href={a.href} target="_blank" rel="noopener">Deschide canvas-ul ↗</a>}
          </div>
        </div>
      ))}
    </div>
  );
}
