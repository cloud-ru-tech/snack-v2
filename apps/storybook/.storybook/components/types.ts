import { BUILTIN_LANGS } from '@ds/locale';
import type { Brand, BrandRole, ColorScheme, Density } from '@ds/theme';

export type { Brand, BrandRole, Density };
// Storybook исторически зовёт цветовую схему Theme.
export type Theme = ColorScheme;
export type Language = (typeof BUILTIN_LANGS)[number];
// Acrylic — UI-переключатель сторибука: в @ds/theme ось acrylic это boolean, строкового эквивалента нет.
export type Acrylic = 'enabled' | 'disabled';

export type ThemeSyncData = {
  theme?: Theme;
  brand?: Brand;
  brandRole?: BrandRole;
  density?: Density;
  language?: Language;
};
