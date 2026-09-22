export const ADDON_ID = 'storybook-addon-theme-controls';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TOOL_ID = `${ADDON_ID}/toolbar`;

export const GLOBAL_KEYS = {
  THEME: 'theme',
  BRAND: 'brand',
  BRAND_COLOR: 'brandColor',
  DENSITY: 'density',
  ACRYLIC: 'acrylic',
  LANGUAGE: 'language',
} as const;

export const INITIAL_GLOBALS = {
  [GLOBAL_KEYS.THEME]: 'light',
  [GLOBAL_KEYS.BRAND]: 'cloudConsole',
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

// Семейства HR-портала и сайта — финальные цветовые варианты: родительские слои hrPortal/site нужны только в Figma.
export const BRAND_OPTIONS = [
  { value: 'cloudConsole', label: 'Cloud Console' },
  { value: 'giga-id', label: 'Giga ID' },
  { value: 'gitverse', label: 'GitVerse' },
  { value: 'snackUI', label: 'Snack UI' },
  { value: 'hrBlue', label: 'HR Portal · Blue' },
  { value: 'hrGraphite', label: 'HR Portal · Graphite' },
  { value: 'hrGreen', label: 'HR Portal · Green' },
  { value: 'hrPurple', label: 'HR Portal · Purple' },
  { value: 'hrYellow', label: 'HR Portal · Yellow' },
  { value: 'siteBlue', label: 'Site · Blue' },
  { value: 'siteGraphite', label: 'Site · Graphite' },
  { value: 'siteGreen', label: 'Site · Green' },
  { value: 'sitePurple', label: 'Site · Purple' },
  { value: 'siteYellow', label: 'Site · Yellow' },
] as const;

type BrandGroup = {
  /** Заголовок семейства; без него бренды идут отдельными пунктами. */
  label?: string;
  brands: ReadonlyArray<{ value: Brand; label: string }>;
};

// Переключатель бренда в тулбаре: семейства HR-портала и сайта — заголовок с цветовыми вариантами внутри, как в доке.
export const BRAND_GROUPS: ReadonlyArray<BrandGroup> = [
  {
    brands: [
      { value: 'cloudConsole', label: 'Cloud Console' },
      { value: 'giga-id', label: 'Giga ID' },
      { value: 'gitverse', label: 'GitVerse' },
      { value: 'snackUI', label: 'Snack UI' },
    ],
  },
  {
    label: 'HR Portal',
    brands: [
      { value: 'hrBlue', label: 'Blue' },
      { value: 'hrGraphite', label: 'Graphite' },
      { value: 'hrGreen', label: 'Green' },
      { value: 'hrPurple', label: 'Purple' },
      { value: 'hrYellow', label: 'Yellow' },
    ],
  },
  {
    label: 'Site',
    brands: [
      { value: 'siteBlue', label: 'Blue' },
      { value: 'siteGraphite', label: 'Graphite' },
      { value: 'siteGreen', label: 'Green' },
      { value: 'sitePurple', label: 'Purple' },
      { value: 'siteYellow', label: 'Yellow' },
    ],
  },
];

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
export type Density = (typeof DENSITY_OPTIONS)[number]['value'];
export type Acrylic = (typeof ACRYLIC_OPTIONS)[number]['value'];
export type Language = (typeof LANGUAGE_OPTIONS)[number]['value'];

/** Event from preview when parent (docs) sends theme-sync */
export const CHANNEL_SYNC_EVENT = `${ADDON_ID}/sync`;
