import { Button } from '@ds/button';
import { SIZE, TimePickerDropdown, TimeValue } from '@ds/calendar';
import { useState } from 'react';

export function TimePickerDropdownControlled() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 14, minutes: 0, seconds: 0 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <TimePickerDropdown
        fitToContainer={false}
        open={open}
        placement='bottom-start'
        showSeconds={false}
        size={SIZE.S}
        trigger='click'
        value={value}
        onChangeValue={v => setValue(v)}
        onOpenChange={setOpen}
      >
        <Button label='Время (controlled open)' />
      </TimePickerDropdown>
      <span style={{ fontSize: 14, opacity: 0.8 }}>Панель времени: {open ? 'открыта' : 'закрыта'}</span>
    </div>
  );
}
