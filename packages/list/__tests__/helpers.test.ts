import { describe, expect, it } from 'vitest';

import { ITEM_PREFIXES } from '../src/constants';
import { getDefaultItemId, getFooterItemId, getItemAutoId } from '../src/utils';

describe('list helpers', () => {
  it('getFooterItemId prefixes with footer', () => {
    expect(getFooterItemId('x')).toBe(`${ITEM_PREFIXES.footer}__x`);
    expect(getFooterItemId(0)).toBe(`${ITEM_PREFIXES.footer}__0`);
  });

  it('getItemAutoId joins prefix and id with dash', () => {
    expect(getItemAutoId('p', 'id')).toBe('p-id');
    expect(getItemAutoId(1, 2)).toBe('1-2');
  });

  it('getDefaultItemId uses default prefix', () => {
    expect(getDefaultItemId('id')).toBe(`${ITEM_PREFIXES.default}-id`);
  });
});
