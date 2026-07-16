import { List } from '@ds/list';

import styles from './styles.module.scss';

export function BasicList() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        items={[
          { id: 'inbox', content: { label: 'Входящие', caption: '12' } },
          { id: 'sent', content: { label: 'Отправленные' } },
          { id: 'archive', content: { label: 'Архив', caption: '238' } },
          { id: 'trash', content: { label: 'Корзина', description: 'Удаляется через 30 дней' } },
        ]}
      />
    </div>
  );
}
