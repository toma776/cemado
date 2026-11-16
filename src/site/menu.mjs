// Structura navigației site-ului umbrelă CEMADO.
// Meniul e organizat pe nevoia vizitatorului (linia de business), nu pe structura firmei:
// fiecare linie are subserviciile ei și o acțiune principală (lead), afișată ca card în mega-meniu.
// Datele de contact și de locație NU stau aici: vin din Brain (data/entitati.json), prin src/site/brain.mjs.

// Serviciile din formularul „Cere ofertă”: cheia ajunge în lead și în evenimentul GA4 (lead_<cheie>)
export const SERVICII = [
  {key: 'telefonie', label: 'Telefonie', hint: 'Abonamente, telefoane în rate',
    intrebare: {label: 'Ce te interesează?', options: ['Abonament nou', 'Portare de la alt operator', 'Telefon sau gadget în rate', 'Altceva']}},
  {key: 'asigurari', label: 'Asigurări', hint: 'RCA, CASCO, locuință, viață',
    intrebare: {label: 'Ce vrei să asiguri?', options: ['RCA', 'CASCO', 'Locuință', 'Viață și sănătate', 'Călătorie', 'Pensie privată', 'Firmă']}},
  {key: 'vacante', label: 'Vacanțe', hint: 'Sejururi, circuite, city break',
    intrebare: {label: 'Ce fel de vacanță cauți?', options: ['Litoral / sejur', 'Circuit', 'City break', 'Exotic', 'Încă nu știu']}},
  {key: 'energie', label: 'Energie solară', hint: 'Fotovoltaice pentru casă, fermă, firmă',
    intrebare: {label: 'Pentru ce e sistemul?', options: ['Casă', 'Fermă / gospodărie', 'Firmă']}},
  {key: 'firme', label: 'Pentru firme', hint: 'Telefonie, asigurări, energie B2B',
    intrebare: {label: 'Ce servicii vă interesează?', options: ['Abonamente business', 'Asigurări firmă / flotă', 'Fotovoltaice comerciale', 'Mai multe']}},
  {key: 'altceva', label: 'Altceva', hint: 'Spune-ne și te îndrumăm', intrebare: null}
];

const ICON = {
  telefonie: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',
  asigurari: 'M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3zM9 12l2 2 4-4',
  vacante: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
  energie: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  firme: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 10h.01M15 10h.01',
  magazin: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
};
export const icon = k => ICON[k];

// Liniile de business: fiecare devine un buton cu mega-meniu în header și o coloană în footer
export const LINII = [
  {key: 'telefonie', label: 'Telefonie', href: '/telefonie/', icon: 'telefonie',
    intro: 'Abonamente Vodafone, telefoane și gadgeturi în rate, plus serviciile rapide din magazin.',
    items: [
      {label: 'Abonamente și internet', desc: 'Telefonie mobilă și internet Vodafone', href: '/telefonie/abonamente/'},
      {label: 'Telefoane în rate', desc: 'Telefoane, tablete, gadgeturi, electrocasnice', href: '/telefonie/telefoane-in-rate/'},
      {label: 'Accesorii și configurare', desc: 'Huse, folii, încărcătoare, setare telefon', href: '/telefonie/servicii-magazin/#accesorii'},
      {label: 'Plăți facturi și prepay', desc: 'Utilități, reîncărcare toți operatorii, colete', href: '/telefonie/servicii-magazin/'}
    ],
    actiune: {titlu: 'Telefon nou în rate, doar cu buletinul', text: 'Prin TBI Bank și Card Avantaj, în condițiile fiecărui partener.', cta: 'Cere ofertă', serviciu: 'telefonie'}},
  {key: 'asigurari', label: 'Asigurări', href: '/asigurari/', icon: 'asigurari',
    intro: 'Compari oferte de la mai mulți asigurători, cu un consultant lângă tine.',
    items: [
      {label: 'RCA', desc: 'Obligatorie, cu sau fără decontare directă', href: '/asigurari/rca/'},
      {label: 'CASCO', desc: 'Daunele propriei mașini', href: '/asigurari/#casco'},
      {label: 'Locuință', desc: 'PAD și asigurare facultativă', href: '/asigurari/#locuinta'},
      {label: 'Viață și sănătate', desc: 'Protecție pentru tine și familie', href: '/asigurari/#viata-sanatate'},
      {label: 'Călătorie', desc: 'Medicală și storno', href: '/asigurari/#calatorie'},
      {label: 'Pensie privată', desc: 'Pilonul III', href: '/asigurari/#pensie-privata'}
    ],
    actiune: {titlu: 'Îți expiră RCA-ul?', text: 'Trimite poza talonului și primești variantele pe WhatsApp sau pe email.', cta: 'Ofertă RCA', href: '/asigurari/rca/'}},
  {key: 'vacante', label: 'Vacanțe', href: '/vacante/', icon: 'vacante',
    intro: 'Sejururi, circuite și city break-uri prin Destine Holidays, cu asistență de la rezervare până la întoarcere.',
    items: [
      {label: 'Litoral și sejururi', desc: 'România, Grecia, Turcia și nu numai', href: '/vacante/#sejururi'},
      {label: 'Circuite', desc: 'Culturale, în grup sau personalizate', href: '/vacante/#circuite'},
      {label: 'City break', desc: 'Escapade scurte în Europa', href: '/vacante/#city-break'},
      {label: 'Early booking și last minute', desc: 'Ofertele momentului, comparate', href: '/vacante/#oferte'}
    ],
    actiune: {titlu: 'Spune-ne cum arată vacanța ta ideală', text: 'Primești o ofertă personalizată, pe bugetul tău.', cta: 'Planifică vacanța', serviciu: 'vacante'}},
  {key: 'energie', label: 'Energie solară', href: '/energie-solara/', icon: 'energie',
    intro: 'Sisteme fotovoltaice la cheie, cu sprijin la finanțare: Casa Verde, AFIR, rate.',
    items: [
      {label: 'Pentru casă', desc: 'Panouri, invertor, baterii opțional', href: '/energie-solara/#casa'},
      {label: 'Pentru fermă', desc: 'Pompe, irigații, grajduri', href: '/energie-solara/#ferma'},
      {label: 'Pentru firmă', desc: 'De la 10 kW la sute de kW', href: '/energie-solara/#firma'},
      {label: 'Finanțare', desc: 'Casa Verde, AFIR, TBI, Grenke', href: '/energie-solara/#finantare'}
    ],
    actiune: {titlu: 'Ce sistem îți trebuie?', text: 'Află în 30 de secunde, pornind de la consumul de pe factura ta.', cta: 'Calculează sistemul', href: '/energie-solara/#calculator'}}
];

// Linkurile simple din header, după liniile de business
export const LINKURI = [
  {label: 'Pentru firme', href: '/firme/'},
  {label: 'Magazin Buftea', href: '/magazine/buftea/'}
];

// Coloanele din footer care nu sunt linii de business
export const FOOTER_COMPANIE = [
  {label: 'Despre CEMADO', href: '/despre-noi/'},
  {label: 'Pentru firme', href: '/firme/'},
  {label: 'Magazinele noastre', href: '/magazine/'},
  {label: 'Parteneri', href: '/despre-noi/#parteneri'},
  {label: 'Contact', href: '/contact/'}
];

export const LEGAL = [
  {label: 'Politica de confidențialitate', href: '/politica-de-confidentialitate/'},
  {label: 'Politica de cookies', href: '/politica-cookies/'},
  {label: 'Termeni și condiții', href: '/termeni/'},
  {label: 'ANPC', href: 'https://anpc.ro/', ext: true},
  {label: 'ANPC – SAL', href: 'https://anpc.ro/ce-este-sal/', ext: true},
  {label: 'Platforma SOL', href: 'https://ec.europa.eu/consumers/odr', ext: true}
];
