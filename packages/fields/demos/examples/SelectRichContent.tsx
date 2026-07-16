import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

// Айтемы @ds/list поддерживают label + caption + description.
// Поиск (extractSearchText) матчит запрос по всем трём полям.
const options: ItemProps[] = [
  {
    id: 's',
    content: { label: 'Small', caption: '1 vCPU · 2 GB', description: 'Для dev-окружений и небольших сервисов' },
  },
  {
    id: 'm',
    content: { label: 'Medium', caption: '2 vCPU · 4 GB', description: 'Стандартная нагрузка, веб-приложения' },
  },
  {
    id: 'l',
    content: { label: 'Large', caption: '4 vCPU · 8 GB', description: 'Базы данных, аналитика, очереди' },
  },
];

export function SelectRichContent() {
  const [value, setValue] = useState<ItemId | undefined>('m');
  return (
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
  );
}
