import { List } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function EmptyState() {
  const [query, setQuery] = useState('qwerty');

  const items = query.length > 3 ? [] : [{ id: 'a', content: { label: 'Пример результата' } }];

  return (
    <div className={styles.box}>
      <List
        size='s'
        search={{ value: query, onChange: setQuery, placeholder: 'Поиск' }}
        items={items}
        dataFiltered
        noResultsState={{
          content: 'Ничего не нашли. Проверьте раскладку или измените запрос.',
        }}
      />
    </div>
  );
}
