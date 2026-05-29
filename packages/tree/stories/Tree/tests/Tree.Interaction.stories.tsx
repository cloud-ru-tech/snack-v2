import { SELECTION_MODE, Tree } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { SAMPLE_TREE } from '../fixtures';
import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Tests/Interaction',
  component: Tree,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const Interaction: Story = {
  tags: ['test', 'dev'],
  args: {
    data: SAMPLE_TREE,
    selectionMode: SELECTION_MODE.Single,
    'data-test-id': TEST_IDS.tree.root,
    onNodeClick: fn(),
    onSelect: fn(),
    onExpand: fn(),
    parentActions: () => [{ option: 'Rename', onClick: fn() }],
    nodeActions: () => [{ option: 'Copy id', onClick: fn() }],
  },
  render: args => (
    <div className={styles.story}>
      <Tree {...args} />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByTestId(TEST_IDS.tree.root);

    await step('click chevron: parent fires onExpand + aria-expanded=true', async () => {
      const fruits = canvas.getByTestId(TEST_IDS.tree.nodes.fruits);
      const fruitsRow = within(fruits).getByTestId(TEST_IDS.treeNode.item);
      const chevron = within(fruits).getByTestId(TEST_IDS.treeNode.chevron);
      expect(fruitsRow.getAttribute('aria-expanded')).toBe('false');
      await userEvent.click(chevron);
      expect(args.onExpand).toHaveBeenCalled();
      expect(fruitsRow.getAttribute('aria-expanded')).toBe('true');
    });

    await step('click row: leaf fires onNodeClick + onSelect', async () => {
      const apple = await canvas.findByTestId(TEST_IDS.tree.nodes.apple);
      const appleRow = within(apple).getByTestId(TEST_IDS.treeNode.item);
      await userEvent.click(appleRow);
      expect(args.onNodeClick).toHaveBeenCalled();
      expect(args.onSelect).toHaveBeenCalled();
    });

    await step('keyboard: Tab + ArrowDown navigates inside tree', async () => {
      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      expect(tree.contains(document.activeElement)).toBe(true);
    });

    await step('keyboard: ArrowUp moves focus back up', async () => {
      await userEvent.keyboard('{ArrowUp}');
    });

    await step('keyboard: ArrowRight on leaf with actions activates row droplist trigger', async () => {
      const apple = canvas.getByTestId(TEST_IDS.tree.nodes.apple);
      const appleRow = within(apple).getByTestId(TEST_IDS.treeNode.item);
      appleRow.focus();
      await userEvent.keyboard('{ArrowRight}');
      expect(appleRow.dataset.droplistActive).toBe('true');
    });

    await step('keyboard: ArrowDown opens droplist when trigger focused', async () => {
      await userEvent.keyboard('{ArrowDown}');
    });

    await step('keyboard: ArrowUp closes droplist', async () => {
      await userEvent.keyboard('{ArrowUp}');
    });

    await step('keyboard: ArrowLeft returns focus from trigger to row', async () => {
      await userEvent.keyboard('{ArrowLeft}');
    });

    await step('keyboard: Space triggers handleSelect', async () => {
      await userEvent.keyboard(' ');
      expect(args.onSelect).toHaveBeenCalled();
    });

    await step('keyboard: Enter — то же поведение, что Space', async () => {
      await userEvent.keyboard('{Enter}');
    });

    await step('keyboard: Escape blur-ит focused row', async () => {
      await userEvent.keyboard('{Escape}');
    });
  },
};

// Без parent/nodeActions ArrowRight не должен поднимать hover-state
// (`data-droplist-active`) на строке — иначе пользователь видит «выделение»
// без причины (нет actions — некуда уводить фокус).
export const InteractionWithoutActions: Story = {
  tags: ['test', 'dev'],
  args: {
    data: SAMPLE_TREE,
    selectionMode: SELECTION_MODE.Single,
    'data-test-id': TEST_IDS.tree.root,
  },
  render: args => (
    <div className={styles.story}>
      <Tree {...args} />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('keyboard: ArrowRight без actions не активирует hover-state', async () => {
      const fruits = canvas.getByTestId(TEST_IDS.tree.nodes.fruits);
      const fruitsRow = within(fruits).getByTestId(TEST_IDS.treeNode.item);
      fruitsRow.focus();
      await userEvent.keyboard('{ArrowRight}');
      expect(fruitsRow.dataset.droplistActive).toBeUndefined();
    });
  },
};
