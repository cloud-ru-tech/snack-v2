import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { BottomSheetFooterProps } from '../../types';
import styles from './styles.module.scss';

/** Нижняя action-зона bottom-sheet'а (рендерит `children` в `bottomBar`-секции). */
export function Footer({ children, className, ...rest }: BottomSheetFooterProps) {
  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)} data-test-id={TEST_IDS.footer}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
}
