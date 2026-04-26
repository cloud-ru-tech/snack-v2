import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

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
        <Tabs.TabBar>
          <Tabs.Tab value='inbox' label='Входящие' counter={{ label: 12 }} />
          <Tabs.Tab value='drafts' label='Черновики' counter={{ label: 3 }} />
          <Tabs.Tab value='archive' label='Архив' />
        </Tabs.TabBar>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('tab', { selected: true })).toBeVisible();
  },
};
