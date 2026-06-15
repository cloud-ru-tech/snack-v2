import { List } from '@ds/list';

import styles from './styles.module.scss';

export function ItemContentDescription() {
  return (
    <div className={styles.box}>
      <List
        size='l'
        items={[
          {
            id: 'eu-west',
            content: {
              option: 'eu-west-1',
              caption: 'Доступно',
              description: 'Ирландия — основной регион размещения',
            },
          },
          {
            id: 'us-east',
            content: {
              option: 'us-east-1',
              caption: 'Деградация',
              description: 'Северная Виргиния — повышенная задержка отклика',
            },
          },
        ]}
      />
    </div>
  );
}
