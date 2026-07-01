import { SheetFooterProps } from '@ds/bottom-sheet';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import styles from './styles.module.scss';

export type DrawerFooterProps = SheetFooterProps;

/** Footer дровера (desktop). */
export function DrawerFooter({ children, className, ...rest }: DrawerFooterProps) {
  return (
    <div className={cn(styles.footer, className)} {...extractSupportProps(rest)}>
      {children}
    </div>
  );
}
