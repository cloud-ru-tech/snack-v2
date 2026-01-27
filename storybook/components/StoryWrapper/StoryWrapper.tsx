import cn from 'classnames';
import React, { useState } from 'react';

import { ControlPanel } from '../ControlPanel';
import { useThemeSync } from '../hooks/useThemeSync';
import type { Brand, Platform, Theme } from '../types';
import styles from './styles.module.scss';

type StoryWrapperProps = {
  children: React.ReactNode;
};

/**
 * Базовая обертка для всех stories
 * Подключает глобальные стили, шрифты и обеспечивает единообразное отображение
 */
export function StoryWrapper({ children }: StoryWrapperProps) {
  const [theme, setTheme] = useState<Theme>('light');
  const [brand, setBrand] = useState<Brand>('brandA');
  const [platform, setPlatform] = useState<Platform>('desktop');

  // Синхронизация темы с родительским окном (документацией)
  useThemeSync({ setTheme, setBrand, setPlatform });

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
        `sn-${brand}`
      )}
    >
      <ControlPanel
        theme={theme}
        brand={brand}
        platform={platform}
        onThemeChange={setTheme}
        onBrandChange={setBrand}
        onPlatformChange={setPlatform}
      />

      <div
        className={cn(
          styles.content,
          'sb-story-wrapper',
          'sn-base-styles',
          'sn-figmaStyles',
          'sn-components',
          `sn-${platform}`,
          `sn-${theme}`,
          `sn-${brand}`
        )}
      >
        {children}
      </div>
    </div>
  );
}
