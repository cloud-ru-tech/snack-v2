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
            content: { option: 'Проекты' },
            items: [
              { id: 'p-web', content: { option: 'Web-портал' } },
              { id: 'p-mobile', content: { option: 'Mobile' } },
              { id: 'p-admin', content: { option: 'Admin' } },
            ],
          },
          {
            type: 'collapse',
            id: 'settings',
            content: { option: 'Настройки' },
            items: [
              { id: 's-profile', content: { option: 'Профиль' } },
              { id: 's-team', content: { option: 'Команда' } },
              { id: 's-billing', content: { option: 'Оплата' } },
            ],
          },
        ]}
      />
    </div>
  );
}
