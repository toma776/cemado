// Branding › Logo: elementele, variantele care circulă și fișierele care lipsesc.
import {LOGO, SURSE} from '../../../../../manage/brand.mjs';

export default function Logo() {
  return (
    <>
      <section>
        <h2>Logo-ul</h2>
        <p className="lead" style={{marginTop: 0}}>{LOGO.descriere}</p>
        <div className="card">
          {LOGO.elemente.map(e => <p key={e.nume}><b>{e.nume}.</b> {e.text}</p>)}
        </div>
      </section>
      <section>
        <h2>Variante în uz</h2>
        <div className="bb-logos">
          {LOGO.variante.map(v => (
            <div key={v.nume} className="bb-logo">
              <div className="stage" style={{background: v.fundal}}><img src={v.img} alt={`Logo CEMADO: ${v.nume}`} style={v.sursa === 'pliant' ? {maxHeight: 220, objectFit: 'cover', objectPosition: 'top left'} : undefined}/></div>
              <div className="cap">
                <b>{v.nume}{v.principal && <span className="tag ok">principal</span>}<a className="btn sm" href={v.img} download>Descarcă</a></b>
                <span>{v.descriere}</span>
                <span className="muted small">Sursa: {SURSE[v.sursa]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>De cerut clientului</h2>
        <div className="card"><ul style={{margin: 0, paddingLeft: 18, display: 'grid', gap: 4}}>{LOGO.lipsesc.map(c => <li key={c}>{c}</li>)}</ul></div>
      </section>
    </>
  );
}
