// Branding › Voce și mesaje: slogan, tagline, promisiune, principii de ton și mesajele pe linii de business.
import {VOCE} from '../../../../../manage/brand.mjs';

export default function Voce() {
  return (
    <>
      <section>
        <h2>Semnătura</h2>
        <blockquote className="bb-quote"><q>{VOCE.slogan}</q><span>Slogan · pe logo și pe fațadă (acolo scris „TRAIEȘTE”, fără Ă)</span></blockquote>
        <blockquote className="bb-quote"><q>{VOCE.tagline}</q><span>Tagline · prezentarea firmei și pagina Despre noi</span></blockquote>
        <blockquote className="bb-quote"><q>{VOCE.promisiune}</q><span>Promisiunea · propusă pentru hero-ul site-ului nou</span></blockquote>
      </section>
      <section>
        <h2>Principii de ton</h2>
        <div className="grid2">{VOCE.principii.map(p => <div key={p.titlu} className="card"><h3 style={{marginBottom: 6}}>{p.titlu}</h3><p style={{margin: 0}}>{p.text}</p></div>)}</div>
      </section>
      <section>
        <h2>Mesaje pe linii de business <span className="n">din materialele existente</span></h2>
        <div className="tbl"><table>
          <thead><tr><th>Linie</th><th>Mesaj</th></tr></thead>
          <tbody>{VOCE.mesaje.map(m => <tr key={m.linie}><td><b>{m.linie}</b></td><td>{m.mesaj}</td></tr>)}</tbody>
        </table></div>
      </section>
    </>
  );
}
