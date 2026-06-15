// Импорт из src/utils, минуя CSS-тянущий entry.
import { describe, expect, it } from 'vitest';

import {
  alphaGradient,
  composeRgba,
  hsvSaturationGradient,
  hsvToHexOpaque,
  hsvValueGradient,
  hueGradient,
  rgbChannelGradient,
} from '../src/utils/gradients';
import { isColorMode } from '../src/utils/isColorMode';
import { round } from '../src/utils/round';
import { isHexValid } from '../src/utils/validate';

describe('gradients', () => {
  it('rgbChannelGradient goes from black to the pure channel', () => {
    expect(rgbChannelGradient('r')).toBe('linear-gradient(to right, rgb(0, 0, 0), rgb(255, 0, 0))');
    expect(rgbChannelGradient('g')).toBe('linear-gradient(to right, rgb(0, 0, 0), rgb(0, 255, 0))');
    expect(rgbChannelGradient('b')).toBe('linear-gradient(to right, rgb(0, 0, 0), rgb(0, 0, 255))');
  });

  it('hueGradient spans the full spectrum and wraps back to red', () => {
    const gradient = hueGradient();
    expect(gradient.startsWith('linear-gradient(to right, rgb(255, 0, 0) 0%,')).toBe(true);
    expect(gradient.endsWith('rgb(255, 0, 0) 100%)')).toBe(true);
  });

  it('hsvSaturationGradient runs from white (s=0) to the pure hue', () => {
    expect(hsvSaturationGradient({ h: 120, v: 100 })).toBe('linear-gradient(to right, #ffffff, #00ff00)');
  });

  it('hsvValueGradient runs from black (v=0) to the pure hue', () => {
    expect(hsvValueGradient({ h: 120, s: 100 })).toBe('linear-gradient(to right, #000000, #00ff00)');
  });

  it('alphaGradient uses `in srgb` to avoid the grey midpoint', () => {
    expect(alphaGradient({ r: 255, g: 0, b: 0, a: 0.5 })).toBe(
      'linear-gradient(in srgb to right, rgba(255, 0, 0, 0), rgb(255, 0, 0))',
    );
  });

  it('composeRgba serializes an rgba object', () => {
    expect(composeRgba({ r: 1, g: 2, b: 3, a: 0.4 })).toBe('rgba(1, 2, 3, 0.4)');
  });

  it('hsvToHexOpaque ignores the incoming alpha', () => {
    expect(hsvToHexOpaque({ h: 0, s: 100, v: 100, a: 0.2 })).toBe('#ff0000');
  });
});

describe('isHexValid', () => {
  it('accepts 3- and 6-digit hex with or without #', () => {
    expect(isHexValid('abc')).toBe(true);
    expect(isHexValid('#abc')).toBe(true);
    expect(isHexValid('aabbcc')).toBe(true);
    expect(isHexValid('#aabbcc')).toBe(true);
  });

  it('rejects 4- and 8-digit hex unless alpha is allowed', () => {
    expect(isHexValid('abcd')).toBe(false);
    expect(isHexValid('abcd', true)).toBe(true);
    expect(isHexValid('aabbccdd')).toBe(false);
    expect(isHexValid('aabbccdd', true)).toBe(true);
  });

  it('rejects malformed / out-of-length values', () => {
    expect(isHexValid('zz')).toBe(false);
    expect(isHexValid('ab')).toBe(false);
    expect(isHexValid('')).toBe(false);
  });
});

describe('round', () => {
  it('rounds to integer by default', () => {
    expect(round(1.2345)).toBe(1);
    expect(round(1.5)).toBe(2);
  });

  it('rounds to the requested number of digits', () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(2.345, 1)).toBe(2.3);
  });
});

describe('isColorMode', () => {
  it('accepts the three supported modes', () => {
    expect(isColorMode('hex')).toBe(true);
    expect(isColorMode('rgb')).toBe(true);
    expect(isColorMode('hsv')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isColorMode('xyz')).toBe(false);
    expect(isColorMode(undefined)).toBe(false);
    expect(isColorMode(null)).toBe(false);
    expect(isColorMode(123)).toBe(false);
  });
});
