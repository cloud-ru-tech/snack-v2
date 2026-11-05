import { SectionBasic } from '@ds/site-section';
import { useState } from 'react';

const TABS = [
  { value: 'infrastructure', label: 'Создание инфраструктуры' },
  { value: 'data', label: 'Данные' },
  { value: 'ai', label: 'Искусственный интеллект' },
];

const ITEMS = [
  { id: 'all', content: { label: 'Все' } },
  { id: 'popular', content: { label: 'Популярные' } },
  { id: 'new', content: { label: 'Новые' } },
];

export function TabsAndFilters() {
  const [category, setCategory] = useState('all');

  return (
    <SectionBasic
      container='new'
      title='Каталог'
      tabBarItems={TABS}
      filterItems={[
        {
          id: 'category',
          label: 'Категория',
          items: ITEMS,
          value: category,
          onChange: value => setCategory(String(value ?? 'all')),
        },
      ]}
    >
      <p>Выбрана категория: {category}</p>
    </SectionBasic>
  );
}
