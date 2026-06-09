import { ChipChoice, ChipChoiceTimeProps } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function ChoiceTimeSeconds() {
  const [value, setValue] = useState<ChipChoiceTimeProps['value']>({
    hours: 9,
    minutes: 30,
    seconds: 15,
  });

  return (
    <PortalContextProvider>
      <ChipChoice.Time label='Время' showSeconds value={value} onChange={setValue} />
    </PortalContextProvider>
  );
}
