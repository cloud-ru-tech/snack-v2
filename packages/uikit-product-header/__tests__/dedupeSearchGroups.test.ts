import { describe, expect, it } from 'vitest';

import { InnerLink, LinksGroup } from '../src/components/MainMenu/types';
import { dedupeSearchGroups } from '../src/components/MainMenu/utils/dedupeSearchGroups';

const EMPTY_ON_CLICK = () => {};

function createItem(id: string, overrides: Partial<InnerLink> = {}): InnerLink {
  return {
    id,
    label: id,
    onClick: EMPTY_ON_CLICK,
    aliases: [],
    ...overrides,
  };
}

function createGroup(id: string, items: InnerLink[]): LinksGroup {
  return {
    id,
    label: { text: id },
    items,
  };
}

describe('dedupeSearchGroups', () => {
  it('keeps the first occurrence of a duplicated item id and drops it from later groups', () => {
    const simple = createGroup('management', [createItem('costControl'), createItem('tags')]);
    const detailed = createGroup('billingServices', [createItem('costControl', { items: [createItem('agreements')] })]);

    const result = dedupeSearchGroups([simple, detailed]);

    expect(result).toEqual([simple]);
  });

  it('drops a group entirely once all its items were deduped away', () => {
    const simple = createGroup('management', [createItem('costControl')]);
    const detailed = createGroup('billingServices', [createItem('costControl', { items: [createItem('agreements')] })]);

    const result = dedupeSearchGroups([simple, detailed]);

    expect(result.map(group => group.id)).toEqual(['management']);
  });

  it('keeps a nested detailed match untouched when no earlier group claims the same id', () => {
    const detailed = createGroup('billingServices', [createItem('costControl', { items: [createItem('agreements')] })]);

    expect(dedupeSearchGroups([detailed])).toEqual([detailed]);
  });

  it('is a no-op when there are no duplicated item ids', () => {
    const groupA = createGroup('a', [createItem('one')]);
    const groupB = createGroup('b', [createItem('two')]);

    expect(dedupeSearchGroups([groupA, groupB])).toEqual([groupA, groupB]);
  });
});
