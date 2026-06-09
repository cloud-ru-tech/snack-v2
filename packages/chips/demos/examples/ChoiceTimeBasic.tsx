import { ChipChoice, ChipChoiceTimeProps } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

export function ChoiceTimeBasic() {
  const [value, setValue] = useState<ChipChoiceTimeProps['value']>({
    hours: 9,
    minutes: 30,
  });

  return (
    <PortalContextProvider>
      <ChipChoice.Time label='Время' value={value} onChange={setValue} />
    </PortalContextProvider>
  );
}
