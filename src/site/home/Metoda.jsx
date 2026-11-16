'use client';
// Metoda CEMADO: cei 4 pași comuni, cu un comutator care arată cum arată fiecare pas pe o linie de business.
import {useState} from 'react';
import {PASI, PE_LINII} from './metoda.mjs';
import {icon} from '../menu.mjs';
import Icon from '../ui/Icon.jsx';
import LeadButton from '../ui/LeadButton.jsx';

export default function Metoda() {
  const [k, setK] = useState(PE_LINII[0].key);
  const linie = PE_LINII.find(l => l.key === k);
  return (
    <section className="h-sec h-metoda" aria-labelledby="metoda-title">
      <div className="s-wrap">
        <div className="h-head">
          <div>
            <p className="s-eyebrow">Metoda CEMADO</p>
            <h2 id="metoda-title" className="h-h2">Patru domenii diferite. Același fel de a lucra.</h2>
          </div>
          <p className="h-lead">Fie că e vorba de o asigurare sau de panouri solare, parcursul e același: un consultant, variantele explicate clar și sprijin și după ce ai semnat.</p>
        </div>

        <div className="h-switch" role="tablist" aria-label="Vezi metoda pe o linie de business">
          {PE_LINII.map(l => (
            <button key={l.key} type="button" role="tab" id={`tab-${l.key}`} aria-selected={k === l.key} aria-controls="metoda-panel"
              className={k === l.key ? 'on' : ''} onClick={() => setK(l.key)}>
              <Icon d={icon(l.key)} size={18}/>{l.label}
            </button>
          ))}
        </div>

        <div id="metoda-panel" role="tabpanel" aria-labelledby={`tab-${k}`} className="h-steps">
          {PASI.map((p, i) => (
            <div key={p.key} className="h-step">
              <span className="h-step-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.titlu}</h3>
              <p>{linie.pasi[i]}</p>
            </div>
          ))}
        </div>

        <div className="h-metoda-cta">
          <p>Exemplu: <b>{linie.exemplu}</b>. Începe cu primul pas, durează un minut.</p>
          <LeadButton serviciu={k} sursa="metoda">Începe cu {linie.label.toLowerCase()}</LeadButton>
        </div>
      </div>
    </section>
  );
}
