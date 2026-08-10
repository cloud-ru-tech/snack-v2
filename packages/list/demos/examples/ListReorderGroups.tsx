import { ReorderableList, ReorderItem } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

const INITIAL_ITEMS: ReorderItem[] = [
  {
    id: 'group-1',
    type: 'group',
    label: 'Избранное',
    divider: true,
    items: [
      { id: 'catalog', content: { label: 'Каталог' } },
      { id: 'orders', content: { label: 'Заказы' } },
      { id: 'favorites', content: { label: 'Избранное' } },
    ],
  },
  {
    id: 'group-2',
    type: 'group',
    label: 'Система',
    divider: true,
    items: [
      { id: 'settings', content: { label: 'Настройки' } },
      { id: 'trash', content: { label: 'Корзина' } },
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
