// Trimiterea comună pentru toate formularele site-ului: POST /api/leads + evenimentul GA4 lead_<serviciu>
export async function sendLead(payload) {
  const body = {...payload, pagina: location.pathname};
  const r = await fetch('/api/leads/', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(body)}).catch(() => null);
  const j = r ? await r.json().catch(() => ({})) : {};
  if (r?.ok) {
    window.dataLayer?.push({event: `lead_${payload.serviciu}`, sursa: payload.sursa, detaliu: payload.detaliu});
    return {ok: true, id: j.id};
  }
  return {ok: false, errors: j.errors ?? {}, error: j.error ?? 'Nu am putut trimite cererea. Sună-ne direct și te ajutăm.'};
}
