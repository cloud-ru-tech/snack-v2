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

export const DisabledTab: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wide}>
      <Tabs defaultValue='overview'>
        <Tabs.TabBar>
          <Tabs.Tab value='overview' label='Overview' />
          <Tabs.Tab value='settings' label='Settings' />
          <Tabs.Tab value='billing' label='Billing' disabled />
        </Tabs.TabBar>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('tab', { name: /billing/i })).toBeDisabled();
  },
};
