import {Inter, Manrope} from 'next/font/google';
import {canManageRequest} from '../../../manage/guard.mjs';
import {stats} from '../../../manage/data.mjs';
import {counts as leadCounts} from '../../../core/leads.mjs';
import Nav from '../../../manage/ui/Nav.jsx';
import '../../../manage/manage.css';

const inter = Inter({subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap'});
const manrope = Manrope({subsets: ['latin', 'latin-ext'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'swap'});

// Panoul se randează la fiecare cerere, fără cache: citește mereu data/entitati.json de pe disc
export const dynamic = 'force-dynamic';
export const metadata = {title: 'Panou de administrare · CEMADO', robots: {index: false, follow: false}};

export default async function ManageLayout({children}) {
  const local = await canManageRequest();
  const s = local ? await stats() : null;
  const noi = local ? ((await leadCounts().catch(() => null))?.by.nou ?? 0) : 0;
  const groups = [
    {title: 'Site', items: [
      {href: '/manage/cereri/', label: 'Cereri', icon: 'cereri', n: noi, warn: noi > 0}
    ]},
    {title: 'Brain', items: [
      {href: '/manage/', label: 'Panou', icon: 'panou'},
      {href: '/manage/entitati/', label: 'Entități', icon: 'entitati', n: s?.total},
      {href: '/manage/de-facut/', label: 'De confirmat', icon: 'todo', n: s?.open.length, warn: s?.open.length > 0}
    ]},
    {title: 'Identitate', items: [
      {href: '/manage/branding/', label: 'Branding', icon: 'branding'}
    ]}
  ];
  return (
    <html lang="ro" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <div className="app">
          <aside className="side">
            <a className="logo" href="/manage/"><img className="logo-img" src="/brand/logo-fundal-rosu.png" alt="CEMADO"/><span><small>Brain · panou de administrare</small></span></a>
            {local && <Nav groups={groups}/>}
            <div className="side-card">
              <div className="side-status"><i className={local ? '' : 'ro'}></i><span>{!local ? 'Doar local, până la autentificare' : `Local · entități în JSON · cereri în ${process.env.TURSO_DATABASE_URL ? 'Turso' : 'data/leads.db'}`}</span></div>
              <div className="side-links"><a href="/" target="_blank" rel="noopener">Site ↗</a><a href="https://cemado.ro/" target="_blank" rel="noopener">cemado.ro actual ↗</a></div>
            </div>
          </aside>
          <main className="main">
            {local ? children : <div className="card empty"><b>Panoul cere autentificare</b>Autentificarea nu e încă implementată, așa că panoul merge doar local.</div>}
          </main>
        </div>
      </body>
    </html>
  );
}
