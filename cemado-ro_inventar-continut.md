# cemado.ro – inventar de conținut (extras 12.11.2026)

Sursă de **date**, nu de structură. Site-ul nou nu moștenește arhitectura, ierarhia sau copy-ul de aici.

## Date firmă (de păstrat, de verificat cu clientul)
- CEMADO TRADE INTERNATIONAL SRL · CUI RO21693350 · Reg. Com. J2007008857405
- Sediu: Bd. Basarabia nr. 62, Bl. 34, Sc. B, Ap. 54, București · fix 0314 194 083 · mobil 0724 306 100
- Magazin Buftea: Șos. București–Târgoviște nr. 124, Buftea, Ilfov · 0761 691 010
- E-mail: contact@cemado.ro, magazin.buftea@magtel.ro
- Slogan: „Rezolvă, asigură, trăiește.” · Tagline: „Experiență. Adaptabilitate. Parteneriate durabile.”
- WhatsApp click-to-chat activ (număr de confirmat)

## Pagini existente
| URL | Ce conține |
|---|---|
| `/` | Banner Black Friday, intro, telecom (abonamente / dispozitive / accesorii), „Brokerul tău”, energie, despre noi |
| `/brokerul-tau-de-asigurare/` | RCA/CASCO, locuințe, viață și sănătate, pensie privată, călătorii, credite și leasing; „Cum lucrăm” în 3 pași; formular |
| `/brokerul-tau-de-vacante/` | Destinații, pachete personalizate, early booking/last minute, asistență; 3 pași; formular |
| `/consultanta-energie-verde/` | Sistem rezidențial / agricol / comercial (10 kW – sute de kW), beneficii, „De ce CEMADO”, programe de finanțare (Casa Verde Fotovoltaice, AFIR), pliant PDF, formular |
| `/despre-noi/` | Istoric 2007 → Vodafone 2026 (aproape identic cu PDF-ul de prezentare) |
| `/contact/` | Adrese, telefoane, formular |
| `/politica-de-confidentialitate/` | GDPR |

## Informații utile de reutilizat (ca fapte, rescrise)
- Asigurări: tipurile de poliță de mai sus + promisiunea „comparăm ofertele mai multor asigurători”.
- Vacanțe: litoral, city break, circuite, exotic; early booking / last minute.
- Energie: segmentarea rezidențial / agricol / comercial e bună și diferențiatoare (accent pe mediul rural, ferme, irigații). Pliantul existent trebuie recuperat.
- Telecom: rate prin TBI, Card Avantaj (Nexent), UniCredit; încasare facturi, coletărie, prepay.

## Ce NU preluăm
- Structura one-page cu tot amestecat pe homepage și telecomul fără pagină proprie.
- Copy generic sau umflat („servicii premium”, „rezultate de top”, „orientare nativă”, emoji în titluri).
- Banner promoțional sezonier ca element principal pe homepage.
- Formulare identice (nume / e-mail / telefon / mesaj), fără câmpuri de calificare.

## Probleme tehnice constatate
- WordPress + page builder Pagelayer; scripturi jQuery și lightbox încărcate peste tot.
- Nu am găsit GA4/GTM în pagină, deci probabil nu există tracking de conversii.
- Homepage și Contact nu au meta description. Pe celelalte pagini, description e textul paginii trunchiat automat.
- Schema Organization are `name` gol, logo fără URL, nu are LocalBusiness, adresă sau telefon.
- Pe homepage, H2-ul de Black Friday stă deasupra H1-ului („Experiență și Adaptabilitate”), care nu spune ce face firma.
- Cookie banner de la un terț (hu-manity) cu greșeli („strictul necear”).
- Nu există pagini pentru telecom / magazinul Buftea, pentru B2B sau pentru magtel.ro.

## De clarificat cu clientul
- Otopeni (franciza Vodafone) vs. Buftea (magazin propriu): sunt două magazine? Care apare pe site?
- „Asistent în brokeraj” (Despre noi) vs. „brokerul tău” (titluri de pagină): formularea trebuie validată cu Destine din cauza cerințelor ASF.
- „Destine Holding” vs. „Destine Broker” / „Destine Holidays”: ce nume folosim.
- Se păstrează domeniul și URL-urile actuale (pentru redirecturi 301)?
