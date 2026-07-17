import { describe, expect, it } from 'vitest';

import { toCamelCase } from '../../src/utils/toCamelCase.js';

describe('toCamelCase', () => {
  it('should convert kebab-case to camelCase', () => {
    expect(toCamelCase('font-size')).toBe('fontSize');
  });

  it('should handle single word', () => {
    expect(toCamelCase('color')).toBe('color');
  });
});
