import { List } from '@ds/list';

import styles from './styles.module.scss';

export function PinnedItems() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        pinTop={[
          { id: 'all', content: { label: 'Все задачи', caption: '128' } },
          { id: 'mine', content: { label: 'Мои задачи', caption: '14' } },
        ]}
        items={[
          { id: 'design', content: { label: 'Дизайн' } },
          { id: 'backend', content: { label: 'Бэкенд' } },
          { id: 'frontend', content: { label: 'Фронтенд' } },
          { id: 'qa', content: { label: 'QA' } },
        ]}
        pinBottom={[{ id: 'archive', content: { label: 'Архив', description: 'Завершённые задачи' } }]}
      />
    </div>
  );
}
