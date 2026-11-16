# cemado.ro – propunere de arhitectură (v1, 12.11.2026)

## Principii
1. **Fiecare linie de business are pagina ei de conversie.** Homepage-ul doar trimite vizitatorul mai departe, nu vinde el.
2. **Doi vizitatori principali:** persoana fizică din Buftea / Ilfov și firma. Firma are intrare separată.
3. **Magazinul fizic e un atu.** „Vino în Buftea” e CTA secundar peste tot: încredere plus SEO local.
4. **Formular de calificare pe fiecare serviciu,** nu „nume / e-mail / mesaj”. Fiecare trimitere e un eveniment de conversie separat în GA4.
5. **Se poate extinde fără refacere.** Hub-urile primesc subpagini noi fără să schimbăm meniul.

## Sitemap
```
/                                   Acasă
│
├── /telefonie/                     Telefonie și magazin (hub)
│   ├── /telefonie/abonamente/      Abonamente și internet Vodafone
│   ├── /telefonie/telefoane-in-rate/   Telefoane, gadgeturi, electrocasnice + finanțare (TBI, Card Avantaj, UniCredit)
│   └── /telefonie/servicii-magazin/    Facturi utilități, prepay toți operatorii, coletărie
│
├── /asigurari/                     Asigurări (hub + formular general)
│   ├── /asigurari/rca/
│   ├── /asigurari/casco/
│   ├── /asigurari/locuinta/
│   ├── /asigurari/viata-sanatate/
│   ├── /asigurari/calatorie/
│   └── /asigurari/pensie-privata/
│
├── /credite-leasing/               Credite și leasing (prin Destine)
│
├── /vacante/                       Vacanțe (o singură pagină puternică în faza 1)
│
├── /energie-solara/                Energie solară (hub)
│   ├── /energie-solara/casa/       Rezidențial
│   ├── /energie-solara/ferma/      Agricol: pompe, irigații, grajduri
│   ├── /energie-solara/firma/      Comercial: 10 kW – sute de kW
│   └── /energie-solara/finantare/  Casa Verde, AFIR, rate Grenke / TBI
│
├── /firme/                         Pentru firme: B2B cross-sell
│                                   (abonamente business, asigurări firme, fotovoltaice comerciale, flote)
│
├── /magazine/                      Magazinele noastre
│   ├── /magazine/buftea/           Pagină de locație: program, hartă, servicii disponibile
│   └── /magazine/otopeni/          (dacă se confirmă că e magazin public CEMADO)
│
├── /despre-noi/                    Poveste 2007 → azi, parteneri, echipă
├── /contact/
├── /cere-oferta/                   Formular universal cu selector de serviciu (fallback pentru CTA global)
│
├── /ghiduri/                       Faza 2: articole SEO (ex. „Cât costă un sistem fotovoltaic de 5 kW”)
│
└── Legal: /politica-de-confidentialitate/, /politica-cookies/, /termeni/, ANPC / SOL
```
**magtel.ro** apare în meniu ca link extern („Magazin online ↗”). Nu îl dublăm cu pagini pe cemado.ro.

## Meniu principal
`Telefonie` · `Asigurări` · `Vacanțe` · `Energie solară` · `Pentru firme` · `Magazine` · `Despre` · **[Cere ofertă]** · ☎ 0761 691 010 · `magtel.ro ↗`

- Mobil: bară fixă jos cu **Sună** · **WhatsApp** · **Cere ofertă**.
- Footer: date firmă (CUI, Reg. Com.), ambele adrese, program, toate serviciile, linkuri legale, ANPC / SOL.

## Homepage (ordinea blocurilor)
1. **Hero:** ce face CEMADO într-o propoziție („Telefonie, asigurări, vacanțe și energie solară, sub același acoperiș, în Buftea”), plus CTA „Cere ofertă” și „Vino în magazin”.
2. **4 carduri de servicii,** fiecare duce la hub-ul lui.
3. **De ce CEMADO:** din 2007, magazin fizic, compari oferte de la mai mulți furnizori, rate.
4. **Pentru firme:** bandă scurtă care duce la /firme/.
5. **Magazinul din Buftea:** hartă, program, servicii rapide (facturi, prepay, colete).
6. **Parteneri:** Vodafone, Destine, TBI, UniCredit etc. (cu acordul lor de brand).
7. **Bloc de promoții** modular, pentru campanii sezoniere (Black Friday etc.). Nu ține locul hero-ului.
8. **CTA final + contact.**

## Șablon pentru paginile de serviciu
Hero cu promisiune + CTA → ce acoperă → cum lucrăm (3 pași) → de ce prin CEMADO → FAQ (schema FAQPage) → formular de calificare → contact / magazin.

## Formulare de calificare (câmpuri specifice)
| Serviciu | Câmpuri cheie |
|---|---|
| RCA / CASCO | tip vehicul, nr. înmatriculare / marcă, data expirării poliței, PF / PJ |
| Locuință | tip imobil, suprafață, localitate |
| Vacanțe | destinație / tip, perioadă, nr. persoane, buget |
| Energie solară | tip (casă / fermă / firmă), factură medie lunară, localitate, interes finanțare |
| Telefonie | abonament nou / portare / telefon în rate, PF / PJ |
| Firme | nr. angajați, servicii de interes (bife multiple) |
Toate au: nume, telefon (obligatoriu), e-mail (opțional), canal preferat (telefon / WhatsApp), GDPR.

## Măsurare (din ziua 1)
GA4 + GTM + Search Console + Google Business Profile (Buftea). Conversii separate: `lead_asigurari`, `lead_vacante`, `lead_energie`, `lead_telefonie`, `lead_firme`, `click_telefon`, `click_whatsapp`, `click_magtel`, `click_directii`.

## SEO local și tehnic
- Schema: Organization (complet), LocalBusiness / Store pentru fiecare magazin, Service pe paginile de serviciu, FAQPage, BreadcrumbList.
- Titluri cu intenție + localitate unde are sens („Asigurare RCA Buftea – compari oferte | CEMADO”).
- Redirecturi 301: `/brokerul-tau-de-asigurare/` → `/asigurari/`, `/brokerul-tau-de-vacante/` → `/vacante/`, `/consultanta-energie-verde/` → `/energie-solara/`.

## Faze
- **Faza 1 (MVP):** Acasă, cele 4 hub-uri, /energie-solara/ cu 3 subpagini + finanțare, /firme/, /magazine/buftea/, Despre, Contact, Cere ofertă, legal, tracking. Asigurări: hub + RCA și CASCO (volum mare de căutări).
- **Faza 2:** restul subpaginilor de asigurări, subpaginile de telefonie, /credite-leasing/, /ghiduri/.
- **Faza 3:** landing pages dedicate campaniilor PPC / Meta (în afara meniului, `noindex` unde e cazul).

## De validat cu clientul
- Otopeni: magazin CEMADO afișabil public sau doar franciză operată separat?
- Formularea pentru asigurări (asistent în brokeraj / Destine), plus acordurile de folosire a logo-urilor partenerilor.
- Credite și leasing: le promovăm activ sau doar le menționăm?
- Cine răspunde la lead-uri pe fiecare serviciu (telefon / e-mail de rutare)?
