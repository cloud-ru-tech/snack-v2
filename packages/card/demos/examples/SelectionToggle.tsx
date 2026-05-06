import { Card } from '@ds/card';
import { useState } from 'react';

export function SelectionToggle() {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card checked={checked} multiSelect>
        Множественный выбор (иконка при checked)
      </Card>
      <button type='button' onClick={() => setChecked(v => !v)}>
        {checked ? 'Снять выбор' : 'Выбрать'}
      </button>
    </div>
  );
}
