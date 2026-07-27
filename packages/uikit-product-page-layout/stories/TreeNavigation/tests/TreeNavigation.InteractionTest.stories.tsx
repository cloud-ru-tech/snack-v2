import { TEST_IDS as TREE_TEST_IDS } from '@ds/tree';
import { TREE_NAVIGATION_MODE, TreeNavigation } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TREE_MENU_ITEMS, TREE_NODE_BILLING_TEST_ID } from '../../demoData';
import styles from '../../styles.module.scss';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof TreeNavigation> = {
  title: 'Uikit Product/PageLayout/TreeNavigation/Tests/Interaction',
  component: TreeNavigation,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TreeNavigation>;

const onSelect = fn();

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Выбор листового узла дерева вызывает onSelect с его id.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.treeFrame} data-test-id={TEST_IDS.treeNavigation.root}>
            <TreeNavigation
              mode={TREE_NAVIGATION_MODE.Fixed}
              header={{ title: 'Облачный проект', description: 'Управление ресурсами' }}
              menu={{ menuTitle: 'Разделы', items: TREE_MENU_ITEMS, onSelect }}
              content={<div className={styles.demoBox}>Контентная часть страницы</div>}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onSelect.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.treeNavigation.root);

    await step('select leaf node triggers onSelect', async () => {
      const node = within(root).getByTestId(TREE_NODE_BILLING_TEST_ID);
      // Node-level data-test-id оседает на корневом wrapper'е (role=presentation),
      // а onClick/onSelect — на внутреннем treeitem. Кликаем именно его.
      const nodeItem = within(node).getByTestId(TREE_TEST_IDS.item);
      await userEvent.click(nodeItem);
      await waitFor(() => expect(onSelect).toHaveBeenCalled());
    });

    await step('root remains visible', async () => {
      await expect(canvas.getByTestId(TEST_IDS.treeNavigation.root)).toBeVisible();
    });
  },
};
