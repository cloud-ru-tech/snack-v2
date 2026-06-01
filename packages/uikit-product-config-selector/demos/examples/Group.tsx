import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

const OPTIONS = ['nano', 'micro', 'standard', 'large'] as const;

export function Group() {
  const [selected, setSelected] = useState<(typeof OPTIONS)[number]>('micro');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {OPTIONS.map(option => (
        <ConfigSelector
          key={option}
          label={option}
          checked={selected === option}
          onChange={() => setSelected(option)}
        />
      ))}
    </div>
  );
}
