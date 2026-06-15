import { List } from '@ds/list';

import styles from './styles.module.scss';

export function PinnedItems() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        pinTop={[
          { id: 'all', content: { option: 'Все задачи', caption: '128' } },
          { id: 'mine', content: { option: 'Мои задачи', caption: '14' } },
        ]}
        items={[
          { id: 'design', content: { option: 'Дизайн' } },
          { id: 'backend', content: { option: 'Бэкенд' } },
          { id: 'frontend', content: { option: 'Фронтенд' } },
          { id: 'qa', content: { option: 'QA' } },
        ]}
        pinBottom={[{ id: 'archive', content: { option: 'Архив', description: 'Завершённые задачи' } }]}
      />
    </div>
  );
}
