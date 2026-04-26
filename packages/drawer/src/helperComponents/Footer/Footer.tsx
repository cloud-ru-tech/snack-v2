import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export type DrawerFooterProps = PropsWithChildren<
  WithSupportProps<{
    /** CSS-класс */
    className?: string;
  }>
>;

/** Вспомогательный компонент для добавления "футера" в DrawerCustom */
export function DrawerFooter({ children, className, ...rest }: DrawerFooterProps) {
  return (
    <div className={cn(styles.footer, className)} {...extractSupportProps(rest)}>
      {children}
    </div>
  );
}
