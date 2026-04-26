import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { TABS_BAR_TEST_ID } from './testIds';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  args: {
    defaultValue: 'overview',
  },
  argTypes: {
    defaultValue: { control: 'text', description: 'Активная вкладка по умолчанию' },
    value: { control: 'text', description: 'Активная вкладка (контролируемый режим)' },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.wide}>
      <Tabs {...args}>
        <Tabs.TabBar data-test-id={TABS_BAR_TEST_ID}>
          <Tabs.Tab data-test-id='tabs-tab-overview' value='overview' label='Overview' />
          <Tabs.Tab data-test-id='tabs-tab-settings' value='settings' label='Settings' />
          <Tabs.Tab data-test-id='tabs-tab-billing' value='billing' label='Billing' />
        </Tabs.TabBar>
        <Tabs.TabContent data-test-id='tabs-panel-overview' value='overview'>
          <div className={styles.panel}>Overview content</div>
        </Tabs.TabContent>
        <Tabs.TabContent data-test-id='tabs-panel-settings' value='settings'>
          <div className={styles.panel}>Settings content</div>
        </Tabs.TabContent>
        <Tabs.TabContent data-test-id='tabs-panel-billing' value='billing'>
          <div className={styles.panel}>Billing content</div>
        </Tabs.TabContent>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TABS_BAR_TEST_ID)).toBeVisible();
  },
};
