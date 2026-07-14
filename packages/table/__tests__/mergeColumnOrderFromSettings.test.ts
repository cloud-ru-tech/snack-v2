import { describe, expect, it } from 'vitest';

import { mergeColumnOrderFromSettings } from '../src/components/Table/hooks/useColumnSettings/utils/mergeColumnOrderFromSettings';

describe('mergeColumnOrderFromSettings', () => {
  it('reorders only settings columns and keeps non-settings slots', () => {
    expect(
      mergeColumnOrderFromSettings(['name', 'email', 'amount', 'department', 'team'], ['department', 'email', 'team']),
    ).toEqual(['name', 'department', 'amount', 'email', 'team']);
  });

  it('returns the same array shape when settings order is unchanged', () => {
    const order = ['name', 'email', 'department'];

    expect(mergeColumnOrderFromSettings(order, ['email', 'department'])).toEqual(order);
  });

  it('ignores settings ids that are missing from columnOrder', () => {
    expect(mergeColumnOrderFromSettings(['name', 'email'], ['email', 'ghost'])).toEqual(['name', 'email']);
  });
});
