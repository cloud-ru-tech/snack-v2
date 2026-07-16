import { describe, expect, it } from 'vitest';

import { isColumnVisibilityConfigurable } from '../src/components/Table/hooks/useColumnSettings/utils/isColumnVisibilityConfigurable';
import { COLUMN_SETTINGS_MODE } from '../src/constants';

type Row = { name: string };

describe('isColumnVisibilityConfigurable', () => {
  it('returns true for a column without columnSettings', () => {
    expect(isColumnVisibilityConfigurable<Row>({ accessorKey: 'name' })).toBe(true);
  });

  it('returns true when columnSettings is explicitly undefined', () => {
    expect(isColumnVisibilityConfigurable<Row>({ accessorKey: 'name', columnSettings: undefined })).toBe(true);
  });

  it('returns true for empty columnSettings (mode is not set)', () => {
    expect(isColumnVisibilityConfigurable<Row>({ accessorKey: 'name', columnSettings: {} })).toBe(true);
  });

  it('returns false for hidden mode', () => {
    expect(
      isColumnVisibilityConfigurable<Row>({
        accessorKey: 'name',
        columnSettings: { mode: COLUMN_SETTINGS_MODE.Locked },
      }),
    ).toBe(false);
  });

  it('returns true for defaultVisible and defaultHidden modes', () => {
    expect(
      isColumnVisibilityConfigurable<Row>({
        accessorKey: 'name',
        columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultVisible },
      }),
    ).toBe(true);
    expect(
      isColumnVisibilityConfigurable<Row>({
        accessorKey: 'name',
        columnSettings: { mode: COLUMN_SETTINGS_MODE.DefaultHidden },
      }),
    ).toBe(true);
  });
});
