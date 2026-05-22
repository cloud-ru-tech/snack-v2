import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

type ControlledProps = {
  onChange?(value: string): void;
};

function ControlledTabs({ onChange }: ControlledProps) {
  const [value, setValue] = useState('overview');

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>{'Controlled Tabs — onChange синхронизирует значение с парент-стейтом.'}</DemoHint>
        <div className={styles.wide}>
          <Tabs
            value={value}
            onChange={next => {
              setValue(next);
              onChange?.(next);
            }}
          >
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
  );
}

const meta: Meta<typeof ControlledTabs> = {
  title: 'Components/Tabs/Tabs/Tests/Controlled',
  component: ControlledTabs,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onChange: fn() },
};
export default meta;
type Story = StoryObj<typeof ControlledTabs>;

export const Controlled: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: parent state syncs and onChange fires with new value', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.tab.settings));
      expect(args.onChange).toHaveBeenCalledWith('settings');
      await expect(canvas.getByTestId(TEST_IDS.tab.settings)).toHaveAttribute('aria-selected', 'true');
      await expect(canvas.getByTestId(TEST_IDS.tabContent.settings)).toBeVisible();
    });

    await step('click: parent state advances to billing', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.tab.billing));
      expect(args.onChange).toHaveBeenLastCalledWith('billing');
      await expect(canvas.getByTestId(TEST_IDS.tab.billing)).toHaveAttribute('aria-selected', 'true');
    });
  },
};
