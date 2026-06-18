import { describe, expect, it } from 'vitest';

import { getColumnStyleVars } from '../src/components/Table/utils/getColumnStyleVars';

describe('getColumnStyleVars', () => {
  it('builds CSS custom property names from the column id', () => {
    expect(getColumnStyleVars('name')).toEqual({
      sizeKey: '--table-column-name-size',
      flexKey: '--table-column-name-flex',
    });
  });

  it('embeds the id verbatim (including service column ids)', () => {
    expect(getColumnStyleVars('snack_predefined_TreeColumn')).toEqual({
      sizeKey: '--table-column-snack_predefined_TreeColumn-size',
      flexKey: '--table-column-snack_predefined_TreeColumn-flex',
    });
  });
});
