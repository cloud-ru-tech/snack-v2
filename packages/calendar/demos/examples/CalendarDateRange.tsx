import { Calendar, CALENDAR_MODE, Range, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarDateRange() {
  const [value, setValue] = useState<Range | undefined>(() => [new Date(2026, 3, 1), new Date(2026, 3, 20)]);

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.DateRange}
        size={SIZE.M}
        value={value}
        onChangeValue={r => setValue(r)}
      />
    </div>
  );
}
