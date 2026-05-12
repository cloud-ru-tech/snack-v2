export const ADDON_ID = 'storybook-addon-theme-controls';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TOOL_ID = `${ADDON_ID}/toolbar`;

export const GLOBAL_KEYS = {
  THEME: 'theme',
  BRAND: 'brand',
  BRAND_ROLE: 'brandRole',
  DENSITY: 'density',
  ACRYLIC: 'acrylic',
  LANGUAGE: 'language',
} as const;

export const INITIAL_GLOBALS = {
  [GLOBAL_KEYS.THEME]: 'light',
  [GLOBAL_KEYS.BRAND]: 'brandA',
  [GLOBAL_KEYS.BRAND_ROLE]: 'main',
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
] as const;

export const BRAND_ROLE_OPTIONS = [
  { value: 'main', label: 'Main' },
  { value: 'alter', label: 'Alter' },
] as const;

export const DENSITY_OPTIONS = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfort', label: 'Comfort' },
] as const;

export const ACRYLIC_OPTIONS = [
  { value: 'enabled', label: 'Acryl ON' },
  { value: 'disabled', label: 'Acryl OFF' },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'en-GB', label: 'English' },
  { value: 'ru-RU', label: 'Русский' },
] as const;

export type Theme = (typeof THEME_OPTIONS)[number]['value'];
export type Brand = (typeof BRAND_OPTIONS)[number]['value'];
export type BrandRole = (typeof BRAND_ROLE_OPTIONS)[number]['value'];
export type Density = (typeof DENSITY_OPTIONS)[number]['value'];
export type Acrylic = (typeof ACRYLIC_OPTIONS)[number]['value'];
export type Language = (typeof LANGUAGE_OPTIONS)[number]['value'];

/** Event from preview when parent (docs) sends theme-sync */
export const CHANNEL_SYNC_EVENT = `${ADDON_ID}/sync`;
