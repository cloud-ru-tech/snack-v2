import { SearchPrivate } from '@ds/search-private';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
      <SearchPrivate value={value} onChange={setValue} onSubmit={setSubmitted} />
      <span>
        Значение: {value || '—'} · Отправлено: {submitted || '—'}
      </span>
    </div>
  );
}
