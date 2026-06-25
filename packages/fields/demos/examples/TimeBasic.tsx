import { TimeValue } from '@ds/calendar';
import { FieldTime } from '@ds/fields';
import { useState } from 'react';

export function TimeBasic() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 9, minutes: 30, seconds: 0 });
  return (
    <FieldTime label='Время' hint='Введите HH:MM:SS или выберите из дропдауна' value={value} onChange={setValue} />
  );
}
