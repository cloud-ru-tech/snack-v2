import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const regions: ItemProps[] = [
  { id: 'ru-moscow-1', content: { option: 'ru-moscow-1' } },
  { id: 'ru-moscow-2', content: { option: 'ru-moscow-2' } },
  { id: 'kz-ala-1', content: { option: 'kz-ala-1' } },
  { id: 'gis-tomsk-1', content: { option: 'gis-tomsk-1' } },
];

export function SelectPinned() {
  const [value, setValue] = useState<ItemId | undefined>('ru-moscow-1');
  return (
    <FieldSelect
      label='Регион'
      placeholder='Выберите регион'
      selection='single'
      searchable
      items={regions}
      pinTop={[{ id: 'recommended', content: { option: 'ru-moscow-1', caption: 'Рекомендуемый' } }]}
      pinBottom={[{ id: 'all-regions', content: { option: 'Показать все регионы' } }]}
      value={value}
      onChange={setValue}
    />
  );
}
