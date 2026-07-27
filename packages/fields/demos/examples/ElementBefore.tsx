import { FieldCombo } from '@ds/fields';
import { CalendarSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

function formatToday(): string {
  return new Date().toLocaleDateString('ru-RU');
}

export function ElementBefore() {
  const [value, setValue] = useState('');
  return (
    <FieldCombo
      label='Дата'
      placeholder='12.04.2026'
      elementBefore={{
        action: <CalendarSVG />,
        onClick: () => setValue(formatToday()),
      }}
      value={value}
      onChange={setValue}
    />
  );
}
