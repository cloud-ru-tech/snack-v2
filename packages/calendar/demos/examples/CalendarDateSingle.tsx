import { Calendar, CALENDAR_MODE, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarDateSingle() {
  const [value, setValue] = useState<Date | undefined>(() => new Date(2026, 3, 10));

  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Calendar fitToContainer mode={CALENDAR_MODE.Date} size={SIZE.M} value={value} onChangeValue={d => setValue(d)} />
    </div>
  );
}
