import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useMemo, useState } from 'react';

const ALL_REGIONS: ItemProps[] = [
  { id: 'ru-moscow', content: { label: 'Москва' } },
  { id: 'ru-spb', content: { label: 'Санкт-Петербург' } },
  { id: 'ru-novosibirsk', content: { label: 'Новосибирск' } },
  { id: 'ru-ekaterinburg', content: { label: 'Екатеринбург' } },
  { id: 'ru-kazan', content: { label: 'Казань' } },
];

export function SelectAutocomplete() {
  const [value, setValue] = useState<ItemId | undefined>(undefined);
  const [query, setQuery] = useState('');

  // Фильтрацию выполняет потребитель (имитация backend-поиска): FieldSelect с `autocomplete`
  // не фильтрует список повторно, а строка поиска управляется через `search`.
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_REGIONS;
    return ALL_REGIONS.filter(item => {
      const content = 'content' in item ? item.content : undefined;
      const option = content && typeof content === 'object' && 'label' in content ? String(content.label) : '';
      return option.toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <FieldSelect
      label='Регион'
      placeholder='Начните вводить название'
      hint='autocomplete: фильтрует потребитель (серверный поиск), не сам компонент'
      selection='single'
      autocomplete
      search={{ value: query, onChange: setQuery }}
      items={items}
      value={value}
      onChange={setValue}
    />
  );
}
