import { ReorderableList, ReorderItem } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

const INITIAL_ITEMS: ReorderItem[] = [
  {
    id: 'group-1',
    type: 'group',
    label: 'Избранное',
    items: [
      { id: 'catalog', content: { option: 'Каталог' } },
      { id: 'orders', content: { option: 'Заказы' } },
      { id: 'favorites', content: { option: 'Избранное' } },
    ],
  },
  {
    id: 'group-2',
    type: 'group',
    label: 'Система',
    items: [
      { id: 'settings', content: { option: 'Настройки' } },
      { id: 'trash', content: { option: 'Корзина' } },
    ],
  },
];

export function ListReorderGroups() {
  const [items, setItems] = useState<ReorderItem[]>(INITIAL_ITEMS);

  return (
    <div className={styles.box}>
      <ReorderableList size='s' items={items} onItemsReorder={setItems} />
    </div>
  );
}
