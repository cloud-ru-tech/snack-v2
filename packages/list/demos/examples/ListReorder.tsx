import { ReorderableList, SimpleItem } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

const INITIAL_ITEMS: SimpleItem[] = [
  { id: 'inbox', content: { label: 'Входящие', caption: '12' } },
  { id: 'sent', content: { label: 'Отправленные' } },
  { id: 'archive', content: { label: 'Архив', caption: '238' } },
  { id: 'trash', content: { label: 'Корзина', description: 'Удаляется через 30 дней' } },
];

export function ListReorder() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  return (
    <div className={styles.box}>
      <ReorderableList size='s' items={items} onItemsReorder={setItems} />
    </div>
  );
}
