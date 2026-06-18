import { ChipChoiceRowProps } from '@ds/chips';
import { describe, expect, it } from 'vitest';

import {
  validateFilter,
  validatePaging,
  validateSorting,
} from '../src/components/Table/utils/saveTableState/validators';

type Filters = { status: string; name: string };

// Узкий каст: validateFilter читает из настроек только `id`; полный union
// ChipChoiceProps (type + props конкретного чипа) для проверки не нужен.
const filterSettings = [{ id: 'status' }, { id: 'name' }] as unknown as ChipChoiceRowProps<Filters>['filters'];

describe('validatePaging', () => {
  it('accepts falsy values (state is absent)', () => {
    expect(validatePaging(undefined)).toBe(true);
    expect(validatePaging(null)).toBe(true);
    expect(validatePaging('')).toBe(true);
    expect(validatePaging(0)).toBe(true);
  });

  it('rejects truthy non-objects', () => {
    expect(validatePaging(5)).toBe(false);
    expect(validatePaging('paging')).toBe(false);
    expect(validatePaging(true)).toBe(false);
  });

  it('accepts an object with numeric limit and offset', () => {
    expect(validatePaging({ limit: 10, offset: 0 })).toBe(true);
    expect(validatePaging({ limit: 0, offset: 0 })).toBe(true);
  });

  it('rejects objects with missing or non-numeric limit/offset', () => {
    expect(validatePaging({ limit: 10 })).toBe(false);
    expect(validatePaging({ offset: 0 })).toBe(false);
    expect(validatePaging({ limit: '10', offset: 0 })).toBe(false);
    expect(validatePaging({ limit: 10, offset: '0' })).toBe(false);
    expect(validatePaging([])).toBe(false);
  });
});

describe('validateSorting', () => {
  it('accepts falsy values (state is absent)', () => {
    expect(validateSorting(undefined)).toBe(true);
    expect(validateSorting(null)).toBe(true);
  });

  it('accepts an empty array and valid entries', () => {
    expect(validateSorting([])).toBe(true);
    expect(
      validateSorting([
        { field: 'name', direction: '-' },
        { field: 'age', direction: '+' },
      ]),
    ).toBe(true);
  });

  it('rejects non-array truthy values', () => {
    expect(validateSorting({ field: 'name', direction: '-' })).toBe(false);
    expect(validateSorting('name:-')).toBe(false);
  });

  it('rejects entries with missing or non-string field/direction', () => {
    expect(validateSorting([{ field: 'name' }])).toBe(false);
    expect(validateSorting([{ direction: '-' }])).toBe(false);
    expect(validateSorting([{ field: 1, direction: '-' }])).toBe(false);
    expect(validateSorting([{ field: 'name', direction: '-' }, null])).toBe(false);
  });
});

describe('validateFilter', () => {
  it('accepts an object whose keys all exist in filter settings', () => {
    expect(validateFilter({ status: 'active' }, filterSettings)).toBe(true);
    expect(validateFilter({ status: 'active', name: 'abc' }, filterSettings)).toBe(true);
  });

  it('accepts an empty object', () => {
    expect(validateFilter({}, filterSettings)).toBe(true);
  });

  it('rejects an object with a key missing from filter settings', () => {
    expect(validateFilter({ unknownField: 1 }, filterSettings)).toBe(false);
    expect(validateFilter({ status: 'active', unknownField: 1 }, filterSettings)).toBe(false);
  });

  it('rejects null and non-objects', () => {
    expect(validateFilter(null, filterSettings)).toBe(false);
    expect(validateFilter('status', filterSettings)).toBe(false);
    expect(validateFilter(42, filterSettings)).toBe(false);
  });
});
