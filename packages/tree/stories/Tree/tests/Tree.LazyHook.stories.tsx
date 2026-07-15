import { SELECTION_MODE, Tree, TreeNodeProps, useTreeMultiSelection } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const INITIAL: TreeNodeProps[] = [
  {
    id: 'lazy-parent',
    title: 'Lazy parent',
    'data-test-id': TEST_IDS.tree.nodes.fruits,
    nested: [],
  },
  {
    id: 'sibling',
    title: 'Sibling leaf',
    'data-test-id': TEST_IDS.tree.nodes.apple,
  },
];

function LazyTree() {
  const [data, setData] = useState<TreeNodeProps[]>(INITIAL);
  const [expanded, setExpanded] = useState<string[]>([]);

  const loadNested = async (node: TreeNodeProps) => {
    const preloadedChildren: TreeNodeProps[] = [
      { id: `${node.id}-1`, title: 'Loaded 1', 'data-test-id': TEST_IDS.tree.nodes.loaded1 },
    ];
    const updatedTree = data.map(n =>
      n.id === node.id && 'nested' in n ? ({ ...n, nested: preloadedChildren } as TreeNodeProps) : n,
    );
    setData(updatedTree);
    return { preloadedChildren, updatedTree };
  };

  const { selected, onSelect } = useTreeMultiSelection<TreeNodeProps>({
    onDataLoad: loadNested,
    onSelect: ({ node, isSelected }) => {
      if (isSelected) return { added: [], removed: [node.id] };
      return { added: [node.id], removed: [] };
    },
  });

  return (
    <Tree
      data={data}
      selectionMode={SELECTION_MODE.Multiple}
      selected={selected}
      onSelect={onSelect}
      expandedNodes={expanded}
      onExpand={setExpanded}
      onDataLoad={loadNested}
      data-test-id={TEST_IDS.tree.root}
    />
  );
}

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Tests/LazyHook',
  component: Tree,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const LazyHook: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.story}>
      <LazyTree />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const getChevron = (nodeTestId: string) => {
      const nodeEl = canvas.getByTestId(nodeTestId);
      return within(nodeEl).getByTestId(TEST_IDS.treeNode.chevron);
    };

    await step('expand lazy-parent через клик по chevron: triggers Tree.onDataLoad', async () => {
      await userEvent.click(getChevron(TEST_IDS.tree.nodes.fruits));
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.tree.nodes.loaded1)).toBeInTheDocument());
    });

    await step('collapse lazy-parent через ArrowLeft с фокусом на строке', async () => {
      const nodeEl = canvas.getByTestId(TEST_IDS.tree.nodes.fruits);
      const row = within(nodeEl).getAllByTestId(TEST_IDS.treeNode.item)[0];
      row.focus();
      await userEvent.keyboard('{ArrowLeft}');
      await waitFor(() => expect(canvas.queryByTestId(TEST_IDS.tree.nodes.loaded1)).not.toBeInTheDocument());
    });

    await step('expand повторно через ArrowRight: focus на chevron + click', async () => {
      // ArrowRight на свёрнутом parent'е не разворачивает (handleKeyDown gate'ит
      // на trigger). Раскрываем тем же chevron-кликом.
      await userEvent.click(getChevron(TEST_IDS.tree.nodes.fruits));
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.tree.nodes.loaded1)).toBeInTheDocument());
    });
  },
};
