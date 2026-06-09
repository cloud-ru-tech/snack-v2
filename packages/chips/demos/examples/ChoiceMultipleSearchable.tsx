import { ChipChoice } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid' },
  { value: 'qwik', label: 'Qwik' },
];

export function ChoiceMultipleSearchable() {
  const [value, setValue] = useState<(string | number)[]>(['react', 'svelte']);

  return (
    <PortalContextProvider>
      <ChipChoice.Multiple
        searchable
        label='Tags'
        options={OPTIONS}
        value={value}
        onChange={next => setValue(next ?? [])}
      />
    </PortalContextProvider>
  );
}
