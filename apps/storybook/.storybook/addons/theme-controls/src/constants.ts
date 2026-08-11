export const ADDON_ID = 'storybook-addon-theme-controls';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TOOL_ID = `${ADDON_ID}/toolbar`;

export const GLOBAL_KEYS = {
  THEME: 'theme',
  BRAND: 'brand',
  BRAND_ROLE: 'brandRole',
  BRAND_COLOR: 'brandColor',
  DENSITY: 'density',
  ACRYLIC: 'acrylic',
  LANGUAGE: 'language',
} as const;

export const INITIAL_GLOBALS = {
  [GLOBAL_KEYS.THEME]: 'light',
  [GLOBAL_KEYS.BRAND]: 'brandA',
  [GLOBAL_KEYS.BRAND_ROLE]: 'main',
  // Пусто = кастомного бренд-цвета нет, используется предустановленный бренд. Непустой hex →
  // `brandColor` на корневом `RootThemeProvider` перекрашивает акцент во всех стори (white-label).
  [GLOBAL_KEYS.BRAND_COLOR]: '',
  [GLOBAL_KEYS.DENSITY]: 'compact',
  [GLOBAL_KEYS.ACRYLIC]: 'disabled',
  [GLOBAL_KEYS.LANGUAGE]: 'en-GB',
} as const;

export const THEME_OPTIONS = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Темная' },
] as const;

export const BRAND_OPTIONS = [
  { value: 'brandA', label: 'Brand A' },
  { value: 'brandB', label: 'Brand B' },
  { value: 'brandC', label: 'Brand C' },
  { value: 'brandD', label: 'Brand D' },
] as const;

export const BRAND_ROLE_OPTIONS = [
  { value: 'main', label: 'Main' },
  { value: 'alter', label: 'Alter' },
  { value: 'alter2', label: 'Alter 2' },
  { value: 'alter3', label: 'Alter 3' },
  { value: 'alter4', label: 'Alter 4' },
] as const;

export const DENSITY_OPTIONS = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfort', label: 'Comfort' },
  { value: 'spacious', label: 'Spacious' },
] as const;

export const ACRYLIC_OPTIONS = [
  { value: 'enabled', label: 'Acryl ON' },
  { value: 'disabled', label: 'Acryl OFF' },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'en-GB', label: 'English' },
  { value: 'ru-RU', label: 'Русский' },
  // Псевдоязык i18next: `t()` возвращает ключи вместо перевода — для отладки строк и скриншотов ключей.
  { value: 'cimode', label: 'CIMODE (ключи)' },
] as const;

export type Theme = (typeof THEME_OPTIONS)[number]['value'];
export type Brand = (typeof BRAND_OPTIONS)[number]['value'];
export type BrandRole = (typeof BRAND_ROLE_OPTIONS)[number]['value'];
export type Density = (typeof DENSITY_OPTIONS)[number]['value'];
export type Acrylic = (typeof ACRYLIC_OPTIONS)[number]['value'];
export type Language = (typeof LANGUAGE_OPTIONS)[number]['value'];

/** Event from preview when parent (docs) sends theme-sync */
export const CHANNEL_SYNC_EVENT = `${ADDON_ID}/sync`;
