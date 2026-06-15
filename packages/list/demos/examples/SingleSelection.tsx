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
          { id: 'usd', content: { option: 'Доллар США', caption: 'USD' } },
          { id: 'eur', content: { option: 'Евро', caption: 'EUR' } },
          { id: 'rub', content: { option: 'Российский рубль', caption: 'RUB' } },
          { id: 'cny', content: { option: 'Китайский юань', caption: 'CNY' } },
        ]}
      />
    </div>
  );
}
