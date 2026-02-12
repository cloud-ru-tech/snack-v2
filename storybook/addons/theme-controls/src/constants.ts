export const ADDON_ID = 'storybook-addon-theme-controls';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TOOL_ID = `${ADDON_ID}/toolbar`;

export const GLOBAL_KEYS = {
  THEME: 'theme',
  BRAND: 'brand',
  PLATFORM: 'platform',
  ACRYLIC: 'acrylic',
} as const;

export const INITIAL_GLOBALS = {
  [GLOBAL_KEYS.THEME]: 'light',
  [GLOBAL_KEYS.BRAND]: 'brandA',
  [GLOBAL_KEYS.PLATFORM]: 'desktop',
  [GLOBAL_KEYS.ACRYLIC]: 'disabled',
} as const;

export const THEME_OPTIONS = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Темная' },
] as const;

export const BRAND_OPTIONS = [
  { value: 'brandA', label: 'Brand A' },
  { value: 'brandB', label: 'Brand B' },
] as const;

export const PLATFORM_OPTIONS = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'mobile', label: 'Mobile' },
] as const;

export const ACRYLIC_OPTIONS = [
  { value: 'enabled', label: 'Acryl ON' },
  { value: 'disabled', label: 'Acryl OFF' },
] as const;

export type Theme = (typeof THEME_OPTIONS)[number]['value'];
export type Brand = (typeof BRAND_OPTIONS)[number]['value'];
export type Platform = (typeof PLATFORM_OPTIONS)[number]['value'];
export type Acrylic = (typeof ACRYLIC_OPTIONS)[number]['value'];

/** Event from preview when parent (docs) sends theme-sync */
export const CHANNEL_SYNC_EVENT = `${ADDON_ID}/sync`;
