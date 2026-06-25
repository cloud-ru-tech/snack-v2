import { FieldDate } from '@ds/fields';
import { useState } from 'react';

export function DateTimeWithSeconds() {
  const [value, setValue] = useState<Date | undefined>(undefined);
  return (
    <FieldDate
      label='Дата и время'
      mode='date-time'
      showSeconds
      hint='Маска DD.MM.YYYY, HH:MM:SS — секунды управляются showSeconds'
      value={value}
      onChange={setValue}
    />
  );
}
