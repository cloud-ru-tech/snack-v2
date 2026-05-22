import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
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
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Переключение между разделами через вкладки.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.wide}>
            <Tabs {...args}>
              <Tabs.TabBar data-test-id={TEST_IDS.tabBar.root}>
                <Tabs.Tab data-test-id={TEST_IDS.tab.overview} value='overview' label='Overview' />
                <Tabs.Tab data-test-id={TEST_IDS.tab.settings} value='settings' label='Settings' />
                <Tabs.Tab data-test-id={TEST_IDS.tab.billing} value='billing' label='Billing' />
              </Tabs.TabBar>
              <Tabs.TabContent data-test-id={TEST_IDS.tabContent.overview} value='overview'>
                <div className={styles.panel}>Overview content</div>
              </Tabs.TabContent>
              <Tabs.TabContent data-test-id={TEST_IDS.tabContent.settings} value='settings'>
                <div className={styles.panel}>Settings content</div>
              </Tabs.TabContent>
              <Tabs.TabContent data-test-id={TEST_IDS.tabContent.billing} value='billing'>
                <div className={styles.panel}>Billing content</div>
              </Tabs.TabContent>
            </Tabs>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tabBar.root)).toBeVisible();
  },
};
