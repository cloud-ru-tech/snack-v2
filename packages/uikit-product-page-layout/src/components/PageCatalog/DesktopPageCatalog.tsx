import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { Headline, HeadlineProps } from '../Headline';
import styles from './styles.module.scss';

export type DesktopPageCatalogProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'actions'> & {
      /** CSS-класс */
      className?: string;
    }
  >
>;

export function DesktopPageCatalog({ children, title, actions, className, ...rest }: DesktopPageCatalogProps) {
  return (
    <div className={cn(styles.catalog, className)} {...extractSupportProps(rest)}>
      <Headline title={title} actions={actions} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

DesktopPageCatalog.displayName = 'DesktopPageCatalog';
