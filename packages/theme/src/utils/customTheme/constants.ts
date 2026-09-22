// Опорная палитра и тон-константы для генерации кастомного бренд-цвета. Тоновый набор и дефолтные
// hex совпадают с `--sn-brand-color-primary-<tone>` бренда `cloudConsole` из `@cloud-ru/figma-variables`:
// генератор держит `L`/`C` этих тонов и поворачивает hue к seed-цвету потребителя.

/** Тон акцента (`--sn-brand-color-primary-50`) — им становится сам seed-цвет. */
export const PRIMARY_ACCENT_TONE = '50';

/** Near-white тон для текста на акценте (совпадает с дефолтом `onAccentLight` бренда `cloudConsole`). */
export const NEAR_WHITE_TONE = '99';

/** Near-dark тон для текста на акценте (совпадает с дефолтом `onAccentDark` бренда `cloudConsole`). */
export const NEAR_DARK_TONE = '05';

/** Все числовые тоны палитры `--sn-brand-color-primary-<tone>`. */
export const BRAND_PRIMARY_TONES = ['05', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95', '99'] as const;

export type BrandPrimaryTone = (typeof BRAND_PRIMARY_TONES)[number];

/** Опорные hex тонов бренда `cloudConsole` — источник `L`/`C` для генерации по любому seed-цвету. */
export const BASE_BRAND_PALETTE: Record<BrandPrimaryTone, string> = {
  '05': '#21372f',
  '10': '#243e35',
  '20': '#2b483c',
  '30': '#2c5e49',
  '40': '#22775b',
  '50': '#389f74',
  '60': '#5ebb91',
  '70': '#85ceaa',
  '80': '#caeadb',
  '90': '#edf7f1',
  '95': '#f5fdf8',
  '99': '#fbfffc',
};

/** Префикс CSS-переменных бренд-палитры. */
export const BRAND_PRIMARY_VAR_PREFIX = '--sn-brand-color-primary-';

/** Alpha-суффикс для `--sn-brand-color-primary-transparent` (дефолт `#389f741a` бренда cloudConsole). */
export const TRANSPARENT_ALPHA_SUFFIX = '1a';

/**
 * Тинты акцента для activated-состояний (`--sn-brand-color-state-activated-*-background`) — это
 * акцентный тон с alpha. Суффиксы — дефолты cloudConsole (`#389f741a/33/4d`). Без них
 * activated-заливки (выбранная строка таблицы, active-состояния) не следуют за кастомным бренд-цветом.
 */
export const ACTIVATED_ALPHA_SUFFIX = {
  default: '1a',
  hovered: '33',
  pressed: '4d',
} as const;

/** Имена CSS-переменных activated-заливок. */
export const BRAND_ACTIVATED_VAR = {
  default: '--sn-brand-color-state-activated-default-background',
  hovered: '--sn-brand-color-state-activated-hovered-background',
  pressed: '--sn-brand-color-state-activated-pressed-background',
} as const;
