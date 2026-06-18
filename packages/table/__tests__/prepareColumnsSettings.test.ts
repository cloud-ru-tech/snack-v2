import { describe, expect, it, vi } from 'vitest';

import { prepareColumnsSettings } from '../src/components/Table/hooks/useColumnSettings/utils/prepareColumnsSettings';
import { PinnedGroupsState } from '../src/components/Table/utils/getPinnedGroups';
import { COLUMN_PIN_POSITION, COLUMN_SETTINGS_MODE } from '../src/constants';

// Барель utils реэкспортирует getTableColumnsDefinitions, который тянет JSX-heavy
// helperComponents (покрываются play-функциями, см. coverage-standard.md).
// Подменяем барель на реальные leaf-модули, нужные prepareColumnsSettings.
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

type PrepareArgs = Parameters<typeof prepareColumnsSettings<Row>>[0];

// Echo-стаб локализации: возвращает ключ с префиксом, чтобы ассертить, какой ключ запрошен.
const t = ((key: string) => `t:${key}`) as unknown as PrepareArgs['t'];

type SettingsOption = { id: string; content: { option: string }; switch: boolean; showSwitchIcon: boolean };

// Сужение unknown: вложенные группы section.items имеют форму { divider, items, type: 'group' }.
function asGroup(group: unknown): { divider: boolean; items: SettingsOption[]; type: string } {
  if (group && typeof group === 'object' && 'items' in group) {
    return group as { divider: boolean; items: SettingsOption[]; type: string };
  }

  throw new Error('Expected a group item with `items`');
}

const pinnedGroups: PinnedGroupsState<Row> = {
  left: [
    // Служебная колонка без columnSettings — не должна попасть в настройки.
    { id: 'selection', pinned: COLUMN_PIN_POSITION.Left, size: 32 },
    { id: 'pinned-a', pinned: COLUMN_PIN_POSITION.Left, size: 100, columnSettings: { label: 'Pinned A' } },
  ],
  unpinned: [
    { accessorKey: 'name', columnSettings: { label: 'Name' } },
    // Скрытая из настроек колонка — исключается guard'ом isFilterableColumn.
    { accessorKey: 'status', columnSettings: { label: 'Status', mode: COLUMN_SETTINGS_MODE.Hidden } },
    { accessorKey: 'age', columnSettings: { label: 'Age' } },
  ],
  right: [{ id: 'actions', pinned: COLUMN_PIN_POSITION.Right, size: 48, columnSettings: { label: 'Actions' } }],
};

const columnOrder = ['selection', 'pinned-a', 'age', 'name', 'actions'];

describe('prepareColumnsSettings', () => {
  it('returns a single group-select section with left/unpinned/right groups', () => {
    const result = prepareColumnsSettings({ pinnedGroups, columnOrder, areAllColumnsEnabled: false, t });

    expect(result).toHaveLength(1);

    const [section] = result;

    expect(section.type).toBe('group-select');
    expect(section.label).toBe('t:settingsHeaderLabel');
    expect(section.items).toHaveLength(3);
    expect(section.items?.map(group => asGroup(group).divider)).toEqual([false, true, true]);
    expect(section.items?.map(group => asGroup(group).type)).toEqual(['group', 'group', 'group']);
  });

  it('builds options only from filterable columns', () => {
    const [section] = prepareColumnsSettings({ pinnedGroups, columnOrder, areAllColumnsEnabled: false, t });
    const [leftGroup, unpinnedGroup, rightGroup] = (section.items ?? []).map(asGroup);

    expect(leftGroup?.items.map(item => item.id)).toEqual(['pinned-a']);
    expect(unpinnedGroup?.items.map(item => item.id)).toEqual(['age', 'name']);
    expect(rightGroup?.items.map(item => item.id)).toEqual(['actions']);
  });

  it('sorts options inside a group according to columnOrder', () => {
    const [section] = prepareColumnsSettings({
      pinnedGroups,
      columnOrder: [...columnOrder].reverse(),
      areAllColumnsEnabled: false,
      t,
    });
    const unpinnedGroup = asGroup(section.items?.[1]);

    expect(unpinnedGroup.items.map(item => item.id)).toEqual(['name', 'age']);
  });

  it('builds an option as a switch with the columnSettings label', () => {
    const [section] = prepareColumnsSettings({ pinnedGroups, columnOrder, areAllColumnsEnabled: false, t });
    const [option] = asGroup(section.items?.[0]).items;

    expect(option).toEqual({
      id: 'pinned-a',
      content: { option: 'Pinned A' },
      switch: true,
      showSwitchIcon: true,
    });
  });

  it('switches the select button label depending on areAllColumnsEnabled', () => {
    const [whenAllEnabled] = prepareColumnsSettings({ pinnedGroups, columnOrder, areAllColumnsEnabled: true, t });
    const [whenSomeDisabled] = prepareColumnsSettings({ pinnedGroups, columnOrder, areAllColumnsEnabled: false, t });

    expect(whenAllEnabled.selectButtonLabel).toBe('t:groupSelectButton.hide');
    expect(whenSomeDisabled.selectButtonLabel).toBe('t:groupSelectButton.show');
  });

  it('returns empty groups for empty pinned groups', () => {
    const [section] = prepareColumnsSettings({
      pinnedGroups: { left: [], right: [], unpinned: [] },
      columnOrder: [],
      areAllColumnsEnabled: false,
      t,
    });

    for (const group of section.items ?? []) {
      expect(asGroup(group).items).toEqual([]);
    }
  });
});
