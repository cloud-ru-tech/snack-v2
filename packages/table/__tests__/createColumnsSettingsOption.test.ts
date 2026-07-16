import { describe, expect, it, vi } from 'vitest';

import {
  createColumnsSettingsOption,
  isColumnsSettingsMenuItem,
} from '../src/components/Table/hooks/useColumnSettings/utils/createColumnsSettingsOption';
import { COLUMN_SETTINGS_MODE, DefaultColumns } from '../src/constants';

vi.mock('../src/components/Table/utils', async () => {
  const getColumnIdentifier = await vi.importActual<typeof import('../src/components/Table/utils/getColumnIdentifier')>(
    '../src/components/Table/utils/getColumnIdentifier',
  );
  const sortColumnDefinitions = await vi.importActual<
    typeof import('../src/components/Table/utils/sortColumnDefinitions')
  >('../src/components/Table/utils/sortColumnDefinitions');

  return { ...getColumnIdentifier, ...sortColumnDefinitions };
});

type Row = { name: string };

describe('isColumnsSettingsMenuItem', () => {
  it('includes ordinary and hidden columns', () => {
    expect(isColumnsSettingsMenuItem<Row>({ accessorKey: 'name' })).toBe(true);
    expect(
      isColumnsSettingsMenuItem<Row>({
        accessorKey: 'amount',
        columnSettings: { mode: COLUMN_SETTINGS_MODE.Locked },
      }),
    ).toBe(true);
  });

  it('excludes selection and row-actions service columns', () => {
    expect(isColumnsSettingsMenuItem<Row>({ id: DefaultColumns.Selection })).toBe(false);
    expect(isColumnsSettingsMenuItem<Row>({ id: DefaultColumns.RowActions })).toBe(false);
  });
});

describe('createColumnsSettingsOption', () => {
  it('builds an enabled option for filterable columns', () => {
    expect(
      createColumnsSettingsOption<Row>({
        accessorKey: 'name',
        columnSettings: { label: 'Name' },
      }),
    ).toEqual({
      id: 'name',
      content: { option: 'Name' },
      switch: true,
      showSwitchIcon: true,
      disabled: false,
    });
  });

  it('disables hidden columns and columns without columnSettings', () => {
    expect(
      createColumnsSettingsOption<Row>({
        accessorKey: 'amount',
        columnSettings: { label: 'Balance', mode: COLUMN_SETTINGS_MODE.Locked },
      }),
    ).toMatchObject({ id: 'amount', disabled: true, checked: true });

    expect(createColumnsSettingsOption<Row>({ accessorKey: 'name', header: 'Имя' })).toMatchObject({
      id: 'name',
      content: { option: 'Имя' },
      disabled: true,
      checked: true,
    });
  });
});
