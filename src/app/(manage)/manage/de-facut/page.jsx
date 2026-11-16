// De confirmat: toate entitățile care nu sunt „verificat”, grupate pe stare. Lista de întrebări pentru client.
import {stats, todo} from '../../../../manage/data.mjs';
import {group, tone, OPEN} from '../../../../registry/groups.mjs';

export default async function DeFacut() {
  const s = await stats();
  const open = todo(s.open);
  return (
    <>
      <div className="head"><div><div className="crumb"><a href="/manage/">manage</a></div><h1>De confirmat <span className="muted small" style={{fontWeight: 400}}>{open.length}</span></h1></div></div>
      <p className="lead">Informațiile care nu sunt încă verificate: contradicții între surse, date care lipsesc sau care se schimbă des. Fiecare rând are în descriere ce anume trebuie lămurit.</p>
      {OPEN.filter(k => open.some(e => e.stare === k)).map(k => (
        <section key={k} style={{marginBottom: 18}}>
          <h2 style={{fontSize: 15, marginBottom: 8}}><span className={`tag ${tone(k)}`}>{k}</span> <span className="muted small">{open.filter(e => e.stare === k).length}</span></h2>
          <div className="rows">
            {open.filter(e => e.stare === k).map(e => (
              <a key={e.id} className="row" href={`/manage/entitati/${e.grup}/${e.id}/`}>
                <span className="av" style={{background: `color-mix(in srgb, ${group(e.grup)?.color} 14%, var(--panel))`, color: group(e.grup)?.color}}>#{e.id}</span>
                <div style={{minWidth: 0}}><h3>{e.nume}</h3><div className="meta">{e.descriere}</div></div>
                <div className="acts"><span className="tag grey">{group(e.grup)?.label}</span></div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
