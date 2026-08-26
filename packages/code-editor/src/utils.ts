import { SchemasSettings } from 'monaco-yaml';

import { DEFAULT_SCHEMA_URI } from './constants';
import { JsonSchema } from './types';

const HEX_SHORT_RE = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
const HEX_LONG_RE = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i;
const RGB_RE = /^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/i;

function clamp255(n: number) {
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 255) return 255;
  return Math.round(n);
}

function toRgb(color: string): [number, number, number] | null {
  const value = color.trim();
  const short = value.match(HEX_SHORT_RE);
  if (short) {
    return [parseInt(short[1] + short[1], 16), parseInt(short[2] + short[2], 16), parseInt(short[3] + short[3], 16)];
  }
  const long = value.match(HEX_LONG_RE);
  if (long) {
    return [parseInt(long[1], 16), parseInt(long[2], 16), parseInt(long[3], 16)];
  }
  const rgb = value.match(RGB_RE);
  if (rgb) {
    return [clamp255(Number(rgb[1])), clamp255(Number(rgb[2])), clamp255(Number(rgb[3]))];
  }
  return null;
}

export function rgb2hsl(htmlColor: string): [number, number, number] {
  const rgb = toRgb(htmlColor);
  if (!rgb) return [0, 0, 0];
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
      break;
    case g:
      h = ((b - r) / d + 2) * 60;
      break;
    default:
      h = ((r - g) / d + 4) * 60;
  }
  return [h, s, l];
}

// Возвращает true, когда фон СВЕТЛЫЙ («достаточно светлый, чтобы текст на нём был тёмным»).
// Пороги оттенка — по шкале 0–360. Прежнее имя isDark читалось ровно наоборот и уже привело
// к тому, что на светлой теме редактор получал базовую тему vs-dark.
export function isLightBackground(color: string) {
  const [h, , l] = rgb2hsl(color);

  return (h < 198 && l >= 0.5) || (h >= 198 && l >= 0.75);
}

/**
 * Monaco theme parser ест только hex; rgba(...) превращает в fail-safe red.
 * Возвращает `#RRGGBBAA` для допустимого цвета, пустую строку — иначе.
 */
export function hexWithAlpha(value: string | undefined, alpha: number): string {
  if (!value) return '';
  const rgb = toRgb(value);
  if (!rgb) return '';
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  const hex = rgb.map(c => c.toString(16).padStart(2, '0')).join('');
  return `#${hex}${a}`;
}

export const getJsonSchema = (jsonSchema?: JsonSchema): SchemasSettings | undefined =>
  jsonSchema && { ...jsonSchema, uri: jsonSchema?.uri || DEFAULT_SCHEMA_URI, fileMatch: [jsonSchema.fileMatch] };

export function uppercaseFirstLetter(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return value;
  }

  return trimmedValue[0].toUpperCase() + trimmedValue.slice(1);
}
