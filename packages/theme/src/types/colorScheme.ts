import { COLOR_SCHEME, THEME_OVERRIDE } from '../constants/colorScheme';

/** Разрешённая цветовая схема (то, что реально применяется на корень). */
export type ColorScheme = (typeof COLOR_SCHEME)[keyof typeof COLOR_SCHEME];

/** Пользовательский выбор: фиксированная схема или `system`. */
export type ThemeOverride = (typeof THEME_OVERRIDE)[keyof typeof THEME_OVERRIDE];
