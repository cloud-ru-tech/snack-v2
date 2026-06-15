// Импорт напрямую из src/utils/*, минуя entry @ds/color-picker (тянет несовместимые с vitest CSS-модули).
import { describe, expect, it } from 'vitest';

import {
  colorToHex,
  colorToRawValue,
  hexToRgba,
  hslaToHsl,
  hsvaToHex,
  hsvaToHsla,
  hsvaToHsv,
  rgbaToHex,
  rgbaToHsva,
  rgbaToRgb,
  roundHsva,
} from '../src/utils/convert';

describe('hexToRgba', () => {
  it('parses 3-digit hex (with and without #)', () => {
    expect(hexToRgba('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgba('fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgba('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('parses 4-digit hex (RGBA shorthand) into fractional alpha', () => {
    expect(hexToRgba('#f00f')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(hexToRgba('#f000')).toEqual({ r: 255, g: 0, b: 0, a: 0 });
  });

  it('parses 6-digit hex', () => {
    expect(hexToRgba('#389f74')).toEqual({ r: 56, g: 159, b: 116, a: 1 });
  });

  it('parses 8-digit hex with alpha channel', () => {
    expect(hexToRgba('#ff000080')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
    expect(hexToRgba('#ff0000ff')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('returns opaque black for invalid hex', () => {
    expect(hexToRgba('zzz')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hexToRgba('')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });
});

describe('colorToHex', () => {
  it('converts rgb / rgba objects', () => {
    expect(colorToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
    expect(colorToHex({ r: 255, g: 0, b: 0, a: 0.5 })).toBe('#ff000080');
  });

  it('converts hsl / hsla objects', () => {
    expect(colorToHex({ h: 120, s: 100, l: 50 })).toBe('#00ff00');
    expect(colorToHex({ h: 240, s: 100, l: 50, a: 1 })).toBe('#0000ff');
  });

  it('converts hsv / hsva objects', () => {
    expect(colorToHex({ h: 0, s: 100, v: 100 })).toBe('#ff0000');
    expect(colorToHex({ h: 0, s: 100, v: 100, a: 1 })).toBe('#ff0000');
  });

  it('converts rgb / rgba strings (incl. fractional alpha)', () => {
    expect(colorToHex('rgb(255, 0, 0)')).toBe('#ff0000');
    expect(colorToHex('rgba(255, 0, 0, 0.5)')).toBe('#ff000080');
  });

  it('converts hsl / hsla strings', () => {
    expect(colorToHex('hsl(240, 100%, 50%)')).toBe('#0000ff');
  });

  it('converts hsv / hsva strings with explicit deg unit', () => {
    expect(colorToHex('hsva(120deg, 100%, 100%, 1)')).toBe('#00ff00');
  });

  it('handles non-deg angle units (turn)', () => {
    expect(colorToHex('hsv(0.5turn, 100%, 100%)')).toBe('#00ffff');
  });

  it('passes a plain hex string through unchanged', () => {
    expect(colorToHex('#abcdef')).toBe('#abcdef');
  });
});

describe('rgbaToHex', () => {
  it('omits alpha when fully opaque', () => {
    expect(rgbaToHex({ r: 0, g: 128, b: 255, a: 1 })).toBe('#0080ff');
  });

  it('appends alpha byte when a < 1', () => {
    expect(rgbaToHex({ r: 255, g: 0, b: 0, a: 0.5 })).toBe('#ff000080');
  });
});

describe('colorToRawValue', () => {
  it('produces every supported model from a single hex input', () => {
    const raw = colorToRawValue('#389f74');

    expect(raw.hex).toBe('#389f74');
    expect(raw.rgb).toEqual({ r: 56, g: 159, b: 116 });
    expect(raw.rgba).toEqual({ r: 56, g: 159, b: 116, a: 1 });
    expect(raw.hsv).toEqual({ h: 155, s: 65, v: 62 });
    expect(raw.hsva).toEqual({ h: 155, s: 65, v: 62, a: 1 });
    expect(raw.hsl).toEqual({ h: 155, s: 48, l: 42 });
    expect(raw.hsla).toEqual({ h: 155, s: 48, l: 42, a: 1 });
  });

  it('round-trips hex → raw → hex without loss for opaque colors', () => {
    for (const hex of ['#ff0000', '#00ff00', '#0000ff', '#abcdef', '#000000', '#ffffff']) {
      expect(colorToRawValue(hex).hex).toBe(hex);
    }
  });

  it('round-trips an rgba object through hex preserving channels', () => {
    const raw = colorToRawValue({ r: 12, g: 200, b: 80, a: 0.5 });
    expect(raw.rgba).toEqual({ r: 12, g: 200, b: 80, a: 0.5 });
    expect(raw.hex).toBe('#0cc85080');
  });
});

describe('model strippers', () => {
  it('rgbaToRgb drops the alpha channel', () => {
    expect(rgbaToRgb({ r: 1, g: 2, b: 3, a: 0.4 })).toEqual({ r: 1, g: 2, b: 3 });
  });

  it('hslaToHsl drops the alpha channel', () => {
    expect(hslaToHsl({ h: 1, s: 2, l: 3, a: 0.4 })).toEqual({ h: 1, s: 2, l: 3 });
  });

  it('hsvaToHsv drops the alpha channel and rounds', () => {
    expect(hsvaToHsv({ h: 1.4, s: 2.6, v: 3.5, a: 0.4 })).toEqual({ h: 1, s: 3, v: 4 });
  });
});

describe('colorToHex — angle units and string fallbacks (branch coverage)', () => {
  it('parses grad and rad hue units', () => {
    expect(colorToHex('hsv(200grad, 100%, 100%)')).toBe('#00ffff');
    expect(colorToHex(`hsv(${Math.PI}rad, 100%, 100%)`)).toBe('#00ffff');
  });

  it('parses rgb percentage channels', () => {
    expect(colorToHex('rgb(100%, 0%, 0%)')).toBe('#ff0000');
  });

  it('parses hsla string with percentage alpha', () => {
    expect(colorToHex('hsla(120, 100%, 50%, 100%)')).toBe('#00ff00');
  });

  it('returns unrecognised strings unchanged (final fall-through branch)', () => {
    expect(colorToHex('rgba(not-a-color)')).toBe('rgba(not-a-color)');
    expect(colorToHex('not-a-color')).toBe('not-a-color');
  });
});

describe('cross-model converters', () => {
  it('rgbaToHsva maps primaries correctly', () => {
    expect(rgbaToHsva({ r: 255, g: 0, b: 0, a: 1 })).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    expect(rgbaToHsva({ r: 0, g: 0, b: 0, a: 1 })).toEqual({ h: 0, s: 0, v: 0, a: 1 });
  });

  it('rgbaToHsva resolves the hue branch for green- and blue-dominant colors', () => {
    expect(rgbaToHsva({ r: 0, g: 255, b: 0, a: 1 })).toEqual({ h: 120, s: 100, v: 100, a: 1 });
    expect(rgbaToHsva({ r: 0, g: 0, b: 255, a: 1 })).toEqual({ h: 240, s: 100, v: 100, a: 1 });
  });

  it('rgbaToHsva wraps negative hue into 0..360 (red between blue and green)', () => {
    const hsva = rgbaToHsva({ r: 255, g: 0, b: 128, a: 1 });
    expect(hsva.h).toBeGreaterThan(300);
    expect(hsva.h).toBeLessThan(360);
  });

  it('hsvaToHsla covers light, dark and achromatic lightness branches', () => {
    expect(hsvaToHsla({ h: 0, s: 0, v: 0, a: 1 })).toEqual({ h: 0, s: 0, l: 0, a: 1 });
    expect(hsvaToHsla({ h: 0, s: 0, v: 100, a: 1 })).toEqual({ h: 0, s: 0, l: 100, a: 1 });
    expect(hsvaToHsla({ h: 210, s: 50, v: 80, a: 1 }).l).toBeGreaterThan(0);
  });

  it('hsvaToHsla maps full green to 50% lightness', () => {
    expect(hsvaToHsla({ h: 120, s: 100, v: 100, a: 1 })).toEqual({ h: 120, s: 100, l: 50, a: 1 });
  });

  it('hsvaToHex matches rgba round-trip', () => {
    expect(hsvaToHex({ h: 0, s: 100, v: 100, a: 1 })).toBe('#ff0000');
  });

  it('roundHsva rounds channels and keeps alpha at 2 digits', () => {
    expect(roundHsva({ h: 1.4, s: 2.6, v: 3.5, a: 0.123 })).toEqual({ h: 1, s: 3, v: 4, a: 0.12 });
  });
});
