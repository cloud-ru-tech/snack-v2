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
          { id: 'email', content: { option: 'Email' } },
          { id: 'push', content: { option: 'Push-уведомления' } },
          { id: 'sms', content: { option: 'SMS' } },
          { id: 'telegram', content: { option: 'Telegram', description: 'Требует привязки аккаунта' } },
        ]}
      />
    </div>
  );
}
