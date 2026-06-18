import { describe, expect, it } from 'vitest';

import { buildPaginationParams } from '../src/presets/entitiesTable/utils';

describe('buildPaginationParams', () => {
  it('builds base pagination params', () => {
    expect(buildPaginationParams({ offset: 20, limit: 10, search: '' })).toEqual({
      offset: 20,
      limit: 10,
    });
  });

  it('includes search when non-empty', () => {
    expect(buildPaginationParams({ offset: 0, limit: 25, search: 'alpha' })).toEqual({
      offset: 0,
      limit: 25,
      search: 'alpha',
    });
  });

  it('includes ordering from sorting state', () => {
    expect(
      buildPaginationParams({
        offset: 0,
        limit: 10,
        search: 'beta',
        sorting: [{ id: 'name', desc: true }],
      }),
    ).toEqual({
      offset: 0,
      limit: 10,
      search: 'beta',
      ordering: '-name',
    });
  });
});
