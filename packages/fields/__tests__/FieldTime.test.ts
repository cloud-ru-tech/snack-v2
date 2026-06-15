import { describe, expect, it } from 'vitest';

import { parseTimeMask, timeToMaskString } from '../src/components/FieldTime/mask';

describe('FieldTime mask — parseTimeMask', () => {
  describe('showSeconds = true (HH:MM:SS)', () => {
    it('parses a full masked string into a TimeValue', () => {
      expect(parseTimeMask('09:30:45', true)).toEqual({ hours: 9, minutes: 30, seconds: 45 });
    });

    it('parses the max valid time 23:59:59', () => {
      expect(parseTimeMask('23:59:59', true)).toEqual({ hours: 23, minutes: 59, seconds: 59 });
    });

    it('parses midnight 00:00:00', () => {
      expect(parseTimeMask('00:00:00', true)).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    });

    it('ignores non-digit separators (digit count is what matters)', () => {
      expect(parseTimeMask('12-34-56', true)).toEqual({ hours: 12, minutes: 34, seconds: 56 });
    });

    it('returns undefined for an incomplete (partial) input', () => {
      expect(parseTimeMask('09:30', true)).toBeUndefined();
      expect(parseTimeMask('0930', true)).toBeUndefined();
      expect(parseTimeMask('', true)).toBeUndefined();
    });

    it('returns undefined when there are more digits than expected', () => {
      expect(parseTimeMask('0930451', true)).toBeUndefined();
    });

    it('returns undefined when hours overflow (>23)', () => {
      expect(parseTimeMask('24:00:00', true)).toBeUndefined();
    });

    it('returns undefined when minutes overflow (>59)', () => {
      expect(parseTimeMask('12:60:00', true)).toBeUndefined();
    });

    it('returns undefined when seconds overflow (>59)', () => {
      expect(parseTimeMask('12:30:60', true)).toBeUndefined();
    });
  });

  describe('showSeconds = false (HH:MM)', () => {
    it('parses a full masked string into a TimeValue without seconds field', () => {
      expect(parseTimeMask('09:30', false)).toEqual({ hours: 9, minutes: 30 });
    });

    it('parses the max valid time 23:59', () => {
      expect(parseTimeMask('23:59', false)).toEqual({ hours: 23, minutes: 59 });
    });

    it('expects exactly 4 digits — 6-digit input is invalid here', () => {
      expect(parseTimeMask('09:30:45', false)).toBeUndefined();
    });

    it('returns undefined for an incomplete input', () => {
      expect(parseTimeMask('093', false)).toBeUndefined();
      expect(parseTimeMask('', false)).toBeUndefined();
    });

    it('returns undefined when hours overflow (>23)', () => {
      expect(parseTimeMask('24:00', false)).toBeUndefined();
    });

    it('returns undefined when minutes overflow (>59)', () => {
      expect(parseTimeMask('12:60', false)).toBeUndefined();
    });
  });
});

describe('FieldTime mask — timeToMaskString', () => {
  describe('showSeconds = true (HH:MM:SS)', () => {
    it('formats a full TimeValue with zero-padding', () => {
      expect(timeToMaskString({ hours: 9, minutes: 5, seconds: 3 }, true)).toBe('09:05:03');
    });

    it('formats the max time 23:59:59', () => {
      expect(timeToMaskString({ hours: 23, minutes: 59, seconds: 59 }, true)).toBe('23:59:59');
    });

    it('treats missing fields as 0', () => {
      expect(timeToMaskString({ hours: 1 }, true)).toBe('01:00:00');
      expect(timeToMaskString({}, true)).toBe('00:00:00');
    });
  });

  describe('showSeconds = false (HH:MM)', () => {
    it('drops the seconds segment', () => {
      expect(timeToMaskString({ hours: 9, minutes: 5, seconds: 3 }, false)).toBe('09:05');
    });

    it('treats missing fields as 0', () => {
      expect(timeToMaskString({ minutes: 7 }, false)).toBe('00:07');
    });
  });
});

describe('FieldTime mask — round-trip parse ∘ format', () => {
  it('format then parse returns the original value (with seconds)', () => {
    const value = { hours: 14, minutes: 25, seconds: 36 };
    expect(parseTimeMask(timeToMaskString(value, true), true)).toEqual(value);
  });

  it('format then parse returns the original value (without seconds)', () => {
    const value = { hours: 8, minutes: 5 };
    expect(parseTimeMask(timeToMaskString(value, false), false)).toEqual(value);
  });
});
