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
            content: { label: 'Каталог' },
            items: [
              {
                type: 'collapse',
                id: 'catalog/books',
                content: { label: 'Книги' },
                items: [
                  { id: 'catalog/books/fiction', content: { label: 'Художественные' } },
                  { id: 'catalog/books/science', content: { label: 'Научные' } },
                ],
              },
              {
                type: 'collapse',
                id: 'catalog/music',
                content: { label: 'Музыка' },
                items: [
                  { id: 'catalog/music/rock', content: { label: 'Рок' } },
                  { id: 'catalog/music/jazz', content: { label: 'Джаз' } },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
}
