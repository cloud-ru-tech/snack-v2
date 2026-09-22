import { AdaptiveProvider, isMobileLayout, LayoutType } from '@ds/adaptive';
import { ChildThemeProvider, PLATFORM } from '@ds/theme';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type LayoutScopeProps = {
  /** Раскладка поддерева. */
  layoutType: LayoutType;
  children: ReactNode;
};

/**
 * Форс раскладки в поддереве стори: `AdaptiveProvider` и согласованная платформа темы
 * (`webMobile` только для `mobile`). Тема не читает раскладку сама, поэтому одного `AdaptiveProvider` мало.
 */
export function LayoutScope({ layoutType, children }: LayoutScopeProps) {
  const platform = isMobileLayout(layoutType) ? PLATFORM.WebMobile : PLATFORM.WebDesktop;

  return (
    <AdaptiveProvider layoutType={layoutType}>
      <ChildThemeProvider value={{ platform }} className={styles.scope}>
        {children}
      </ChildThemeProvider>
    </AdaptiveProvider>
  );
}
