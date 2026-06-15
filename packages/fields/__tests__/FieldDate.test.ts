import { describe, expect, it } from 'vitest';

import { DATE_MODE } from '../src/components/FieldDate/constants';
import { dateToMaskString, formatMask, getMaskString, parseMask } from '../src/components/FieldDate/mask';
import { isRange } from '../src/components/FieldDate/utils';

describe('FieldDate / mask', () => {
  describe('getMaskString', () => {
    it('returns RU date mask for date mode', () => {
      expect(getMaskString(DATE_MODE.Date)).toBe('ДД.ММ.ГГГГ');
    });

    it('returns date-time mask with seconds by default', () => {
      expect(getMaskString(DATE_MODE.DateTime)).toBe('ДД.ММ.ГГГГ, чч:мм:сс');
    });

    it('drops seconds when showSeconds=false', () => {
      expect(getMaskString(DATE_MODE.DateTime, false)).toBe('ДД.ММ.ГГГГ, чч:мм');
    });
  });

  describe('formatMask', () => {
    it('inserts separators for a full date', () => {
      expect(formatMask('15032026', DATE_MODE.Date)).toBe('15.03.2026');
    });

    it('keeps partial input without trailing separator content', () => {
      expect(formatMask('1503', DATE_MODE.Date)).toBe('15.03');
    });

    it('strips non-digit characters before formatting', () => {
      expect(formatMask('15/03/2026', DATE_MODE.Date)).toBe('15.03.2026');
    });

    it('auto-prefixes 0 when leading digit exceeds the segment tens (day)', () => {
      // day: first digit 5 > 3 → treat as units → 05, остаток уходит в месяц.
      expect(formatMask('512', DATE_MODE.Date)).toBe('05.12');
    });

    it('auto-prefixes 0 for month leading digit > 1', () => {
      // day 12, month 9 (>1) → 09.
      expect(formatMask('129', DATE_MODE.Date)).toBe('12.09');
    });

    it('clamps a full two-digit day above max to 31', () => {
      // first digit 3 ≤ floor(31/10)=3, so no auto-zero-prefix; «39» as a full pair clamps to 31.
      expect(formatMask('39', DATE_MODE.Date)).toBe('31');
    });

    it('clamps a full two-digit month above max to 12', () => {
      // day 31 valid; month 19 (first 1 ≤ floor(12/10)=1, pair 19 > 12) → clamp 12.
      expect(formatMask('3119', DATE_MODE.Date)).toBe('31.12');
    });

    it('formats date-time with seconds', () => {
      expect(formatMask('15032026143055', DATE_MODE.DateTime)).toBe('15.03.2026, 14:30:55');
    });

    it('formats date-time without seconds when showSeconds=false', () => {
      expect(formatMask('150320261430', DATE_MODE.DateTime, false)).toBe('15.03.2026, 14:30');
    });

    it('truncates input longer than the mask length', () => {
      expect(formatMask('150320269999', DATE_MODE.Date)).toBe('15.03.2026');
    });

    it('clamps hour above 23', () => {
      // 15.03.2026 then hour 29 (first 2 ≤ floor(23/10)=2, pair 29 > 23) → clamp 23.
      expect(formatMask('1503202629', DATE_MODE.DateTime)).toBe('15.03.2026, 23');
    });
  });

  describe('parseMask', () => {
    it('parses a full date string into a Date', () => {
      const parsed = parseMask('15.03.2026', DATE_MODE.Date);
      expect(parsed).toBeInstanceOf(Date);
      expect(parsed?.getFullYear()).toBe(2026);
      expect(parsed?.getMonth()).toBe(2);
      expect(parsed?.getDate()).toBe(15);
    });

    it('returns undefined for incomplete input', () => {
      expect(parseMask('15.03', DATE_MODE.Date)).toBeUndefined();
    });

    it('returns undefined for overflowing day (30 February)', () => {
      expect(parseMask('30.02.2026', DATE_MODE.Date)).toBeUndefined();
    });

    it('returns undefined for invalid month', () => {
      // 13 month → expected digit length matches but month out of range.
      expect(parseMask('15.13.2026', DATE_MODE.Date)).toBeUndefined();
    });

    it('returns undefined for zero day', () => {
      expect(parseMask('00.03.2026', DATE_MODE.Date)).toBeUndefined();
    });

    it('parses date-time with seconds', () => {
      const parsed = parseMask('15.03.2026, 14:30:55', DATE_MODE.DateTime);
      expect(parsed?.getHours()).toBe(14);
      expect(parsed?.getMinutes()).toBe(30);
      expect(parsed?.getSeconds()).toBe(55);
    });

    it('parses date-time without seconds', () => {
      const parsed = parseMask('15.03.2026, 14:30', DATE_MODE.DateTime, false);
      expect(parsed?.getHours()).toBe(14);
      expect(parsed?.getMinutes()).toBe(30);
      expect(parsed?.getSeconds()).toBe(0);
    });

    it('returns undefined when seconds expected but missing', () => {
      expect(parseMask('15.03.2026, 14:30', DATE_MODE.DateTime, true)).toBeUndefined();
    });

    it('returns undefined for invalid hour', () => {
      expect(parseMask('15.03.2026, 24:30:00', DATE_MODE.DateTime)).toBeUndefined();
    });
  });

  describe('dateToMaskString', () => {
    it('formats a date into the mask string', () => {
      expect(dateToMaskString(new Date(2026, 2, 5), DATE_MODE.Date)).toBe('05.03.2026');
    });

    it('formats date-time with seconds', () => {
      expect(dateToMaskString(new Date(2026, 2, 5, 9, 7, 3), DATE_MODE.DateTime)).toBe('05.03.2026, 09:07:03');
    });

    it('formats date-time without seconds when showSeconds=false', () => {
      expect(dateToMaskString(new Date(2026, 2, 5, 9, 7, 3), DATE_MODE.DateTime, false)).toBe('05.03.2026, 09:07');
    });

    it('round-trips through parseMask (date)', () => {
      const original = new Date(2024, 11, 31);
      const masked = dateToMaskString(original, DATE_MODE.Date);
      const parsed = parseMask(masked, DATE_MODE.Date);
      expect(parsed?.getTime()).toBe(original.getTime());
    });

    it('round-trips through parseMask (date-time with seconds)', () => {
      const original = new Date(2024, 11, 31, 23, 59, 58);
      const masked = dateToMaskString(original, DATE_MODE.DateTime);
      const parsed = parseMask(masked, DATE_MODE.DateTime);
      expect(parsed?.getTime()).toBe(original.getTime());
    });
  });
});

describe('FieldDate / isRange', () => {
  it('is true for date-range mode', () => {
    expect(isRange({ mode: DATE_MODE.DateRange })).toBe(true);
  });

  it('is false for date mode', () => {
    expect(isRange({ mode: DATE_MODE.Date })).toBe(false);
  });

  it('is false for date-time mode', () => {
    expect(isRange({ mode: DATE_MODE.DateTime })).toBe(false);
  });

  it('is false when mode is omitted (defaults to single)', () => {
    expect(isRange({})).toBe(false);
  });
});
