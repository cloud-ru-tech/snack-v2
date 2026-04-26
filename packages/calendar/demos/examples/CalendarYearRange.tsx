import { Calendar, CALENDAR_MODE, Range, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarYearRange() {
  const [value, setValue] = useState<Range | undefined>(() => [new Date(2024, 0, 1), new Date(2026, 0, 1)]);

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.YearRange}
        size={SIZE.M}
        value={value}
        onChangeValue={r => setValue(r)}
      />
    </div>
  );
}
