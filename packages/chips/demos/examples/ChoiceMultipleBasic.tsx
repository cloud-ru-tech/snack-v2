import { ChipChoice } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const OPTIONS = [
  { value: 'news', label: 'Новости' },
  { value: 'guides', label: 'Гайды' },
  { value: 'releases', label: 'Релизы' },
  { value: 'events', label: 'События' },
];

export function ChoiceMultipleBasic() {
  const [value, setValue] = useState<(string | number)[]>(['news', 'releases']);

  return (
    <PortalContextProvider>
      <ChipChoice.Multiple label='Category' options={OPTIONS} value={value} onChange={next => setValue(next ?? [])} />
    </PortalContextProvider>
  );
}
