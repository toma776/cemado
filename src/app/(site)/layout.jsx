// Layout-ul site-ului public CEMADO: header (meniu + mega-meniu), conținutul paginii, footer și panoul „Cere ofertă”.
// Datele de contact vin din Brain (data/entitati.json), deci se schimbă din /manage.
import {Inter, Manrope} from 'next/font/google';
import {siteData} from '../../site/brain.mjs';
import Header from '../../site/ui/Header.jsx';
import Footer from '../../site/ui/Footer.jsx';
import LeadDrawer from '../../site/ui/LeadDrawer.jsx';
import '../../site/site.css';

const inter = Inter({subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap'});
const manrope = Manrope({subsets: ['latin', 'latin-ext'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'swap'});

// Până la lansare nimic nu se indexează (vezi și antetul X-Robots-Tag din next.config.mjs)
export const metadata = {title: 'CEMADO · Telefonie, asigurări, vacanțe și energie solară', robots: {index: false, follow: false}};
export const dynamic = 'force-dynamic';

export default async function SiteLayout({children}) {
  const c = await siteData();
  return (
    <html lang="ro" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a href="#continut" className="s-skip">Sari la conținut</a>
        <Header c={c}/>
        <main id="continut">{children}</main>
        <Footer c={c}/>
        <LeadDrawer c={c}/>
      </body>
    </html>
  );
}
