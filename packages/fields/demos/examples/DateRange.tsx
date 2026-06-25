import { FieldDate } from '@ds/fields';
import { useState } from 'react';

export function DateRange() {
  const [value, setValue] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  return (
    <FieldDate
      label='Период'
      mode='date-range'
      hint='Два поля — начало и конец периода'
      value={value}
      onChange={setValue}
    />
  );
}
