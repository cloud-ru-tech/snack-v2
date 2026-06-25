import { CHIP_CHOICE_TYPE, ChipChoiceRow } from '@ds/chips';
import { useState } from 'react';

const FILTERS = [
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Статус',
    pinned: true,
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
    ],
  },
  {
    id: 'date',
    type: CHIP_CHOICE_TYPE.Date,
    label: 'Дата',
  },
];

export function ChoiceRowPinned() {
  const [value, setValue] = useState({});

  return <ChipChoiceRow filters={FILTERS} value={value} onChange={setValue} showAddButton showClearButton />;
}
