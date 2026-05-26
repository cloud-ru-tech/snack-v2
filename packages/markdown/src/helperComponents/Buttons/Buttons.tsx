import { Divider } from '@ds/divider';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

// Toolbar-строка: группы кнопок с дивайдерами.
export type ButtonsProps = {
  children: ReactNode;
};

export function Buttons({ children }: ButtonsProps) {
  return (
    <div className={styles.root} data-test-id={TEST_IDS.toolbar} role='toolbar'>
      {children}
    </div>
  );
}

export type ButtonsGroupProps = {
  children: ReactNode;
};

export function ButtonsGroup({ children }: ButtonsGroupProps) {
  return <div className={styles.group}>{children}</div>;
}

export function ButtonsDivider() {
  return <Divider orientation='vertical' className={styles.divider} />;
}
