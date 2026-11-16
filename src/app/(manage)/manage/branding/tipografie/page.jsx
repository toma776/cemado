// Branding › Tipografie: ce știm despre wordmark și ierarhia propusă în designul v1.
import {TIPOGRAFIE} from '../../../../../manage/brand.mjs';

const FONT = {Manrope: 'var(--font-manrope), Manrope, sans-serif', Inter: 'var(--font-inter), Inter, sans-serif'};

export default function Tipografie() {
  return (
    <>
      <section>
        <h2>Wordmark-ul din logo</h2>
        <div className="card"><p style={{margin: 0}}>{TIPOGRAFIE.logo}</p></div>
      </section>
      <section>
        <h2>Ierarhia propusă <span className="n">design v1, de aprobat</span></h2>
        <div className="bb-type" style={{gridTemplateColumns: '1fr'}}>
          {TIPOGRAFIE.propus.map(l => (
            <div key={l.rol} className="bb-lvl">
              <span style={{fontFamily: FONT[l.familie], fontWeight: l.greutate, color: '#161616', letterSpacing: l.rol === 'Etichete' ? '.08em' : l.rol === 'Titluri' ? '-.025em' : 0, fontSize: l.rol === 'Text' ? 18 : undefined}}>{l.mostra}</span>
              <small style={{color: '#5F5852'}}>{l.rol} · {l.familie} {l.greutate}</small>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Reguli</h2>
        <div className="tbl"><table>
          <thead><tr><th>Rol</th><th>Familie</th><th>Greutate</th><th>Regulă</th><th>Sursă</th></tr></thead>
          <tbody>{TIPOGRAFIE.propus.map(l => <tr key={l.rol}><td><b>{l.rol}</b></td><td>{l.familie}</td><td>{l.greutate}</td><td>{l.regula}</td><td><span className="tag grey">{l.sursa}</span></td></tr>)}</tbody>
        </table></div>
        <p className="muted small" style={{marginTop: 8}}>{TIPOGRAFIE.nota} <a href="https://fonts.google.com/specimen/Manrope" target="_blank" rel="noopener">Manrope ↗</a> · <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener">Inter ↗</a></p>
      </section>
    </>
  );
}
