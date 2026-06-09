import { ChipChoice } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const OPTIONS = [
  { value: 'anna', label: 'Анна' },
  { value: 'boris', label: 'Борис' },
  { value: 'vera', label: 'Вера' },
];

export function ChoiceSingleManualApply() {
  const [value, setValue] = useState<string | number | undefined>('anna');

  return (
    <PortalContextProvider>
      <ChipChoice.Single autoApply={false} label='Owner' options={OPTIONS} value={value} onChange={setValue} />
    </PortalContextProvider>
  );
}
