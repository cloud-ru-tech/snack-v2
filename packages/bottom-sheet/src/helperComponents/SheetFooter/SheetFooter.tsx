import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { BottomSheetFooterProps } from '../../types';
import styles from './styles.module.scss';

export type SheetFooterProps = BottomSheetFooterProps;

/** Нижняя action-зона bottom-sheet'а (рендерит `children` в `bottomBar`-секции). */
export function SheetFooter({ children, className, ...rest }: SheetFooterProps) {
  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)} data-test-id={TEST_IDS.footer}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
}
