import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { TABS_BAR_TEST_ID } from './testIds';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const WithCounter: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wide}>
      <Tabs defaultValue='inbox'>
        <Tabs.TabBar data-test-id={TABS_BAR_TEST_ID}>
          <Tabs.Tab data-test-id='tabs-tab-inbox' value='inbox' label='Входящие' counter={{ label: 12 }} />
          <Tabs.Tab data-test-id='tabs-tab-drafts' value='drafts' label='Черновики' counter={{ label: 3 }} />
          <Tabs.Tab data-test-id='tabs-tab-archive' value='archive' label='Архив' />
        </Tabs.TabBar>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('tabs-tab-inbox')).toBeVisible();
  },
};
