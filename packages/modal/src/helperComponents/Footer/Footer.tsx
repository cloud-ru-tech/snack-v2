import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type FooterProps = PropsWithChildren<
  WithSupportProps<{
    /** CSS-класс */
    className?: string;
  }>
>;

export function Footer({ children, className, ...rest }: FooterProps) {
  return (
    <div className={cn(styles.footer, className)} {...extractSupportProps(rest)} data-test-id={TEST_IDS.footer}>
      <div className={styles.footerContentWrapper}>{children}</div>
    </div>
  );
}
