// Pagina principală, provizorie: doar contextul pentru header și footer, până construim secțiunile din designul v1.
import LeadButton from '../../site/ui/LeadButton.jsx';

export default function Home() {
  return (
    <section style={{background: 'var(--sand)'}}>
      <div className="s-wrap" style={{padding: '96px 24px 120px', maxWidth: 900}}>
        <p className="s-eyebrow">Buftea · Ilfov · din 2007</p>
        <h1 style={{font: '800 clamp(38px, 5vw, 60px)/1.04 var(--display)', letterSpacing: '-.025em', margin: '0 0 20px'}}>Telefonie, asigurări, vacanțe și energie solară. <span style={{color: 'var(--red)'}}>Toate într-un singur loc.</span></h1>
        <p style={{fontSize: 19, color: 'var(--muted)', margin: '0 0 32px', maxWidth: 560}}>Pagina principală se construiește după designul v1. Deocamdată sunt gata meniul, panoul „Cere ofertă” și footer-ul.</p>
        <LeadButton sursa="hero">Cere o ofertă</LeadButton>
      </div>
    </section>
  );
}
