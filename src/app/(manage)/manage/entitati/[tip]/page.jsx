// Lista unui grup: rânduri cu imagine, nume, categorie, sursă și starea de validare. Filtre pe stare (?s=).
import {notFound} from 'next/navigation';
import {list} from '../../../../../core/store.mjs';
import {group, STARI, tone, SECTIONS} from '../../../../../registry/groups.mjs';
import ListFilter from '../../../../../manage/ui/ListFilter.jsx';
import NewButton from '../../../../../manage/ui/NewButton.jsx';

const initials = s => String(s ?? '?').replace(/[^\p{L}\p{N} ]/gu, '').split(/\s+/).filter(Boolean).map(x => x[0]).slice(0, 2).join('').toUpperCase();

export default async function Lista({params, searchParams}) {
  const {tip} = await params;
  const {s: stare = ''} = await searchParams;
  const g = group(tip);
  if (!g) notFound();
  const all = await list(tip);
  const rows = stare ? all.filter(e => e.stare === stare) : all;
  const filters = [['', 'Toate', all.length], ...STARI.map(x => [x.key, x.key, all.filter(e => e.stare === x.key).length]).filter(([, , n]) => n)];
  return (
    <>
      <div className="head">
        <div><div className="crumb"><a href="/manage/">manage</a> › <a href="/manage/entitati/">entități</a> › {SECTIONS.find(x => x.key === g.section)?.label}</div>
          <h1><span style={{width: 12, height: 12, borderRadius: 4, background: g.color, display: 'inline-block'}}/>{g.label} <span className="muted small" style={{fontWeight: 400}}><span id="list-count">{rows.length}</span> din {all.length}</span></h1></div>
        <ListFilter placeholder={`Caută în ${g.label.toLowerCase()}…`}/>
        <NewButton grup={tip} label={`+ ${g.one}`}/>
      </div>
      <p className="lead">{g.intro}</p>
      {filters.length > 2 && <div className="pills">{filters.map(([k, l, n]) => <a key={k} href={`?s=${encodeURIComponent(k)}`} className={stare === k ? 'on' : ''}>{l} · {n}</a>)}</div>}
      <div className="rows">
        {rows.map(e => (
          <a key={e.id} className="row" href={`/manage/entitati/${tip}/${e.id}/`} data-search={`${e.nume} ${e.categorie ?? ''} ${e.subcategorie ?? ''} ${e.descriere ?? ''} ${e.id}`}>
            {e.imagine ? <img className="av" src={e.imagine} alt="" loading="lazy"/> : <span className="av" style={{background: `color-mix(in srgb, ${g.color} 14%, var(--panel))`, color: g.color}}>{initials(e.nume)}</span>}
            <div style={{minWidth: 0}}>
              <h3>{e.nume}</h3>
              <div className="meta">{[e.an, e.categorie, e.subcategorie, e.sursa].filter(Boolean).join(' · ')}</div>
            </div>
            <div className="acts"><span className={`tag ${tone(e.stare)}`}>{e.stare ?? 'fără stare'}</span></div>
          </a>
        ))}
        {!rows.length && <div className="card empty"><b>Nimic aici</b>{stare ? 'Niciun rând nu se potrivește filtrului.' : `${g.label}: nicio înregistrare încă.`}</div>}
      </div>
    </>
  );
}
