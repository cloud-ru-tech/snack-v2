import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { transform } from '../../src/transforms/toCSSVariable/transform.js';

describe('toCSSVariable transform', () => {
  it('should return empty string when token has no $value', () => {
    const token = { $type: 'color' } as TransformedToken;
    expect(transform(token)).toBe('');
  });

  it('should return empty string when token $value is undefined', () => {
    const token = { $type: 'dimension', $value: undefined } as TransformedToken;
    expect(transform(token)).toBe('');
  });
});
