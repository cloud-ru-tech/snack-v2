import { Button } from '@ds/button';
import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const PRIORITIES = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
];

export function ChoiceCustomBasic() {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <ChipChoice.Custom
      label='Приоритет'
      value={value}
      onChange={setValue}
      valueRender={current => PRIORITIES.find(item => item.value === current)?.label ?? null}
      content={({ closeDroplist, onChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8 }}>
          {PRIORITIES.map(item => (
            <Button
              key={item.value}
              view='function'
              appearance='neutral'
              label={item.label}
              onClick={() => {
                onChange?.(item.value);
                closeDroplist();
              }}
            />
          ))}
        </div>
      )}
    />
  );
}
