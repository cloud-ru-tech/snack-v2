// Опорная палитра и тон-константы для генерации кастомного бренд-цвета. Тоновый набор и дефолтные
// hex совпадают с `--sn-brand-color-primary-<tone>` бренда `brandA` из `@cloud-ru/figma-variables`:
// генератор держит `L`/`C` этих тонов и поворачивает hue к seed-цвету потребителя.

/** Тон акцента (`--sn-brand-color-primary-55`) — им становится сам seed-цвет. */
export const PRIMARY_ACCENT_TONE = '55';

/** Near-white тон для текста на акценте (совпадает с дефолтом `onAccentLight` бренда `brandA`). */
export const NEAR_WHITE_TONE = '99';

/** Near-dark тон для текста на акценте (совпадает с дефолтом `onAccentDark` бренда `brandA`). */
export const NEAR_DARK_TONE = '5';

/** Все числовые тоны палитры `--sn-brand-color-primary-<tone>`. */
export const BRAND_PRIMARY_TONES = ['5', '10', '15', '25', '45', '55', '60', '65', '80', '90', '95', '99'] as const;

export type BrandPrimaryTone = (typeof BRAND_PRIMARY_TONES)[number];

/** Опорные hex тонов бренда `brandA` — источник `L`/`C` для генерации по любому seed-цвету. */
export const BASE_BRAND_PALETTE: Record<BrandPrimaryTone, string> = {
  '5': '#21372f',
  '10': '#243e35',
  '15': '#2b483c',
  '25': '#2c5e49',
  '45': '#22775b',
  '55': '#389f74',
  '60': '#5ebb91',
  '65': '#85ceaa',
  '80': '#bdeed8',
  '90': '#edf7f1',
  '95': '#f5fdf8',
  '99': '#fbfffc',
};

/** Префикс CSS-переменных бренд-палитры. */
export const BRAND_PRIMARY_VAR_PREFIX = '--sn-brand-color-primary-';

/** Alpha-суффикс для `--sn-brand-color-primary-transparent` (совпадает с дефолтом `#389f7424` бренда `brandA`). */
export const TRANSPARENT_ALPHA_SUFFIX = '24';

/**
 * Тинты акцента для activated-состояний (`--sn-brand-color-activated-*-background`) — это акцентный
 * тон с alpha. Суффиксы совпадают с дефолтами brandA (`#389f7426/59/73`). Без них activated-заливки
 * (выбранная строка таблицы, active-состояния) не следуют за кастомным бренд-цветом.
 */
export const ACTIVATED_ALPHA_SUFFIX = {
  default: '26',
  hovered: '59',
  pressed: '73',
} as const;

/** Имена CSS-переменных activated-заливок. */
export const BRAND_ACTIVATED_VAR = {
  default: '--sn-brand-color-activated-default-background',
  hovered: '--sn-brand-color-activated-hovered-background',
  pressed: '--sn-brand-color-activated-pressed-background',
} as const;
