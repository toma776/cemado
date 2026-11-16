// „Metoda CEMADO”: același parcurs în 4 pași pentru toate liniile de business.
// Asta unifică experiența: produsele diferă, felul în care lucrăm cu clientul e același.
// Textele pe linii vin din materialele existente (site, pliant, prezentare); nicio promisiune în plus.

export const PASI = [
  {key: 'nevoie', titlu: 'Ne spui ce ai nevoie', scurt: 'Online, la telefon sau în magazin.'},
  {key: 'variante', titlu: 'Îți arătăm variantele', scurt: 'Comparate, cu costurile la vedere.'},
  {key: 'alegi', titlu: 'Alegi și plătești cum îți convine', scurt: 'Integral sau în rate, prin partenerii noștri.'},
  {key: 'alaturi', titlu: 'Rămânem alături', scurt: 'Și după ce ai semnat.'}
];

export const PE_LINII = [
  {key: 'asigurari', label: 'Asigurări', exemplu: 'RCA pentru mașina ta', pasi: [
    'Ne trimiți datele mașinii, ale casei sau ce vrei să asiguri.',
    'Comparăm ofertele mai multor asigurători: prețuri și acoperiri, una lângă alta.',
    'Alegi varianta, iar noi emitem polița.',
    'Rămânem alături pe toată durata poliței, inclusiv la reînnoire.'
  ]},
  {key: 'telefonie', label: 'Telefonie', exemplu: 'Un telefon nou în rate', pasi: [
    'Abonament nou, portare de la alt operator sau un telefon nou.',
    'Îți recomandăm abonamentul și telefonul potrivite felului în care le folosești.',
    'Plătești cash sau în rate, prin TBI Bank sau Card Avantaj.',
    'Configurăm telefonul și te ajutăm cu accesorii și suport.'
  ]},
  {key: 'vacante', label: 'Vacanțe', exemplu: 'O vacanță la mare', pasi: [
    'Ne spui perioada, bugetul și cu cine pleci.',
    'Îți trimitem cele mai bune variante de la partenerii noștri, explicate clar.',
    'Ne ocupăm de rezervări și de documentele de călătorie.',
    'Te sprijinim de la prima discuție până te întorci acasă.'
  ]},
  {key: 'energie', label: 'Energie solară', exemplu: 'Panouri pentru casă', pasi: [
    'Pornim de la facturile tale și de la locul instalării.',
    'Dimensionăm sistemul pentru consumul tău: casă, fermă sau firmă.',
    'Cash, rate TBI, leasing Grenke sau programe ca Casa Verde și AFIR.',
    'Montaj, punere în funcțiune, suport tehnic și mentenanță.'
  ]}
];
