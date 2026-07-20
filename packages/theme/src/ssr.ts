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
// Кастомный бренд-цвет — чистые (без React/DOM) генератор палитры и сборщик CSS-переменных, чтобы
// SSR/RSC мог инжектить `--sn-brand-color-primary-*` строкой и убрать мигание до гидрации.
export { generateBrandPalette } from './utils/customTheme/generateBrandPalette';
export type { BrandPalette } from './utils/customTheme/generateBrandPalette';
export { buildBrandPaletteVars } from './utils/customTheme/buildBrandPaletteVars';
export { buildBrandPaletteCss } from './utils/customTheme/buildBrandPaletteCss';
export {
  BASE_BRAND_PALETTE,
  BRAND_PRIMARY_TONES,
  BRAND_PRIMARY_VAR_PREFIX,
  PRIMARY_ACCENT_TONE,
} from './utils/customTheme/constants';
export type { BrandPrimaryTone } from './utils/customTheme/constants';
