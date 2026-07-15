import { findAllChildNodeIds, SELECTION_MODE, Tree, TreeNodeProps, useTreeMultiSelection } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const DATA: TreeNodeProps[] = [
  {
    id: 'compute',
    title: 'Compute',
    'data-test-id': TEST_IDS.tree.nodes.compute,
    nested: [
      { id: 'vm', title: 'Virtual machines', 'data-test-id': TEST_IDS.tree.nodes.vm },
      { id: 'k8s', title: 'Kubernetes', 'data-test-id': TEST_IDS.tree.nodes.k8s },
    ],
  },
  {
    id: 'storage',
    title: 'Storage',
    'data-test-id': TEST_IDS.tree.nodes.storage,
    nested: [{ id: 's3', title: 'Object storage', 'data-test-id': TEST_IDS.tree.nodes.s3 }],
  },
];

function CascadeTree() {
  const [expanded, setExpanded] = useState<string[]>(['compute', 'storage']);

  const { selected, onSelect } = useTreeMultiSelection({
    onDataLoad: async () => ({ preloadedChildren: [], updatedTree: [], newTreeItemsRecord: {} as never }),
    onSelect: ({ node, isSelected }) => {
      // isSelected — состояние ПОСЛЕ Tree-toggle: true = только что выбрали,
      // false = только что сняли. Каскадируем выбор на детей одновременно с
      // родителем.
      const childIds = 'nested' in node && node.nested ? findAllChildNodeIds(node.nested) : [];
      const ids = [node.id, ...childIds];
      if (isSelected) return { added: ids, removed: [] };
      return { added: [], removed: ids };
    },
  });

  return (
    <Tree
      data={DATA}
      selectionMode={SELECTION_MODE.Multiple}
      selected={selected}
      onSelect={onSelect}
      expandedNodes={expanded}
      onExpand={setExpanded}
      data-test-id={TEST_IDS.tree.root}
      showLines
    />
  );
}

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Examples/MultiSelectCascade',
  component: Tree,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const MultiSelectCascade: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.story}>
      <CascadeTree />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const selectViaSpace = async (nodeTestId: string) => {
      const nodeEl = canvas.getByTestId(nodeTestId);
      const row = within(nodeEl).getAllByTestId(TEST_IDS.treeNode.item)[0];
      row.focus();
      await userEvent.keyboard(' ');
      return row;
    };

    await step('select parent compute → cascade добавляет compute+vm+k8s (allSelected branch)', async () => {
      const row = await selectViaSpace(TEST_IDS.tree.nodes.compute);
      await waitFor(() => {
        expect(row.getAttribute('aria-selected')).toBe('true');
      });
    });

    await step('deselect parent compute → cascade удаляет всех (isSelected→remove branch)', async () => {
      const row = await selectViaSpace(TEST_IDS.tree.nodes.compute);
      await waitFor(() => {
        expect(row.getAttribute('aria-selected')).toBe('false');
      });
    });

    await step('select только vm (child) → parent compute остаётся не выбранным (someSelected branch)', async () => {
      await selectViaSpace(TEST_IDS.tree.nodes.vm);
    });

    await step(
      'select k8s → теперь оба child selected → parent compute auto-selected (allSelected→add parent branch)',
      async () => {
        await selectViaSpace(TEST_IDS.tree.nodes.k8s);
      },
    );

    await step(
      'deselect vm из полностью выбранного compute → parent теряет full (allSelected→remove parent branch)',
      async () => {
        await selectViaSpace(TEST_IDS.tree.nodes.vm);
      },
    );

    await step('select storage (one child s3 only) → storage+s3 → s3 alone path', async () => {
      await selectViaSpace(TEST_IDS.tree.nodes.storage);
    });
  },
};
