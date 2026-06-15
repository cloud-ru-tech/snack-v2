import { TimeValue } from '@ds/calendar';
import { FieldTime } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function TimeShowSeconds() {
  const [value, setValue] = useState<TimeValue | undefined>({ hours: 14, minutes: 25, seconds: 0 });
  return (
    <PortalContextProvider>
      <FieldTime
        label='Время без секунд'
        hint='showSeconds=false — маска HH:MM, picker без барабана секунд'
        showSeconds={false}
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
