import { SIZE, TimePicker } from '@ds/calendar';

export function TimePickerSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: 200 }}>
        <TimePicker fitToContainer defaultValue={{ hours: 8, minutes: 0, seconds: 0 }} size={SIZE.S} />
      </div>
      <div style={{ width: 220 }}>
        <TimePicker fitToContainer defaultValue={{ hours: 12, minutes: 30, seconds: 0 }} size={SIZE.M} />
      </div>
      <div style={{ width: 240 }}>
        <TimePicker fitToContainer defaultValue={{ hours: 18, minutes: 45, seconds: 30 }} size={SIZE.L} />
      </div>
    </div>
  );
}
