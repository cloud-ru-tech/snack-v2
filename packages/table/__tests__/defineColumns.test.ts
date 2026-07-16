import { describe, expect, it } from 'vitest';

import { defineColumns } from '../src/columnUtils/defineColumns';
import { COLUMN_SETTINGS_MODE, SORT_FN } from '../src/constants';

type Row = {
  name: string;
  amount: number;
  createdAt: string;
};

describe('defineColumns', () => {
  it('maps basic column fields', () => {
    const columns = defineColumns<Row>([
      { key: 'name', header: 'Имя', sortable: true, width: 200 },
      { key: 'amount', header: 'Сумма', align: 'right', width: 120 },
    ]);

    expect(columns).toHaveLength(2);
    expect(columns[0]).toMatchObject({
      id: 'name',
      accessorKey: 'name',
      header: 'Имя',
      enableSorting: true,
      size: 200,
      columnSettings: { label: 'Имя' },
    });
    expect(columns[1]).toMatchObject({
      id: 'amount',
      accessorKey: 'amount',
      align: 'right',
      headerAlign: 'right',
      size: 120,
    });
  });

  it('applies date format with sortingFn', () => {
    const [column] = defineColumns<Row>([{ key: 'createdAt', header: 'Дата', format: 'date' }]);

    expect(column.sortingFn).toBe(SORT_FN.DateTime);
    expect(column.cell).toBeDefined();
  });

  it('applies hidden column settings', () => {
    const [column] = defineColumns<Row>([{ key: 'name', header: 'Имя', hidden: true }]);

    expect(column.columnSettings).toEqual({ label: 'Имя', mode: COLUMN_SETTINGS_MODE.DefaultHidden });
  });

  it('uses escape hatch column definition', () => {
    const custom = { id: 'custom', accessorKey: 'name', header: 'Custom' };
    const [column] = defineColumns<Row>([{ key: 'name', header: 'Имя', column: custom }]);

    expect(column).toBe(custom);
  });
});
