import { APPEARANCE, Button, VIEW } from '@ds/button';
import { CloudSVG } from '@ds/icons/interface/product';
import { TREE_NAVIGATION_MODE, TreeNavigation } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { PageSectionContent, TREE_MENU_ITEMS } from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const headerActions = (
  <>
    <Button view={VIEW.Outline} appearance={APPEARANCE.Neutral} label='Документация' onClick={fn()} />
    <Button view={VIEW.Filled} label='Создать сеть' onClick={fn()} />
  </>
);

const meta: Meta<typeof TreeNavigation> = {
  title: 'Uikit Product/PageLayout/TreeNavigation',
  component: TreeNavigation,
  parameters: { layout: 'fullscreen' },
  args: {
    mode: TREE_NAVIGATION_MODE.Aside,
    header: {
      title: 'Облачный проект',
      icon: <CloudSVG />,
      description: 'Управление сетевыми ресурсами проекта',
      status: { label: 'Активно', appearance: 'green' },
      actions: headerActions,
    },
    menu: {
      menuTitle: 'Разделы',
      items: TREE_MENU_ITEMS,
      selected: 'subnets',
      defaultMenuOpened: true,
      withDefaultOpenedMenuList: true,
    },
    content: <PageSectionContent />,
  },
  argTypes: {
    mode: { control: 'radio', options: Object.values(TREE_NAVIGATION_MODE) },
    header: { table: { disable: true } },
    menu: { table: { disable: true } },
    content: { table: { disable: true } },
    contentClassName: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TreeNavigation>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Навигация по дереву разделов: режимы popover / aside / fixed, заголовок и меню.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.treeFrame} data-test-id={TEST_IDS.treeNavigation.root}>
            <TreeNavigation {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.treeNavigation.root)).toBeVisible();
  },
};
