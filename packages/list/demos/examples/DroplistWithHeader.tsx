import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function DroplistWithHeader() {
  const [value, setValue] = useState<string | number | undefined>('relevance');

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        selection={{ mode: 'single', value, onChange: setValue }}
        header='Сортировать по'
        headerDivider
        footer='4 варианта сортировки'
        footerDivider
        items={[
          { id: 'relevance', content: { option: 'Релевантности' } },
          { id: 'date', content: { option: 'Дате создания' } },
          { id: 'name', content: { option: 'Имени' } },
          { id: 'size', content: { option: 'Размеру' } },
        ]}
      >
        <Button size='s' appearance='neutral' view='outline' label='Сортировка' />
      </Droplist>
    </div>
  );
}
