import React from 'react';

import { ControlSelect } from '../ControlSelect';
import type { Brand, Platform, Theme } from '../types';
import styles from './styles.module.scss';

type ControlPanelProps = {
  theme: Theme;
  brand: Brand;
  platform: Platform;
  onThemeChange: (theme: Theme) => void;
  onBrandChange: (brand: Brand) => void;
  onPlatformChange: (platform: Platform) => void;
};

const THEME_OPTIONS = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Темная' },
];

const BRAND_OPTIONS = [
  { value: 'brandA', label: 'Brand A' },
  { value: 'brandB', label: 'Brand B' },
];

const PLATFORM_OPTIONS = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'mobile', label: 'Mobile' },
];

/**
 * Панель контролов для переключения темы, бренда и платформы
 */
export function ControlPanel({
  theme,
  brand,
  platform,
  onThemeChange,
  onBrandChange,
  onPlatformChange,
}: ControlPanelProps) {
  return (
    <div className={styles.panel}>
      <ControlSelect
        label="Тема"
        value={theme}
        options={THEME_OPTIONS}
        onChange={(value) => onThemeChange(value as Theme)}
      />

      <ControlSelect
        label="Бренд"
        value={brand}
        options={BRAND_OPTIONS}
        onChange={(value) => onBrandChange(value as Brand)}
      />

      <ControlSelect
        label="Платформа"
        value={platform}
        options={PLATFORM_OPTIONS}
        onChange={(value) => onPlatformChange(value as Platform)}
      />
    </div>
  );
}
