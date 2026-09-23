import { Divider } from '@ds/divider';
import { ChildThemeProvider, DENSITY } from '@ds/theme';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useRef } from 'react';

import { TEST_IDS } from '../../constants';
import { useMobileLayout } from '../../hooks/useMobileLayout';
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
  const isMobile = useMobileLayout();
  const headerRef = useRef<HTMLElement>(null);

  const header = (
    <header
      ref={headerRef}
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

  // Временная фиксация: на mobile прикладная тема переключилась на compact, а шапка сверстана
  // под comfort и на compact ещё не переехала. Провайдер (а не класс на `<header>`) нужен потому,
  // что поверхности шапки — порталы: они переэмитят набор `sn-*` из контекста на своём корне,
  // и класс, поставленный поверх, проиграл бы их собственному.
  if (isMobile) {
    return (
      <ChildThemeProvider value={{ density: DENSITY.Comfort }} rootRef={headerRef}>
        {header}
      </ChildThemeProvider>
    );
  }

  return header;
}
