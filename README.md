# CEMADO

Site-ul umbrelă CEMADO (telefonie, asigurări, vacanțe, energie solară) și panoul de administrare al brandului, în Next.js 16.

```bash
npm install
npm run dev
```

- Site: http://localhost:3000/
- Panou: http://localhost:3000/manage/ (doar local, până la autentificare)

## Date

| Ce | Unde | În git |
|---|---|---|
| Entitățile brandului (firmă, servicii, locații, parteneri…) | `data/entitati.json`, editate din `/manage/entitati/` | da |
| Cererile din formulare | local `data/leads.db` (SQLite), pe Vercel Turso | nu (date personale) |
| Copia de lucru a cemado.ro actual | `_referinta-cemado-ro/` | nu |

## Cereri (lead-uri)

Fiecare formular („Cere ofertă”, „Te sunăm noi”) trimite la `POST /api/leads/`. Cererea **se salvează întâi** în baza de date și apare în `/manage/cereri/`, unde are etapă și note. Abia după răspuns pleacă **emailul** de notificare prin Resend, cu butoane „Sună acum”, „WhatsApp” și „Deschide în panou”. Dacă emailul eșuează, cererea rămâne în panou, marcată „email eșuat”.

Pentru Vercel:
1. Vercel → Marketplace → **Turso**: conectează o bază la proiect (pune `TURSO_DATABASE_URL` și `TURSO_AUTH_TOKEN`). Tabelul se creează singur la prima cerere.
2. **Resend**: cont, cheie API (`RESEND_API_KEY`), apoi verifică domeniul cemado.ro (DNS) ca să poți trimite de pe `site@cemado.ro`.
3. Setează `LEAD_EMAIL_TO` și, opțional, `LEAD_EMAIL_<LINIE>` pentru rutare pe linii de business. Toate variabilele sunt în `.env.example`.

Panoul `/manage` rămâne închis pe Vercel până la autentificare. Ca să vezi local cererile reale, pune variabilele Turso în `.env.local`.

## Indexare

Tot site-ul e `noindex` până la lansare: antetul `X-Robots-Tag` în `next.config.mjs`, plus `robots` în metadata layout-urilor.
