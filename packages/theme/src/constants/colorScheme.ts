// Цветовая схема = класс `sn-light`/`sn-dark` на корне. Чистый модуль (RSC-safe), реэкспорт из `@ds/theme/ssr`.
// Источник персиста по умолчанию — cookie (читается и на сервере, и синхронно в inline-bootstrap).

/** Разрешённая цветовая схема (то, что реально применяется на корень). */
export const COLOR_SCHEME = {
  Light: 'light',
  Dark: 'dark',
} as const;

/** Пользовательский выбор: фиксированная схема или `system` (следовать `prefers-color-scheme`). */
export const THEME_OVERRIDE = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} as const;

/** Ключ персиста override (имя cookie; тот же ключ читает inline-bootstrap и SSR). */
export const THEME_OVERRIDE_STORAGE_KEY = 'ds-theme';
