import { describe, expect, it, vi } from 'vitest';

import { prepareReorderableColumnsSettings } from '../src/components/Table/hooks/useColumnSettings/utils/prepareReorderableColumnsSettings';
import { PinnedGroupsState } from '../src/components/Table/utils/getPinnedGroups';
import { COLUMN_PIN_POSITION, COLUMN_SETTINGS_MODE } from '../src/constants';

vi.mock('../src/components/Table/utils', async () => {
  const getColumnIdentifier = await vi.importActual<typeof import('../src/components/Table/utils/getColumnIdentifier')>(
    '../src/components/Table/utils/getColumnIdentifier',
  );
  const sortColumnDefinitions = await vi.importActual<
    typeof import('../src/components/Table/utils/sortColumnDefinitions')
  >('../src/components/Table/utils/sortColumnDefinitions');

  return { ...getColumnIdentifier, ...sortColumnDefinitions };
});

type Row = { name: string; age: number; status: string };

const pinnedGroups: PinnedGroupsState<Row> = {
  left: [
    { id: 'selectionCell', pinned: COLUMN_PIN_POSITION.Left, size: 32 },
    { id: 'pinned-a', pinned: COLUMN_PIN_POSITION.Left, size: 100, columnSettings: { label: 'Pinned A' } },
  ],
  unpinned: [
    { accessorKey: 'name', columnSettings: { label: 'Name' } },
    { accessorKey: 'status', columnSettings: { label: 'Status', mode: COLUMN_SETTINGS_MODE.Hidden } },
    { accessorKey: 'age', columnSettings: { label: 'Age' } },
    { accessorKey: 'createdAt', header: 'Created' },
  ],
  right: [{ id: 'actions', pinned: COLUMN_PIN_POSITION.Right, size: 48, columnSettings: { label: 'Actions' } }],
};

const columnOrder = ['selectionCell', 'pinned-a', 'age', 'name', 'status', 'createdAt', 'actions'];

describe('prepareReorderableColumnsSettings', () => {
  it('puts menu columns into pinTop/items/pinBottom and excludes selection', () => {
    const result = prepareReorderableColumnsSettings({ pinnedGroups, columnOrder });

    expect(result.pinTop.map(item => item.id)).toEqual(['pinned-a']);
    expect(result.items.map(item => item.id)).toEqual(['age', 'name', 'status', 'createdAt']);
    expect(result.pinBottom.map(item => item.id)).toEqual(['actions']);
  });

  it('marks hidden and columns without columnSettings as disabled', () => {
    const result = prepareReorderableColumnsSettings({ pinnedGroups, columnOrder });
    const status = result.items.find(item => item.id === 'status');
    const createdAt = result.items.find(item => item.id === 'createdAt');

    expect(status).toMatchObject({ disabled: true, checked: true });
    expect(createdAt).toMatchObject({ disabled: true, checked: true, content: { option: 'Created' } });
  });

  it('sorts unpinned items according to columnOrder', () => {
    const result = prepareReorderableColumnsSettings({
      pinnedGroups,
      columnOrder: [...columnOrder].reverse(),
    });

    expect(result.items.map(item => item.id)).toEqual(['createdAt', 'status', 'name', 'age']);
  });

  it('builds switch options with columnSettings labels', () => {
    const age = prepareReorderableColumnsSettings({ pinnedGroups, columnOrder }).items.find(item => item.id === 'age');

    expect(age).toEqual({
      id: 'age',
      content: { option: 'Age' },
      switch: true,
      showSwitchIcon: true,
      disabled: false,
    });
  });
});
