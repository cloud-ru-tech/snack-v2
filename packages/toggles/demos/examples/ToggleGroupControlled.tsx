import { ToggleGroup, useToggleGroup } from '@ds/toggles';
import { useState } from 'react';

function Option({ id, label }: { id: string; label: string }) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });
  return (
    <button onClick={handleClick} aria-pressed={isChecked}>
      {label}
    </button>
  );
}

export function ToggleGroupControlled() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ToggleGroup selectionMode='single' value={value} onChange={setValue}>
        <Option id='s' label='S' />
        <Option id='m' label='M' />
        <Option id='l' label='L' />
      </ToggleGroup>
      <p>Selected: {value ?? '—'}</p>
    </div>
  );
}
