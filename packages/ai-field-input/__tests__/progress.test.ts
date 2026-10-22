import { describe, expect, it } from 'vitest';

import { clampPercent, resolveContextProgress } from '../src/utils/progress';

describe('context progress', () => {
  it.each([
    [0, 'green'],
    [69, 'green'],
    [70, 'orange'],
    [90, 'orange'],
    [91, 'red'],
    [150, 'red'],
  ])('%i%% → %s', (value, expected) => {
    expect(resolveContextProgress(value)).toBe(expected);
  });

  it('clamps out-of-range and non-finite values', () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(250)).toBe(100);
    expect(clampPercent(Number.NaN)).toBe(0);
  });
});
