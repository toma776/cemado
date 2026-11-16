'use client';
// Orice buton „Cere ofertă” de pe site deschide același panou (LeadDrawer), cu serviciul preselectat.
// Comunicarea e printr-un eveniment de fereastră, ca butoanele să poată sta oriunde (header, pagini, footer).
export const openLead = (serviciu = null, sursa = 'buton') =>
  window.dispatchEvent(new CustomEvent('cemado:lead', {detail: {serviciu, sursa}}));

export default function LeadButton({serviciu, sursa, className = 's-btn s-btn-primary', children = 'Cere ofertă', onClick}) {
  return (
    <button type="button" className={className} data-ev="lead_open" data-serviciu={serviciu ?? ''}
      onClick={() => { onClick?.(); openLead(serviciu, sursa); }}>
      {children}
    </button>
  );
}
