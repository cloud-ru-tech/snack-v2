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

export const DisabledTab: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wide}>
      <Tabs defaultValue='overview'>
        <Tabs.TabBar data-test-id={TABS_BAR_TEST_ID}>
          <Tabs.Tab data-test-id='tabs-tab-overview' value='overview' label='Overview' />
          <Tabs.Tab data-test-id='tabs-tab-settings' value='settings' label='Settings' />
          <Tabs.Tab data-test-id='tabs-tab-billing' value='billing' label='Billing' disabled />
        </Tabs.TabBar>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('tabs-tab-billing')).toBeDisabled();
  },
};
