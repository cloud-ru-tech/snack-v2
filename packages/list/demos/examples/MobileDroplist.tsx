import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function MobileDroplist() {
  const [value, setValue] = useState<string | number | undefined>('rub');

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <div className={styles.wrapper}>
        <Droplist
          label='Валюта'
          closeDroplistOnItemClick
          selection={{ mode: 'single', value, onChange: setValue }}
          items={[
            { id: 'usd', content: { option: 'USD — Доллар США' } },
            { id: 'eur', content: { option: 'EUR — Евро' } },
            { id: 'rub', content: { option: 'RUB — Российский рубль' } },
            { id: 'cny', content: { option: 'CNY — Китайский юань' } },
          ]}
        >
          <Button size='s' appearance='neutral' view='outline' label={`Валюта: ${String(value).toUpperCase()}`} />
        </Droplist>
      </div>
    </AdaptiveProvider>
  );
}
