import { FieldDate } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function DateTimeWithSeconds() {
  const [value, setValue] = useState<Date | undefined>(undefined);
  return (
    <PortalContextProvider>
      <FieldDate
        label='Дата и время'
        mode='date-time'
        showSeconds
        hint='Маска DD.MM.YYYY, HH:MM:SS — секунды управляются showSeconds'
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
