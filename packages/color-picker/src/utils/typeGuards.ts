import { HSLA_REGEX, HSVA_REGEX, RGBA_REGEX } from '../constants';
import { Color, HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor } from '../types';

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export function isRgbColor(value: Color): value is RgbColor {
  return isObject(value) && 'r' in value && 'g' in value && 'b' in value;
}

export function isRgbaColor(value: Color): value is RgbaColor {
  return isRgbColor(value) && 'a' in value;
}

export function isHslColor(value: Color): value is HslColor {
  return isObject(value) && 'h' in value && 's' in value && 'l' in value;
}

export function isHslaColor(value: Color): value is HslaColor {
  return isHslColor(value) && 'a' in value;
}

export function isHsvColor(value: Color): value is HsvColor {
  return isObject(value) && 'h' in value && 's' in value && 'v' in value;
}

export function isHsvaColor(value: Color): value is HsvaColor {
  return isHsvColor(value) && 'a' in value;
}

export function isHslaString(value: string): boolean {
  return Boolean(HSLA_REGEX.exec(value));
}

export function isHsvaString(value: string): boolean {
  return Boolean(HSVA_REGEX.exec(value));
}

export function isRgbaString(value: string): boolean {
  return Boolean(RGBA_REGEX.exec(value));
}
