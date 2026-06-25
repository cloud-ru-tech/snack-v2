import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 'ru-1', content: { option: 'ru-central1-a' } },
  { id: 'ru-2', content: { option: 'ru-central1-b' } },
  { id: 'ru-3', content: { option: 'ru-central1-c' } },
  { id: 'kz-1', content: { option: 'kz-central1-a' } },
];

export function SelectMultiple() {
  const [value, setValue] = useState<ItemId[]>(['ru-1', 'ru-2']);
  return (
    <FieldSelect
      label='Зоны доступности'
      placeholder='Выберите зоны'
      selection='multiple'
      chips
      items={options}
      value={value}
      onChange={setValue}
    />
  );
}
