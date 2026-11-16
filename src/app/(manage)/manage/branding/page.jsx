// Branding › Prezentare: rezumatul identității și ce am observat comparând materialele.
import {LOGO, CULORI, TIPOGRAFIE, VOCE, APLICATII, OBSERVATII} from '../../../../manage/brand.mjs';

const NIVEL = {problema: 'problemă', atentie: 'atenție', ok: 'ok'};

export default function Prezentare() {
  return (
    <>
      <div className="bb-hero">
        <div><h2>{VOCE.slogan}</h2><p>{VOCE.tagline}</p></div>
        <img src={LOGO.fisier} alt="Logo CEMADO pe fundal roșu" style={{width: 260}}/>
      </div>
      <div className="kpis">
        <a className="kpi" href="/manage/branding/logo/"><b>{LOGO.variante.length}</b><span>variante de logo</span><small>{LOGO.lipsesc.length} fișiere lipsă</small></a>
        <a className="kpi" href="/manage/branding/culori/"><b>{CULORI.primare.length + CULORI.suport.length}</b><span>culori</span><small>{CULORI.primare.length} primare, {CULORI.suport.length} de suport</small></a>
        <a className="kpi" href="/manage/branding/tipografie/"><b>2</b><span>familii propuse</span><small>{TIPOGRAFIE.propus.map(t => t.familie).filter((x, i, a) => a.indexOf(x) === i).join(' + ')}</small></a>
        <a className="kpi" href="/manage/branding/voce/"><b>{VOCE.principii.length}</b><span>principii de ton</span><small>{VOCE.mesaje.length} mesaje pe linii</small></a>
        <a className="kpi" href="/manage/branding/aplicatii/"><b>{APLICATII.length}</b><span>aplicații</span><small>fațadă, pliant, site</small></a>
      </div>
      <section>
        <h2>Observații <span className="n">{OBSERVATII.length}</span></h2>
        <div className="card">
          {OBSERVATII.map((o, i) => <div key={i} className="bb-obs"><span className={`lvl ${o.nivel}`}>{NIVEL[o.nivel]}</span><span>{o.text}</span></div>)}
        </div>
      </section>
    </>
  );
}
