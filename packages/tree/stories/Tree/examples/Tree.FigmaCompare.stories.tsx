import { SELECTION_MODE, SIZE, Tree, TreeNodeProps } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const leaf = (id: string): TreeNodeProps => ({ id, title: 'Content text' });
const folder = (id: string, nested: TreeNodeProps[] = [], disabled?: boolean): TreeNodeProps => ({
  id,
  title: 'Content text',
  disabled,
  nested,
});

const FIGMA_TREE: TreeNodeProps[] = [
  folder('l0-1', [
    folder('l1-1', [
      folder('l2-1', [
        folder('l3-selected', [
          folder('l4-1', [
            folder('l5-1', [
              folder('l6-1', [leaf('l7-1'), leaf('l7-2'), leaf('l7-3'), leaf('l7-4'), folder('l7-5'), folder('l7-6')]),
            ]),
          ]),
        ]),
        folder('l2-disabled', [], true),
      ]),
      folder('l1-collapsed'),
    ]),
  ]),
  folder('l0-disabled', [], true),
  folder('l0-last'),
];

const INITIAL_EXPANDED = ['l0-1', 'l1-1', 'l2-1', 'l3-selected', 'l4-1', 'l5-1', 'l6-1'];

const rowActions = () => [
  { id: 'edit', content: { option: 'Edit' }, onClick: () => undefined },
  { id: 'rename', content: { option: 'Rename' }, onClick: () => undefined },
  { id: 'delete', content: { option: 'Delete' }, onClick: () => undefined },
];

type SharedProps = {
  size: (typeof SIZES)[number];
  showLines: boolean;
  showIcons: boolean;
};

function SingleTree(shared: SharedProps) {
  const [expanded, setExpanded] = useState(INITIAL_EXPANDED);
  const [selected, setSelected] = useState<string | undefined>('l3-selected');
  return (
    <Tree
      data={FIGMA_TREE}
      expandedNodes={expanded}
      onExpand={setExpanded}
      selectionMode={SELECTION_MODE.Single}
      selected={selected}
      onSelect={setSelected}
      showToggle
      parentActions={rowActions}
      nodeActions={rowActions}
      {...shared}
    />
  );
}

function MultiTree(shared: SharedProps) {
  const [expanded, setExpanded] = useState(INITIAL_EXPANDED);
  const [selected, setSelected] = useState<string[]>(['l3-selected']);
  return (
    <Tree
      data={FIGMA_TREE}
      expandedNodes={expanded}
      onExpand={setExpanded}
      selectionMode={SELECTION_MODE.Multi}
      selected={selected}
      onSelect={setSelected}
      parentActions={rowActions}
      nodeActions={rowActions}
      {...shared}
    />
  );
}

function ViewTree(shared: SharedProps) {
  const [expanded, setExpanded] = useState(INITIAL_EXPANDED);
  return (
    <Tree
      data={FIGMA_TREE}
      expandedNodes={expanded}
      onExpand={setExpanded}
      parentActions={rowActions}
      nodeActions={rowActions}
      {...shared}
    />
  );
}

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Examples/FigmaCompare',
  component: Tree,
  parameters: {
    layout: 'padded',
    controls: { include: ['size', 'showLines', 'showIcons'] },
  },
  args: {
    showLines: true,
    showIcons: true,
  },
  argTypes: {
    showLines: { control: 'boolean' },
    showIcons: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

const SIZES = Object.values(SIZE);

export const FigmaCompare: Story = {
  tags: ['dev', 'test'],
  render: ({ showLines, showIcons }) => (
    <div className={styles.figmaMatrix} data-test-id={TEST_IDS.tree.root}>
      {SIZES.map(size => {
        const shared: SharedProps = { size, showLines: Boolean(showLines), showIcons: Boolean(showIcons) };
        return (
          <div key={size} className={styles.figmaSizeBlock}>
            <span className={styles.figmaSizeTitle}>size = {size}</span>
            <div className={styles.figmaRow}>
              <div className={styles.figmaCell}>
                <span className={styles.figmaCellTitle}>Single</span>
                <SingleTree {...shared} />
              </div>
              <div className={styles.figmaCell}>
                <span className={styles.figmaCellTitle}>Multi</span>
                <MultiTree {...shared} />
              </div>
              <div className={styles.figmaCell}>
                <span className={styles.figmaCellTitle}>View</span>
                <ViewTree {...shared} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tree.root)).toBeVisible();
  },
};
