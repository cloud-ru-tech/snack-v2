import { Button } from '@ds/button';
import { SIZE, TimePickerDropdown, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerDropdownBasic() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 10, minutes: 5, seconds: 0 });

  return (
    <TimePickerDropdown
      closeOnApply
      fitToContainer={false}
      placement='bottom-start'
      size={SIZE.M}
      trigger='click'
      value={value}
      onChangeValue={v => setValue(v)}
    >
      <Button label='Выбрать время' />
    </TimePickerDropdown>
  );
}
