import { HSLA_REGEX, HSVA_REGEX, RGBA_REGEX } from '../constants';
import { Color, HslaColor, HslColor, HsvaColor, HsvColor, RawColor, RgbaColor, RgbColor } from '../types';
import { round } from './round';
import {
  isHslaColor,
  isHslaString,
  isHslColor,
  isHsvaColor,
  isHsvaString,
  isHsvColor,
  isRgbaColor,
  isRgbaString,
  isRgbColor,
} from './typeGuards';
import { isHexValid } from './validate';

const angleUnits: Record<string, number> = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2),
};

export const hexToRgba = (hex: string): RgbaColor => {
  if (!isHexValid(hex, true)) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  const stripped = hex.startsWith('#') ? hex.slice(1) : hex;

  if (stripped.length < 6) {
    return {
      r: parseInt(stripped[0] + stripped[0], 16),
      g: parseInt(stripped[1] + stripped[1], 16),
      b: parseInt(stripped[2] + stripped[2], 16),
      a: stripped.length === 4 ? round(parseInt(stripped[3] + stripped[3], 16) / 255, 2) : 1,
    };
  }

  return {
    r: parseInt(stripped.substring(0, 2), 16),
    g: parseInt(stripped.substring(2, 4), 16),
    b: parseInt(stripped.substring(4, 6), 16),
    a: stripped.length === 8 ? round(parseInt(stripped.substring(6, 8), 16) / 255, 2) : 1,
  };
};

const parseHue = (value: string, unit = 'deg'): number => Number(value) * (angleUnits[unit] || 1);

const hslaToHsva = ({ h, s, l, a }: HslaColor): HsvaColor => {
  const scaledS = s * ((l < 50 ? l : 100 - l) / 100);

  return {
    h,
    s: scaledS > 0 ? ((2 * scaledS) / (l + scaledS)) * 100 : 0,
    v: l + scaledS,
    a,
  };
};

const hslaStringToHsva = (hslString: string): HsvaColor => {
  const match = HSLA_REGEX.exec(hslString);

  if (!match) return { h: 0, s: 0, v: 0, a: 1 };

  return hslaToHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
  });
};

export const hsvaToHsla = ({ h, s, v, a }: HsvaColor): HslaColor => {
  const hh = ((200 - s) * v) / 100;

  return {
    h: round(h),
    s: round(hh > 0 && hh < 200 ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0),
    l: round(hh / 2),
    a: round(a, 2),
  };
};

const hsvaToRgba = ({ h, s, v, a }: HsvaColor): RgbaColor => {
  const hScaled = (h / 360) * 6;
  const sScaled = s / 100;
  const vScaled = v / 100;

  const hh = Math.floor(hScaled);
  const b = vScaled * (1 - sScaled);
  const c = vScaled * (1 - (hScaled - hh) * sScaled);
  const d = vScaled * (1 - (1 - hScaled + hh) * sScaled);
  const module = hh % 6;

  return {
    r: round([vScaled, c, b, b, d, vScaled][module] * 255),
    g: round([d, vScaled, vScaled, c, b, b][module] * 255),
    b: round([b, b, d, vScaled, vScaled, c][module] * 255),
    a: round(a, 2),
  };
};

export const roundHsva = (hsva: HsvaColor): HsvaColor => ({
  h: round(hsva.h),
  s: round(hsva.s),
  v: round(hsva.v),
  a: round(hsva.a, 2),
});

const hsvaStringToHsva = (hsvString: string): HsvaColor => {
  const match = HSVA_REGEX.exec(hsvString);

  if (!match) return { h: 0, s: 0, v: 0, a: 1 };

  return roundHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    v: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
  });
};

export const rgbaToHsva = ({ r, g, b, a }: RgbaColor): HsvaColor => {
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);

  let hh: number;
  if (!delta) {
    hh = 0;
  } else if (max === r) {
    hh = (g - b) / delta;
  } else if (max === g) {
    hh = 2 + (b - r) / delta;
  } else {
    hh = 4 + (r - g) / delta;
  }

  return {
    h: round(60 * (hh < 0 ? hh + 6 : hh)),
    s: round(max ? (delta / max) * 100 : 0),
    v: round((max / 255) * 100),
    a,
  };
};

const rgbaStringToHsva = (rgbaString: string): HsvaColor => {
  const match = RGBA_REGEX.exec(rgbaString);

  if (!match) return { h: 0, s: 0, v: 0, a: 1 };

  return rgbaToHsva({
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1),
  });
};

const format = (n: number): string => n.toString(16).padStart(2, '0');

export const rgbaToHex = ({ r, g, b, a }: RgbaColor): string => {
  const alphaHex = a < 1 ? format(round(a * 255)) : '';
  return '#' + format(r) + format(g) + format(b) + alphaHex;
};

export const hsvaToHex = (hsva: HsvaColor): string => rgbaToHex(hsvaToRgba(hsva));

export const rgbaToRgb = ({ r, g, b }: RgbaColor): RgbColor => ({ r, g, b });

export const hslaToHsl = ({ h, s, l }: HslaColor): HslColor => ({ h, s, l });

export const hsvaToHsv = (hsva: HsvaColor): HsvColor => {
  const { h, s, v } = roundHsva(hsva);
  return { h, s, v };
};

export function colorToHex(value: Color): string {
  if (isHslColor(value) || isHslaColor(value)) {
    return hsvaToHex(hslaToHsva({ a: 1, ...value }));
  }

  if (isRgbColor(value) || isRgbaColor(value)) {
    return rgbaToHex({ a: 1, ...value });
  }

  if (isHsvColor(value) || isHsvaColor(value)) {
    return hsvaToHex({ a: 1, ...value });
  }

  if (isHslaString(value)) {
    return hsvaToHex(hslaStringToHsva(value));
  }

  if (isRgbaString(value)) {
    return hsvaToHex(rgbaStringToHsva(value));
  }

  if (isHsvaString(value)) {
    return hsvaToHex(hsvaStringToHsva(value));
  }

  return value;
}

export function colorToRawValue(value: Color): RawColor {
  const hexColor = colorToHex(value);
  const rgba = hexToRgba(hexColor);
  const hsva = rgbaToHsva(rgba);
  const hsla = hsvaToHsla(hsva);

  return {
    hex: hexColor,
    rgb: rgbaToRgb(rgba),
    rgba,
    hsv: hsvaToHsv(hsva),
    hsva,
    hsl: hslaToHsl(hsla),
    hsla,
  };
}
