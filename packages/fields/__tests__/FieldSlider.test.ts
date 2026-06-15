// Импорт напрямую из src, минуя entry @ds/fields: entry тянет CSS-модули, ломает node-окружение vitest.
import { describe, expect, it } from 'vitest';

import {
  generateAllowedValues,
  getClosestMark,
  getMarkLabel,
  getTextFieldValue,
  isMarkObject,
} from '../src/components/FieldSlider/utils';

describe('FieldSlider / generateAllowedValues', () => {
  it('enumerates inclusive integer steps from min to max', () => {
    expect(generateAllowedValues(0, 5, 1)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('includes the max boundary', () => {
    expect(generateAllowedValues(0, 4, 2)).toEqual([0, 2, 4]);
  });

  it('compensates float precision so values stay clean', () => {
    // Без toFixed(10) 0.1 + 0.2 === 0.30000000000000004.
    expect(generateAllowedValues(0, 0.5, 0.1)).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5]);
  });

  it('returns only min when step overshoots max', () => {
    expect(generateAllowedValues(0, 5, 10)).toEqual([0]);
  });

  it('handles negative ranges', () => {
    expect(generateAllowedValues(-2, 2, 1)).toEqual([-2, -1, 0, 1, 2]);
  });
});

describe('FieldSlider / getClosestMark', () => {
  const identity = (n: number) => n;

  it('returns the exact mark when value matches', () => {
    expect(getClosestMark(50, [0, 25, 50, 75, 100], identity).mark).toBe(50);
  });

  it('snaps to the nearest lower mark', () => {
    expect(getClosestMark(30, [0, 25, 50, 75, 100], identity).mark).toBe(25);
  });

  it('snaps to the nearest higher mark', () => {
    expect(getClosestMark(40, [0, 25, 50, 75, 100], identity).mark).toBe(50);
  });

  it('reports the lowest absolute diff', () => {
    const { mark, lowestDiff } = getClosestMark(40, [0, 25, 50, 75, 100], identity);
    expect(mark).toBe(50);
    expect(lowestDiff).toBe(10);
  });

  it('works through a custom value accessor', () => {
    const marks = [{ v: 10 }, { v: 20 }, { v: 30 }];
    expect(getClosestMark(22, marks, m => m.v).mark).toEqual({ v: 20 });
  });

  it('returns the first mark for an empty-diff single-element list', () => {
    expect(getClosestMark(99, [7], identity).mark).toBe(7);
  });
});

describe('FieldSlider / getTextFieldValue', () => {
  it('stringifies a scalar value', () => {
    expect(getTextFieldValue(42)).toBe('42');
  });

  it('joins a range with an en-dash', () => {
    expect(getTextFieldValue([20, 80])).toBe('20 – 80');
  });

  it('applies the formatter to a scalar', () => {
    expect(getTextFieldValue(42, v => `${v}%`)).toBe('42%');
  });

  it('applies the formatter to each end of a range', () => {
    expect(getTextFieldValue([20, 80], v => `${v}%`)).toBe('20% – 80%');
  });
});

describe('FieldSlider / isMarkObject', () => {
  it('is true for an object with a label key', () => {
    expect(isMarkObject({ label: 'half' })).toBe(true);
  });

  it('is false for a plain string mark', () => {
    expect(isMarkObject('50')).toBe(false);
  });

  it('is false for null and undefined', () => {
    expect(isMarkObject(null)).toBe(false);
    expect(isMarkObject(undefined)).toBe(false);
  });

  it('is false for an object without a label key', () => {
    expect(isMarkObject({ value: 50 })).toBe(false);
  });
});

describe('FieldSlider / getMarkLabel', () => {
  it('returns the label of a mark object', () => {
    expect(getMarkLabel({ label: 'half' })).toBe('half');
  });

  it('returns a primitive mark as-is', () => {
    expect(getMarkLabel('50')).toBe('50');
    expect(getMarkLabel(75)).toBe(75);
  });
});
