// Calculatorul fotovoltaic: estimare ORIENTATIVĂ a dimensiunii sistemului, din consumul anual.
// Nu calculăm prețuri, economii în lei sau amortizare: depind de tarife, de oferta partenerului și de compensarea
// ca prosumator, pe care nu le avem. Oferta exactă vine după analiza consumului și vizita la fața locului.
//
// DE VALIDAT cu partenerul energetic înainte de lansare (valorile de mai jos sunt medii uzuale, nu oferte):
export const IPOTEZE = {
  productieKwhPeKwp: 1250,   // producție anuală medie pe 1 kWp instalat, sudul României / Ilfov (kWh/an)
  putereaPanouluiWp: 450,    // un panou monocristalin uzual (Wp)
  suprafataPanouluiM2: 2.1,  // suprafața unui panou de ~450 Wp (m²)
  pretMediuKwhLei: 1.3,      // doar pentru conversia „factură în lei → kWh”, afișat ca atare (lei/kWh, cu taxe)
  rotunjireKwp: 0.5          // sistemele se propun în trepte (kWp)
};

export const SEGMENTE = [
  {key: 'casa', label: 'Casă', implicit: 300, min: 50, max: 2000, pas: 10},
  {key: 'ferma', label: 'Fermă', implicit: 1500, min: 200, max: 20000, pas: 50},
  {key: 'firma', label: 'Firmă', implicit: 3000, min: 300, max: 50000, pas: 100}
];

const round = (x, step) => Math.max(step, Math.ceil(x / step) * step);

// consumLunarKwh → sistemul care ar acoperi ~100% din consumul anual
export function estimare(consumLunarKwh, ip = IPOTEZE) {
  const anual = consumLunarKwh * 12;
  const kwp = round(anual / ip.productieKwhPeKwp, ip.rotunjireKwp);
  const panouri = Math.ceil((kwp * 1000) / ip.putereaPanouluiWp);
  return {
    anual: Math.round(anual),
    kwp,
    productie: Math.round(kwp * ip.productieKwhPeKwp),
    panouri,
    suprafata: Math.ceil(panouri * ip.suprafataPanouluiM2)
  };
}

export const kwhDinFactura = (lei, ip = IPOTEZE) => Math.round(lei / ip.pretMediuKwhLei);
