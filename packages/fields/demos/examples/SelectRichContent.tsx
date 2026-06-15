import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

// Айтемы @ds/list поддерживают option (лейбл) + caption + description.
// Поиск (extractSearchText) матчит запрос по всем трём полям.
const options: ItemProps[] = [
  {
    id: 's',
    content: { option: 'Small', caption: '1 vCPU · 2 GB', description: 'Для dev-окружений и небольших сервисов' },
  },
  {
    id: 'm',
    content: { option: 'Medium', caption: '2 vCPU · 4 GB', description: 'Стандартная нагрузка, веб-приложения' },
  },
  {
    id: 'l',
    content: { option: 'Large', caption: '4 vCPU · 8 GB', description: 'Базы данных, аналитика, очереди' },
  },
];

export function SelectRichContent() {
  const [value, setValue] = useState<ItemId | undefined>('m');
  return (
    <PortalContextProvider>
      <FieldSelect
        label='Размер инстанса'
        placeholder='Выберите размер'
        hint='Поиск ищет по названию, характеристикам и описанию'
        selection='single'
        searchable
        items={options}
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
