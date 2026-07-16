import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function BasicDroplist() {
  const [value, setValue] = useState<string | number | undefined>('rub');

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        selection={{ mode: 'single', value, onChange: setValue }}
        items={[
          { id: 'usd', content: { label: 'USD — Доллар США' } },
          { id: 'eur', content: { label: 'EUR — Евро' } },
          { id: 'rub', content: { label: 'RUB — Российский рубль' } },
          { id: 'cny', content: { label: 'CNY — Китайский юань' } },
        ]}
      >
        <Button size='s' appearance='neutral' view='outline' label={`Валюта: ${String(value).toUpperCase()}`} />
      </Droplist>
    </div>
  );
}
