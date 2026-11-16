// Emailul de notificare pentru o cerere nouă, trimis prin Resend (API REST, fără pachet).
// Setări (variabile de mediu; local în .env.local, pe Vercel în Project Settings → Environment Variables):
//   RESEND_API_KEY      – cheia API Resend; fără ea nu se trimite nimic (cererea rămâne oricum în panou)
//   LEAD_EMAIL_TO       – unde ajung toate cererile (mai multe adrese, separate prin virgulă)
//   LEAD_EMAIL_<SERV>   – opțional, rutare pe linie de business, ex. LEAD_EMAIL_ASIGURARI, LEAD_EMAIL_ENERGIE;
//                         dacă există, cererea pe acea linie merge acolo în loc de LEAD_EMAIL_TO
//   LEAD_EMAIL_FROM     – expeditorul, pe un domeniu verificat în Resend (ex. „Site CEMADO <site@cemado.ro>”)
//   SITE_URL            – adresa site-ului, pentru linkul spre panou (ex. https://cemado.ro)
import {SERVICII} from '../site/menu.mjs';
import {STATUSURI} from './leads.mjs';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const digits = s => String(s ?? '').replace(/\D/g, '');
const intl = tel => { const d = digits(tel); return d.startsWith('40') ? d : d.startsWith('0') ? `4${d}` : d; };

export function recipients(serviciu) {
  const own = process.env[`LEAD_EMAIL_${serviciu.toUpperCase()}`];
  return (own || process.env.LEAD_EMAIL_TO || '').split(',').map(s => s.trim()).filter(Boolean);
}

export function compose(lead, siteUrl = process.env.SITE_URL || 'http://localhost:3000') {
  const serv = SERVICII.find(s => s.key === lead.serviciu)?.label ?? lead.serviciu;
  const panou = `${siteUrl.replace(/\/$/, '')}/manage/cereri/${lead.id}/`;
  const rows = [
    ['Serviciu', [serv, lead.detaliu].filter(Boolean).join(' · ')],
    ['Nume', lead.nume],
    ['Telefon', lead.telefon],
    ['Preferă', lead.canal === 'whatsapp' ? 'WhatsApp' : 'Telefon'],
    ['Detalii', lead.mesaj],
    ['De unde', [lead.sursa, lead.pagina].filter(Boolean).join(' · ')],
    ['Primită', new Date(lead.created_at).toLocaleString('ro-RO', {timeZone: 'Europe/Bucharest'})]
  ].filter(([, v]) => v);
  const btn = (href, label, bg) => `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:#fff;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:600;margin:0 8px 8px 0">${label}</a>`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#161616;max-width:560px">
      <p style="margin:0 0 4px;color:#B5060E;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Cerere nouă de pe site</p>
      <h2 style="margin:0 0 16px;font-size:22px">${esc(serv)}${lead.detaliu ? ` · ${esc(lead.detaliu)}` : ''}: ${esc(lead.nume)}</h2>
      <table cellpadding="7" style="border-collapse:collapse;width:100%;margin-bottom:18px">${rows.map(([k, v]) =>
        `<tr><td style="color:#5F5852;vertical-align:top;white-space:nowrap;border-bottom:1px solid #ECE7E1">${esc(k)}</td><td style="white-space:pre-line;border-bottom:1px solid #ECE7E1">${esc(v)}</td></tr>`).join('')}
      </table>
      ${btn(`tel:${digits(lead.telefon)}`, 'Sună acum', '#B5060E')}${btn(`https://wa.me/${intl(lead.telefon)}`, 'WhatsApp', '#1F8F4E')}${btn(panou, 'Deschide în panou', '#161616')}
      <p style="color:#5F5852;font-size:12.5px;margin-top:18px">Etapa cererii se ține în panou (${STATUSURI.map(s => s.label).join(' → ')}). Clientul și-a dat acordul să fie contactat pentru această cerere.</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nPanou: ${panou}`;
  return {subject: `Cerere nouă · ${serv}${lead.detaliu ? ` · ${lead.detaliu}` : ''} · ${lead.nume}`, html, text};
}

// Trimite emailul; întoarce {ok} sau {skipped}/{error}, fără să arunce (cererea e deja salvată)
export async function notify(lead) {
  const key = process.env.RESEND_API_KEY;
  const to = recipients(lead.serviciu);
  if (!key) return {skipped: 'RESEND_API_KEY nu e setat'};
  if (!to.length) return {skipped: 'LEAD_EMAIL_TO nu e setat'};
  const {subject, html, text} = compose(lead);
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {Authorization: `Bearer ${key}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({from: process.env.LEAD_EMAIL_FROM || 'Site CEMADO <onboarding@resend.dev>', to, subject, html, text})
    });
    return r.ok ? {ok: true} : {error: `Resend ${r.status}: ${(await r.text()).slice(0, 300)}`};
  } catch (e) {
    return {error: `Resend: ${e.message}`};
  }
}
