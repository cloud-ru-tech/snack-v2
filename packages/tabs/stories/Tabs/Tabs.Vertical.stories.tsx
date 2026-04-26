import { ORIENTATION, Tabs } from '@ds/tabs';
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

export const Vertical: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wide}>
      <Tabs defaultValue='profile'>
        <Tabs.TabBar orientation={ORIENTATION.Vertical}>
          <Tabs.Tab value='profile' label='Профиль' />
          <Tabs.Tab value='security' label='Безопасность' />
          <Tabs.Tab value='notifications' label='Уведомления' />
        </Tabs.TabBar>
        <Tabs.TabContent value='profile'>
          <div className={styles.panel}>Настройки профиля</div>
        </Tabs.TabContent>
        <Tabs.TabContent value='security'>
          <div className={styles.panel}>Настройки безопасности</div>
        </Tabs.TabContent>
        <Tabs.TabContent value='notifications'>
          <div className={styles.panel}>Настройки уведомлений</div>
        </Tabs.TabContent>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('tablist')).toBeVisible();
  },
};
