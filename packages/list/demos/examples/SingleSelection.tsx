import { List } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function SingleSelection() {
  const [value, setValue] = useState<string | number | undefined>('usd');

  return (
    <div className={styles.box}>
      <List
        size='s'
        marker
        selection={{ mode: 'single', value, onChange: setValue }}
        items={[
          { id: 'usd', content: { label: 'Доллар США', caption: 'USD' } },
          { id: 'eur', content: { label: 'Евро', caption: 'EUR' } },
          { id: 'rub', content: { label: 'Российский рубль', caption: 'RUB' } },
          { id: 'cny', content: { label: 'Китайский юань', caption: 'CNY' } },
        ]}
      />
    </div>
  );
}
