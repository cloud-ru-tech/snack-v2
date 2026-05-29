import { SELECTION_MODE, SIZE, Tree, TreeBaseProps, TreeNodeId } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { SAMPLE_TREE } from './fixtures';
import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const rowActions = () => [{ id: 'more', content: { option: 'Action' }, onClick: () => undefined }];

type StoryArgs = TreeBaseProps & {
  parentActions?: boolean;
  nodeActions?: boolean;
};

function PlaygroundRender({ parentActions, nodeActions, expandedNodes, onExpand, ...args }: StoryArgs) {
  const [expanded, setExpanded] = useState<TreeNodeId[] | undefined>(expandedNodes);
  return (
    <div className={styles.story}>
      <Tree
        {...args}
        expandedNodes={expanded}
        onExpand={(nodes, node) => {
          setExpanded(nodes);
          onExpand?.(nodes, node);
        }}
        parentActions={parentActions ? rowActions : undefined}
        nodeActions={nodeActions ? rowActions : undefined}
      />
    </div>
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
  },
  args: {
    data: SAMPLE_TREE,
    selectionMode: SELECTION_MODE.Single,
    showToggle: undefined,
    size: SIZE.M,
    showLines: true,
    showIcons: true,
    expandedNodes: ['fruits'],
    parentActions: false,
    nodeActions: false,
    'data-test-id': TEST_IDS.tree.root,
  },
  argTypes: {
    selectionMode: {
      control: 'select',
      options: Object.values(SELECTION_MODE),
    },
    showToggle: { control: 'boolean', if: { arg: 'selectionMode', eq: SELECTION_MODE.Single } },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
    },
    parentActions: { control: 'boolean' },
    nodeActions: { control: 'boolean' },
    data: { table: { disable: true } },
    selected: { table: { disable: true } },
    onNodeClick: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onExpand: { table: { disable: true } },
    onDataLoad: { table: { disable: true } },
  },
  // Обёртка нужна, чтобы зафиксировать ширину дерева (320px) — без неё grid
  // родительского layout растягивает Tree на полный viewport, ломая визуал.
  // `expandedNodes` — controlled prop; без локального state клик по toggle
  // не раскрывает узлы в Playground (args не обновляются на клик).
  render: args => <PlaygroundRender {...args} />,
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const tree = within(canvasElement).getByTestId(TEST_IDS.tree.root);
    await expect(tree).toBeVisible();
  },
};
