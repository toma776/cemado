// Site-ul public CEMADO. Deocamdată doar o pagină provizorie; paginile vin după aprobarea designului v1.
export const metadata = {title: 'CEMADO · Rezolvă, asigură, trăiește', robots: {index: false, follow: false}};

export default function SiteLayout({children}) {
  return (
    <html lang="ro">
      <body style={{margin: 0, fontFamily: 'system-ui, sans-serif', background: '#F7F4F0', color: '#161616'}}>{children}</body>
    </html>
  );
}
