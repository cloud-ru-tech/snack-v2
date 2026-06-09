import { ChipChoice } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function ChoiceDateBasic() {
  const [value, setValue] = useState<Date | undefined>(new Date(2024, 0, 15));

  return (
    <PortalContextProvider>
      <ChipChoice.Date label='Дата' value={value} onChange={setValue} />
    </PortalContextProvider>
  );
}
