// Site-ul citește datele de contact, locațiile și firma din Brain (data/entitati.json),
// ca o modificare făcută în /manage să apară peste tot fără să atingem codul.
import {load} from '../core/store.mjs';

const tel = s => (s ?? '').replace(/[^\d+]/g, '');

export async function siteData() {
  const {entitati} = await load();
  const byId = id => entitati.find(e => e.id === id) ?? {};
  const firma = byId(1);
  const magazin = byId(70);
  const sediu = byId(71);
  const telefon = byId(100).descriere?.match(/[\d ]{10,}/)?.[0]?.trim() ?? magazin.telefon;
  return {
    firma: {nume: firma.nume, cui: firma.cui, regCom: firma.regCom, an: firma.anInfiintare},
    slogan: 'Rezolvă, asigură, trăiește.',
    telefon: {afisat: telefon, href: `tel:${tel(telefon)}`},
    whatsapp: `https://wa.me/4${tel(telefon)}`,
    email: byId(103).nume,
    magazin: {
      nume: magazin.nume, adresa: magazin.adresa, oras: magazin.oras, judet: magazin.judet,
      program: magazin.program || '', telefon: magazin.telefon, email: magazin.email,
      harta: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`CEMADO ${magazin.adresa}, ${magazin.oras}`)}`
    },
    sediu: {adresa: sediu.adresa, oras: sediu.oras, telefon: sediu.telefon}
  };
}

// Datele homepage-ului: istoricul (dovada longevității), argumentele, partenerii, promoția activă.
// Afișăm doar ce există în Brain; ce lipsește (ex. testimoniale) nu se inventează.
export async function homeData() {
  const {entitati} = await load();
  const of = g => entitati.filter(e => e.grup === g);
  // Istoricul e în ordinea din Brain (cronologică); eticheta de timp e partea din titlu dinaintea „·” (ex. „Iulie 2026”)
  const split = e => { const [t, ...rest] = e.nume.split(' · '); return rest.length ? [t, rest.join(' · ')] : [e.an, e.nume]; };
  return {
    istoric: of('istoric').sort((a, b) => a.id - b.id).map(e => { const [an, titlu] = split(e); return {an, titlu, text: e.descriere?.split(/(?<=\.)\s/)[0]}; }),
    valori: of('argumente').filter(e => e.categorie === 'Valori').map(e => ({titlu: e.nume, text: e.descriere})),
    // Partenerii activi (fără cei istorici și fără cei încă neidentificați)
    parteneri: of('parteneri').filter(e => e.stare !== 'lipsește' && !/istoric|încheiate/i.test(`${e.nume} ${e.subcategorie}`)).map(e => ({nume: e.nume, rol: e.categorie})),
    promotie: of('promotii').find(e => e.activa === 'Da') ?? null,
    servicii: of('servicii').length
  };
}
