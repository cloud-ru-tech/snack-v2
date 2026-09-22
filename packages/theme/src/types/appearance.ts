// Тип через `(typeof X)[keyof typeof X]` — чтобы не тянуть `@ds/utils` (RSC-safe, как в colorScheme).

import { BRAND, DENSITY, PLATFORM } from '../constants/appearance';
import { ColorScheme } from './colorScheme';

export type Density = (typeof DENSITY)[keyof typeof DENSITY];

export type Platform = (typeof PLATFORM)[keyof typeof PLATFORM];

export type Brand = (typeof BRAND)[keyof typeof BRAND];

/**
 * Набор осей оформления, которые определяют полный набор `sn-*` классов на DOM-границе. Любая
 * незаданная ось наследуется от вышестоящего провайдера (слияние в `ChildThemeProvider`) — но на сам
 * элемент всё равно эмитится **полный** набор классов, потому что токены `@cloud-ru/figma-variables`
 * не переопределяются по одной оси через CSS-каскад (см. providers-standard.md).
 */
export type ThemeAppearance = {
  /** Цветовая схема — `sn-light` / `sn-dark`. */
  colorScheme?: ColorScheme;
  /** Бренд — `sn-cloudConsole` / `sn-hrBlue` … */
  brand?: Brand;
  /**
   * Платформа — `sn-webDesktop` / `sn-webMobile`. Без значения — `webDesktop`. Раскладку `@ds/adaptive`
   * тема не читает: потребитель передаёт согласованные значения и в `AdaptiveProvider`, и сюда.
   */
  platform?: Platform;
  /** Плотность — `sn-comfort` / `sn-compact` / `sn-spacious`. */
  density?: Density;
  /** Акрил (blur-материал) — `sn-yes` при `true`, иначе `sn-no`. */
  acrylic?: boolean;
};
