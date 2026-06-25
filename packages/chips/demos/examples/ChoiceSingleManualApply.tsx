import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = [
  { value: 'anna', label: 'Анна' },
  { value: 'boris', label: 'Борис' },
  { value: 'vera', label: 'Вера' },
];

export function ChoiceSingleManualApply() {
  const [value, setValue] = useState<string | number | undefined>('anna');

  return <ChipChoice.Single autoApply={false} label='Owner' options={OPTIONS} value={value} onChange={setValue} />;
}
