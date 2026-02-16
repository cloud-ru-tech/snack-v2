import cn from 'classnames';
import type { ReactNode } from 'react';

import type { Brand, Platform, Theme } from '../types';
import styles from './styles.module.scss';

type StoryWrapperProps = {
  children: ReactNode;
  theme: Theme;
  brand: Brand;
  platform: Platform;
};

/**
 * Базовая обертка для всех stories.
 * Подключает глобальные стили, шрифты и обеспечивает единообразное отображение.
 * Тема, бренд и платформа задаются через аддон "Тема / Бренд / Платформа" в панели Storybook.
 */
export function StoryWrapper({ children, theme, brand, platform }: StoryWrapperProps) {
  return (
    <div
      className={cn(
        styles.wrapper,
        'sb-story-wrapper',
        'sn-primitive',
        'sn-figmaStyles',
        'sn-components',
        `sn-${platform}`,
        `sn-${theme}`,
        `sn-${brand}`,
        `sn-no`, // Acrylic, temporarily disabled (acrylic === 'enabled' ? 'sn-yes' : 'sn-no')
      )}
    >
      <div
        className={cn(
          styles.content,
          'sb-story-wrapper',
          'sn-base-styles',
          'sn-figmaStyles',
          'sn-components',
          `sn-${platform}`,
          `sn-${theme}`,
          `sn-${brand}`,
        )}
      >
        {children}
      </div>
    </div>
  );
}
