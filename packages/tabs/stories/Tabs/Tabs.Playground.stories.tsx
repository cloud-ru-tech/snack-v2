import { Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

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
        <Tabs.TabBar>
          <Tabs.Tab value='overview' label='Overview' />
          <Tabs.Tab value='settings' label='Settings' />
          <Tabs.Tab value='billing' label='Billing' />
        </Tabs.TabBar>
        <Tabs.TabContent value='overview'>
          <div className={styles.panel}>Overview content</div>
        </Tabs.TabContent>
        <Tabs.TabContent value='settings'>
          <div className={styles.panel}>Settings content</div>
        </Tabs.TabContent>
        <Tabs.TabContent value='billing'>
          <div className={styles.panel}>Billing content</div>
        </Tabs.TabContent>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('tablist')).toBeVisible();
  },
};
