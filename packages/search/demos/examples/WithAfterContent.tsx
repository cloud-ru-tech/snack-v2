import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Search } from '@ds/search';
import { useState } from 'react';

export function WithAfterContent() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Search
        size='m'
        placeholder='Поиск'
        value={value}
        onChange={setValue}
        onSubmit={setSubmitted}
        afterContent={
          <Button
            size='m'
            view={VIEW.Function}
            appearance={APPEARANCE.Neutral}
            icon={<PlaceholderSVG />}
            minWidth={false}
            onClick={() => setSubmitted(value)}
          />
        }
      />
      <span>Запрос: {submitted || '—'}</span>
    </div>
  );
}
