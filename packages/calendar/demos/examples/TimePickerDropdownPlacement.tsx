import { Button } from '@ds/button';
import { SIZE, TimePickerDropdown, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerDropdownPlacement() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 7, minutes: 30, seconds: 0 });

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <TimePickerDropdown
        closeOnApply
        fitToContainer={false}
        placement='bottom-start'
        size={SIZE.M}
        trigger='click'
        value={value}
        onChangeValue={v => setValue(v)}
      >
        <Button label='bottom-start' />
      </TimePickerDropdown>
      <TimePickerDropdown
        closeOnApply
        fitToContainer={false}
        placement='top-end'
        size={SIZE.M}
        trigger='click'
        value={value}
        onChangeValue={v => setValue(v)}
      >
        <Button label='top-end' />
      </TimePickerDropdown>
    </div>
  );
}
