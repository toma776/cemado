'use client';
// Meniul secundar din Branding: capitolele identității
import {usePathname} from 'next/navigation';

export default function BrandNav({sections}) {
  const path = usePathname();
  const groups = [...new Set(sections.map(s => s.grup))];
  return (
    <nav className="bb-nav" aria-label="Capitolele identității">
      {groups.map(g => (
        <div key={g} style={{display: 'contents'}}>
          <span className="h">{g}</span>
          {sections.filter(s => s.grup === g).map(s => {
            const href = `/manage/branding/${s.slug ? `${s.slug}/` : ''}`;
            const on = s.slug ? path.startsWith(href) : path === '/manage/branding/' || path === '/manage/branding';
            return <a key={s.slug} href={href} className={on ? 'on' : ''}>{s.titlu}</a>;
          })}
        </div>
      ))}
    </nav>
  );
}
