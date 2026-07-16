import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 'ubuntu', content: { label: 'Ubuntu 22.04 LTS' } },
  { id: 'debian', content: { label: 'Debian 12' } },
  { id: 'centos', content: { label: 'CentOS Stream 9' } },
  { id: 'alpine', content: { label: 'Alpine Linux 3.19' } },
  { id: 'rocky', content: { label: 'Rocky Linux 9' } },
];

export function SelectSearchable() {
  const [value, setValue] = useState<ItemId | undefined>(undefined);
  return (
    <FieldSelect
      label='Образ ОС'
      placeholder='Начните вводить название'
      hint='Нечёткий поиск: «aple» найдёт «Alpine Linux»'
      selection='single'
      searchable
      enableFuzzySearch
      items={options}
      value={value}
      onChange={setValue}
    />
  );
}
