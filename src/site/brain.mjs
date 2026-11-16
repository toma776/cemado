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
