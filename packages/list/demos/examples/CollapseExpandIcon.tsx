import { List } from '@ds/list';
import { ReactNode, useState } from 'react';

import styles from './styles.module.scss';

export function CollapseExpandIcon() {
  const [route, setRoute] = useState('/guides');

  // Так строку подключают к роутеру: `next/link` и аналоги отменяют свой переход, если клик уже
  // обработали ниже по дереву (`e.defaultPrevented`). В режиме `toggleOn: 'expandIcon'` шеврон
  // как раз гасит клик, поэтому раскрытие группы не уводит на роут.
  const asLink = (href: string) =>
    function wrapItem(node: ReactNode) {
      return (
        <a
          href={href}
          className={styles.link}
          onClick={e => {
            if (e.defaultPrevented) {
              return;
            }

            e.preventDefault();
            setRoute(href);
          }}
        >
          {node}
        </a>
      );
    };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <List
          size='s'
          collapse={{ defaultValue: ['guides'], toggleOn: 'expandIcon' }}
          items={[
            {
              type: 'collapse',
              id: 'guides',
              content: { label: 'Руководства' },
              itemWrapRender: asLink('/guides'),
              items: [
                { id: 'start', content: { label: 'Быстрый старт' }, itemWrapRender: asLink('/guides/start') },
                { id: 'faq', content: { label: 'FAQ' }, itemWrapRender: asLink('/guides/faq') },
              ],
            },
            {
              type: 'collapse',
              id: 'components',
              content: { label: 'Компоненты' },
              itemWrapRender: asLink('/components'),
              items: [
                { id: 'button', content: { label: 'Button' }, itemWrapRender: asLink('/components/button') },
                { id: 'list', content: { label: 'List' }, itemWrapRender: asLink('/components/list') },
              ],
            },
          ]}
        />
      </div>
      <span>Текущий роут: {route}</span>
    </div>
  );
}
