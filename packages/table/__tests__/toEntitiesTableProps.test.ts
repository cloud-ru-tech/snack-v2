import { describe, expect, it } from 'vitest';

import { ENTITIES_PRESET_PAGINATION_OPTIONS } from '../src/presets/constants';
import { toEntitiesTableProps } from '../src/presets/entitiesTable/toEntitiesTableProps';

const columnDefinitions = [{ id: 'name', accessorKey: 'name', header: 'Name' }];

describe('toEntitiesTableProps', () => {
  it('applies EntitiesTable product defaults', () => {
    const result = toEntitiesTableProps({
      input: {
        id: 'entities-table-test',
        columnDefinitions,
        getRowId: (row: { id: string }) => row.id,
      },
      tableState: {
        search: 'query',
        offset: 10,
        limit: 25,
        sorting: [{ id: 'name', desc: false }],
        onChangePage: () => {},
        onSearchChange: () => {},
        onSortChange: () => {},
        onReset: () => {},
        paginationParams: { offset: 10, limit: 25, search: 'query', ordering: 'name' },
      },
      query: {
        data: { total: 100, data: [{ id: '1' }] },
        isLoading: true,
        isFetching: true,
        isError: false,
        isSuccess: true,
        refetch: () => {},
      },
    });

    expect(result.outline).toBe(true);
    expect(result.savedState).toEqual({ id: 'entities-table-test', resize: true });
    expect(result.columnsSettings).toEqual({ enableDrag: true, enableSettingsMenu: true });
    expect(result.pagination?.options).toEqual([...ENTITIES_PRESET_PAGINATION_OPTIONS]);
    expect(result.manualSorting).toBe(true);
    expect(result.manualPagination).toBe(true);
    expect(result.manualFiltering).toBe(true);
    expect(result.loading).toBe(true);
    expect(result.search).toEqual({
      state: 'query',
      onChange: expect.any(Function),
      loading: true,
      placeholder: undefined,
    });
    expect(result.items).toEqual([{ id: '1' }]);
    expect(result.total).toBe(100);
  });

  it('sets loading to false when only one of isLoading/isFetching is true', () => {
    const result = toEntitiesTableProps({
      input: {
        id: 'entities-table-loading',
        columnDefinitions,
        getRowId: (row: { id: string }) => row.id,
      },
      tableState: {
        search: '',
        offset: 0,
        limit: 10,
        sorting: undefined,
        onChangePage: () => {},
        onSearchChange: () => {},
        onSortChange: () => {},
        onReset: () => {},
        paginationParams: { offset: 0, limit: 10 },
      },
      query: {
        data: { total: 0, data: [] },
        isLoading: true,
        isFetching: false,
        isError: false,
        isSuccess: false,
        refetch: () => {},
      },
    });

    expect(result.loading).toBe(false);
  });
});
