import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs/Tabs/Tests/DisabledTab',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const DisabledTab: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>DisabledTab</DemoTitle>
        <DemoHint>{'Один из табов отключён через prop disabled — выставлен aria-disabled.'}</DemoHint>
        <div className={styles.wide}>
          <Tabs defaultValue='overview'>
            <Tabs.TabBar data-test-id={TEST_IDS.tabBar.root}>
              <Tabs.Tab data-test-id={TEST_IDS.tab.overview} value='overview' label='Overview' />
              <Tabs.Tab data-test-id={TEST_IDS.tab.settings} value='settings' label='Settings' />
              <Tabs.Tab data-test-id={TEST_IDS.tab.billing} value='billing' label='Billing' disabled />
            </Tabs.TabBar>
          </Tabs>
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tab.billing)).toHaveAttribute('aria-disabled', 'true');
  },
};
