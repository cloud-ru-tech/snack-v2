import { List } from '@ds/list';

import styles from './styles.module.scss';

export function NestedLevels() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        collapse={{ defaultValue: ['catalog', 'catalog/books'] }}
        items={[
          {
            type: 'collapse',
            id: 'catalog',
            content: { option: 'Каталог' },
            items: [
              {
                type: 'collapse',
                id: 'catalog/books',
                content: { option: 'Книги' },
                items: [
                  { id: 'catalog/books/fiction', content: { option: 'Художественные' } },
                  { id: 'catalog/books/science', content: { option: 'Научные' } },
                ],
              },
              {
                type: 'collapse',
                id: 'catalog/music',
                content: { option: 'Музыка' },
                items: [
                  { id: 'catalog/music/rock', content: { option: 'Рок' } },
                  { id: 'catalog/music/jazz', content: { option: 'Джаз' } },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
}
