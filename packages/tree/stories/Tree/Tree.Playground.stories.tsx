import { SELECTION_MODE, SelectionMode, SIZE, Size, Tree, TreeCommonProps, TreeNodeId } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, useState } from 'react';
import { expect, within } from 'storybook/test';

import { SAMPLE_TREE } from './fixtures';
import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const rowActions = () => [{ id: 'more', content: { label: 'Action' }, onClick: () => undefined }];

// StoryArgs не наследуется от discriminated union `TreeBaseProps` (View / Single /
// Multi): после Omit или intersection distributive-ветви теряют поля вроде
// `showToggle`, а `parentActions`/`nodeActions` как boolean становятся не
// присваиваемыми. Собираем плоский тип на базе общих опций + явные controls.
type StoryArgs = Omit<TreeCommonProps, 'parentActions' | 'nodeActions' | 'size'> & {
  'data-test-id'?: string;
  size?: Size;
  selectionMode?: SelectionMode;
  showToggle?: boolean;
  selected?: string | string[];
  onSelect?(...args: unknown[]): void;
  parentActions?: boolean;
  nodeActions?: boolean;
};

function PlaygroundRender({ parentActions, nodeActions, expandedNodes, onExpand, ...args }: StoryArgs) {
  const [expanded, setExpanded] = useState<TreeNodeId[] | undefined>(expandedNodes);
  return (
    <div className={styles.story}>
      <Tree
        {...(args as Parameters<typeof Tree>[0])}
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
  component: Tree as ComponentType<StoryArgs>,
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
    titleMaxLines: 1,
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
