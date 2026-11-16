// Fișa unei entități: editorul cu câmpurile comune și cele specifice grupului.
import {notFound} from 'next/navigation';
import {get} from '../../../../../../core/store.mjs';
import {group, BASE_FIELDS, STARI, tone} from '../../../../../../registry/groups.mjs';
import Editor from '../../../../../../manage/ui/Editor.jsx';

export default async function Fisa({params}) {
  const {tip, id} = await params;
  const g = group(tip);
  const e = g && await get(tip, id);
  if (!e) notFound();
  return (
    <>
      <div className="head">
        <div><div className="crumb"><a href="/manage/">manage</a> › <a href="/manage/entitati/">entități</a> › <a href={`/manage/entitati/${tip}/`}>{g.label.toLowerCase()}</a></div>
          <h1>{e.nume} <span className={`tag ${tone(e.stare)}`}>{e.stare}</span></h1></div>
      </div>
      <Editor grup={tip} entity={e} base={BASE_FIELDS} extra={g.fields ?? []} stari={STARI}/>
    </>
  );
}
