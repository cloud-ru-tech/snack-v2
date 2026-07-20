/**
 * Рекурсивный тип для вложенной SCSS-карты (ключ — строка, значение — строка или вложенная карта).
 */
export type ScssNestedValue = string | { [key: string]: ScssNestedValue };
export type ScssNestedMap = Record<string, ScssNestedValue>;

/** Отступ одного уровня (аналогично JSON.stringify(obj, null, 2)). */
const INDENT = '  ';

function reindentMultiline(value: string, levelIndent: string): string {
  if (!value.includes('\n')) return value;
  const lines = value.split('\n');
  return lines.map((line, i) => (i === 0 ? line : levelIndent + line)).join('\n');
}

/**
 * Преобразует вложенную структуру SCSS-карты в строку.
 * Форматирование: 2 пробела на уровень (как JSON.stringify(..., null, 2)).
 */
export function buildScssMapString(map: ScssNestedMap, indent = 0): string {
  const levelIndent = INDENT.repeat(indent + 1);

  const entries = Object.entries(map)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        const formatted = reindentMultiline(value, levelIndent);
        return `${levelIndent}"${key}": ${formatted}`;
      }
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nested = buildScssMapString(value as ScssNestedMap, indent + 1);
        return `${levelIndent}"${key}": (\n${nested}\n${levelIndent})`;
      }
      return `${levelIndent}"${key}": ${String(value)}`;
    })
    .join(',\n');

  return entries;
}
