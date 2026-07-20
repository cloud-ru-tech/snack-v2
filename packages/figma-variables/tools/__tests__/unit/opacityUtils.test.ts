import { describe, expect, it } from 'vitest';

import { normalizeOpacityForCss } from '../../utils/opacityUtils.js';

describe('normalizeOpacityForCss', () => {
  it('should return value unchanged when variable name does not contain opacity', () => {
    expect(normalizeOpacityForCss(100, 'sn-primitive-dimension-16')).toBe(100);
    expect(normalizeOpacityForCss('16', 'sn-primitive-font-size')).toBe('16');
  });

  it('should divide number by 100 for opacity variable', () => {
    expect(normalizeOpacityForCss(100, 'sn-acrylic-opacityBackground')).toBe(1);
    expect(normalizeOpacityForCss(50, 'sn-theme-effect-opacity')).toBe(0.5);
  });

  it('should divide numeric string by 100 for opacity variable', () => {
    expect(normalizeOpacityForCss('80', 'sn-some-opacity-value')).toBe(0.8);
  });

  it('should return value unchanged when string is not numeric and variable is opacity', () => {
    expect(normalizeOpacityForCss('inherit', 'sn-opacity-something')).toBe('inherit');
  });
});
