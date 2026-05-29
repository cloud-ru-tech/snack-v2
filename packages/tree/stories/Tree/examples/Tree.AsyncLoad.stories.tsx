import { Tree, TreeNodeProps } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const INITIAL: TreeNodeProps[] = [
  { id: 'region-eu', title: 'EU region', 'data-test-id': TEST_IDS.tree.nodes.regionEu, nested: [] },
  { id: 'region-ru', title: 'RU region', 'data-test-id': TEST_IDS.tree.nodes.regionRu, nested: [] },
];

function AsyncLoadTree() {
  const [data, setData] = useState(INITIAL);
  const [expanded, setExpanded] = useState<string[]>([]);

  const onDataLoad = async (node: TreeNodeProps) => {
    await new Promise(r => {
      setTimeout(r, 0);
    });
    setData(prev =>
      prev.map((item): TreeNodeProps => {
        if (item.id !== node.id) return item;
        return {
          id: item.id,
          title: item.title as string,
          'data-test-id': item['data-test-id'],
          nested: [
            { id: `${item.id}-vm1`, title: 'vm-prod-01', 'data-test-id': `tree-node-${item.id}-vm1` },
            { id: `${item.id}-vm2`, title: 'vm-prod-02', 'data-test-id': `tree-node-${item.id}-vm2` },
          ],
        };
      }),
    );
    return true;
  };

  return (
    <Tree
      data={data}
      expandedNodes={expanded}
      onExpand={setExpanded}
      onDataLoad={onDataLoad}
      data-test-id={TEST_IDS.tree.root}
      showLines
    />
  );
}

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Examples/AsyncLoad',
  component: Tree,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const AsyncLoad: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.story}>
      <AsyncLoadTree />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('expand parent via chevron triggers onDataLoad', async () => {
      const regionEu = canvas.getByTestId(TEST_IDS.tree.nodes.regionEu);
      const chevron = within(regionEu).getByTestId(TEST_IDS.treeNode.chevron);
      await userEvent.click(chevron);
      await waitFor(async () => {
        await expect(canvas.getByTestId(TEST_IDS.tree.nodes.regionEuVm1)).toBeInTheDocument();
      });
    });
  },
};
