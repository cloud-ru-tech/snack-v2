import { createHierarchicalSelectionHandlers } from '@ds/utils';
import { describe, expect, it } from 'vitest';

import {
  checkNestedNodesSelection,
  collectEmptyNestedNodesInExpanded,
  collectIds,
  extractTreeNodeTitle,
  findAllChildNodeIds,
  findAllExpandedChildNodeIds,
  getSearchedTreeItems,
  getSearchedTreeNodeById,
  lookupTreeForSelectedNodes,
  sortTreeItemsByTitle,
  traverse,
  traverseWithTarget,
  updateTreeNode,
} from '../src/helpers';
import { TreeNodeProps } from '../src/types';

const tree: TreeNodeProps[] = [
  {
    id: 'fruits',
    title: 'Fruits',
    nested: [
      { id: 'apple', title: 'Apple' },
      { id: 'banana', title: 'Banana' },
      { id: 'citrus', title: 'Citrus', nested: [{ id: 'orange', title: 'Orange' }] },
    ],
  },
  { id: 'bread', title: 'Bread' },
];

describe('extractTreeNodeTitle', () => {
  it('returns string title as-is', () => {
    expect(extractTreeNodeTitle({ id: 'a', title: 'Apple' })).toBe('Apple');
  });

  it('uses getTitle() when title is not a string', () => {
    const node = { id: 'a', title: () => 'fn-title', getTitle: () => 'getTitle' } as never;
    expect(extractTreeNodeTitle(node)).toBe('getTitle');
  });

  it('returns empty string when title is function and getTitle is absent', () => {
    const node = { id: 'a', title: () => 'fn-title' } as never;
    expect(extractTreeNodeTitle(node)).toBe('');
  });
});

describe('sortTreeItemsByTitle', () => {
  const items: TreeNodeProps[] = [
    { id: '1', title: 'banana' },
    { id: '2', title: 'Apple' },
    { id: '3', title: 'cherry' },
  ];

  it('sorts case-sensitive by default (uppercase first)', () => {
    expect(sortTreeItemsByTitle(items).map(i => i.id)).toEqual(['2', '1', '3']);
  });

  it('sorts case-insensitive when caseSensitive=false', () => {
    expect(sortTreeItemsByTitle(items, { caseSensitive: false }).map(i => i.id)).toEqual(['2', '1', '3']);
  });

  it('respects explicit caseSensitive=true', () => {
    expect(sortTreeItemsByTitle(items, { caseSensitive: true }).map(i => i.id)).toEqual(['2', '1', '3']);
  });

  it('returns falsy input as-is', () => {
    expect(sortTreeItemsByTitle(undefined as never)).toBeUndefined();
  });

  it('does not mutate input', () => {
    const original = [...items];
    sortTreeItemsByTitle(items);
    expect(items).toEqual(original);
  });
});

describe('findAllChildNodeIds', () => {
  it('collects all non-disabled ids', () => {
    expect(findAllChildNodeIds(tree).sort()).toEqual(['apple', 'banana', 'bread', 'citrus', 'fruits', 'orange']);
  });

  it('skips disabled nodes and their subtrees', () => {
    const t: TreeNodeProps[] = [
      { id: 'a', title: 'a', disabled: true, nested: [{ id: 'a1', title: 'a1' }] },
      { id: 'b', title: 'b' },
    ];
    expect(findAllChildNodeIds(t)).toEqual(['b']);
  });

  it('handles empty nested array', () => {
    expect(findAllChildNodeIds([{ id: 'x', title: 'x', nested: [] }])).toEqual(['x']);
  });
});

describe('findAllExpandedChildNodeIds', () => {
  it('descends only into expanded nodes', () => {
    expect(findAllExpandedChildNodeIds(tree, ['fruits'])).toEqual(['fruits', 'apple', 'banana', 'citrus', 'bread']);
  });

  it('returns only root ids when nothing expanded', () => {
    expect(findAllExpandedChildNodeIds(tree, [])).toEqual(['fruits', 'bread']);
  });

  it('descends through nested expanded chain', () => {
    expect(findAllExpandedChildNodeIds(tree, ['fruits', 'citrus'])).toEqual([
      'fruits',
      'apple',
      'banana',
      'citrus',
      'orange',
      'bread',
    ]);
  });
});

describe('collectIds', () => {
  it('returns all ids in BFS order', () => {
    expect(collectIds(tree)).toEqual(['fruits', 'bread', 'apple', 'banana', 'citrus', 'orange']);
  });

  it('returns empty array for empty tree', () => {
    expect(collectIds([])).toEqual([]);
  });
});

describe('collectEmptyNestedNodesInExpanded', () => {
  it('returns nodes with empty nested[] that are expanded', () => {
    const t: TreeNodeProps[] = [
      { id: 'a', title: 'a', nested: [] },
      { id: 'b', title: 'b', nested: [{ id: 'b1', title: 'b1' }] },
      { id: 'c', title: 'c', nested: [] },
    ];
    const result = collectEmptyNestedNodesInExpanded(t, new Set(['a', 'b']));
    expect(result.map(n => n.id)).toEqual(['a']);
  });

  it('ignores leaf nodes (no nested array)', () => {
    expect(collectEmptyNestedNodesInExpanded([{ id: 'a', title: 'a' }], new Set(['a']))).toEqual([]);
  });
});

describe('checkNestedNodesSelection', () => {
  const nested: TreeNodeProps[] = [
    { id: 'a', title: 'a' },
    { id: 'b', title: 'b' },
  ];

  it('returns allSelected when every nested id is selected', () => {
    expect(checkNestedNodesSelection(nested, ['a', 'b'])).toEqual({ someSelected: false, allSelected: true });
  });

  it('returns someSelected when partial overlap', () => {
    expect(checkNestedNodesSelection(nested, ['a'])).toEqual({ someSelected: true, allSelected: false });
  });

  it('returns neither when nothing selected', () => {
    expect(checkNestedNodesSelection(nested, [])).toEqual({ someSelected: false, allSelected: false });
  });

  it('respects disabled children (excluded from allIds)', () => {
    const t: TreeNodeProps[] = [
      { id: 'a', title: 'a' },
      { id: 'b', title: 'b', disabled: true },
    ];
    expect(checkNestedNodesSelection(t, ['a'])).toEqual({ someSelected: false, allSelected: true });
  });
});

describe('lookupTreeForSelectedNodes', () => {
  const { toggleSelection } = createHierarchicalSelectionHandlers({ includeParentsInValue: true });

  it('adds leaf id when not selected', () => {
    expect(
      lookupTreeForSelectedNodes({
        node: { id: 'apple', nested: undefined },
        selectedNodes: [],
        toggleSelection,
      }),
    ).toEqual(['apple']);
  });

  it('removes leaf id when selected', () => {
    expect(
      lookupTreeForSelectedNodes({
        node: { id: 'apple', nested: undefined },
        selectedNodes: ['apple'],
        toggleSelection,
      }),
    ).toEqual([]);
  });

  it('adds node + all descendants when parent toggled on', () => {
    const parent = tree[0];
    const result = lookupTreeForSelectedNodes({
      node: { id: parent.id, nested: parent.nested },
      selectedNodes: [],
      toggleSelection,
    });
    expect(result.sort()).toEqual(['apple', 'banana', 'citrus', 'fruits', 'orange']);
  });

  it('removes node + all descendants when parent toggled off', () => {
    const parent = tree[0];
    const result = lookupTreeForSelectedNodes({
      node: { id: parent.id, nested: parent.nested },
      selectedNodes: ['apple', 'banana', 'citrus', 'orange', 'fruits', 'bread'],
      toggleSelection,
    });
    expect(result.sort()).toEqual(['bread']);
  });

  it('promotes parent into selected when all siblings selected (deselecting parent stays consistent)', () => {
    const grandParent = { id: 'fruits', nested: tree[0].nested };
    const parentNode = { id: 'fruits', nested: tree[0].nested } as never;
    const result = lookupTreeForSelectedNodes({
      node: { id: 'banana', nested: undefined },
      selectedNodes: ['apple', 'citrus', 'orange'],
      parentNode: parentNode,
      toggleSelection,
    });
    expect(result).toContain('banana');
    expect(result).toContain('fruits');
    expect(grandParent.id).toBe('fruits');
  });

  it('removes parent id when child toggled off and siblings no longer all selected', () => {
    const parentNode = { id: 'fruits', nested: tree[0].nested } as never;
    const result = lookupTreeForSelectedNodes({
      node: { id: 'apple', nested: undefined },
      selectedNodes: ['apple', 'banana', 'citrus', 'orange', 'fruits'],
      parentNode,
      toggleSelection,
    });
    expect(result).not.toContain('apple');
    expect(result).not.toContain('fruits');
  });
});

describe('traverse', () => {
  it('visits every node with correct depth', () => {
    const visited: Array<[string, number]> = [];
    traverse(tree, (node, depth) => visited.push([node.id, depth]));
    expect(visited).toEqual([
      ['fruits', 0],
      ['bread', 0],
      ['apple', 1],
      ['banana', 1],
      ['citrus', 1],
      ['orange', 2],
    ]);
  });
});

describe('traverseWithTarget', () => {
  it('builds parallel tree, descending only when callback returns a list', () => {
    type Cloned = TreeNodeProps & { _visited?: boolean };
    const result: Cloned[] = [];
    traverseWithTarget<Cloned>(tree, result, (node, _depth, target) => {
      const next: Cloned = { ...node, _visited: true, nested: undefined };
      target.push(next);
      return node.nested?.length ? (next.nested = [] as never) : undefined;
    });

    expect(result.map(n => n.id)).toEqual(['fruits', 'bread']);
    expect(result[0].nested?.map((c: TreeNodeProps) => c.id)).toEqual(['apple', 'banana', 'citrus']);
  });

  it('skips descent when callback returns undefined', () => {
    const result: TreeNodeProps[] = [];
    let calls = 0;
    traverseWithTarget(tree, result, () => {
      calls++;
      return undefined;
    });
    expect(calls).toBe(2);
  });
});

describe('updateTreeNode', () => {
  it('replaces fields on a matching node', () => {
    const next = updateTreeNode(tree, 'apple', { title: 'Apple v2' });
    const apple = next[0].nested?.find(n => n.id === 'apple');
    expect(apple?.title).toBe('Apple v2');
  });

  it('replaces nested when provided', () => {
    const next = updateTreeNode(tree, 'fruits', { nested: [{ id: 'kiwi', title: 'Kiwi' }] });
    expect(next[0].nested).toEqual([{ id: 'kiwi', title: 'Kiwi' }]);
  });

  it('returns a new tree (does not mutate input)', () => {
    const next = updateTreeNode(tree, 'apple', { title: 'X' });
    expect(next).not.toBe(tree);
    expect(tree[0].nested?.[0].title).toBe('Apple');
  });

  it('preserves untouched branches and ids', () => {
    const next = updateTreeNode(tree, 'orange', { title: 'Orange v2' });
    expect(next[1]).toEqual(tree[1]);
    const orange = next[0].nested?.find(n => n.id === 'citrus')?.nested?.[0];
    expect(orange?.title).toBe('Orange v2');
  });
});

describe('getSearchedTreeNodeById', () => {
  it('returns null when id is empty string', () => {
    expect(getSearchedTreeNodeById({ tree, searchOptions: { id: '' } })).toBeNull();
  });

  it('returns [] when id is empty array', () => {
    expect(getSearchedTreeNodeById({ tree, searchOptions: { id: [] } })).toEqual([]);
  });

  it('returns single node by string id', () => {
    const node = getSearchedTreeNodeById({ tree, searchOptions: { id: 'apple' } });
    expect(node?.id).toBe('apple');
  });

  it('returns null when not found', () => {
    expect(getSearchedTreeNodeById({ tree, searchOptions: { id: 'xxx' } })).toBeNull();
  });

  it('returns array of nodes by id list', () => {
    const nodes = getSearchedTreeNodeById({ tree, searchOptions: { id: ['apple', 'orange'] } });
    expect(nodes.map(n => n.id).sort()).toEqual(['apple', 'orange']);
  });

  it('strips nested when includeNested=false', () => {
    const node = getSearchedTreeNodeById({ tree, searchOptions: { id: 'fruits', includeNested: false } });
    expect(node?.nested).toBeUndefined();
  });

  it('keeps nested by default', () => {
    const node = getSearchedTreeNodeById({ tree, searchOptions: { id: 'fruits' } });
    expect(node?.nested?.length).toBe(3);
  });
});

describe('getSearchedTreeItems', () => {
  it('returns tree as-is when no query', () => {
    expect(getSearchedTreeItems({ tree })).toBe(tree);
  });

  it('returns matching nodes with full hierarchy path', () => {
    const result = getSearchedTreeItems({ tree, searchOptions: { query: 'orange' } });
    expect(result[0].id).toBe('fruits');
    expect(result[0].nested?.[0].id).toBe('citrus');
    expect((result[0].nested?.[0] as TreeNodeProps).nested?.[0].id).toBe('orange');
  });

  it('matches case-insensitively', () => {
    const result = getSearchedTreeItems({ tree, searchOptions: { query: 'APPLE' } });
    expect(result[0].nested?.[0].id).toBe('apple');
  });

  it('returns empty list when nothing matches', () => {
    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'zzz' } })).toEqual([]);
  });

  it('includes all children when includeChildrenMatchedParent and parent matches', () => {
    const result = getSearchedTreeItems({
      tree,
      searchOptions: { query: 'fruits', includeChildrenMatchedParent: true },
    });
    expect(result[0].nested?.length).toBe(3);
  });

  it('drops nested when parent matches but no descendants do (no includeChildrenMatchedParent)', () => {
    const result = getSearchedTreeItems({ tree, searchOptions: { query: 'bread' } });
    expect(result[0].id).toBe('bread');
    expect(result[0].nested).toBeUndefined();
  });
});

describe('sortTreeItemsByTitle with function-based title', () => {
  it('falls back to getTitle when title is a function', () => {
    const items = [
      { id: '1', title: (() => 'never') as never, getTitle: () => 'Zebra' },
      { id: '2', title: 'Apple' },
    ] as unknown as TreeNodeProps[];
    expect(sortTreeItemsByTitle(items as never).map(i => i.id)).toEqual(['2', '1']);
  });
});
