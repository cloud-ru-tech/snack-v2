import { Button } from '@ds/button';
import { List } from '@ds/list';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';

const TOTAL = 10_000;

export function Virtualized() {
  const items = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => ({
        id: `row-${i}`,
        content: { option: `Запись #${i + 1}`, caption: i % 5 === 0 ? 'new' : undefined },
      })),
    [],
  );

  const [value, setValue] = useState<string | number | undefined>('row-0');

  return (
    <div className={styles.wrapper}>
      <Button
        size='s'
        appearance='neutral'
        view='outline'
        label='Прыгнуть к случайной записи'
        onClick={() => setValue(`row-${Math.floor(Math.random() * TOTAL)}`)}
      />
      <List
        size='s'
        virtualized
        scroll
        limitedScrollHeight
        scrollToSelectedItem
        selection={{ mode: 'single', value, onChange: setValue }}
        items={items}
      />
    </div>
  );
}
