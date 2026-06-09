import { ChipChoice } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function ChoiceDateMonth() {
  const [value, setValue] = useState<Date | undefined>(new Date(2024, 0, 1));

  return (
    <PortalContextProvider>
      <ChipChoice.Date label='Месяц' mode='month' value={value} onChange={setValue} />
    </PortalContextProvider>
  );
}
