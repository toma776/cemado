// Panoul: cifrele pe grupuri, ce e de confirmat cu clientul și observațiile de brand.
import {stats, todo} from '../../../manage/data.mjs';
import {GROUPS, group, tone} from '../../../registry/groups.mjs';
import {OBSERVATII} from '../../../manage/brand.mjs';

export default async function Panou() {
  const s = await stats();
  const open = todo(s.open);
  const kpi = ['servicii', 'divizii', 'parteneri', 'locatii', 'finantare', 'contact'];
  const verified = s.total - s.open.length;
  return (
    <>
      <div className="head"><div><div className="crumb">manage</div><h1>Panou</h1></div></div>
      <p className="lead">Tot ce știm despre CEMADO, adunat din site-ul actual, prezentarea firmei, propunerea de colaborare, pliant și fațada magazinului. Ultima actualizare: {s.actualizat}.</p>
      <div className="kpis">
        <a className="kpi" href="/manage/entitati/"><b>{s.total}</b><span>entități</span><small>{verified} verificate · {s.open.length} deschise</small></a>
        {kpi.map(k => <a key={k} className="kpi" href={`/manage/entitati/${k}/`}><b>{s.by[k].total}</b><span>{group(k).label.toLowerCase()}</span>{s.by[k].open ? <small>{s.by[k].open} de confirmat</small> : <small>toate verificate</small>}</a>)}
      </div>
      <div className="grid2">
        <div className="card">
          <h3><a href="/manage/de-facut/">De confirmat cu clientul →</a> <span className="muted small">· {open.length}</span></h3>
          {open.slice(0, 10).map(e => (
            <div key={e.id} className="obs"><span className={`tag ${tone(e.stare)}`}>{e.stare}</span><a href={`/manage/entitati/${e.grup}/${e.id}/`}>{e.nume}</a><span className="muted small">{group(e.grup)?.label}</span></div>
          ))}
        </div>
        <div className="card">
          <h3><a href="/manage/branding/">Observații de brand →</a> <span className="muted small">· {OBSERVATII.length}</span></h3>
          {OBSERVATII.map((o, i) => <div key={i} className="obs"><span className={`lvl ${o.nivel}`}>{o.nivel === 'atentie' ? 'atenție' : o.nivel === 'problema' ? 'problemă' : 'ok'}</span><span style={{flex: 1}}>{o.text}</span></div>)}
        </div>
        <div className="card">
          <h3>Acoperire pe grupuri</h3>
          {GROUPS.map(g => {
            const b = s.by[g.key], pct = b.total ? Math.round(((b.total - b.open) / b.total) * 100) : 0;
            return (
              <div key={g.key} className="small" style={{margin: '10px 0 0'}}>
                <a href={`/manage/entitati/${g.key}/`}>{g.label}</a> <span className="muted">· {b.total - b.open} din {b.total} verificate</span>
                <div className="bar"><i className={pct === 100 ? 'ok' : ''} style={{width: `${pct}%`}}/></div>
              </div>
            );
          })}
        </div>
        <div className="card">
          <h3>Surse</h3>
          <p>{s.sursa}</p>
          <p className="muted small">Copia locală a cemado.ro e în <code>_referinta-cemado-ro/</code> (doar local, nu se publică). Documentele interne ale clientului (.docx, .pdf) nu sunt în repo.</p>
        </div>
      </div>
    </>
  );
}
