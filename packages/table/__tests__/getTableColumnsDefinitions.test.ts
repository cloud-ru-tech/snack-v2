import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getTableColumnsDefinitions } from '../src/components/Table/utils/getTableColumnsDefinitions';
import { RowAppearance } from '../src/components/types';
import { getSelectionCellColumnDef, getTreeColumnDef } from '../src/helperComponents';
import { ColumnDefinition } from '../src/types';

// Барель helperComponents тянет JSX-компоненты (SelectionCell/TreeCell) с SCSS и иконками —
// они покрываются play-функциями stories, не unit'ами (см. coverage-standard.md).
// Для unit-теста композиции колонок достаточно стабов-фабрик.
vi.mock('../src/helperComponents', () => ({
  getSelectionCellColumnDef: vi.fn((enableSelectPinned: boolean, isAllRowsMode: boolean) => ({
    id: 'selection-column-stub',
    pinned: 'left',
    size: 32,
    enableSelectPinned,
    isAllRowsMode,
  })),
  getTreeColumnDef: vi.fn((props: Record<string, unknown>) => ({
    id: 'tree-column-stub',
    pinned: 'left',
    size: 150,
    receivedProps: props,
  })),
}));

type Row = { name: string; age: number };

const baseColumns: ColumnDefinition<Row>[] = [{ accessorKey: 'name' }, { accessorKey: 'age' }];

const expanding = {
  getSubRows: () => undefined,
  expandingColumnDefinition: { accessorKey: 'name', showToggle: true },
};

describe('getTableColumnsDefinitions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns columnDefinitions as-is without selection and expanding', () => {
    const result = getTableColumnsDefinitions({
      columnDefinitions: baseColumns,
      enableSelection: false,
      enableSelectPinned: false,
      expanding: undefined,
    });

    expect(result).toBe(baseColumns);
    expect(vi.mocked(getSelectionCellColumnDef)).not.toHaveBeenCalled();
    expect(vi.mocked(getTreeColumnDef)).not.toHaveBeenCalled();
  });

  it('prepends the selection column when selection is enabled without expanding', () => {
    const result = getTableColumnsDefinitions({
      columnDefinitions: baseColumns,
      enableSelection: true,
      enableSelectPinned: true,
      expanding: undefined,
    });

    expect(vi.mocked(getSelectionCellColumnDef)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(getSelectionCellColumnDef)).toHaveBeenCalledWith(true, false);
    expect(result).toHaveLength(baseColumns.length + 1);
    expect(result[0]).toBe(vi.mocked(getSelectionCellColumnDef).mock.results[0]?.value);
    expect(result.slice(1)).toEqual(baseColumns);
  });

  it('prepends the tree column instead of the selection column when expanding is set', () => {
    const result = getTableColumnsDefinitions({
      columnDefinitions: baseColumns,
      enableSelection: true,
      enableSelectPinned: false,
      expanding,
    });

    expect(vi.mocked(getSelectionCellColumnDef)).not.toHaveBeenCalled();
    expect(vi.mocked(getTreeColumnDef)).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(baseColumns.length + 1);
    expect(result[0]).toBe(vi.mocked(getTreeColumnDef).mock.results[0]?.value);
    expect(result.slice(1)).toEqual(baseColumns);
  });

  it('passes expandingColumnDefinition merged with selection flags into getTreeColumnDef', () => {
    getTableColumnsDefinitions({
      columnDefinitions: baseColumns,
      enableSelection: true,
      enableSelectPinned: false,
      expanding,
      rowSelectionAppearance: RowAppearance.HideToggler,
    });

    expect(vi.mocked(getTreeColumnDef)).toHaveBeenCalledWith({
      ...expanding.expandingColumnDefinition,
      enableSelection: true,
      rowSelectionAppearance: RowAppearance.HideToggler,
      isAllRowsMode: false,
    });
  });

  it('defaults rowSelectionAppearance to Disabled', () => {
    getTableColumnsDefinitions({
      columnDefinitions: [],
      enableSelection: false,
      enableSelectPinned: false,
      expanding,
    });

    expect(vi.mocked(getTreeColumnDef)).toHaveBeenCalledWith(
      expect.objectContaining({ rowSelectionAppearance: RowAppearance.Disabled }),
    );
  });
});
