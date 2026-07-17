import { describe, expect, it } from 'vitest';

import { isOpacityVariable, OPACITY_VARIABLE_SUBSTRINGS } from '../../src/types.js';

describe('isOpacityVariable', () => {
  it('should export OPACITY_VARIABLE_SUBSTRINGS', () => {
    expect(OPACITY_VARIABLE_SUBSTRINGS).toContain('opacity');
  });

  it('should return true for variable names containing opacity', () => {
    expect(isOpacityVariable('sn-acrylic-opacity-background')).toBe(true);
    expect(isOpacityVariable('opacity')).toBe(true);
    expect(isOpacityVariable('theme-effect-acrylic-opacity')).toBe(true);
    expect(isOpacityVariable('opacity-background1-level')).toBe(true);
  });

  it('should return false for variable names without opacity', () => {
    expect(isOpacityVariable('sn-primitive-color-gray-45')).toBe(false);
    expect(isOpacityVariable('font-size')).toBe(false);
    expect(isOpacityVariable('blur-background')).toBe(false);
  });
});
