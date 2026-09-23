import { Divider } from '@ds/divider';
import { ChildThemeProvider, DENSITY } from '@ds/theme';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useRef } from 'react';

import styles from './styles.module.scss';

export type HeaderLayoutProps = WithSupportProps<{
  /** CSS-класс корневого элемента. */
  className?: string;
  /** Главное меню. */
  menu?: ReactNode;
  /** Логотип платформы. */
  logo?: ReactNode;
  /** Селектор проекта. */
  select?: ReactNode;
  /** Хлебные крошки. */
  breadcrumbs?: ReactNode;
  /** Панель действий в правой части. */
  toolbar?: ReactNode;
  /** Переносит хлебные крошки под основную строку и скрывает селектор. */
  isMobile?: boolean;
}>;

export function HeaderLayout({
  menu,
  logo,
  select,
  breadcrumbs,
  toolbar,
  className,
  isMobile = false,
  ...rest
}: HeaderLayoutProps) {
  const headerRef = useRef<HTMLElement>(null);

  const header = (
    <header ref={headerRef} className={cn(styles.header, className)} {...extractSupportProps(rest)}>
      <div className={styles.top}>
        <div className={styles.left}>
          {menu}
          {logo}

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

      {isMobile && Boolean(breadcrumbs) && (
        <>
          <div className={styles.bottom}>{breadcrumbs}</div>
          <Divider orientation='horizontal' />
        </>
      )}
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
