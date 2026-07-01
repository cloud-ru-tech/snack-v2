import { describe, expect, it } from 'vitest';

import {
  applySelectionDiff,
  checkGroupSelection,
  createHierarchicalSelectionHandlers,
  getNodeSelectionState,
  toggleHierarchicalSelection,
} from '../src/utils/hierarchicalSelection';

const fruitsDescendantIds = ['apple', 'banana', 'citrus', 'orange'];

const fruitsAncestor = {
  id: 'fruits',
  childIds: fruitsDescendantIds,
};

describe('checkGroupSelection', () => {
  it('returns allSelected when every child id is selected', () => {
    expect(checkGroupSelection(['a', 'b'], ['a', 'b'])).toEqual({ someSelected: false, allSelected: true });
  });

  it('returns someSelected when partial overlap', () => {
    expect(checkGroupSelection(['a', 'b'], ['a'])).toEqual({ someSelected: true, allSelected: false });
  });

  it('returns neither when nothing selected', () => {
    expect(checkGroupSelection(['a', 'b'], [])).toEqual({ someSelected: false, allSelected: false });
  });
});

describe('getNodeSelectionState', () => {
  it('with includeParentsInValue=true treats parent as checked when all descendants selected', () => {
    expect(
      getNodeSelectionState({
        nodeId: 'fruits',
        childIds: fruitsDescendantIds,
        selectedIds: fruitsDescendantIds,
        includeParentsInValue: true,
      }),
    ).toEqual({ checked: true, indeterminate: false });
  });

  it('with includeParentsInValue=false checks only children', () => {
    expect(
      getNodeSelectionState({
        nodeId: 'group',
        childIds: ['a', 'b'],
        selectedIds: ['a'],
        includeParentsInValue: false,
      }),
    ).toEqual({ checked: false, indeterminate: true });
  });
});

describe('toggleHierarchicalSelection (includeParentsInValue: true)', () => {
  it('adds leaf id when not selected', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'apple',
        descendantIds: [],
        selectedIds: [],
        includeParentsInValue: true,
      }),
    ).toEqual(['apple']);
  });

  it('removes leaf id when selected', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'apple',
        descendantIds: [],
        selectedIds: ['apple'],
        includeParentsInValue: true,
      }),
    ).toEqual([]);
  });

  it('adds node and descendants when parent toggled on', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'fruits',
        descendantIds: fruitsDescendantIds,
        selectedIds: [],
        includeParentsInValue: true,
      }).sort(),
    ).toEqual(['apple', 'banana', 'citrus', 'fruits', 'orange']);
  });

  it('removes node and descendants when parent toggled off', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'fruits',
        descendantIds: fruitsDescendantIds,
        selectedIds: ['apple', 'banana', 'citrus', 'orange', 'fruits', 'bread'],
        includeParentsInValue: true,
      }).sort(),
    ).toEqual(['bread']);
  });

  it('promotes parent when all siblings selected', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'banana',
        descendantIds: [],
        selectedIds: ['apple', 'citrus', 'orange'],
        ancestors: [fruitsAncestor],
        includeParentsInValue: true,
      }),
    ).toEqual(expect.arrayContaining(['banana', 'fruits']));
  });

  it('removes parent id when child toggled off and siblings no longer all selected', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'apple',
        descendantIds: [],
        selectedIds: ['apple', 'banana', 'citrus', 'orange', 'fruits'],
        ancestors: [fruitsAncestor],
        includeParentsInValue: true,
      }),
    ).toEqual(['banana', 'citrus', 'orange']);
  });
});

describe('toggleHierarchicalSelection (includeParentsInValue: false)', () => {
  it('adds only selectable descendants on parent toggle', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'group',
        descendantIds: ['a', 'b', 'c'],
        selectableDescendantIds: ['a', 'b'],
        childIds: ['a', 'b', 'c'],
        selectedIds: [],
        includeParentsInValue: false,
      }).sort(),
    ).toEqual(['a', 'b']);
  });

  it('removes parent id and selectable descendants on parent toggle off', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'group',
        descendantIds: ['a', 'b', 'c'],
        selectableDescendantIds: ['a', 'b'],
        childIds: ['a', 'b', 'c'],
        selectedIds: ['group', 'a', 'b'],
        includeParentsInValue: false,
      }).sort(),
    ).toEqual([]);
  });

  it('deselects when all enabled children are selected even if disabled child is missing', () => {
    expect(
      toggleHierarchicalSelection({
        nodeId: 'group',
        descendantIds: ['a', 'b', 'c'],
        selectableDescendantIds: ['a', 'b'],
        childIds: ['a', 'b', 'c'],
        selectedIds: ['a', 'b'],
        includeParentsInValue: false,
      }),
    ).toEqual([]);
  });
});

describe('applySelectionDiff', () => {
  it('adds and removes ids', () => {
    expect(applySelectionDiff(['a', 'b'], ['c'], ['a'])).toEqual(['b', 'c']);
  });
});

describe('createHierarchicalSelectionHandlers', () => {
  it('applies includeParentsInValue to getSelectionState and toggleSelection', () => {
    const withParents = createHierarchicalSelectionHandlers({ includeParentsInValue: true });
    const withoutParents = createHierarchicalSelectionHandlers({ includeParentsInValue: false });

    expect(
      withParents.getSelectionState({
        nodeId: 'group',
        childIds: ['a', 'b'],
        selectedIds: ['a', 'b'],
      }),
    ).toEqual({ checked: true, indeterminate: false });

    expect(
      withoutParents.getSelectionState({
        nodeId: 'group',
        childIds: ['a', 'b'],
        selectedIds: ['a', 'b'],
      }),
    ).toEqual({ checked: true, indeterminate: false });

    expect(
      withoutParents.toggleSelection({
        nodeId: 'group',
        descendantIds: ['a', 'b'],
        selectedIds: [],
      }),
    ).toEqual(['a', 'b']);

    expect(
      withParents.toggleSelection({
        nodeId: 'group',
        descendantIds: ['a', 'b'],
        selectedIds: [],
      }),
    ).toEqual(['group', 'a', 'b']);
  });
});
