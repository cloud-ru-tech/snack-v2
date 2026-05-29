import { FileSVG, FolderOpenSVG, FolderSVG } from '@ds/icons';
import { SELECTION_MODE, Tree, TreeNodeProps } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const DATA: TreeNodeProps[] = [
  {
    id: 'parent',
    title: 'Parent (custom icons)',
    'data-test-id': TEST_IDS.tree.nodes.fruits,
    expandedIcon: <FolderOpenSVG />,
    collapsedIcon: <FolderSVG />,
    nested: [
      {
        id: 'leaf-custom',
        title: 'Leaf (custom icon)',
        icon: <FileSVG />,
        'data-test-id': TEST_IDS.tree.nodes.apple,
      },
      {
        id: 'leaf-star',
        title: 'Leaf (default icon)',
        'data-test-id': TEST_IDS.tree.nodes.citrus,
      },
    ],
  },
];

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Tests/CustomIcons',
  component: Tree,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const CustomIcons: Story = {
  tags: ['test', 'dev'],
  args: {
    data: DATA,
    selectionMode: SELECTION_MODE.Single,
    expandedNodes: ['parent'],
    'data-test-id': TEST_IDS.tree.root,
  },
  render: args => (
    <div className={styles.story}>
      <Tree {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.tree.root);
    expect(root).toBeDefined();
  },
};
