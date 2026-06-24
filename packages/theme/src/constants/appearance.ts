// Оси оформления дизайн-системы, спроецированные на классы `sn-*` из `@cloud-ru/figma-variables`.
// Чистый модуль (без React/DOM) — реэкспортируется из `@ds/theme/ssr` (RSC-safe).

/** Плотность раскладки. Класс `sn-comfort` / `sn-compact` / `sn-spacious`. */
export const DENSITY = {
  Comfort: 'comfort',
  Compact: 'compact',
  Spacious: 'spacious',
} as const;

/** Бренд. Класс `sn-brandA` / `sn-brandB` / `sn-brandC`. */
export const BRAND = {
  A: 'brandA',
  B: 'brandB',
  C: 'brandC',
} as const;

/** Роль бренда (палитра). Класс `sn-main` / `sn-alter` … */
export const BRAND_ROLE = {
  Main: 'main',
  Alter: 'alter',
  Alter2: 'alter2',
  Alter3: 'alter3',
  Alter4: 'alter4',
} as const;
