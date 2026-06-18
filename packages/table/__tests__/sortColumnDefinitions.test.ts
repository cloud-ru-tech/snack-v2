import { describe, expect, it } from 'vitest';

import { getColumnIdentifier } from '../src/components/Table/utils/getColumnIdentifier';
import { sortColumnDefinitions } from '../src/components/Table/utils/sortColumnDefinitions';
import { COLUMN_PIN_POSITION } from '../src/constants';
import { ColumnDefinition, FilterableColumnDefinition } from '../src/types';

type Row = { name: string; age: number; status: string };

describe('getColumnIdentifier', () => {
  it('prefers `id` over `accessorKey`', () => {
    const colDef: ColumnDefinition<Row> = {
      id: 'custom-id',
      accessorKey: 'name',
      pinned: COLUMN_PIN_POSITION.Left,
      size: 100,
    };

    expect(getColumnIdentifier(colDef)).toBe('custom-id');
  });

  it('falls back to `accessorKey` when `id` is absent', () => {
    expect(getColumnIdentifier<Row>({ accessorKey: 'age' })).toBe('age');
  });

  it('falls back to `accessorKey` when `id` is an empty string', () => {
    // Узкий каст: пустой id — runtime edge, тип PinnedColumnDefinition требует непустой string.
    const colDef = { id: '', accessorKey: 'name' } as unknown as ColumnDefinition<Row>;

    expect(getColumnIdentifier(colDef)).toBe('name');
  });

  it('returns an empty string when neither `id` nor `accessorKey` is set', () => {
    // Узкий каст: колонка без идентификаторов (например, accessorFn-вариант).
    const colDef = { header: 'No id' } as unknown as ColumnDefinition<Row>;

    expect(getColumnIdentifier(colDef)).toBe('');
  });
});

describe('sortColumnDefinitions', () => {
  const colName: FilterableColumnDefinition<Row> = { accessorKey: 'name', columnSettings: { label: 'Name' } };
  const colAge: FilterableColumnDefinition<Row> = { accessorKey: 'age', columnSettings: { label: 'Age' } };
  const colStatus: FilterableColumnDefinition<Row> = { id: 'status', columnSettings: { label: 'Status' } };

  it('sorts column definitions according to columnOrder', () => {
    const sorted = [colName, colAge, colStatus].sort(sortColumnDefinitions(['status', 'age', 'name']));

    expect(sorted.map(getColumnIdentifier)).toEqual(['status', 'age', 'name']);
  });

  it('places columns missing from columnOrder first (findIndex === -1)', () => {
    const sorted = [colAge, colName].sort(sortColumnDefinitions(['age']));

    expect(sorted.map(getColumnIdentifier)).toEqual(['name', 'age']);
  });

  it('keeps the original order for an empty columnOrder (stable sort, all -1)', () => {
    const sorted = [colStatus, colName, colAge].sort(sortColumnDefinitions([]));

    expect(sorted.map(getColumnIdentifier)).toEqual(['status', 'name', 'age']);
  });

  it('matches pinned columns by `id`', () => {
    const pinned: FilterableColumnDefinition<Row> = {
      id: 'actions',
      pinned: COLUMN_PIN_POSITION.Right,
      size: 48,
      columnSettings: { label: 'Actions' },
    };

    const sorted = [pinned, colName].sort(sortColumnDefinitions(['name', 'actions']));

    expect(sorted.map(getColumnIdentifier)).toEqual(['name', 'actions']);
  });
});
