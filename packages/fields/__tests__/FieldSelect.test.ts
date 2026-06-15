import { describe, expect, it } from 'vitest';

import { SELECTION_MODE } from '../src/components/FieldSelect/constants';
import { FieldSelectProps } from '../src/components/FieldSelect/types';
import {
  extractAppearance,
  extractLabel,
  extractSearchText,
  filterItems,
  findItem,
  flatten,
  isFuzzyMatch,
  isMultiple,
  TAG_SIZE_MAP,
  WithIdContent,
} from '../src/components/FieldSelect/utils';

describe('TAG_SIZE_MAP', () => {
  it('maps field size to tag size (s→xs, m→xs, l→s)', () => {
    expect(TAG_SIZE_MAP).toEqual({ s: 'xs', m: 'xs', l: 's' });
  });
});

describe('extractLabel', () => {
  it('returns id when content is empty', () => {
    expect(extractLabel({ id: 'x' })).toBe('x');
    expect(extractLabel({ id: 42 })).toBe('42');
  });

  it('returns empty string when no id and no content', () => {
    expect(extractLabel({})).toBe('');
  });

  it('stringifies primitive content', () => {
    expect(extractLabel({ id: 'a', content: 'Alpha' })).toBe('Alpha');
    expect(extractLabel({ id: 'a', content: 7 })).toBe('7');
  });

  it('reads option field from object content', () => {
    expect(extractLabel({ id: 'a', content: { option: 'Large' } })).toBe('Large');
    expect(extractLabel({ id: 'a', content: { option: 3 } })).toBe('3');
  });

  it('falls back to id when object content has no option', () => {
    expect(extractLabel({ id: 'fallback', content: { caption: 'c' } })).toBe('fallback');
  });
});

describe('extractSearchText', () => {
  it('joins label + caption + description', () => {
    const item: WithIdContent = { id: 'a', content: { option: 'Small', caption: 'cheap', description: 'entry tier' } };
    expect(extractSearchText(item)).toBe('Small cheap entry tier');
  });

  it('omits non-string caption/description', () => {
    const item: WithIdContent = { id: 'a', content: { option: 'Small', caption: 5, description: null } };
    expect(extractSearchText(item)).toBe('Small');
  });

  it('returns only label when content is primitive', () => {
    expect(extractSearchText({ id: 'a', content: 'Plain' })).toBe('Plain');
  });
});

describe('extractAppearance', () => {
  it('returns string appearance', () => {
    expect(extractAppearance({ appearance: 'critical' })).toBe('critical');
  });

  it('returns undefined for missing or non-string appearance', () => {
    expect(extractAppearance(undefined)).toBeUndefined();
    expect(extractAppearance({})).toBeUndefined();
    expect(extractAppearance({ appearance: 123 })).toBeUndefined();
  });
});

describe('flatten', () => {
  it('flattens nested item groups depth-first', () => {
    const items = [
      { id: 'a', content: 'A' },
      {
        id: 'g',
        content: 'G',
        items: [
          { id: 'b', content: 'B' },
          { id: 'c', content: 'C' },
        ],
      },
    ] as unknown as Parameters<typeof flatten>[0];
    expect(flatten(items).map(i => i.id)).toEqual(['a', 'g', 'b', 'c']);
  });

  it('returns flat list unchanged when there are no nested items', () => {
    const items = [{ id: 'a' }, { id: 'b' }] as unknown as Parameters<typeof flatten>[0];
    expect(flatten(items).map(i => i.id)).toEqual(['a', 'b']);
  });
});

describe('findItem', () => {
  const items = [
    { id: 'a', content: 'A' },
    { id: 'g', content: 'G', items: [{ id: 'nested', content: 'Nested' }] },
  ] as unknown as Parameters<typeof findItem>[0];

  it('finds a top-level item', () => {
    expect(findItem(items, 'a')?.id).toBe('a');
  });

  it('finds a nested item', () => {
    expect(findItem(items, 'nested')?.id).toBe('nested');
  });

  it('returns undefined when missing', () => {
    expect(findItem(items, 'zzz')).toBeUndefined();
  });
});

describe('isFuzzyMatch', () => {
  it('matches subsequence in order', () => {
    expect(isFuzzyMatch('large', 'lge')).toBe(true);
    expect(isFuzzyMatch('large', 'lrg')).toBe(true);
  });

  it('rejects out-of-order or absent characters', () => {
    expect(isFuzzyMatch('large', 'gl')).toBe(false);
    expect(isFuzzyMatch('large', 'xyz')).toBe(false);
  });

  it('matches empty needle', () => {
    expect(isFuzzyMatch('anything', '')).toBe(true);
  });
});

describe('filterItems', () => {
  const items = [
    { id: 's', content: { option: 'Small' } },
    { id: 'm', content: { option: 'Medium' } },
    { id: 'l', content: { option: 'Large' } },
  ] as unknown as Parameters<typeof filterItems>[0];

  it('returns all items for empty query', () => {
    expect(filterItems(items, '', true)).toHaveLength(3);
  });

  it('substring-filters when fuzzy=false', () => {
    expect(filterItems(items, 'med', false).map(i => i.id)).toEqual(['m']);
    expect(filterItems(items, 'lge', false)).toHaveLength(0);
  });

  it('fuzzy-filters when fuzzy=true', () => {
    expect(filterItems(items, 'lge', true).map(i => i.id)).toEqual(['l']);
  });

  it('keeps a group when a child matches and prunes empty groups', () => {
    const grouped = [
      {
        id: 'g',
        content: { option: 'Group' },
        items: [
          { id: 'gs', content: { option: 'Small' } },
          { id: 'gl', content: { option: 'Large' } },
        ],
      },
      { id: 'top', content: { option: 'Topmost' } },
    ] as unknown as Parameters<typeof filterItems>[0];

    const result = filterItems(grouped, 'small', false);
    expect(result).toHaveLength(1);
    const group = result[0] as unknown as { id: string; items: { id: string }[] };
    expect(group.id).toBe('g');
    expect(group.items.map(i => i.id)).toEqual(['gs']);
  });
});

describe('isMultiple', () => {
  it('returns true for multiple selection', () => {
    expect(isMultiple({ selection: SELECTION_MODE.Multiple, items: [] } as FieldSelectProps)).toBe(true);
  });

  it('returns false for single (default) selection', () => {
    expect(isMultiple({ selection: SELECTION_MODE.Single, items: [] } as FieldSelectProps)).toBe(false);
    expect(isMultiple({ items: [] } as FieldSelectProps)).toBe(false);
  });
});
