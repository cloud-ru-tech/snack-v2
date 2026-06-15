/** Всё, что не hex-цифра. */
const NON_HEX_CHARS = /[^0-9a-fA-F]/g;
/** Hex-цифр с альфой: `rrggbbaa` (8); без альфы: `rrggbb` (6). `#` не считается. */
const HEX_DIGITS_WITH_ALPHA = 8;
const HEX_DIGITS_NO_ALPHA = 6;

/**
 * Нормализует пользовательский ввод цвета в потенциально валидную hex-строку:
 * при наличии hex-цифр ведущая `#` обязательна (добавляется всегда), за ней — не более
 * 8 hex-цифр (`rrggbbaa`) при `withAlpha`, иначе 6 (`rrggbb`). Лишние/внутренние `#` и
 * любые не-hex символы отбрасываются. Пустой ввод (очистка поля) остаётся пустым.
 */
export function normalizeHexInput(raw: string, withAlpha = true): string {
  const maxDigits = withAlpha ? HEX_DIGITS_WITH_ALPHA : HEX_DIGITS_NO_ALPHA;
  const digits = raw.replace(NON_HEX_CHARS, '').slice(0, maxDigits);
  return digits ? `#${digits}` : '';
}
