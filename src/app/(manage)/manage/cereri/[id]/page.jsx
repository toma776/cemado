// Fișa unei cereri: datele trimise, acțiunile rapide (sună, WhatsApp) și etapa + notele.
import {notFound} from 'next/navigation';
import {get, STATUSURI} from '../../../../../core/leads.mjs';
import {SERVICII} from '../../../../../site/menu.mjs';
import LeadActions from '../../../../../manage/ui/LeadActions.jsx';

const when = s => s ? new Date(s).toLocaleString('ro-RO', {dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Bucharest'}) : '—';
const digits = s => String(s ?? '').replace(/\D/g, '');
const intl = t => { const d = digits(t); return d.startsWith('40') ? d : d.startsWith('0') ? `4${d}` : d; };

export default async function Cerere({params}) {
  const {id} = await params;
  const l = await get(id);
  if (!l) notFound();
  const serv = SERVICII.find(s => s.key === l.serviciu)?.label ?? l.serviciu;
  const rows = [
    ['Serviciu', [serv, l.detaliu].filter(Boolean).join(' · ')],
    ['Telefon', l.telefon], ['Preferă', l.canal === 'whatsapp' ? 'WhatsApp' : 'Telefon'],
    ['Detalii', l.mesaj || '—'], ['Formular', l.sursa || '—'], ['Pagina', l.pagina || '—'],
    ['Primită', when(l.created_at)], ['Email trimis', l.notificat_la ? when(l.notificat_la) : l.notificare_eroare ? `eșuat: ${l.notificare_eroare}` : 'nu']
  ];
  return (
    <>
      <div className="head">
        <div><div className="crumb"><a href="/manage/">manage</a> › <a href="/manage/cereri/">cereri</a> › #{l.id}</div>
          <h1>{l.nume} <span className="tag grey">{serv}</span></h1></div>
        <a className="btn primary" href={`tel:${digits(l.telefon)}`}>Sună {l.telefon}</a>
        <a className="btn" href={`https://wa.me/${intl(l.telefon)}`} target="_blank" rel="noopener">WhatsApp</a>
      </div>
      <div className="card" style={{marginBottom: 14}}>
        <div className="tbl"><table><tbody>{rows.map(([k, v]) => <tr key={k}><td className="muted" style={{width: 140}}>{k}</td><td style={{whiteSpace: 'pre-line'}}>{v}</td></tr>)}</tbody></table></div>
      </div>
      <LeadActions lead={l} statusuri={STATUSURI}/>
    </>
  );
}
