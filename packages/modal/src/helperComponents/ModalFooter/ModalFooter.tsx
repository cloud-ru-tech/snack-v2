import { SheetFooterProps } from '@ds/bottom-sheet';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ModalFooterProps = SheetFooterProps;

/** Footer модалки (desktop). */
export function ModalFooter({ children, className, ...rest }: ModalFooterProps) {
  return (
    <div className={cn(styles.footer, className)} {...extractSupportProps(rest)} data-test-id={TEST_IDS.footer}>
      <div className={styles.footerContentWrapper}>{children}</div>
    </div>
  );
}
