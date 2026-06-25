// Цветовая схема = класс `sn-light`/`sn-dark` на корне. Чистый модуль (RSC-safe), реэкспорт из `@ds/theme/ssr`.
// Персиста по умолчанию нет: `useColorScheme` держит выбор in-memory, а cookie/localStorage подключает
// потребитель явным адаптером. Этот ключ — дефолтное имя для опциональных адаптеров и SSR/bootstrap-хелперов.

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

/**
 * Дефолтное имя ключа персиста override для опциональных адаптеров (cookie/localStorage) и
 * SSR/bootstrap-хелперов. Namespace'нут под DS, чтобы не пересекаться с ключами хост-приложения.
 * Конкретный адаптер может переопределить его через `storageKey`.
 */
export const THEME_OVERRIDE_STORAGE_KEY = 'snack-uikit-theme';
