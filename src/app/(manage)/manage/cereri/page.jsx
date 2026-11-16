// Cererile din site: lista, cu filtre pe etapă și căutare. Cele noi sunt primele.
import {list, counts, STATUSURI} from '../../../../core/leads.mjs';
import {SERVICII} from '../../../../site/menu.mjs';
import ListFilter from '../../../../manage/ui/ListFilter.jsx';

const when = s => new Date(s).toLocaleString('ro-RO', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Bucharest'});
const serv = k => SERVICII.find(s => s.key === k)?.label ?? k;

export default async function Cereri({searchParams}) {
  const {s = ''} = await searchParams;
  const [rows, c] = [await list({status: s || undefined}), await counts()];
  const tone = k => STATUSURI.find(x => x.key === k)?.tone ?? 'grey';
  return (
    <>
      <div className="head">
        <div><div className="crumb"><a href="/manage/">manage</a> › site</div>
          <h1>Cereri <span className="muted small" style={{fontWeight: 400}}><span id="list-count">{rows.length}</span> din {c.total}</span></h1></div>
        <ListFilter placeholder="Caută după nume, telefon, serviciu…"/>
      </div>
      <p className="lead">Tot ce vine din formularele site-ului („Cere ofertă” și „Te sunăm noi”). La fiecare cerere nouă pleacă și un email{process.env.RESEND_API_KEY ? '' : ' (încă nu: RESEND_API_KEY nu e setat)'}.</p>
      <div className="pills">
        <a href="?s=" className={!s ? 'on' : ''}>Toate · {c.total}</a>
        {STATUSURI.map(x => <a key={x.key} href={`?s=${x.key}`} className={s === x.key ? 'on' : ''}>{x.label} · {c.by[x.key] ?? 0}</a>)}
      </div>
      <div className="rows">
        {rows.map(l => (
          <a key={l.id} className="row" href={`/manage/cereri/${l.id}/`} data-search={`${l.nume} ${l.telefon} ${serv(l.serviciu)} ${l.detaliu ?? ''} ${l.mesaj ?? ''}`}>
            <span className="av">{l.nume.split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase()}</span>
            <div style={{minWidth: 0}}>
              <h3>{l.nume} <span className="muted small" style={{fontWeight: 400}}>· {l.telefon}</span></h3>
              <div className="meta">{[serv(l.serviciu), l.detaliu, l.canal === 'whatsapp' ? 'preferă WhatsApp' : null, when(l.created_at), l.sursa].filter(Boolean).join(' · ')}</div>
            </div>
            <div className="acts">
              {l.notificare_eroare && <span className="tag bad" title={l.notificare_eroare}>email eșuat</span>}
              <span className={`tag ${tone(l.status)}`}>{STATUSURI.find(x => x.key === l.status)?.label}</span>
            </div>
          </a>
        ))}
        {!rows.length && <div className="card empty"><b>Nicio cerere {s ? 'în această etapă' : 'încă'}</b>Cererile apar aici imediat ce cineva completează un formular pe site.</div>}
      </div>
    </>
  );
}
