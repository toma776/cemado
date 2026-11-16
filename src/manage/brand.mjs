// Identitatea vizuală CEMADO. Clientul nu are brandbook: totul e adunat din materialele existente
// (logo PNG, fațada magazinului din Buftea, pliantul de energie, site-ul actual) și din designul v1 propus.
// Fiecare valoare spune de unde vine: `sursa: 'logo'` (citit din fișier), 'observat' (din foto / materiale),
// 'propus' (designul v1, de aprobat de client).

export const SURSE = {
  logo: 'cemado-logo-fundal-rosu.png',
  fatada: 'Fotografie fațadă magazin Buftea',
  pliant: 'Pliant „Energie verde” (cemado.ro)',
  site: 'cemado.ro (copie locală 16.11.2026)',
  design: 'Design vizual v1 (canvas, 16.11.2026)'
};

// Capitolele, fiecare cu ruta lui în /manage/branding/
export const SECTIUNI = [
  {slug: '', titlu: 'Prezentare', grup: 'Brand'},
  {slug: 'logo', titlu: 'Logo', grup: 'Identitate'},
  {slug: 'culori', titlu: 'Culori', grup: 'Identitate'},
  {slug: 'tipografie', titlu: 'Tipografie', grup: 'Identitate'},
  {slug: 'voce', titlu: 'Voce și mesaje', grup: 'Identitate'},
  {slug: 'aplicatii', titlu: 'Aplicații', grup: 'În lume'}
];

export const LOGO = {
  fisier: '/brand/logo-fundal-rosu.png',
  descriere: 'Scut alb cu „C” roșu, wordmark CEMADO cu litere albe și sloganul „REZOLVĂ, ASIGURĂ, TRAIEȘTE.” pe un dreptunghi roșu cu colțuri rotunjite.',
  elemente: [
    {nume: 'Scutul cu „C”', text: 'Simbolul: protecție (asigurări) și inițiala brandului. Funcționează singur ca favicon și ca avatar.'},
    {nume: 'Wordmark-ul CEMADO', text: 'Litere bold, sans-serif, cu umbră neagră decalată.'},
    {nume: 'Sloganul', text: '„Rezolvă, asigură, trăiește.”: cele trei verbe acoperă liniile de business (servicii, asigurări, vacanțe).'}
  ],
  variante: [
    {nume: 'Pe fundal roșu', img: '/brand/logo-fundal-rosu.png', fundal: '#FFFFFF', sursa: 'logo', principal: true,
      descriere: 'Singura versiune primită: PNG 3000 × 1040 px, cu fundalul roșu inclus.'},
    {nume: 'CEMADO Trade International', img: '/media/pliant-cemado-energie-verde-1.jpg', fundal: '#FFFFFF', sursa: 'pliant',
      descriere: 'Pe pliantul de energie: scut roșu cu contur, wordmark albastru închis și „TRADE INTERNATIONAL” dedesubt. E o a doua variantă, nedocumentată.'}
  ],
  lipsesc: [
    'Fișier vectorial (SVG / AI / PDF) pentru logo.',
    'Versiune pe fundal alb (pozitiv) și versiune monocromă.',
    'Simbolul (scutul) separat, pentru favicon și social media.',
    'Varianta fără umbră: pe ecrane mici, umbra neagră face literele să pară neclare.'
  ]
};

const C = (nume, hex, rol, sursa) => ({nume, hex, rol, sursa});
export const CULORI = {
  primare: [
    C('Roșu CEMADO', '#B5060E', 'Culoarea brandului: logo, butoane, accente', 'logo'),
    C('Alb', '#FFFFFF', 'Fundal principal, scutul și literele logo-ului', 'logo'),
    C('Grafit', '#161616', 'Text, secțiuni de contrast, footer', 'propus')
  ],
  suport: [
    C('Roșu închis', '#8A0409', 'Hover pe butoane și linkuri', 'propus'),
    C('Roșu deschis', '#FBEAEA', 'Fundal pentru iconițe și benzi', 'propus'),
    C('Nisip', '#F7F4F0', 'Fundal cald pentru secțiuni alternante', 'propus'),
    C('Text secundar', '#4A4541', 'Paragrafe, descrieri', 'propus'),
    C('Linie', '#ECE7E1', 'Borduri de carduri și separatoare', 'propus')
  ],
  inAfaraBrandului: [
    C('Roșu fațadă', '#C0272D', 'Panoul de pe fațada din Buftea: un roșu mai deschis decât cel din logo', 'observat'),
    C('Verde pliant', '#2E8B3A', 'Pliantul de energie verde', 'observat'),
    C('Albastru pliant', '#1C3F7A', 'Pliantul de energie verde: titluri și wordmark', 'observat')
  ]
};

export const TIPOGRAFIE = {
  logo: 'Wordmark-ul din logo e un sans-serif bold de tip grotesc (apropiat de Arial Black / Helvetica Bold). Fontul exact nu e documentat.',
  propus: [
    {rol: 'Titluri', familie: 'Manrope', greutate: 800, mostra: 'Toate într-un singur loc.', regula: '60 / 42 / 22 px, spațiere −2,5 %', sursa: 'propus'},
    {rol: 'Text', familie: 'Inter', greutate: 400, mostra: 'Compari oferte de la mai mulți furnizori, primești explicații clare și poți plăti în rate.', regula: '16 px corp, 19 px lead, interlinie 1,55', sursa: 'propus'},
    {rol: 'Etichete', familie: 'Inter', greutate: 600, mostra: 'ASIGURĂRI · BUFTEA · DIN 2007', regula: '13 px, majuscule, spațiere 8 %', sursa: 'propus'}
  ],
  nota: 'Ambele fonturi sunt gratuite pe Google Fonts și au diacriticele românești complete (ă â î ș ț). Alegerea trebuie aprobată de client.'
};

export const VOCE = {
  slogan: 'Rezolvă, asigură, trăiește.',
  tagline: 'Experiență. Adaptabilitate. Parteneriate durabile.',
  promisiune: 'Telefonie, asigurări, vacanțe și energie solară, toate într-un singur loc, cu un consultant care îți explică opțiunile.',
  principii: [
    {titlu: 'La persoana a doua, „tu”', text: 'Site-ul actual amestecă „tu” (homepage, asigurări) cu „dumneavoastră” (energie, contact). Propunem „tu” peste tot pe site; „dumneavoastră” rămâne pentru documente oficiale și B2B.'},
    {titlu: 'Concret, nu superlativ', text: 'Fără „servicii premium”, „rezultate de top” sau „orientare nativă”. Spunem ce face clientul și ce primește.'},
    {titlu: 'Transparent', text: 'Costuri și condiții la vedere; nicio cifră sau promisiune pe care CEMADO nu o poate susține (cerință ANPC și ASF).'},
    {titlu: 'Aproape de om', text: 'Magazinul din Buftea și consultantul sunt diferențiatorul față de comparatoarele online: îi numim des.'}
  ],
  mesaje: [
    {linie: 'Asigurări', mesaj: 'Compari oferte de la mai mulți asigurători, cu un consultant lângă tine.'},
    {linie: 'Vacanțe', mesaj: 'Spune-ne cum arată vacanța ta ideală, iar noi ne ocupăm de restul.'},
    {linie: 'Energie', mesaj: 'Din energia soarelui, creștem comunități!'},
    {linie: 'Telefonie', mesaj: 'Telefoane în rate doar cu buletinul.'}
  ]
};

export const APLICATII = [
  {titlu: 'Fațada magazinului din Buftea', img: '/brand/fatada-buftea.jpg', sursa: 'fatada',
    detalii: ['Panou roșu cu logo-ul și patru pictograme: Telefoane, Asigurări, Credite, Vacanțe.',
      'Panouri pe vitrine: Plăți facturi · Telefoane în rate doar cu buletinul · Accesorii și gadgeturi · Încărcare cartelă prepaid.',
      'Bannere Destine Holidays (stânga) și Destine Broker (dreapta), fiecare în identitatea partenerului.',
      'Autocolante: TBI Bank, Cartela Vodafone, „Plătește aici”.']},
  {titlu: 'Pliant „Energie verde”', img: '/media/pliant-cemado-energie-verde-1.jpg', sursa: 'pliant',
    detalii: ['Trei panouri: beneficii, cele trei sisteme (rezidențial, agricol, comercial), „De ce CEMADO”.',
      'Identitate verde și albastru, cu logo-ul „CEMADO Trade International”: nu folosește roșul brandului.',
      'Contact: 0761691010 · contact@magtel.ro · www.cemado.ro.']},
  {titlu: 'Site-ul nou (design v1)', img: '/brand/fatada-buftea.jpg', sursa: 'design',
    href: 'https://claude.ai/artifact/94gSmQHAkC3u2EZMFgZn4L',
    detalii: ['Homepage, pagina RCA și styleguide pe canvas.', 'Roșu #B5060E, grafit #161616, nisip #F7F4F0; Manrope + Inter.']}
];

// Ce am observat comparând materialele între ele (nivel: ok / atentie / problema)
export const OBSERVATII = [
  {nivel: 'problema', text: 'Nu există brandbook și nici logo vectorial; avem doar un PNG cu fundal roșu inclus.'},
  {nivel: 'problema', text: 'Sloganul e scris „TRAIEȘTE” pe logo și pe fațadă; corect e „TRĂIEȘTE”.'},
  {nivel: 'atentie', text: 'Două variante de logo circulă în paralel: „CEMADO” alb pe roșu și „CEMADO Trade International” albastru (pliant).'},
  {nivel: 'atentie', text: 'Pliantul de energie folosește verde și albastru, nu roșul brandului. Energia poate avea un accent propriu, dar subordonat roșului.'},
  {nivel: 'atentie', text: 'Roșul de pe fațadă (≈ #C0272D) e mai deschis decât cel din logo (#B5060E).'},
  {nivel: 'atentie', text: 'Tonul de pe site amestecă „tu” și „dumneavoastră”.'},
  {nivel: 'atentie', text: 'Adresele de email sunt pe două domenii: cemado.ro și magtel.ro (inclusiv contact@magtel.ro pe pliantul de energie).'},
  {nivel: 'ok', text: 'Sloganul și cele patru pictograme de pe fațadă (Telefoane, Asigurări, Credite, Vacanțe) sunt coerente cu liniile de business.'}
];
