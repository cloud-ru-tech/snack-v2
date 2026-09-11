import { describe, expect, it } from 'vitest';

import {
  ADD_CUSTOM_OPTION_TRIGGER,
  ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT,
  SELECTION_MODE,
} from '../src/components/FieldSelect/constants';
import { FieldSelectProps } from '../src/components/FieldSelect/types';
import {
  extractAppearance,
  extractLabel,
  extractSearchText,
  filterItems,
  findItem,
  flatten,
  getCustomOptionTriggerByKey,
  getMissingSelectedItems,
  getSelectedIds,
  isCustomOptionBlurInsideField,
  isFuzzyMatch,
  isMultiple,
  resolveAddCustomOptionTriggers,
  shouldCommitCustomOptionOnClose,
  shouldHandleCustomOptionTrigger,
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

  it('reads label field from object content', () => {
    expect(extractLabel({ id: 'a', content: { label: 'Large' } })).toBe('Large');
    expect(extractLabel({ id: 'a', content: { label: 3 } })).toBe('3');
  });

  it('falls back to id when object content has no option', () => {
    expect(extractLabel({ id: 'fallback', content: { caption: 'c' } })).toBe('fallback');
  });
});

describe('extractSearchText', () => {
  it('joins label + caption + description', () => {
    const item: WithIdContent = { id: 'a', content: { label: 'Small', caption: 'cheap', description: 'entry tier' } };
    expect(extractSearchText(item)).toBe('Small cheap entry tier');
  });

  it('omits non-string caption/description', () => {
    const item: WithIdContent = { id: 'a', content: { label: 'Small', caption: 5, description: null } };
    expect(extractSearchText(item)).toBe('Small');
  });

  it('returns only label when content is primitive', () => {
    expect(extractSearchText({ id: 'a', content: 'Plain' })).toBe('Plain');
  });
});

describe('extractAppearance', () => {
  it('returns string appearance', () => {
    expect(extractAppearance({ appearance: 'red' })).toBe('red');
  });

  it('returns undefined for missing or non-string appearance', () => {
    expect(extractAppearance(undefined)).toBeUndefined();
    expect(extractAppearance({})).toBeUndefined();
    // @ts-expect-error test for invalid appearance
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

describe('getMissingSelectedItems', () => {
  const items = [
    { id: 'a', content: { label: 'A' } },
    { id: 'g', content: { label: 'G' }, items: [{ id: 'nested', content: { label: 'Nested' } }] },
  ] as unknown as Parameters<typeof getMissingSelectedItems>[1];

  it('returns placeholder items for selected ids missing from the tree', () => {
    expect(getMissingSelectedItems(['custom', 'a'], items)).toEqual([{ id: 'custom', content: { label: 'custom' } }]);
  });

  it('does not duplicate nested or pin items', () => {
    expect(getMissingSelectedItems(['nested', 'a'], items)).toEqual([]);
  });

  it('skips empty string ids (treated as no value)', () => {
    expect(getMissingSelectedItems([''], items)).toEqual([]);
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
    { id: 's', content: { label: 'Small' } },
    { id: 'm', content: { label: 'Medium' } },
    { id: 'l', content: { label: 'Large' } },
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
        content: { label: 'Group' },
        items: [
          { id: 'gs', content: { label: 'Small' } },
          { id: 'gl', content: { label: 'Large' } },
        ],
      },
      { id: 'top', content: { label: 'Topmost' } },
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

describe('getSelectedIds', () => {
  it('returns the multiple value as-is', () => {
    expect(getSelectedIds({ multiple: true, multipleValue: ['a', 'b'], singleValue: 'x' })).toEqual(['a', 'b']);
  });

  it('wraps a single value and treats undefined as empty', () => {
    expect(getSelectedIds({ multiple: false, multipleValue: ['a'], singleValue: 'x' })).toEqual(['x']);
    expect(getSelectedIds({ multiple: false, multipleValue: [], singleValue: undefined })).toEqual([]);
  });
});

describe('getCustomOptionTriggerByKey', () => {
  it('falls back to event.key when code is empty or unknown', () => {
    expect(getCustomOptionTriggerByKey('Enter')).toBe(ADD_CUSTOM_OPTION_TRIGGER.Enter);
    expect(getCustomOptionTriggerByKey('Unidentified')).toBeUndefined();
    expect(getCustomOptionTriggerByKey(',')).toBe(ADD_CUSTOM_OPTION_TRIGGER.Comma);
  });

  it('returns undefined for unsupported event.key', () => {
    expect(getCustomOptionTriggerByKey('Tab')).toBeUndefined();
    expect(getCustomOptionTriggerByKey('Escape')).toBeUndefined();
  });
});

describe('shouldHandleCustomOptionTrigger', () => {
  it('is true when the trigger is in the available list', () => {
    expect(shouldHandleCustomOptionTrigger(ADD_CUSTOM_OPTION_TRIGGER.Enter, [ADD_CUSTOM_OPTION_TRIGGER.Enter])).toBe(
      true,
    );
  });

  it('is false when the trigger is missing or undefined', () => {
    expect(shouldHandleCustomOptionTrigger(ADD_CUSTOM_OPTION_TRIGGER.Blur, [ADD_CUSTOM_OPTION_TRIGGER.Enter])).toBe(
      false,
    );
    expect(shouldHandleCustomOptionTrigger(undefined, [ADD_CUSTOM_OPTION_TRIGGER.Enter])).toBe(false);
  });
});

describe('resolveAddCustomOptionTriggers', () => {
  it('returns all default triggers when allowCustomOption is true and triggers are omitted', () => {
    expect(
      resolveAddCustomOptionTriggers({
        allowCustomOption: true,
        addCustomOptionTriggers: undefined,
        multiple: true,
      }),
    ).toEqual([...ADD_CUSTOM_OPTION_TRIGGERS_MULTIPLE_DEFAULT]);
  });

  it('returns the provided list when allowCustomOption is true', () => {
    expect(
      resolveAddCustomOptionTriggers({
        allowCustomOption: true,
        addCustomOptionTriggers: [ADD_CUSTOM_OPTION_TRIGGER.Enter],
      }),
    ).toEqual([ADD_CUSTOM_OPTION_TRIGGER.Enter]);
  });

  it('drops triggers that are not allowed in the current selection mode', () => {
    expect(
      resolveAddCustomOptionTriggers({
        allowCustomOption: true,
        addCustomOptionTriggers: [
          ADD_CUSTOM_OPTION_TRIGGER.Enter,
          ADD_CUSTOM_OPTION_TRIGGER.Space,
          ADD_CUSTOM_OPTION_TRIGGER.Comma,
        ],
      }),
    ).toEqual([ADD_CUSTOM_OPTION_TRIGGER.Enter]);
  });

  it('keeps an empty list when the consumer passed no triggers', () => {
    expect(
      resolveAddCustomOptionTriggers({
        allowCustomOption: true,
        addCustomOptionTriggers: [],
        multiple: true,
      }),
    ).toEqual([]);
  });

  it('returns an empty list when custom options are disabled', () => {
    expect(
      resolveAddCustomOptionTriggers({
        allowCustomOption: false,
        addCustomOptionTriggers: undefined,
        multiple: true,
      }),
    ).toEqual([]);
  });
});

describe('isCustomOptionBlurInsideField', () => {
  it('is true when relatedTarget is inside one of the nodes', () => {
    const list = document.createElement('div');
    const item = document.createElement('button');
    list.append(item);
    const clearButton = document.createElement('button');
    const footer = document.createElement('button');
    const nodes = [list, clearButton, footer];

    expect(isCustomOptionBlurInsideField(clearButton, nodes)).toBe(true);
    expect(isCustomOptionBlurInsideField(item, nodes)).toBe(true);
    expect(isCustomOptionBlurInsideField(footer, nodes)).toBe(true);
  });

  it('is false when relatedTarget is null or outside the field', () => {
    expect(isCustomOptionBlurInsideField(null, [document.createElement('div')])).toBe(false);
    expect(
      isCustomOptionBlurInsideField(document.createElement('input'), [
        document.createElement('div'),
        document.createElement('button'),
      ]),
    ).toBe(false);
  });
});

describe('shouldCommitCustomOptionOnClose', () => {
  it('is true only when focus stayed on the input and commit is not skipped', () => {
    const input = document.createElement('input');

    expect(shouldCommitCustomOptionOnClose({ skip: false, inputElement: input, activeElement: input })).toBe(true);
    expect(shouldCommitCustomOptionOnClose({ skip: true, inputElement: input, activeElement: input })).toBe(false);
    expect(
      shouldCommitCustomOptionOnClose({
        skip: false,
        inputElement: input,
        activeElement: document.createElement('button'),
      }),
    ).toBe(false);
    expect(shouldCommitCustomOptionOnClose({ skip: false, inputElement: input, activeElement: null })).toBe(false);
  });
});
