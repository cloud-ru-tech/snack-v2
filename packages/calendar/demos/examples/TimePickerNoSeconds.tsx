import { SIZE, TimePicker, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerNoSeconds() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 11, minutes: 45, seconds: 0 });

  return (
    <div style={{ width: 240, maxWidth: '100%' }}>
      <TimePicker fitToContainer showSeconds={false} size={SIZE.M} value={value} onChangeValue={v => setValue(v)} />
    </div>
  );
}
