'use client';
// Orice buton „Cere ofertă” de pe site deschide același panou (LeadDrawer), cu serviciul preselectat.
// Comunicarea e printr-un eveniment de fereastră, ca butoanele să poată sta oriunde (header, pagini, footer).
// Pe o pagină cu formular propriu (ex. /firme/, #oferta-firma), un „Cere ofertă” generic duce la acel formular
export const openLead = (serviciu = null, sursa = 'buton', detaliu = '') => {
  const own = !serviciu && document.querySelector('[data-lead-form]');
  if (own) { own.scrollIntoView({behavior: 'smooth', block: 'start'}); own.querySelector('input:not([type=checkbox]), select')?.focus({preventScroll: true}); return; }
  window.dispatchEvent(new CustomEvent('cemado:lead', {detail: {serviciu, sursa, detaliu}}));
};

export default function LeadButton({serviciu, detaliu, sursa, className = 's-btn s-btn-primary', children = 'Cere ofertă', onClick}) {
  return (
    <button type="button" className={className} data-ev="lead_open" data-serviciu={serviciu ?? ''}
      onClick={() => { onClick?.(); openLead(serviciu, sursa, detaliu); }}>
      {children}
    </button>
  );
}
