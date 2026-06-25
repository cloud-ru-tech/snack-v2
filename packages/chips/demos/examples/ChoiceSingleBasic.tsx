import { ChipChoice } from '@ds/chips';
import { useState } from 'react';

const OPTIONS = [
  { value: 'active', label: 'Активный' },
  { value: 'inactive', label: 'Неактивный' },
  { value: 'archived', label: 'В архиве' },
];

export function ChoiceSingleBasic() {
  const [value, setValue] = useState<string | number | undefined>('active');

  return <ChipChoice.Single label='Status' options={OPTIONS} value={value} onChange={setValue} />;
}
