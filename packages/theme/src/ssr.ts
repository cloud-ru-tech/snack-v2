// SSR-безопасный субпуть `@ds/theme/ssr`: только чистые символы (без React-контекста/хуков),
// чтобы импорт в React Server Components не тянул `createContext`. Зеркало `@ds/adaptive/ssr`.

export { BRAND, BRAND_ROLE, DENSITY } from './constants/appearance';
export { COLOR_SCHEME, THEME_OVERRIDE, THEME_OVERRIDE_STORAGE_KEY } from './constants/colorScheme';
export type { Brand, BrandRole, Density, ThemeAppearance } from './types/appearance';
export type { ColorScheme, ThemeOverride } from './types/colorScheme';
export { mergeAppearance } from './utils/mergeAppearance';
export { getThemeClassnameList, getThemeClassnames } from './utils/getThemeClassnames';
export { resolveColorScheme } from './utils/resolveColorScheme';
export { getColorSchemeFromHeaders, getThemeOverrideFromHeaders } from './utils/colorSchemeFromHeaders';
export { getThemeBootstrapScript } from './utils/themeBootstrap';
