import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 's', content: { label: 'Small (1 vCPU, 2 GB)' } },
  { id: 'm', content: { label: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { label: 'Large (4 vCPU, 8 GB)' } },
  { id: 'xl', content: { label: 'X-Large (8 vCPU, 16 GB)' } },
];

export function Select() {
  const [value, setValue] = useState<ItemId | undefined>('m');
  return (
    <FieldSelect
      label='Размер инстанса'
      placeholder='Выберите размер'
      selection='single'
      items={options}
      value={value}
      onChange={setValue}
    />
  );
}
