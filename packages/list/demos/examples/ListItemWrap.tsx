import { List } from '@ds/list';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

const asExternalLink = (href: string) =>
  function (item: ReactNode) {
    return (
      <a href={href} target='_blank' rel='noreferrer' className={styles.link}>
        {item}
      </a>
    );
  };

export function ListItemWrap() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        items={[
          {
            id: 'prod',
            content: { option: 'Production', caption: 'open' },
            itemWrapRender: asExternalLink('https://console.cloud.ru/prod'),
          },
          {
            id: 'staging',
            content: { option: 'Staging', caption: 'open' },
            itemWrapRender: asExternalLink('https://console.cloud.ru/staging'),
          },
          {
            id: 'legacy',
            content: { option: 'Legacy', description: 'Среда выведена из эксплуатации — недоступна для перехода' },
            inactive: true,
          },
        ]}
      />
    </div>
  );
}
