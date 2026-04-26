import { SIZE, Tabs } from '@ds/tabs';
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

const items = [
  { value: 'a', label: 'Первая' },
  { value: 'b', label: 'Вторая' },
  { value: 'c', label: 'Третья' },
];

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.col}>
      <Tabs defaultValue='a'>
        <Tabs.TabBar data-test-id='tabs-bar-l' size={SIZE.L}>
          {items.map(i => (
            <Tabs.Tab key={i.value} data-test-id={`tabs-tab-l-${i.value}`} {...i} />
          ))}
        </Tabs.TabBar>
      </Tabs>
      <Tabs defaultValue='a'>
        <Tabs.TabBar data-test-id='tabs-bar-m' size={SIZE.M}>
          {items.map(i => (
            <Tabs.Tab key={i.value} data-test-id={`tabs-tab-m-${i.value}`} {...i} />
          ))}
        </Tabs.TabBar>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('tabs-bar-l')).toBeVisible();
    await expect(canvas.getByTestId('tabs-bar-m')).toBeVisible();
  },
};
