import { Calendar, CALENDAR_MODE, Range, SIZE } from '@ds/calendar';
import { useState } from 'react';

export function CalendarWithPresets() {
  const [value, setValue] = useState<Range | undefined>();

  return (
    <div style={{ width: 520, maxWidth: '100%' }}>
      <Calendar
        fitToContainer
        mode={CALENDAR_MODE.DateRange}
        size={SIZE.M}
        presets={{ enabled: true }}
        value={value}
        onChangeValue={r => setValue(r)}
      />
    </div>
  );
}
