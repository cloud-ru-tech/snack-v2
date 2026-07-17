import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { objectTokenTransform } from '../../src/utils/objectTokenTransform.js';

describe('objectTokenTransform', () => {
  it('should join array $value with comma', () => {
    const token = {
      $value: ['16px', '24px', '32px'],
    } as TransformedToken;
    expect(objectTokenTransform(token)).toBe('16px, 24px, 32px');
  });

  it('should stringify object $value', () => {
    const token = {
      $value: { a: 1, b: '2' },
    } as TransformedToken;
    expect(objectTokenTransform(token)).toBe('{"a":1,"b":"2"}');
  });

  it('should return string for primitive $value', () => {
    const token = {
      $value: 'sans-serif',
    } as TransformedToken;
    expect(objectTokenTransform(token)).toBe('sans-serif');
  });

  it('should return empty string for null/undefined $value', () => {
    const token = {} as TransformedToken;
    expect(objectTokenTransform(token)).toBe('');
  });
});
