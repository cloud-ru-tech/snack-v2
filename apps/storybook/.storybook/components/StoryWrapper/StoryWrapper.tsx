import { LocaleProvider } from '@ds/locale';
import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import type { Acrylic, Brand, Density, Language, Theme } from '../types';
import styles from './styles.module.scss';

type StoryWrapperProps = {
  children: ReactNode;
  theme: Theme;
  brand: Brand;
  density: Density;
  language: Language;
  acrylic: Acrylic;
};

/**
 * Базовая обертка для всех stories.
 * Подключает глобальные стили, шрифты и обеспечивает единообразное отображение.
 * Тема, бренд и платформа задаются через аддон "Тема / Бренд / Платформа" в панели Storybook.
 */
export const StoryWrapper = forwardRef<HTMLDivElement, StoryWrapperProps>(
  ({ children, theme, brand, density, acrylic, language }, ref) => (
    <LocaleProvider lang={language}>
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
          `sn-${density}`,
          `sn-${theme}`,
          `sn-${brand}`,
          acrylic === 'enabled' ? 'sn-yes' : 'sn-no',
        )}
      >
        <div className={cn(styles.content)}>{children}</div>
      </div>
    </LocaleProvider>
  ),
);
