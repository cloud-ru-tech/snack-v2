import { Divider, VARIANT } from '@ds/divider';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../../constants';
import { useNewListContext } from '../../Lists/contexts';
import styles from './styles.module.scss';

export function PinTopGroupItem({ children }: { children: ReactNode }) {
  const { size = 's' } = useNewListContext();

  if (!children) {
    return null;
  }

  return (
    <div className={cn(styles.pinTopItem)} data-size={size} data-test-id={TEST_IDS.pinTopGroupItem}>
      <div>{children}</div>

      <Divider variant={VARIANT.Regular} />
    </div>
  );
}

export function PinBottomGroupItem({ children }: { children: ReactNode }) {
  const { size = 's' } = useNewListContext();

  if (!children) {
    return null;
  }

  return (
    <div className={cn(styles.pinBottomItem)} data-size={size} data-test-id={TEST_IDS.pinBottomGroupItem}>
      <Divider variant={VARIANT.Regular} />
      <div>{children}</div>
    </div>
  );
}
