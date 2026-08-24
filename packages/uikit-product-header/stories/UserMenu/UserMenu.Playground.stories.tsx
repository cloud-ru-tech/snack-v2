import { UserMenu, UserMenuProps } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SETTING_ITEMS } from '../demoData';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof UserMenu> = {
  title: 'Uikit Product/Layout/Header/UserMenu',
  id: 'uikit-product-header-usermenu',
  component: UserMenu,
  parameters: { layout: 'fullscreen' },
  args: {
    profile: {
      fullName: 'Ivan Petrov',
      email: 'ipetrov@cloud.ru',
      inviteCount: 1,
    },
    theme: {
      value: 'light',
    },
    settingItems: SETTING_ITEMS,
    items: [{ content: { label: 'Option 1' } }, { content: { label: 'Option 2' } }],
  },
};

export default meta;
type Story = StoryObj<UserMenuProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Меню пользователя: профиль, тема, настройки и выход.</DemoHint>
        <DemoActions align='center'>
          <UserMenu {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.userMenu.button)).toBeVisible();
  },
};
