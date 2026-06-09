import { CHIP_CHOICE_TYPE, ChipChoiceRow } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const FILTERS = [
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Статус',
    options: [
      { value: 'active', label: 'Активный' },
      { value: 'inactive', label: 'Неактивный' },
    ],
  },
  {
    id: 'category',
    type: CHIP_CHOICE_TYPE.Multiple,
    label: 'Категория',
    options: [
      { value: 'cat1', label: 'Категория 1' },
      { value: 'cat2', label: 'Категория 2' },
      { value: 'cat3', label: 'Категория 3' },
    ],
  },
  {
    id: 'date',
    type: CHIP_CHOICE_TYPE.Date,
    label: 'Дата',
  },
];

export function ChoiceRowBasic() {
  const [value, setValue] = useState({});

  return (
    <PortalContextProvider>
      <ChipChoiceRow filters={FILTERS} value={value} onChange={setValue} showClearButton showAddButton />
    </PortalContextProvider>
  );
}
