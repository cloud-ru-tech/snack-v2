import { formatFilterStateToRequestPayload } from '@ds/toolbar';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  formatTableStateToRequestPayload,
  mapPaginationToRequestPayload,
  mapPaginationToTableState,
  mapSortToRequestPayload,
  mapSortToTableState,
} from '../src/components/Table/utils/saveTableState/mappers';
import { DEFAULT_PAGE_SIZE } from '../src/constants';

// Реальный formatFilterStateToRequestPayload тянет весь @ds/toolbar
// (React-компоненты, SCSS). Unit тестирует только маппинг состояния таблицы,
// поэтому делегат заменён на echo-стаб.
vi.mock('@ds/toolbar', () => ({
  formatFilterStateToRequestPayload: vi.fn((payload: unknown) => payload),
}));

describe('mapPaginationToTableState', () => {
  it('returns defaults for undefined', () => {
    expect(mapPaginationToTableState(undefined)).toEqual({ pageSize: DEFAULT_PAGE_SIZE, pageIndex: 0 });
  });

  it('returns defaults when offset or limit is missing', () => {
    expect(mapPaginationToTableState({ limit: 10 })).toEqual({ pageSize: DEFAULT_PAGE_SIZE, pageIndex: 0 });
    expect(mapPaginationToTableState({ offset: 20 })).toEqual({ pageSize: DEFAULT_PAGE_SIZE, pageIndex: 0 });
  });

  it('maps limit/offset to pageSize/pageIndex', () => {
    expect(mapPaginationToTableState({ limit: 10, offset: 20 })).toEqual({ pageSize: 10, pageIndex: 2 });
    expect(mapPaginationToTableState({ limit: 10, offset: 0 })).toEqual({ pageSize: 10, pageIndex: 0 });
  });

  it('floors a partial page offset down to the page index', () => {
    expect(mapPaginationToTableState({ limit: 25, offset: 30 })).toEqual({ pageSize: 25, pageIndex: 1 });
  });

  it('falls back to DEFAULT_PAGE_SIZE for a degenerate limit=0 payload', () => {
    const state = mapPaginationToTableState({ limit: 0, offset: 0 });

    expect(state.pageSize).toBe(DEFAULT_PAGE_SIZE);
    // Фиксация текущего контракта: pageIndex = floor(offset / 0) → NaN.
    // limit=0 — вырожденный payload, осмысленного индекса страницы у него нет.
    expect(state.pageIndex).toBeNaN();
  });
});

describe('mapSortToTableState', () => {
  it('returns an empty state for the default value', () => {
    expect(mapSortToTableState()).toEqual([]);
    expect(mapSortToTableState([])).toEqual([]);
  });

  it('maps direction "-" to desc and "+" to asc', () => {
    expect(
      mapSortToTableState([
        { field: 'name', direction: '-' },
        { field: 'age', direction: '+' },
      ]),
    ).toEqual([
      { id: 'name', desc: true },
      { id: 'age', desc: false },
    ]);
  });
});

describe('mapPaginationToRequestPayload', () => {
  it('returns undefined for undefined', () => {
    expect(mapPaginationToRequestPayload(undefined)).toBeUndefined();
  });

  it('passes through values already in the limit/offset shape', () => {
    const payload = { limit: 10, offset: 20 };

    expect(mapPaginationToRequestPayload(payload)).toBe(payload);
  });

  it('converts PaginationState to limit/offset', () => {
    expect(mapPaginationToRequestPayload({ pageSize: 10, pageIndex: 2 })).toEqual({ limit: 10, offset: 20 });
    expect(mapPaginationToRequestPayload({ pageSize: 25, pageIndex: 0 })).toEqual({ limit: 25, offset: 0 });
  });
});

describe('mapSortToRequestPayload', () => {
  it('returns undefined for undefined', () => {
    expect(mapSortToRequestPayload(undefined)).toBeUndefined();
  });

  it('returns an empty list for an empty SortingState', () => {
    expect(mapSortToRequestPayload([])).toEqual([]);
  });

  it('maps desc to "-" and asc to "+"', () => {
    expect(
      mapSortToRequestPayload([
        { id: 'name', desc: true },
        { id: 'age', desc: false },
      ]),
    ).toEqual([
      { field: 'name', direction: '-' },
      { field: 'age', direction: '+' },
    ]);
  });
});

describe('formatTableStateToRequestPayload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('delegates with mapped pagination and ordering', () => {
    formatTableStateToRequestPayload({
      pagination: { pageSize: 10, pageIndex: 3 },
      sorting: [{ id: 'name', desc: true }],
      search: 'query',
      filter: { status: 'active' },
    });

    expect(vi.mocked(formatFilterStateToRequestPayload)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(formatFilterStateToRequestPayload)).toHaveBeenCalledWith({
      filter: { status: 'active' },
      search: 'query',
      pagination: { limit: 10, offset: 30 },
      ordering: [{ field: 'name', direction: '-' }],
    });
  });

  it('keeps pagination already in the limit/offset shape and tolerates empty state', () => {
    formatTableStateToRequestPayload({ pagination: { limit: 5, offset: 0 } });

    expect(vi.mocked(formatFilterStateToRequestPayload)).toHaveBeenCalledWith({
      filter: undefined,
      search: undefined,
      pagination: { limit: 5, offset: 0 },
      ordering: undefined,
    });
  });
});
