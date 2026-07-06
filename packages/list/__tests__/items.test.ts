import { describe, expect, it } from 'vitest';

import { Item } from '../src/components/Items/types';
import {
  extractActiveItems,
  isAccordionItem,
  isBaseItem,
  isContentItem,
  isGroupItem,
  isGroupSelectItem,
  isNextListItem,
  kindFlattenItems,
} from '../src/components/Items/utils';
import { ITEM_PREFIXES, ITEM_TYPE } from '../src/constants';

describe('Items type guards', () => {
  const baseItem = { id: 'a', content: { option: 'A' } } satisfies Item;
  const accordionItem = { type: ITEM_TYPE.Collapse, items: [baseItem] } as Item;
  const nextListItem = { type: ITEM_TYPE.NextList, items: [baseItem] } as Item;
  const groupItem = { type: ITEM_TYPE.Group, items: [baseItem] } as Item;
  const groupSelectItem = { type: ITEM_TYPE.GroupSelect, items: [baseItem] } as Item;

  it('isBaseItem only matches plain items (no `items` key)', () => {
    expect(isBaseItem(baseItem)).toBe(true);
    expect(isBaseItem(accordionItem)).toBe(false);
    expect(isBaseItem(groupItem)).toBe(false);
  });

  it('discriminates collapse / next-list / group / group-select by `type`', () => {
    expect(isAccordionItem(accordionItem)).toBe(true);
    expect(isAccordionItem(nextListItem)).toBe(false);

    expect(isNextListItem(nextListItem)).toBe(true);
    expect(isNextListItem(accordionItem)).toBe(false);

    expect(isGroupItem(groupItem)).toBe(true);
    expect(isGroupItem(groupSelectItem)).toBe(false);

    expect(isGroupSelectItem(groupSelectItem)).toBe(true);
    expect(isGroupSelectItem(groupItem)).toBe(false);
  });

  it('guards reject null / non-objects without throwing', () => {
    expect(isBaseItem(null)).toBe(false);
    expect(isBaseItem(undefined)).toBe(false);
    expect(isAccordionItem('x')).toBe(false);
    expect(isGroupItem(42)).toBe(false);
  });

  it('isContentItem matches ItemContent shape (has `option`)', () => {
    expect(isContentItem({ option: 'Title' })).toBe(true);
    expect(isContentItem({ caption: 'no option' })).toBe(false);
    expect(isContentItem(null)).toBe(false);
    expect(isContentItem('text')).toBe(false);
  });
});

describe('kindFlattenItems', () => {
  it('flattens a plain list keeping declared ids', () => {
    const items: Item[] = [
      { id: 'a', content: { option: 'A' } },
      { id: 'b', content: { option: 'B' } },
    ];
    const { flattenItems, allChildIds } = kindFlattenItems({ items });

    expect(Object.keys(flattenItems).sort()).toEqual(['a', 'b']);
    expect(allChildIds).toContain('a');
    expect(allChildIds).toContain('b');
  });

  it('skips hidden items', () => {
    const items: Item[] = [
      { id: 'a', content: { option: 'A' } },
      { id: 'b', content: { option: 'B' }, hidden: true },
    ];
    const { flattenItems } = kindFlattenItems({ items });

    expect(flattenItems['a']).toBeDefined();
    expect(flattenItems['b']).toBeUndefined();
  });

  it('flattens nested group children and records allChildIds on the group', () => {
    const items: Item[] = [
      {
        type: ITEM_TYPE.Group,
        label: 'Group',
        items: [
          { id: 'g1', content: { option: 'G1' } },
          { id: 'g2', content: { option: 'G2' } },
        ],
      },
    ];
    const { flattenItems, allChildIds } = kindFlattenItems({ items });

    expect(flattenItems['g1']).toBeDefined();
    expect(flattenItems['g2']).toBeDefined();
    expect(allChildIds).toEqual(expect.arrayContaining(['g1', 'g2']));
  });

  it('builds auto-ids from prefix for items without explicit id', () => {
    const items: Item[] = [{ content: { option: 'No id' } }];
    const { flattenItems } = kindFlattenItems({ items, prefix: ITEM_PREFIXES.default });

    const keys = Object.keys(flattenItems);
    expect(keys).toHaveLength(1);
    expect(keys[0]).toContain(String(ITEM_PREFIXES.default));
  });

  // React key должен следовать за item.id, а не за позицией в дереве: иначе при
  // onItemsReorder инстанс Switch/Checkbox остаётся в слоте и анимирует смену checked.
  it('uses stable item id as React key (not positional autoId)', () => {
    const email: Item = { id: 'email', content: { option: 'Email' }, switch: true };
    const role: Item = { id: 'role', content: { option: 'Role' }, switch: true };
    const { focusFlattenItems, focusCloseChildIds } = kindFlattenItems({
      items: [email, role],
      prefix: ITEM_PREFIXES.default,
      sortable: true,
    });

    expect(focusCloseChildIds).toEqual([`${ITEM_PREFIXES.default}-0`, `${ITEM_PREFIXES.default}-1`]);
    expect(focusCloseChildIds.map(id => focusFlattenItems[id]?.key)).toEqual(['email', 'role']);

    const reordered = kindFlattenItems({
      items: [role, email],
      prefix: ITEM_PREFIXES.default,
      sortable: true,
    });
    expect(reordered.focusCloseChildIds.map(id => reordered.focusFlattenItems[id]?.key)).toEqual(['role', 'email']);
  });
});

describe('extractActiveItems', () => {
  it('collects enabled items and skips the disabled one', () => {
    const items: Item[] = [
      { id: 'a', content: { option: 'A' } },
      { id: 'b', content: { option: 'B' }, disabled: true },
      { id: 'c', content: { option: 'C' } },
    ];
    const { focusFlattenItems, focusCloseChildIds } = kindFlattenItems({ items });

    const { ids } = extractActiveItems({
      focusFlattenItems,
      focusCloseChildIds,
      openCollapseItems: [],
    });

    expect(ids).toHaveLength(2);
    const disabledAutoId = Object.values(focusFlattenItems).find(item => item.originalId === 'b')?.id;
    expect(disabledAutoId).toBeDefined();
    expect(ids).not.toContain(disabledAutoId);
  });

  it('skips an inactive item (drops out of keyboard nav like disabled)', () => {
    const items: Item[] = [
      { id: 'a', content: { option: 'A' } },
      { id: 'b', content: { option: 'B' }, inactive: true },
      { id: 'c', content: { option: 'C' } },
    ];
    const { focusFlattenItems, focusCloseChildIds } = kindFlattenItems({ items });

    const { ids } = extractActiveItems({
      focusFlattenItems,
      focusCloseChildIds,
      openCollapseItems: [],
    });

    expect(ids).toHaveLength(2);
    const inactiveAutoId = Object.values(focusFlattenItems).find(item => item.originalId === 'b')?.id;
    expect(inactiveAutoId).toBeDefined();
    expect(ids).not.toContain(inactiveAutoId);
  });

  it('descends into an open collapse group, ignores a closed one', () => {
    const items: Item[] = [
      {
        id: 'grp',
        type: ITEM_TYPE.Collapse,
        content: { option: 'Group' },
        items: [{ id: 'child', content: { option: 'Child' } }],
      },
    ];
    const { focusFlattenItems, focusCloseChildIds } = kindFlattenItems({ items });

    const closed = extractActiveItems({ focusFlattenItems, focusCloseChildIds, openCollapseItems: [] });
    expect(closed.expandedIds.length).toBeGreaterThan(0);

    const opened = extractActiveItems({
      focusFlattenItems,
      focusCloseChildIds,
      openCollapseItems: ['grp'],
    });
    expect(opened.ids.length).toBeGreaterThan(closed.ids.length);
  });
});
