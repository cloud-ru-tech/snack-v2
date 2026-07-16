import { List } from '@ds/list';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

const asLink = (href: string) =>
  function (item: ReactNode) {
    return (
      <a href={href} className={styles.link}>
        {item}
      </a>
    );
  };

export function LinkItems() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        items={[
          {
            id: 'docs',
            content: { label: 'Документация', caption: '↗' },
            itemWrapRender: asLink('https://cloud.ru/docs'),
          },
          { id: 'blog', content: { label: 'Блог', caption: '↗' }, itemWrapRender: asLink('https://cloud.ru/blog') },
          {
            id: 'status',
            content: { label: 'Статус', caption: '↗' },
            itemWrapRender: asLink('https://cloud.ru/status'),
          },
        ]}
      />
    </div>
  );
}
