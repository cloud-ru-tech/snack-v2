import { SELECTION_MODE, Tree } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { SAMPLE_TREE } from '../fixtures';
import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const NATIVE_INPUT_SUFFIX = '-native-input';

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Tests/MultiSelect',
  component: Tree,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const MultiSelect: Story = {
  tags: ['test', 'dev'],
  args: {
    data: SAMPLE_TREE,
    selectionMode: SELECTION_MODE.Multiple,
    expandedNodes: ['fruits', 'citrus'],
    'data-test-id': TEST_IDS.tree.root,
    onNodeClick: fn(),
    onSelect: fn(),
    onExpand: fn(),
  },
  render: args => (
    <div className={styles.story}>
      <Tree {...args} />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    const clickCheckbox = async (nodeTestId: string) => {
      const nodeEl = canvas.getByTestId(nodeTestId);
      const nativeInput = within(nodeEl).getAllByTestId(`${TEST_IDS.treeNode.checkbox}${NATIVE_INPUT_SUFFIX}`)[0];
      await userEvent.click(nativeInput);
    };

    await step('click checkbox on leaf: triggers handleSelect → onSelect (uncontrolled multi)', async () => {
      await clickCheckbox(TEST_IDS.tree.nodes.apple);
      expect(args.onSelect).toHaveBeenCalled();
    });

    await step('click checkbox on parent: cascade to descendants', async () => {
      await clickCheckbox(TEST_IDS.tree.nodes.fruits);
    });

    await step('click checkbox on nested leaf: parent demoted', async () => {
      await clickCheckbox(TEST_IDS.tree.nodes.orange);
    });

    await step('click row in multi mode: handleClick → onNodeClick (no auto-select)', async () => {
      const citrus = canvas.getByTestId(TEST_IDS.tree.nodes.citrus);
      const row = within(citrus).getAllByTestId(TEST_IDS.treeNode.item)[0];
      await userEvent.click(row);
      expect(args.onNodeClick).toHaveBeenCalled();
    });
  },
};
