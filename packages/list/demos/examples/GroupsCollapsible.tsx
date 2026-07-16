import { List } from '@ds/list';

import styles from './styles.module.scss';

export function GroupsCollapsible() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        collapse={{ defaultValue: ['projects'] }}
        items={[
          {
            type: 'collapse',
            id: 'projects',
            content: { label: 'Проекты' },
            items: [
              { id: 'p-web', content: { label: 'Web-портал' } },
              { id: 'p-mobile', content: { label: 'Mobile' } },
              { id: 'p-admin', content: { label: 'Admin' } },
            ],
          },
          {
            type: 'collapse',
            id: 'settings',
            content: { label: 'Настройки' },
            items: [
              { id: 's-profile', content: { label: 'Профиль' } },
              { id: 's-team', content: { label: 'Команда' } },
              { id: 's-billing', content: { label: 'Оплата' } },
            ],
          },
        ]}
      />
    </div>
  );
}
