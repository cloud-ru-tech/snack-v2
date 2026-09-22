// Оси оформления дизайн-системы, спроецированные на классы `sn-*` из `@cloud-ru/figma-variables`.
// Чистый модуль (без React/DOM) — реэкспортируется из `@ds/theme/ssr` (RSC-safe).

/** Плотность раскладки. Класс `sn-comfort` / `sn-compact` / `sn-spacious`. */
export const DENSITY = {
  Comfort: 'comfort',
  Compact: 'compact',
  Spacious: 'spacious',
} as const;

/**
 * Платформа — набор размеров, типографики и отступов, из которого плотность берёт свои значения.
 * Класс `sn-webDesktop` / `sn-webMobile`.
 */
export const PLATFORM = {
  WebDesktop: 'webDesktop',
  WebMobile: 'webMobile',
} as const;

/**
 * Бренд. Класс `sn-<значение>`. Семейства HR-портала и сайта представлены финальными цветовыми
 * вариантами: родительские слои `hrPortal`/`site` нужны только в Figma.
 */
export const BRAND = {
  CloudConsole: 'cloudConsole',
  GigaId: 'giga-id',
  Gitverse: 'gitverse',
  SnackUI: 'snackUI',
  HrBlue: 'hrBlue',
  HrGraphite: 'hrGraphite',
  HrGreen: 'hrGreen',
  HrPurple: 'hrPurple',
  HrYellow: 'hrYellow',
  SiteBlue: 'siteBlue',
  SiteGraphite: 'siteGraphite',
  SiteGreen: 'siteGreen',
  SitePurple: 'sitePurple',
  SiteYellow: 'siteYellow',
} as const;
