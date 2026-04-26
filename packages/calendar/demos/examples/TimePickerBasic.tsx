import { SIZE, TimePicker, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerBasic() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 9, minutes: 15, seconds: 0 });

  return (
    <div style={{ width: 280, maxWidth: '100%' }}>
      <TimePicker fitToContainer size={SIZE.M} value={value} onChangeValue={v => setValue(v)} />
    </div>
  );
}
