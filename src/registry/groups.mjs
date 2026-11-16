// Registrul grupurilor de entități CEMADO. Fiecare grup e declarat o singură dată aici;
// panoul (/manage/entitati) și, mai târziu, site-ul public citesc de aici etichetele și câmpurile.

// Câmpurile comune tuturor entităților (aceleași ca în modelul Joriside)
export const BASE_FIELDS = [
  {key: 'nume', label: 'Nume', type: 'text', required: true},
  {key: 'categorie', label: 'Categorie', type: 'text'},
  {key: 'subcategorie', label: 'Subcategorie', type: 'text'},
  {key: 'descriere', label: 'Descriere', type: 'textarea', rows: 5},
  {key: 'url', label: 'Link (pagină, tel:, mailto:)', type: 'text'},
  {key: 'imagine', label: 'Imagine (cale din public/ sau URL)', type: 'text', placeholder: 'ex. /brand/fatada-buftea.jpg'},
  {key: 'sursa', label: 'Sursa informației', type: 'text', help: 'De unde știm: cemado.ro, PDF, DOCX, fațadă, client…'},
  {key: 'note', label: 'Note interne', type: 'textarea', rows: 3}
];

// Starea de validare a unei informații. „verificat” = confirmat din sursă sau de client.
export const STARI = [
  {key: 'verificat', tone: 'ok'},
  {key: 'de confirmat', tone: 'warn'},
  {key: 'de actualizat', tone: 'warn'},
  {key: 'de verificat', tone: 'warn'},
  {key: 'lipsește', tone: 'bad'},
  {key: 'în curs', tone: 'grey'}
];
export const OPEN = STARI.filter(s => s.key !== 'verificat').map(s => s.key);
export const tone = stare => STARI.find(s => s.key === stare)?.tone ?? 'grey';

// Secțiunile în care sunt grupate cardurile de pe pagina Entități
export const SECTIONS = [
  {key: 'brand', label: 'Brand și companie', desc: 'Ce e CEMADO: date firmă, identitate, istoric și argumentele pentru care vin clienții.',
    icon: 'M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3'},
  {key: 'oferta', label: 'Ofertă', desc: 'Liniile de business, serviciile, variantele de plată și campaniile active.',
    icon: 'M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8'},
  {key: 'retea', label: 'Rețea și parteneri', desc: 'Magazinele, sediul și partenerii prin care CEMADO livrează serviciile.',
    icon: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'},
  {key: 'prezenta', label: 'Contact și prezență', desc: 'Telefoane, adrese de email, site-urile și documentele publice.',
    icon: 'M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z'}
];

export const GROUPS = [
  {key: 'companie', label: 'Companie', one: 'element de companie', section: 'brand', color: '#B5060E',
    intro: 'Date firmă, identitate (logo, slogan, tagline), echipă și strategie.',
    fields: [
      {key: 'cui', label: 'CUI', type: 'text'},
      {key: 'regCom', label: 'Nr. Reg. Com.', type: 'text'},
      {key: 'anInfiintare', label: 'An înființare', type: 'text'},
      {key: 'capital', label: 'Capital', type: 'text'},
      {key: 'numeComercial', label: 'Nume comercial', type: 'text'}
    ]},
  {key: 'istoric', label: 'Istoric', one: 'moment', section: 'brand', color: '#7A4B2A',
    intro: 'Momentele din parcursul firmei, din 2007 până azi. Ordinea e cea cronologică.',
    fields: [{key: 'an', label: 'An / perioadă', type: 'text', placeholder: 'ex. 2017 sau 2016–2017'}]},
  {key: 'argumente', label: 'Argumente și valori', one: 'argument', section: 'brand', color: '#3D3935',
    intro: 'De ce să aleagă clientul CEMADO: valorile, diferențiatorii și beneficiile pe linii de business.'},

  {key: 'divizii', label: 'Linii de business', one: 'linie de business', section: 'oferta', color: '#B5060E',
    intro: 'Cele șase direcții ale CEMADO; fiecare va avea pagina ei principală pe site.',
    fields: [
      {key: 'paginaNoua', label: 'Pagina pe site-ul nou', type: 'text', placeholder: 'ex. /asigurari/'},
      {key: 'prioritate', label: 'Prioritate', type: 'select', options: ['Ridicată', 'Medie', 'Medie (ulterior)', 'Etapa II', 'Scăzută']}
    ]},
  {key: 'servicii', label: 'Servicii și produse', one: 'serviciu', section: 'oferta', color: '#C2410C',
    intro: 'Serviciile concrete, pe linii de business (categoria = linia de business).'},
  {key: 'finantare', label: 'Finanțare și plată', one: 'variantă de finanțare', section: 'oferta', color: '#0F766E',
    intro: 'Rate, leasing și programe de stat prin care clientul poate plăti.'},
  {key: 'promotii', label: 'Promoții', one: 'promoție', section: 'oferta', color: '#A16207',
    intro: 'Campaniile sezoniere; pe site apar în blocul de promoție, doar cât sunt active.',
    fields: [
      {key: 'activa', label: 'Activă', type: 'select', options: ['Da', 'Nu']},
      {key: 'dataSfarsit', label: 'Valabilă până la', type: 'text', placeholder: 'zz.ll.aaaa'}
    ]},

  {key: 'locatii', label: 'Locații', one: 'locație', section: 'retea', color: '#1D4ED8',
    intro: 'Magazinele și sediul. Datele de aici trebuie să fie identice cu Google Business Profile.',
    fields: [
      {key: 'tip', label: 'Tip locație', type: 'select', options: ['Magazin', 'Sediu', 'Birou', 'Altele']},
      {key: 'adresa', label: 'Adresă', type: 'text'},
      {key: 'oras', label: 'Oraș', type: 'text'},
      {key: 'judet', label: 'Județ', type: 'text'},
      {key: 'telefon', label: 'Telefon', type: 'text'},
      {key: 'email', label: 'Email', type: 'text'},
      {key: 'program', label: 'Program', type: 'text', placeholder: 'ex. L–V 09:00–19:00, S 10:00–14:00'}
    ]},
  {key: 'parteneri', label: 'Parteneri', one: 'partener', section: 'retea', color: '#4338CA',
    intro: 'Operatorul, brokerul, agenția de turism și finanțatorii. Logo-urile lor se afișează doar cu acord.'},

  {key: 'contact', label: 'Contact', one: 'canal de contact', section: 'prezenta', color: '#15803D',
    intro: 'Telefoane, adrese de email, WhatsApp și social media.'},
  {key: 'site-uri', label: 'Site-uri', one: 'site', section: 'prezenta', color: '#0369A1',
    intro: 'Domeniile CEMADO și rolul fiecăruia.'},
  {key: 'documente', label: 'Documente', one: 'document', section: 'prezenta', color: '#525252',
    intro: 'Pliante, prezentări și documente legale.'}
];

export const group = key => GROUPS.find(g => g.key === key);
export const fieldsOf = key => [...BASE_FIELDS, ...(group(key)?.fields ?? [])];
