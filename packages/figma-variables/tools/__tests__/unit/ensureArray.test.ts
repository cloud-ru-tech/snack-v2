import { describe, expect, it } from 'vitest';

import { ensureArray } from '../../utils/ensureArray.js';

describe('ensureArray', () => {
  it('should return same array when input is array', () => {
    const input = [1, 2, 3];
    expect(ensureArray(input)).toBe(input);
  });

  it('should wrap single value in array', () => {
    expect(ensureArray('item')).toEqual(['item']);
    expect(ensureArray(42)).toEqual([42]);
  });

  it('should return empty array for null', () => {
    expect(ensureArray(null)).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    expect(ensureArray(undefined)).toEqual([]);
  });
});
