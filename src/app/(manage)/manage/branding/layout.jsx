// Branding: meniul capitolelor în stânga, capitolul curent în dreapta.
import {SECTIUNI} from '../../../../manage/brand.mjs';
import BrandNav from '../../../../manage/ui/BrandNav.jsx';
import '../../../../manage/brand.css';

export default function BrandingLayout({children}) {
  return (
    <div>
      <div className="head"><div><div className="crumb"><a href="/manage/">manage</a> › identitate</div><h1>Branding</h1></div></div>
      <p className="bb-src">Fără brandbook: adunat din logo, fațada magazinului, pliantul de energie și site-ul actual, plus designul v1 propus (marcat „propus”).</p>
      <div className="bb">
        <BrandNav sections={SECTIUNI}/>
        <div className="bb-main">{children}</div>
      </div>
    </div>
  );
}
