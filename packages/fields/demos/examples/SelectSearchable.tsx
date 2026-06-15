import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 'ubuntu', content: { option: 'Ubuntu 22.04 LTS' } },
  { id: 'debian', content: { option: 'Debian 12' } },
  { id: 'centos', content: { option: 'CentOS Stream 9' } },
  { id: 'alpine', content: { option: 'Alpine Linux 3.19' } },
  { id: 'rocky', content: { option: 'Rocky Linux 9' } },
];

export function SelectSearchable() {
  const [value, setValue] = useState<ItemId | undefined>(undefined);
  return (
    <PortalContextProvider>
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
    </PortalContextProvider>
  );
}
