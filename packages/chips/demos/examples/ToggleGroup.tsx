import { ChipToggle } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = ['React', 'Vue', 'Svelte'];

export function ToggleGroup() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ React: true });

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {OPTIONS.map(option => (
        <ChipToggle
          key={option}
          label={option}
          size='m'
          checked={Boolean(selected[option])}
          onChange={checked => setSelected(prev => ({ ...prev, [option]: checked }))}
        />
      ))}
    </div>
  );
}
