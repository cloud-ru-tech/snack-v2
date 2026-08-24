import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Divider } from '@ds/divider';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type HeaderLayoutProps = WithSupportProps<{
  className?: string;
  menu?: ReactNode;
  logo?: ReactNode;
  select?: ReactNode;
  breadcrumbs?: ReactNode;
  toolbar?: ReactNode;
}>;

export function HeaderLayout({ menu, logo, select, breadcrumbs, toolbar, className, ...rest }: HeaderLayoutProps) {
  const isMobile = isMobileLayout(useAdaptiveLayout().layoutType);

  return (
    <header
      className={cn(styles.header, className)}
      {...extractSupportProps({ 'data-test-id': TEST_IDS.headerLayout.root, ...rest })}
    >
      <div className={styles.top}>
        <div className={styles.left}>
          {logo && <>{logo}</>}

          {menu && (
            <>
              <Divider orientation='vertical' />
              {menu}
            </>
          )}

          {!isMobile && select && (
            <>
              <Divider orientation='vertical' />
              {select}
            </>
          )}

          {!isMobile && breadcrumbs && (
            <>
              <Divider orientation='vertical' />
              {breadcrumbs}
            </>
          )}
        </div>

        <div className={styles.right}>{toolbar}</div>
      </div>
      <Divider orientation='horizontal' />

      {isMobile && Boolean(breadcrumbs) && <div className={styles.bottom}>{breadcrumbs}</div>}
    </header>
  );
}
