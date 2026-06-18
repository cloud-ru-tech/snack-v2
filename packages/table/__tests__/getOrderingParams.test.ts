import { describe, expect, it } from 'vitest';

import { getOrderingParams } from '../src/presets/entitiesTable/utils';

describe('getOrderingParams', () => {
  it('returns undefined when sorting is empty', () => {
    expect(getOrderingParams(undefined)).toBeUndefined();
    expect(getOrderingParams([])).toBeUndefined();
  });

  it('returns field id for ascending sort', () => {
    expect(getOrderingParams([{ id: 'name', desc: false }])).toBe('name');
  });

  it('returns prefixed field id for descending sort', () => {
    expect(getOrderingParams([{ id: 'createdAt', desc: true }])).toBe('-createdAt');
  });
});
