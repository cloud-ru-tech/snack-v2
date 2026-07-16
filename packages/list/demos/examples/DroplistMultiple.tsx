import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function DroplistMultiple() {
  const [value, setValue] = useState<(string | number)[]>(['email']);

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        selection={{ mode: 'multiple', value, onChange: setValue }}
        items={[
          { id: 'email', content: { label: 'Email' } },
          { id: 'push', content: { label: 'Push-уведомления' } },
          { id: 'sms', content: { label: 'SMS' } },
          { id: 'telegram', content: { label: 'Telegram' } },
        ]}
      >
        <Button size='s' appearance='neutral' view='outline' label={`Каналы: ${value.length}`} />
      </Droplist>
    </div>
  );
}
