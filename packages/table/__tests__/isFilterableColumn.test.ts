import { describe, expect, it } from 'vitest';

import { isFilterableColumn } from '../src/components/Table/hooks/useColumnSettings/utils/isFilterableColumn';
import { COLUMN_PIN_POSITION, COLUMN_SETTINGS_MODE } from '../src/constants';
import { ColumnDefinition } from '../src/types';

type Row = { name: string };

describe('isFilterableColumn', () => {
  it('returns true for accessorKey + columnSettings', () => {
    expect(isFilterableColumn<Row>({ accessorKey: 'name', columnSettings: {} })).toBe(true);
  });

  it('returns true for id + columnSettings (pinned column)', () => {
    const pinned: ColumnDefinition<Row> = {
      id: 'actions',
      pinned: COLUMN_PIN_POSITION.Right,
      size: 48,
      columnSettings: { label: 'Actions' },
    };

    expect(isFilterableColumn(pinned)).toBe(true);
  });

  it('returns false for a column without columnSettings', () => {
    expect(isFilterableColumn<Row>({ accessorKey: 'name' })).toBe(false);
  });

  it('returns false for hidden mode', () => {
    expect(
      isFilterableColumn<Row>({ accessorKey: 'name', columnSettings: { mode: COLUMN_SETTINGS_MODE.Hidden } }),
    ).toBe(false);
  });

  it('returns true for defaultTrue and defaultFalse modes', () => {
    expect(
      isFilterableColumn<Row>({ accessorKey: 'name', columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultTrue } }),
    ).toBe(true);
    expect(
      isFilterableColumn<Row>({ accessorKey: 'name', columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultFalse } }),
    ).toBe(true);
  });

  it('returns false for a column with columnSettings but without id/accessorKey', () => {
    // Узкий каст: runtime edge — FilterableProps требует id либо accessorKey,
    // проверяем, что guard не пропускает такие объекты.
    const colDef = { header: 'No id', columnSettings: {} } as unknown as ColumnDefinition<Row>;

    expect(isFilterableColumn(colDef)).toBe(false);
  });

  it('treats an explicitly undefined columnSettings key as present (`in`-check contract)', () => {
    // Фиксация текущего контракта: guard проверяет наличие ключа через `in`,
    // поэтому `columnSettings: undefined` проходит проверку.
    expect(isFilterableColumn<Row>({ accessorKey: 'name', columnSettings: undefined })).toBe(true);
  });
});
