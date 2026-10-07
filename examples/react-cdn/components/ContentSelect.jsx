'use client';

import { CONTENT } from '@/lib/content';

/** Seletor da lista fixa de conteúdos de teste. */
export function ContentSelect({ value, onChange, id = 'conteudo' }) {
  return (
    <select
      id={id}
      name={id}
      aria-label="Conteúdo de teste"
      className="content-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {CONTENT.map((item) => (
        <option key={item.id} value={item.id}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
