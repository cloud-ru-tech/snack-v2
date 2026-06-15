import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type CollapseBlockPrivateProps = WithSupportProps<{
  children: ReactNode;
  header: ReactNode;
  expanded: boolean;
  className?: string;
}>;

// Раскрытие без анимации высоты: подход из Accordion/Tree (transition по max-height)
// не работает внутри Scroll-контейнера, поэтому контент монтируется/размонтируется напрямую.
export function CollapseBlockPrivate({ children, expanded, className, header, ...rest }: CollapseBlockPrivateProps) {
  return (
    <div
      className={cn(styles.accordion, className)}
      role='menuitem'
      aria-haspopup
      aria-expanded={expanded}
      {...extractSupportProps(rest)}
    >
      {header}

      <div className={styles.contentWrapper} aria-hidden={!expanded}>
        <div className={styles.content}>{expanded && children}</div>
      </div>
    </div>
  );
}
