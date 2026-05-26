import { APPEARANCE, Appearance } from '@ds/progress-bar';
import { describe, expect, it } from 'vitest';

import type { ProgressLimitList } from '../src/components/types';
import { getProgressBarColor } from '../src/components/utils/getProgressBarColor';
import { DEFAULT_APPEARANCE_BY_PROGRESS, PROGRESS_LIMIT_CONDITION } from '../src/constants';

const rule = (
  condition: ProgressLimitList[number]['condition'],
  limit: number,
  appearance: Appearance = APPEARANCE.Blue,
): ProgressLimitList => [{ condition, limit, appearance }];

describe('getProgressBarColor', () => {
  it.each([
    { condition: PROGRESS_LIMIT_CONDITION.Eq, progress: 50, limit: 50, expected: APPEARANCE.Blue },
    { condition: PROGRESS_LIMIT_CONDITION.Eq, progress: 49, limit: 50, expected: APPEARANCE.Neutral },
    { condition: PROGRESS_LIMIT_CONDITION.Gt, progress: 51, limit: 50, expected: APPEARANCE.Blue },
    { condition: PROGRESS_LIMIT_CONDITION.Gt, progress: 50, limit: 50, expected: APPEARANCE.Neutral },
    { condition: PROGRESS_LIMIT_CONDITION.Gte, progress: 50, limit: 50, expected: APPEARANCE.Blue },
    { condition: PROGRESS_LIMIT_CONDITION.Gte, progress: 49, limit: 50, expected: APPEARANCE.Neutral },
    { condition: PROGRESS_LIMIT_CONDITION.Lt, progress: 49, limit: 50, expected: APPEARANCE.Blue },
    { condition: PROGRESS_LIMIT_CONDITION.Lt, progress: 50, limit: 50, expected: APPEARANCE.Neutral },
    { condition: PROGRESS_LIMIT_CONDITION.Lte, progress: 50, limit: 50, expected: APPEARANCE.Blue },
    { condition: PROGRESS_LIMIT_CONDITION.Lte, progress: 51, limit: 50, expected: APPEARANCE.Neutral },
  ])('$condition progress=$progress limit=$limit', ({ condition, progress, limit, expected }) => {
    expect(getProgressBarColor(progress, rule(condition, limit))).toBe(expected);
  });

  it('uses first matching rule in list order', () => {
    const rules: ProgressLimitList = [
      { condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 70, appearance: APPEARANCE.Green },
      { condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 90, appearance: APPEARANCE.Yellow },
      { condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100, appearance: APPEARANCE.Red },
    ];
    expect(getProgressBarColor(40, rules)).toBe(APPEARANCE.Green);
    expect(getProgressBarColor(75, rules)).toBe(APPEARANCE.Yellow);
    expect(getProgressBarColor(95, rules)).toBe(APPEARANCE.Red);
  });

  it('applies DEFAULT_APPEARANCE_BY_PROGRESS thresholds', () => {
    expect(getProgressBarColor(40, DEFAULT_APPEARANCE_BY_PROGRESS)).toBe(APPEARANCE.Green);
    expect(getProgressBarColor(75, DEFAULT_APPEARANCE_BY_PROGRESS)).toBe(APPEARANCE.Yellow);
    expect(getProgressBarColor(95, DEFAULT_APPEARANCE_BY_PROGRESS)).toBe(APPEARANCE.Red);
  });

  it('continues to next rule when an earlier rule does not match', () => {
    const rules: ProgressLimitList = [
      { condition: PROGRESS_LIMIT_CONDITION.Eq, limit: 49, appearance: APPEARANCE.Green },
      { condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100, appearance: APPEARANCE.Red },
    ];
    expect(getProgressBarColor(50, rules)).toBe(APPEARANCE.Red);
  });

  it('returns neutral when no rule matches', () => {
    expect(getProgressBarColor(10, rule(PROGRESS_LIMIT_CONDITION.Gt, 50))).toBe(APPEARANCE.Neutral);
  });

  it('returns neutral for empty limits', () => {
    expect(getProgressBarColor(50, [])).toBe(APPEARANCE.Neutral);
  });

  it('returns neutral for unknown condition', () => {
    const rules = [{ condition: 'unknown', limit: 0, appearance: APPEARANCE.Green }] as unknown as ProgressLimitList;
    expect(getProgressBarColor(50, rules)).toBe(APPEARANCE.Neutral);
  });

  it('returns neutral when unknown condition precedes matching rules', () => {
    const rules = [
      { condition: 'unknown', limit: 0, appearance: APPEARANCE.Green },
      { condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100, appearance: APPEARANCE.Red },
    ] as unknown as ProgressLimitList;
    expect(getProgressBarColor(50, rules)).toBe(APPEARANCE.Neutral);
  });
});
