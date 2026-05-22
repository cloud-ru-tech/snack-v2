import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs/Tabs/Tests/Interaction',
  component: Tabs,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    defaultValue: 'overview',
    onChange: fn(),
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Клик по табу вызывает onChange со значением.'}</DemoHint>
        <div className={styles.wide}>
          <Tabs {...args}>
            <Tabs.TabBar data-test-id={TEST_IDS.tabBar.root}>
              <Tabs.Tab data-test-id={TEST_IDS.tab.overview} value='overview' label='Overview' />
              <Tabs.Tab data-test-id={TEST_IDS.tab.settings} value='settings' label='Settings' />
              <Tabs.Tab data-test-id={TEST_IDS.tab.billing} value='billing' label='Billing' />
            </Tabs.TabBar>
            <Tabs.TabContent data-test-id={TEST_IDS.tabContent.overview} value='overview'>
              Overview content
            </Tabs.TabContent>
            <Tabs.TabContent data-test-id={TEST_IDS.tabContent.settings} value='settings'>
              Settings content
            </Tabs.TabContent>
            <Tabs.TabContent data-test-id={TEST_IDS.tabContent.billing} value='billing'>
              Billing content
            </Tabs.TabContent>
          </Tabs>
        </div>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: selects settings tab and fires onChange with value', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.tab.settings));
      expect(args.onChange).toHaveBeenCalledWith('settings');
    });

    await step('click: selects billing tab and fires onChange with value', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.tab.billing));
      expect(args.onChange).toHaveBeenLastCalledWith('billing');
    });
  },
};
