import { describe, expect, it } from 'vitest';

import { isColumnEnabledInitially } from '../src/components/Table/hooks/useColumnSettings/utils/isColumnEnabledInitially';
import { COLUMN_SETTINGS_MODE } from '../src/constants';
import { ColumnDefinition } from '../src/types';

type Row = { name: string };

describe('isColumnEnabledInitially', () => {
  it('returns true for a column without columnSettings', () => {
    expect(isColumnEnabledInitially<Row>({ accessorKey: 'name' })).toBe(true);
  });

  it('returns true when columnSettings is explicitly undefined', () => {
    expect(isColumnEnabledInitially<Row>({ accessorKey: 'name', columnSettings: undefined })).toBe(true);
  });

  it('returns true for empty columnSettings (mode is not set)', () => {
    expect(isColumnEnabledInitially<Row>({ accessorKey: 'name', columnSettings: {} })).toBe(true);
  });

  it('returns true for defaultVisible and locked modes', () => {
    const defaultVisible: ColumnDefinition<Row> = {
      accessorKey: 'name',
      columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultVisible },
    };
    const hidden: ColumnDefinition<Row> = {
      accessorKey: 'name',
      columnSettings: { mode: COLUMN_SETTINGS_MODE.Locked },
    };

    expect(isColumnEnabledInitially(defaultVisible)).toBe(true);
    expect(isColumnEnabledInitially(hidden)).toBe(true);
  });

  it('returns false only for defaultHidden mode', () => {
    expect(
      isColumnEnabledInitially<Row>({
        accessorKey: 'name',
        columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultHidden },
      }),
    ).toBe(false);
  });
});
