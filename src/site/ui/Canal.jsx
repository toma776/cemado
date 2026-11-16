'use client';
// Alegerea canalului (Telefon / WhatsApp / Email), comună tuturor formularelor.
// Câmpul de email apare doar când clientul alege Email și devine obligatoriu doar atunci: formularul rămâne scurt pentru ceilalți.
export const CANALE = [['telefon', 'Telefon'], ['whatsapp', 'WhatsApp'], ['email', 'Email']];

export default function Canal({id, v, set, errors = {}, legend = 'Cum preferi să te contactăm?', formal = false}) {
  return (
    <>
      <fieldset className="s-choices s-inline">
        <legend>{legend}</legend>
        <div>{CANALE.map(([k, l]) => (
          <label key={k} className={v.canal === k ? 'on' : ''}><input type="radio" name={`${id}-canal`} value={k} checked={v.canal === k} onChange={() => set('canal', k)}/>{l}</label>
        ))}</div>
      </fieldset>
      {v.canal === 'email' && (
        <div className={`s-field ${errors.email ? 'has-err' : ''}`}>
          <label htmlFor={`${id}-email`}>Email</label>
          <input id={`${id}-email`} type="email" inputMode="email" autoComplete="email" value={v.email ?? ''} onChange={e => set('email', e.target.value)} placeholder={formal ? 'nume@firma.ro' : 'adresa@exemplu.ro'}/>
          {errors.email && <span className="s-err">{errors.email}</span>}
        </div>
      )}
    </>
  );
}
