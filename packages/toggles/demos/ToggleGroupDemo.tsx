import { ToggleGroup, useToggleGroup } from '@ds/toggles';
import { useState } from 'react';

function Item({ id, label }: { id: string; label: string }) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });
  return (
    <button
      onClick={handleClick}
      data-checked={isChecked}
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: `1px solid ${isChecked ? '#4c6ef5' : '#ccc'}`,
        background: isChecked ? '#e7ecff' : 'transparent',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

const ITEMS = [
  { id: 'a', label: 'Option A' },
  { id: 'b', label: 'Option B' },
  { id: 'c', label: 'Option C' },
];

export function ToggleGroupDemo() {
  const [value, setValue] = useState<string | undefined>('a');
  return (
    <ToggleGroup selectionMode='single' value={value} onChange={setValue}>
      <div style={{ display: 'flex', gap: 8 }}>
        {ITEMS.map(p => (
          <Item key={p.id} {...p} />
        ))}
      </div>
    </ToggleGroup>
  );
}
