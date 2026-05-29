import { Search, TEST_IDS as SEARCH_TEST_IDS } from '@ds/search';
import {
  collectIds,
  getSearchedTreeItems,
  getSearchedTreeNodeById,
  sortTreeItemsByTitle,
  traverseWithTarget,
  Tree,
  TreeNodeProps,
} from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const DATA: TreeNodeProps[] = [
  {
    id: 'compute',
    title: 'Compute',
    nested: [
      { id: 'vm', title: 'Virtual machines', 'data-test-id': TEST_IDS.tree.nodes.vm },
      { id: 'k8s', title: 'Kubernetes', 'data-test-id': TEST_IDS.tree.nodes.k8s },
    ],
  },
  {
    id: 'storage',
    title: 'Storage',
    nested: [
      { id: 's3', title: 'Object storage', 'data-test-id': TEST_IDS.tree.nodes.s3 },
      { id: 'block', title: 'Block storage', 'data-test-id': TEST_IDS.tree.nodes.block },
    ],
  },
];

function LocalSearchTree() {
  const [query, setQuery] = useState('');

  const filteredTree = useMemo(() => {
    // Фильтруем дерево по поисковой строке.
    const searched = getSearchedTreeItems({ tree: DATA, searchOptions: { query } });
    // Сортируем верхний уровень для стабильного порядка.
    const sorted = sortTreeItemsByTitle(searched, { caseSensitive: false });
    // Маркируем найденные узлы через traverseWithTarget (демонстрация BFS-обхода).
    const markedTree: TreeNodeProps[] = [];
    traverseWithTarget<TreeNodeProps>(sorted, markedTree, (node, _depth, target) => {
      const copy: TreeNodeProps = {
        ...node,
        title: query && node.id.includes(query.toLowerCase()) ? `★ ${node.title}` : node.title,
      } as TreeNodeProps;
      if ('nested' in node && node.nested) {
        copy.nested = [];
        target.push(copy);
        return copy.nested;
      }
      target.push(copy);
      return undefined;
    });
    return markedTree;
  }, [query]);

  // Раскрываем все найденные узлы.
  const expanded = useMemo(() => collectIds(filteredTree), [filteredTree]);

  // Подсветка одного конкретного узла (id='vm') — упражняет одиночный поиск.
  const vmHit = useMemo(
    () => getSearchedTreeNodeById({ tree: filteredTree, searchOptions: { id: 'vm' } }),
    [filteredTree],
  );

  return (
    <div>
      <Search value={query} onChange={setQuery} placeholder='Filter…' data-test-id={TEST_IDS.tree.search} />
      <Tree data={filteredTree} expandedNodes={expanded} data-test-id={TEST_IDS.tree.root} showLines />
      <div data-test-id={TEST_IDS.tree.vmHit}>{vmHit ? 'vm: hit' : 'vm: miss'}</div>
    </div>
  );
}

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Examples/LocalSearch',
  component: Tree,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const LocalSearch: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.story}>
      <LocalSearchTree />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('type → triggers local filter + expand all matched', async () => {
      const input = canvas.getByTestId(SEARCH_TEST_IDS.input);
      await userEvent.type(input, 'storage');
      await waitFor(() => {
        expect(canvas.queryByTestId(TEST_IDS.tree.vmHit)).toHaveTextContent('vm: miss');
      });
    });

    await step('clear → restores full tree + vm hit', async () => {
      const input = canvas.getByTestId(SEARCH_TEST_IDS.input);
      await userEvent.clear(input);
      await waitFor(() => {
        expect(canvas.queryByTestId(TEST_IDS.tree.vmHit)).toHaveTextContent('vm: hit');
      });
    });
  },
};
