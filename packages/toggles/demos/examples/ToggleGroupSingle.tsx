import { ToggleGroup, useToggleGroup } from '@ds/toggles';
import { useState } from 'react';

function Chip({ id, label }: { id: string; label: string }) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });
  return (
    <button onClick={handleClick} aria-pressed={isChecked}>
      {label}
    </button>
  );
}

export function ToggleGroupSingle() {
  const [value, setValue] = useState<string | undefined>('a');
  return (
    <ToggleGroup selectionMode='single' value={value} onChange={setValue}>
      <Chip id='a' label='A' />
      <Chip id='b' label='B' />
      <Chip id='c' label='C' />
    </ToggleGroup>
  );
}
