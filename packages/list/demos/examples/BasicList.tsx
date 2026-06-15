import { List } from '@ds/list';

import styles from './styles.module.scss';

export function BasicList() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        items={[
          { id: 'inbox', content: { option: 'Входящие', caption: '12' } },
          { id: 'sent', content: { option: 'Отправленные' } },
          { id: 'archive', content: { option: 'Архив', caption: '238' } },
          { id: 'trash', content: { option: 'Корзина', description: 'Удаляется через 30 дней' } },
        ]}
      />
    </div>
  );
}
