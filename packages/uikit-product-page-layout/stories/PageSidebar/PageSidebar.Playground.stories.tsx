import { PageSidebar } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { SIDEBAR_FOOTER_ITEMS, SIDEBAR_HEADER_TITLE, SIDEBAR_ITEMS } from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PageSidebar> = {
  title: 'Uikit Product/PageLayout/PageSidebar',
  component: PageSidebar,
  parameters: { layout: 'fullscreen' },
  args: {
    items: SIDEBAR_ITEMS,
    footerItems: SIDEBAR_FOOTER_ITEMS,
    header: SIDEBAR_HEADER_TITLE,
    selected: 'overview',
    hasSearch: true,
    defaultOpen: true,
    'data-test-id': TEST_IDS.pageSidebar.root,
  },
  argTypes: {
    hasSearch: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    items: { table: { disable: true } },
    footerItems: { table: { disable: true } },
    header: { table: { disable: true } },
    collapse: { table: { disable: true } },
    documentation: { table: { disable: true } },
    open: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof PageSidebar>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.sidebarHost}>
      <PageSidebar {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.pageSidebar.root)).toBeVisible();
  },
};
