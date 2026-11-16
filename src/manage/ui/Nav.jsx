'use client';
// Meniul din stânga: grupurile și numărătorile vin de pe server, elementul activ din adresa curentă
import {usePathname} from 'next/navigation';

const ICONS = {
  panou: 'M4 13h6V4H4zM14 20h6v-9h-6zM14 4v4h6V4zM4 20h6v-4H4z',
  entitati: 'M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
  cereri: 'M4 6h16v12H4zM4 7l8 6 8-6',
  todo:'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  branding: 'M12 3a9 9 0 1 0 0 18c1 0 1.6-.8 1.6-1.6 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4-4-7.4-9-7.4zM7.5 12a1 1 0 1 0 0 .01M10 8a1 1 0 1 0 0 .01M15 8a1 1 0 1 0 0 .01'
};

export default function Nav({groups}) {
  const path = usePathname();
  const active = href => (href === '/manage/' ? path === '/manage/' || path === '/manage' : path.startsWith(href));
  return (
    <nav>
      {groups.map(g => (
        <div key={g.title}>
          <span className="nav-h">{g.title}</span>
          {g.items.map(i => (
            <a key={i.href} href={i.href} className={active(i.href) ? 'active' : ''}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[i.icon]}/></svg>
              <span>{i.label}</span>
              {i.n ? <span className={`n ${i.warn ? 'warn' : ''}`}>{i.n}</span> : null}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}
