import type { Table } from '@tanstack/react-table';
import { describe, expect, it, vi } from 'vitest';

import { getMasterSelectionState, getSelectionCounts, toggleMasterSelection } from '../src/helpers/masterSelection';

// Узкий каст: masterSelection читает только selection/pagination-хелперы tanstack Table.
function createTableStub(overrides: Record<string, unknown> = {}): Table<unknown> {
  return {
    getIsAllRowsSelected: vi.fn(() => false),
    getIsSomeRowsSelected: vi.fn(() => false),
    getIsAllPageRowsSelected: vi.fn(() => false),
    getIsSomePageRowsSelected: vi.fn(() => false),
    toggleAllRowsSelected: vi.fn(),
    toggleAllPageRowsSelected: vi.fn(),
    getSelectedRowModel: vi.fn(() => ({ flatRows: [{ subRows: [] }, { subRows: [] }] })),
    getFilteredRowModel: vi.fn(() => ({ flatRows: [{ subRows: [] }, { subRows: [] }, { subRows: [] }] })),
    getPaginationRowModel: vi.fn(() => ({ flatRows: [{ subRows: [] }] })),
    ...overrides,
  } as unknown as Table<unknown>;
}

describe('masterSelection', () => {
  it('getMasterSelectionState uses all-rows helpers for allRows mode', () => {
    const table = createTableStub({
      getIsAllRowsSelected: vi.fn(() => true),
      getIsSomeRowsSelected: vi.fn(() => false),
    });

    expect(getMasterSelectionState(table, { isAllRowsMode: true })).toEqual({
      checked: true,
      indeterminate: false,
    });
  });

  it('getMasterSelectionState uses page-rows helpers for pageRows mode', () => {
    const table = createTableStub({
      getIsAllPageRowsSelected: vi.fn(() => true),
      getIsSomePageRowsSelected: vi.fn(() => false),
    });

    expect(getMasterSelectionState(table, { isAllRowsMode: false })).toEqual({
      checked: true,
      indeterminate: false,
    });
  });

  it('toggleMasterSelection calls toggleAllRowsSelected in allRows mode', () => {
    const table = createTableStub();

    toggleMasterSelection(table, { isAllRowsMode: true });

    expect(table.toggleAllRowsSelected).toHaveBeenCalledTimes(1);
    expect(table.toggleAllPageRowsSelected).not.toHaveBeenCalled();
  });

  it('toggleMasterSelection calls toggleAllPageRowsSelected in pageRows mode', () => {
    const table = createTableStub();

    toggleMasterSelection(table, { isAllRowsMode: false });

    expect(table.toggleAllPageRowsSelected).toHaveBeenCalledTimes(1);
    expect(table.toggleAllRowsSelected).not.toHaveBeenCalled();
  });

  it('getSelectionCounts uses pagination row model for pageRows mode', () => {
    const table = createTableStub();

    expect(getSelectionCounts(table, { isAllRowsMode: false })).toEqual({
      selectedCount: 2,
      totalCount: 1,
    });
  });

  it('getSelectionCounts uses filtered row model for allRows mode', () => {
    const table = createTableStub();

    expect(getSelectionCounts(table, { isAllRowsMode: true })).toEqual({
      selectedCount: 2,
      totalCount: 3,
    });
  });
});
