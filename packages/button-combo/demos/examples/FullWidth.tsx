import { ButtonCombo, Item } from '@ds/button-combo';

import styles from './styles.module.scss';

const items: Item[] = [
  { id: 'confirm', label: 'Подтвердить', onClick: () => console.info('Подтвердить') },
  { id: 'confirm-notify', label: 'Подтвердить и уведомить', onClick: () => console.info('Подтвердить и уведомить') },
];

export function FullWidth() {
  return (
    <div className={styles.narrow}>
      <ButtonCombo fullWidth items={items} defaultValue='confirm' />
    </div>
  );
}
