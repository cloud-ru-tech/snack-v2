import { describe, expect, it } from 'vitest';

import { getPinnedGroups } from '../src/components/Table/utils/getPinnedGroups';
import { COLUMN_PIN_POSITION } from '../src/constants';
import { ColumnDefinition } from '../src/types';

type Row = { name: string; age: number };

describe('getPinnedGroups', () => {
  it('returns empty groups for an empty list', () => {
    expect(getPinnedGroups<Row>([])).toEqual({ left: [], right: [], unpinned: [] });
  });

  it('treats columns without `pinned` as unpinned', () => {
    const colDefs: ColumnDefinition<Row>[] = [{ accessorKey: 'name' }, { accessorKey: 'age' }];

    const groups = getPinnedGroups(colDefs);

    expect(groups.left).toEqual([]);
    expect(groups.right).toEqual([]);
    expect(groups.unpinned).toEqual(colDefs);
  });

  it('distributes columns to left/right/unpinned groups', () => {
    const left: ColumnDefinition<Row> = { id: 'sel', pinned: COLUMN_PIN_POSITION.Left, size: 32 };
    const right: ColumnDefinition<Row> = { id: 'actions', pinned: COLUMN_PIN_POSITION.Right, size: 48 };
    const unpinned: ColumnDefinition<Row> = { accessorKey: 'name' };

    const groups = getPinnedGroups([right, unpinned, left]);

    expect(groups.left).toEqual([left]);
    expect(groups.right).toEqual([right]);
    expect(groups.unpinned).toEqual([unpinned]);
  });

  it('keeps the relative order of columns inside each group', () => {
    const leftA: ColumnDefinition<Row> = { id: 'left-a', pinned: COLUMN_PIN_POSITION.Left, size: 10 };
    const leftB: ColumnDefinition<Row> = { id: 'left-b', pinned: COLUMN_PIN_POSITION.Left, size: 20 };
    const unpinnedA: ColumnDefinition<Row> = { accessorKey: 'name' };
    const unpinnedB: ColumnDefinition<Row> = { accessorKey: 'age' };

    const groups = getPinnedGroups([leftA, unpinnedA, leftB, unpinnedB]);

    expect(groups.left).toEqual([leftA, leftB]);
    expect(groups.unpinned).toEqual([unpinnedA, unpinnedB]);
  });

  it('treats `pinned: undefined` as unpinned', () => {
    // Узкий каст: проверяем runtime-устойчивость к явному `pinned: undefined`,
    // который тип PinnedColumnDefinition не допускает.
    const colDef = { id: 'col', pinned: undefined } as unknown as ColumnDefinition<Row>;

    const groups = getPinnedGroups([colDef]);

    expect(groups.unpinned).toEqual([colDef]);
    expect(groups.left).toEqual([]);
    expect(groups.right).toEqual([]);
  });
});
