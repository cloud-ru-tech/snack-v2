import { DATE_MODE, FieldDate } from '@ds/fields';
import { useState } from 'react';

const today = new Date();

function shift(days: number): Date {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
}

export function DatePresets() {
  const [value, setValue] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  return (
    <FieldDate
      label='Период'
      hint='Быстрые диапазоны в шапке календаря, выходные подсвечены'
      mode={DATE_MODE.DateRange}
      showHolidays
      presets={{
        enabled: true,
        items: [
          { id: 'last-7', label: 'Последние 7 дней', range: [shift(-6), today] },
          { id: 'last-30', label: 'Последние 30 дней', range: [shift(-29), today] },
          { id: 'next-7', label: 'Следующие 7 дней', range: [today, shift(6)] },
        ],
      }}
      value={value}
      onChange={setValue}
    />
  );
}
