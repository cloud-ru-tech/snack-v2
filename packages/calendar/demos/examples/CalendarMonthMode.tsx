import { Calendar, CALENDAR_MODE, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarMonthMode() {
  const [value, setValue] = useState<Date | undefined>(() => new Date(2026, 3, 1));

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.Month}
        size={SIZE.M}
        value={value}
        onChangeValue={d => setValue(d)}
      />
    </div>
  );
}
