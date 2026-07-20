import { RGB } from './types';

const SHORT_HEX = /^#?([\da-f])([\da-f])([\da-f])([\da-f])?$/i;
const LONG_HEX = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i;

/**
 * Разбирает hex-строку в sRGB-каналы `[r, g, b]` в диапазоне 0–255. Поддерживает `#rgb`, `#rgba`,
 * `#rrggbb`, `#rrggbbaa` (с ведущим `#` и без). Alpha-канал игнорируется. Невалидная строка → `null`.
 */
export function parseHex(hex: string): RGB | null {
  const trimmed = hex.trim();

  const short = SHORT_HEX.exec(trimmed);
  if (short) {
    return [parseInt(short[1] + short[1], 16), parseInt(short[2] + short[2], 16), parseInt(short[3] + short[3], 16)];
  }

  const long = LONG_HEX.exec(trimmed);
  if (long) {
    return [parseInt(long[1], 16), parseInt(long[2], 16), parseInt(long[3], 16)];
  }

  return null;
}

/** Проверяет, что строка — валидный hex-цвет (`#rgb` / `#rgba` / `#rrggbb` / `#rrggbbaa`). */
export function isValidHex(hex: string): boolean {
  return parseHex(hex) !== null;
}

/** sRGB-каналы 0–1 → hex-строка `#rrggbb`. Каналы клампятся в диапазон. */
export function srgbToHex([r, g, b]: RGB): string {
  const toHex = (channel: number): string =>
    Math.round(Math.min(255, Math.max(0, channel * 255)))
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
