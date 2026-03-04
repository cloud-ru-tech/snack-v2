import { LocaleProvider } from '@design-system/locale';
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
  ({ children, theme, brand, platform, language }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles.wrapper,
        'sb-story-wrapper',
        'sn-base-styles',
        'sn-primitive',
        'sn-base-styles',
        'sn-figmaStyles',
        'sn-components',
        `sn-${platform}`,
        `sn-${theme}`,
        `sn-${brand}`,
        `sn-no`, // Acrylic, temporarily disabled (acrylic === 'enabled' ? 'sn-yes' : 'sn-no')
      )}
    >
      <LocaleProvider lang={language}>
        <div className={cn(styles.content)}>{children}</div>
      </LocaleProvider>
    </div>
  ),
);
