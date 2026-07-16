import { List } from '@ds/list';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';

const ALL = [
  'Антон',
  'Борис',
  'Виктор',
  'Галина',
  'Дарья',
  'Евгений',
  'Жанна',
  'Зоя',
  'Игорь',
  'Ксения',
  'Лев',
  'Мария',
];

export function WithSearch() {
  const [query, setQuery] = useState('');

  const items = useMemo(
    () =>
      ALL.filter(name => name.toLowerCase().includes(query.toLowerCase())).map(name => ({
        id: name,
        content: { label: name },
      })),
    [query],
  );

  return (
    <div className={styles.box}>
      <List size='s' search={{ value: query, onChange: setQuery, placeholder: 'Поиск по имени' }} items={items} />
    </div>
  );
}
