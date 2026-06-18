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

  it('returns true for defaultTrue and hidden modes', () => {
    const defaultTrue: ColumnDefinition<Row> = {
      accessorKey: 'name',
      columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultTrue },
    };
    const hidden: ColumnDefinition<Row> = {
      accessorKey: 'name',
      columnSettings: { mode: COLUMN_SETTINGS_MODE.Hidden },
    };

    expect(isColumnEnabledInitially(defaultTrue)).toBe(true);
    expect(isColumnEnabledInitially(hidden)).toBe(true);
  });

  it('returns false only for defaultFalse mode', () => {
    expect(
      isColumnEnabledInitially<Row>({
        accessorKey: 'name',
        columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultFalse },
      }),
    ).toBe(false);
  });
});
