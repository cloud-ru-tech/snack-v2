import { describe, expect, it } from 'vitest';

import { transformDimensionToPx } from '../../utils/transformDimensionToPx.js';

const run = (value: number | string) => transformDimensionToPx({ $value: value, $type: 'number' });

describe('transformDimensionToPx', () => {
  it('adds px to non-zero numbers', () => {
    expect(run(44)).toBe('44px');
  });

  it('adds px to zero so the value stays valid in CSS math', () => {
    expect(run(0)).toBe('0px');
  });
});
