// Разбор и синтез цветов в модели OKLCH. Алгоритм forceIntoGamut — CSS Color 4
// (Chris Lilley, https://svgees.us/).

import { gamSRGB, linSRGB, linSRGBToXYZ, xyzToLinSRGB } from './conversions';
import { parseHex, srgbToHex } from './hex';
import { oklch } from './oklch';
import { LCH, RGB, TColor, XYZ } from './types';

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const xyz2rgb = (xyz: XYZ): RGB => gamSRGB(xyzToLinSRGB(xyz));
const rgb2xyz = (rgb: RGB): XYZ => linSRGBToXYZ(linSRGB(rgb));
const lch2rgb = (lch: LCH): RGB => xyz2rgb(oklch.lch2xyz(lch));
const rgb2lch = (rgb: RGB): LCH => oklch.xyz2lch(rgb2xyz(rgb));

function isWithinGamut(rgb: RGB): boolean {
  const epsilon = 0.000005;

  return rgb.every(channel => channel >= 0 - epsilon && channel <= 1 + epsilon);
}

/**
 * Загоняет LCH-цвет в sRGB-гамму: держит `l` и `h`, бинарным поиском ужимает `c` до границы гаммы.
 */
function forceIntoGamut(lch: LCH): RGB {
  let rgb = lch2rgb(lch);
  if (isWithinGamut(rgb)) {
    return rgb;
  }

  const [l, , h] = lch;
  let hiC = lch[1];
  let loC = 0;
  let c = lch[1] / 2;
  const epsilon = 0.0001;

  while (hiC - loC > epsilon) {
    rgb = lch2rgb([l, c, h]);
    if (isWithinGamut(rgb)) {
      loC = c;
    } else {
      hiC = c;
    }
    c = (hiC + loC) / 2;
  }

  return rgb;
}

/** LCH → разобранный цвет. `hex` вычисляется лениво (с загонкой в гамму при выходе за неё). */
export function lch2color(lch: LCH): TColor {
  const srgb = xyz2rgb(oklch.lch2xyz(lch));
  const withinSRGB = isWithinGamut(srgb);
  const [r, g, b] = srgb.map(channel => clamp(channel * 255, 0, 255));
  const [l, c, h] = lch;

  return {
    l,
    c,
    h,
    r,
    g,
    b,
    get hex(): string {
      return srgbToHex(withinSRGB ? srgb : forceIntoGamut(lch));
    },
  };
}

/** hex → разобранный цвет (OKLCH-компоненты + sRGB-каналы). Невалидный hex → `null`. */
export function hex2color(hex: string): TColor | null {
  const parsed = parseHex(hex);
  if (!parsed) {
    return null;
  }

  const normalized = parsed.map(channel => channel / 255) as RGB;
  const [l, c, h] = rgb2lch(normalized);
  const [r, g, b] = parsed;

  return { l, c, h, r, g, b, hex: srgbToHex(normalized) };
}
