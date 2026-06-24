// Тип через `(typeof X)[keyof typeof X]` — чтобы не тянуть `@ds/utils` (RSC-safe, как в colorScheme).

import { BRAND, BRAND_ROLE, DENSITY } from '../constants/appearance';
import { ColorScheme } from './colorScheme';

export type Density = (typeof DENSITY)[keyof typeof DENSITY];

export type Brand = (typeof BRAND)[keyof typeof BRAND];

export type BrandRole = (typeof BRAND_ROLE)[keyof typeof BRAND_ROLE];

/**
 * Набор осей оформления, которые определяют полный набор `sn-*` классов на DOM-границе. Любая
 * незаданная ось наследуется от вышестоящего провайдера (слияние в `ChildThemeProvider`) — но на сам
 * элемент всё равно эмитится **полный** набор классов, потому что токены `@cloud-ru/figma-variables`
 * не переопределяются по одной оси через CSS-каскад (см. providers-standard.md).
 */
export type ThemeAppearance = {
  /** Цветовая схема — `sn-light` / `sn-dark`. */
  colorScheme?: ColorScheme;
  /** Бренд — `sn-brandA` … */
  brand?: Brand;
  /** Роль бренда (палитра) — `sn-main` … */
  brandRole?: BrandRole;
  /** Плотность — `sn-comfort` / `sn-compact` / `sn-spacious`. */
  density?: Density;
  /** Акрил (blur-материал) — `sn-yes` при `true`, иначе `sn-no`. */
  acrylic?: boolean;
};
