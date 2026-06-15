// Импорт из src/utils, минуя CSS-тянущий entry.
import { describe, expect, it } from 'vitest';

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
} from '../src/utils/typeGuards';

describe('object type guards', () => {
  it('isRgbColor / isRgbaColor', () => {
    expect(isRgbColor({ r: 1, g: 2, b: 3 })).toBe(true);
    expect(isRgbColor({ h: 1, s: 2, v: 3 })).toBe(false);
    expect(isRgbColor('#fff')).toBe(false);
    expect(isRgbaColor({ r: 1, g: 2, b: 3, a: 1 })).toBe(true);
    expect(isRgbaColor({ r: 1, g: 2, b: 3 })).toBe(false);
  });

  it('isHslColor / isHslaColor', () => {
    expect(isHslColor({ h: 1, s: 2, l: 3 })).toBe(true);
    expect(isHslColor({ h: 1, s: 2, v: 3 })).toBe(false);
    expect(isHslaColor({ h: 1, s: 2, l: 3, a: 1 })).toBe(true);
    expect(isHslaColor({ h: 1, s: 2, l: 3 })).toBe(false);
  });

  it('isHsvColor / isHsvaColor', () => {
    expect(isHsvColor({ h: 1, s: 2, v: 3 })).toBe(true);
    expect(isHsvColor({ h: 1, s: 2, l: 3 })).toBe(false);
    expect(isHsvaColor({ h: 1, s: 2, v: 3, a: 1 })).toBe(true);
    expect(isHsvaColor({ h: 1, s: 2, v: 3 })).toBe(false);
  });
});

describe('string type guards', () => {
  it('isRgbaString matches rgb and rgba notations', () => {
    expect(isRgbaString('rgba(1, 2, 3, 0.5)')).toBe(true);
    expect(isRgbaString('rgb(1, 2, 3)')).toBe(true);
    expect(isRgbaString('not-a-color')).toBe(false);
  });

  it('isHslaString matches hsl and hsla notations', () => {
    expect(isHslaString('hsl(120, 100%, 50%)')).toBe(true);
    expect(isHslaString('hsla(120, 100%, 50%, 0.5)')).toBe(true);
    expect(isHslaString('nope')).toBe(false);
  });

  it('isHsvaString matches hsv and hsva notations', () => {
    expect(isHsvaString('hsv(120, 100%, 50%)')).toBe(true);
    expect(isHsvaString('hsva(120, 100%, 50%, 0.5)')).toBe(true);
    expect(isHsvaString('nope')).toBe(false);
  });
});
