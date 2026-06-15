import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';

const COUNTRIES = [
  'Австрия',
  'Армения',
  'Беларусь',
  'Бразилия',
  'Германия',
  'Грузия',
  'Индия',
  'Казахстан',
  'Китай',
  'Россия',
  'США',
  'Турция',
];

export function DroplistWithSearch() {
  const [value, setValue] = useState<string | number | undefined>('Россия');
  const [query, setQuery] = useState('');

  const items = useMemo(
    () =>
      COUNTRIES.filter(name => name.toLowerCase().includes(query.toLowerCase())).map(name => ({
        id: name,
        content: { option: name },
      })),
    [query],
  );

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        selection={{ mode: 'single', value, onChange: setValue }}
        search={{ value: query, onChange: setQuery, placeholder: 'Поиск страны' }}
        items={items}
      >
        <Button size='s' appearance='neutral' view='outline' label={`Страна: ${value}`} />
      </Droplist>
    </div>
  );
}
