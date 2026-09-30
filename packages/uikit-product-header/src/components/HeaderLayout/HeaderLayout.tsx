import { Divider } from '@ds/divider';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { useMobileLayout } from '../../hooks/useMobileLayout';
import styles from './styles.module.scss';

export type HeaderLayoutProps = WithSupportProps<{
  /** CSS-класс корневого элемента. */
  className?: string;
  /** Слот главного меню (слева, после логотипа). */
  menu?: ReactNode;
  /** Слот логотипа (крайний левый). */
  logo?: ReactNode;
  /** Слот селектора (например, выбор облака/организации), после меню. */
  select?: ReactNode;
  /** Слот хлебных крошек. На mobile переносится под основную строку хедера. */
  breadcrumbs?: ReactNode;
  /** Слот тулбара — правая часть хедера. */
  toolbar?: ReactNode;
}>;

export function HeaderLayout({ menu, logo, select, breadcrumbs, toolbar, className, ...rest }: HeaderLayoutProps) {
  const isMobile = useMobileLayout();
  return (
    <header
      className={cn(styles.header, className)}
      data-mobile={isMobile || undefined}
      {...extractSupportProps({ 'data-test-id': TEST_IDS.headerLayout.root, ...rest })}
    >
      <div className={styles.top}>
        <div className={styles.left}>
          {logo && <>{logo}</>}

          {menu && (
            <>
              <Divider orientation='vertical' />
              {menu}
              {isMobile && <Divider orientation='vertical' />}
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
              <div className={styles.breadcrums}>{breadcrumbs}</div>
            </>
          )}
        </div>

        <div className={styles.right}>{toolbar}</div>
      </div>
      <Divider orientation='horizontal' />

      {isMobile && breadcrumbs && (
        <>
          <div className={styles.breadcrums}>{breadcrumbs}</div>
          <Divider orientation='horizontal' />
        </>
      )}
    </header>
  );
}
