// Entitățile, pe secțiuni: fiecare card arată grupurile lui cu numărul de înregistrări și ce e deschis.
import {stats} from '../../../../manage/data.mjs';
import {GROUPS, SECTIONS} from '../../../../registry/groups.mjs';

export default async function Entitati() {
  const s = await stats();
  return (
    <>
      <div className="head"><div><div className="crumb"><a href="/manage/">manage</a></div><h1>Entități</h1></div></div>
      <p className="lead">Tot ce știe Brain-ul despre CEMADO, pe grupuri. Grupurile sunt declarate o singură dată în <code>src/registry/groups.mjs</code>, iar datele stau în <code>data/entitati.json</code>.</p>
      <div className="cats">
        {SECTIONS.map(c => {
          const groups = GROUPS.filter(g => g.section === c.key);
          const total = groups.reduce((n, g) => n + s.by[g.key].total, 0);
          return (
            <div key={c.key} className="cat">
              <div className="cat-top"><span className="cat-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={c.icon}/></svg></span><span className="cat-total">{total}</span></div>
              <h3>{c.label}</h3>
              <p className="muted small" style={{margin: 0}}>{c.desc}</p>
              <div className="cat-types">
                {groups.map(g => {
                  const b = s.by[g.key];
                  return (
                    <a key={g.key} href={`/manage/entitati/${g.key}/`}>
                      <i style={{background: g.color}}/><span>{g.label}</span>
                      {b.open ? <span className="tag warn">{b.open} de confirmat</span> : null}
                      <b>{b.total}</b>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
