import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 's', content: { option: 'Small (1 vCPU, 2 GB)' } },
  { id: 'm', content: { option: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { option: 'Large (4 vCPU, 8 GB)' } },
  { id: 'xl', content: { option: 'X-Large (8 vCPU, 16 GB)' } },
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
