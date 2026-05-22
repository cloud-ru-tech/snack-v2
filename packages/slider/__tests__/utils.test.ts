import { describe, expect, it } from 'vitest';

import {
  buildMarksByIndex,
  getSortedMarkValues,
  internalToDomain,
  mapDomainValueToEqualInternal,
  mapInternalToDomain,
  snapToMarkIndex,
} from '../src/components/utils';

describe('getSortedMarkValues', () => {
  it('returns numeric mark keys sorted ascending', () => {
    expect(getSortedMarkValues({ 10: 'a', 0: 'b', 5: 'c' })).toEqual([0, 5, 10]);
  });

  it('skips non-numeric keys', () => {
    // marks может приходить с искажениями в типах от потребителя; ожидаем фильтрацию NaN.
    const marks = { 0: 'a', 5: 'b', NaN: 'noise' } as unknown as Record<string | number, string>;
    expect(getSortedMarkValues(marks)).toEqual([0, 5]);
  });

  it('returns empty array for empty marks', () => {
    expect(getSortedMarkValues({})).toEqual([]);
  });
});

describe('snapToMarkIndex', () => {
  it('returns 0 when markValues is empty', () => {
    expect(snapToMarkIndex(42, [])).toBe(0);
  });

  it('returns exact index when domain value matches a mark', () => {
    expect(snapToMarkIndex(20, [0, 10, 20, 30])).toBe(2);
  });

  it('returns nearest-by-distance index when no exact match', () => {
    expect(snapToMarkIndex(12, [0, 10, 20, 30])).toBe(1);
    expect(snapToMarkIndex(18, [0, 10, 20, 30])).toBe(2);
  });

  it('keeps first encountered when distances tie', () => {
    // 5 равноудалён от 0 и 10 — выигрывает первый найденный (i=0).
    expect(snapToMarkIndex(5, [0, 10])).toBe(0);
  });
});

describe('internalToDomain', () => {
  it('returns internal unchanged when markValues is empty', () => {
    expect(internalToDomain(7, [])).toBe(7);
  });

  it('maps integer internal to corresponding mark', () => {
    expect(internalToDomain(0, [0, 10, 20])).toBe(0);
    expect(internalToDomain(1, [0, 10, 20])).toBe(10);
    expect(internalToDomain(2, [0, 10, 20])).toBe(20);
  });

  it('rounds fractional internal to nearest index', () => {
    expect(internalToDomain(1.4, [0, 10, 20])).toBe(10);
    expect(internalToDomain(1.6, [0, 10, 20])).toBe(20);
  });

  it('clamps internal below 0 to first mark', () => {
    expect(internalToDomain(-5, [0, 10, 20])).toBe(0);
  });

  it('clamps internal above max to last mark', () => {
    expect(internalToDomain(99, [0, 10, 20])).toBe(20);
  });
});

describe('mapInternalToDomain', () => {
  it('maps single number in non-range mode', () => {
    expect(mapInternalToDomain(1, false, [0, 10, 20])).toBe(10);
  });

  it('maps array element-wise in range mode', () => {
    expect(mapInternalToDomain([0, 2], true, [0, 10, 20])).toEqual([0, 20]);
  });

  it('range=true but value is single number — treats as scalar via fallback', () => {
    // Сигнатура допускает скаляр при range=true (ошибка потребителя): не падаем,
    // прогоняем через одиночный internalToDomain.
    expect(mapInternalToDomain(1, true, [0, 10, 20])).toBe(10);
  });
});

describe('buildMarksByIndex', () => {
  it('replaces numeric keys with index-based keys preserving labels', () => {
    expect(buildMarksByIndex([0, 10, 20], { 0: 'low', 10: 'mid', 20: 'high' })).toEqual({
      0: 'low',
      1: 'mid',
      2: 'high',
    });
  });

  it('uses stringified mark value when label missing', () => {
    expect(buildMarksByIndex([0, 10], {})).toEqual({ 0: '0', 1: '10' });
  });
});

describe('mapDomainValueToEqualInternal', () => {
  const toInternal = (d: number) => d / 10;

  it('returns domainValue unchanged when useEqual=false', () => {
    expect(mapDomainValueToEqualInternal(false, false, 30, toInternal)).toBe(30);
  });

  it('returns undefined when domainValue is undefined', () => {
    expect(mapDomainValueToEqualInternal(true, false, undefined, toInternal)).toBeUndefined();
  });

  it('maps each element when range=true and value is array', () => {
    expect(mapDomainValueToEqualInternal(true, true, [10, 30], toInternal)).toEqual([1, 3]);
  });

  it('maps scalar when range=false and value is number', () => {
    expect(mapDomainValueToEqualInternal(true, false, 30, toInternal)).toBe(3);
  });

  it('falls through when shape mismatches range (number with range=true)', () => {
    // Потребитель передал scalar в range-режиме — поведение по-умолчанию: возврат as-is.
    expect(mapDomainValueToEqualInternal(true, true, 30, toInternal)).toBe(30);
  });
});
