import { ORIENTATION, Tabs } from '@ds/tabs';
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

export const Vertical: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.wide}>
      <Tabs defaultValue='profile'>
        <Tabs.TabBar data-test-id={TABS_BAR_TEST_ID} orientation={ORIENTATION.Vertical}>
          <Tabs.Tab data-test-id='tabs-tab-profile' value='profile' label='Профиль' />
          <Tabs.Tab data-test-id='tabs-tab-security' value='security' label='Безопасность' />
          <Tabs.Tab data-test-id='tabs-tab-notifications' value='notifications' label='Уведомления' />
        </Tabs.TabBar>
        <Tabs.TabContent data-test-id='tabs-panel-profile' value='profile'>
          <div className={styles.panel}>Настройки профиля</div>
        </Tabs.TabContent>
        <Tabs.TabContent data-test-id='tabs-panel-security' value='security'>
          <div className={styles.panel}>Настройки безопасности</div>
        </Tabs.TabContent>
        <Tabs.TabContent data-test-id='tabs-panel-notifications' value='notifications'>
          <div className={styles.panel}>Настройки уведомлений</div>
        </Tabs.TabContent>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TABS_BAR_TEST_ID)).toBeVisible();
  },
};
