import { describe, expect, it } from 'vitest';

import { PRICE_PERIOD } from '../src/constants';
import { formatCurrency, formatQuantity } from '../src/helpers/formatters';
import { formatPeriodLabel } from '../src/hooks/usePeriodFormat';

describe('formatters', () => {
  it('formatCurrency formats number as currency string', () => {
    expect(formatCurrency(10800)).toContain('10');
  });

  it('formatQuantity prefixes numeric values', () => {
    expect(formatQuantity(2)).toBe('×2');
  });

  it('formatQuantity returns string as-is', () => {
    expect(formatQuantity('16 GB')).toBe('16 GB');
  });
});

describe('formatPeriodLabel', () => {
  const t = (key: string) =>
    ({
      pricePeriodYear: 'per year',
      pricePeriodMonth: 'per month',
      pricePeriodDay: 'per day',
      pricePeriodHour: 'per hour',
      pricePeriodMinute: 'per minute',
    })[key] ?? key;

  it('maps billing periods to locale keys', () => {
    expect(formatPeriodLabel(t, PRICE_PERIOD.Month)).toBe('per month');
    expect(formatPeriodLabel(t, PRICE_PERIOD.Year)).toBe('per year');
    expect(formatPeriodLabel(t, PRICE_PERIOD.Day)).toBe('per day');
    expect(formatPeriodLabel(t, PRICE_PERIOD.Hour)).toBe('per hour');
    expect(formatPeriodLabel(t, PRICE_PERIOD.Minute)).toBe('per minute');
  });
});
