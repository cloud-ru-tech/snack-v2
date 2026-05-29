import { SELECTION_MODE, Tree, TreeNodeProps } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const DATA: TreeNodeProps[] = [
  {
    id: 'docs',
    title: 'Docs',
    'data-test-id': TEST_IDS.tree.nodes.fruits,
    nested: [
      {
        id: 'readme',
        title: 'Readme',
        href: 'https://example.invalid/readme',
        'data-test-id': TEST_IDS.tree.nodes.apple,
      },
      {
        id: 'guide',
        title: 'Guide',
        href: 'https://example.invalid/guide',
        'data-test-id': TEST_IDS.tree.nodes.citrus,
      },
    ],
  },
];

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Tests/Anchor',
  component: Tree,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const Anchor: Story = {
  tags: ['test', 'dev'],
  args: {
    data: DATA,
    selectionMode: SELECTION_MODE.Single,
    expandedNodes: ['docs'],
    'data-test-id': TEST_IDS.tree.root,
    onNodeClick: fn(),
    onSelect: fn(),
  },
  render: args => (
    <div className={styles.story}>
      <Tree {...args} />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('plain click on href link: handleAnchorClick → handleClick (onSelect fires)', async () => {
      const readme = canvas.getByTestId(TEST_IDS.tree.nodes.apple);
      const link = within(readme).getByTestId(TEST_IDS.treeNode.link);
      link.addEventListener('click', e => e.preventDefault(), { once: true });
      fireEvent.click(link);
      expect(args.onSelect).toHaveBeenCalled();
    });

    await step('cmd-click on href link: handleAnchorClick early-returns (metaKey branch)', async () => {
      const guide = canvas.getByTestId(TEST_IDS.tree.nodes.citrus);
      const link = within(guide).getByTestId(TEST_IDS.treeNode.link);
      link.addEventListener('click', e => e.preventDefault(), { once: true });
      fireEvent.click(link, { metaKey: true });
    });

    await step('middle-click (button=1) on href link: also early-returns', async () => {
      const guide = canvas.getByTestId(TEST_IDS.tree.nodes.citrus);
      const link = within(guide).getByTestId(TEST_IDS.treeNode.link);
      link.addEventListener('click', e => e.preventDefault(), { once: true });
      fireEvent.click(link, { button: 1 });
    });
  },
};
