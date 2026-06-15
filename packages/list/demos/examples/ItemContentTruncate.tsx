import { List } from '@ds/list';

import styles from './styles.module.scss';

export function ItemContentTruncate() {
  return (
    <div className={styles.narrowBox}>
      <List
        size='m'
        items={[
          {
            id: 'truncated',
            content: {
              option: 'very-long-instance-name-that-overflows.example.internal',
              caption: '8',
              description:
                'Длинное описание ресурса, которое не помещается в одну строку и обрезается по заданному числу строк',
              truncate: { option: 1, description: 2, variant: 'middle' },
            },
          },
        ]}
      />
    </div>
  );
}
