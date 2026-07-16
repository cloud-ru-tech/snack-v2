import { List } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function MultipleSelection() {
  const [value, setValue] = useState<(string | number)[]>(['email', 'push']);

  return (
    <div className={styles.box}>
      <List
        size='s'
        selection={{ mode: 'multiple', value, onChange: setValue }}
        items={[
          { id: 'email', content: { label: 'Email' } },
          { id: 'push', content: { label: 'Push-уведомления' } },
          { id: 'sms', content: { label: 'SMS' } },
          { id: 'telegram', content: { label: 'Telegram', description: 'Требует привязки аккаунта' } },
        ]}
      />
    </div>
  );
}
