// Pagină provizorie până la construirea site-ului după designul v1
export default function Home() {
  return (
    <main style={{minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center'}}>
      <div>
        <img src="/brand/logo-fundal-rosu.png" alt="CEMADO – Rezolvă, asigură, trăiește" style={{width: 280, maxWidth: '100%', height: 'auto'}}/>
        <p style={{fontSize: 18, margin: '24px 0 8px'}}>Site-ul nou CEMADO e în lucru.</p>
        <p style={{margin: 0, color: '#4A4541'}}><a href="/manage/" style={{color: '#B5060E', fontWeight: 600}}>Panou de administrare →</a></p>
      </div>
    </main>
  );
}
