import { apcaContrast } from './color';
import {
  ACTIVATED_ALPHA_SUFFIX,
  BRAND_ACTIVATED_VAR,
  BRAND_PRIMARY_VAR_PREFIX,
  NEAR_DARK_TONE,
  NEAR_WHITE_TONE,
  PRIMARY_ACCENT_TONE,
  TRANSPARENT_ALPHA_SUFFIX,
} from './constants';
import { generateBrandPalette } from './generateBrandPalette';

const WHITE_HEX = '#ffffff';

// Порог APCA-контраста белого текста на акценте: ниже него акцент считается слишком светлым и текст
// инвертируется на тёмный.
const WHITE_ON_ACCENT_MIN_CONTRAST = 50;

/**
 * Собирает карту CSS-переменных `--sn-brand-color-primary-*` из seed-цвета для инъекции в DOM.
 * Кроме числовых тонов задаёт `transparent` (акцент с alpha) и `onAccentLight`/`onAccentDark`
 * (текст на светлой/тёмной акцентной заливке). Семантический слой `--sn-theme-color-primary-*`
 * каскадит из этих тонов, поэтому одна карта красит и light, и dark. Невалидный hex → `null`.
 *
 * Текст на акценте: если белый на акценте контрастен (APCA ≥ 50) — светлая схема берёт near-white,
 * тёмная near-dark; если акцент слишком светлый для белого — обе схемы инвертируются. Одно решение
 * по контрасту seed-акцента с белым, зеркальное для схем.
 */
export function buildBrandPaletteVars(seedColor: string): Record<string, string> | null {
  const palette = generateBrandPalette(seedColor);
  if (!palette) {
    return null;
  }

  const vars: Record<string, string> = {};

  for (const [tone, hex] of Object.entries(palette)) {
    vars[`${BRAND_PRIMARY_VAR_PREFIX}${tone}`] = hex;
  }

  const accent = palette[PRIMARY_ACCENT_TONE];
  const nearWhite = palette[NEAR_WHITE_TONE];
  const nearDark = palette[NEAR_DARK_TONE];
  const accentTooLightForWhite = apcaContrast(accent, WHITE_HEX) < WHITE_ON_ACCENT_MIN_CONTRAST;

  vars[`${BRAND_PRIMARY_VAR_PREFIX}transparent`] = `${accent}${TRANSPARENT_ALPHA_SUFFIX}`;
  vars[`${BRAND_PRIMARY_VAR_PREFIX}onAccentLight`] = accentTooLightForWhite ? nearDark : nearWhite;
  vars[`${BRAND_PRIMARY_VAR_PREFIX}onAccentDark`] = accentTooLightForWhite ? nearWhite : nearDark;

  // Activated-заливки = акцент с alpha (выбранная строка таблицы, active-состояния следуют за брендом).
  vars[BRAND_ACTIVATED_VAR.default] = `${accent}${ACTIVATED_ALPHA_SUFFIX.default}`;
  vars[BRAND_ACTIVATED_VAR.hovered] = `${accent}${ACTIVATED_ALPHA_SUFFIX.hovered}`;
  vars[BRAND_ACTIVATED_VAR.pressed] = `${accent}${ACTIVATED_ALPHA_SUFFIX.pressed}`;

  return vars;
}
