import { LocaleProvider } from '@design-system/locale';
import { getThemeClassnames } from '@design-system/utils';
import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import type { Brand, Language, Platform, Theme } from '../types';
import styles from './styles.module.scss';

type StoryWrapperProps = {
  children: ReactNode;
  theme: Theme;
  brand: Brand;
  platform: Platform;
  language: Language;
};

/**
 * Базовая обертка для всех stories.
 * Подключает глобальные стили, шрифты и обеспечивает единообразное отображение.
 * Тема, бренд и платформа задаются через аддон "Тема / Бренд / Платформа" в панели Storybook.
 */
export const StoryWrapper = forwardRef<HTMLDivElement, StoryWrapperProps>(
  ({ children, theme, brand, platform, language }, ref) => {
    const themeClassnames = getThemeClassnames({ theme, brand, platform });

    return (
      <div ref={ref} className={cn(styles.wrapper, 'sb-story-wrapper', themeClassnames)}>
        <LocaleProvider lang={language}>
          <div className={cn(styles.content)}>{children}</div>
        </LocaleProvider>
      </div>
    );
  },
);
