import { ChipChoice } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const OPTIONS = [
  { value: 'design', label: 'Дизайн' },
  { value: 'frontend', label: 'Фронтенд' },
  { value: 'backend', label: 'Бэкенд' },
  { value: 'analytics', label: 'Аналитика' },
  { value: 'qa', label: 'Тестирование' },
  { value: 'devops', label: 'DevOps' },
];

export function ChoiceSingleSearchable() {
  const [value, setValue] = useState<string | number | undefined>('frontend');

  return (
    <PortalContextProvider>
      <ChipChoice.Single searchable label='Team' options={OPTIONS} value={value} onChange={setValue} />
    </PortalContextProvider>
  );
}
