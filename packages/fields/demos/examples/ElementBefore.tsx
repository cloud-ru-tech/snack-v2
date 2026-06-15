import { FieldText } from '@ds/fields';
import { CalendarSVG } from '@ds/icons';
import { useState } from 'react';

function formatToday(): string {
  return new Date().toLocaleDateString('ru-RU');
}

export function ElementBefore() {
  const [value, setValue] = useState('');
  return (
    <FieldText
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
