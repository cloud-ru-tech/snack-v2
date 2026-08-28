import { ThemeMode, UserMenu, UserMenuProps } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
  // Тема хранится в state стори: со статическим `value` из args выбранной оставалась бы
  // одна и та же тема, и переключение не было бы видно.
  render: function Render({ theme, ...args }: UserMenuProps) {
    const [themeMode, setThemeMode] = useState<ThemeMode | undefined>(theme?.value);

    return (
      <DemoPage>
        <DemoPanel width='wide'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Меню пользователя: профиль, тема, настройки и выход.</DemoHint>
          <DemoActions align='center'>
            <UserMenu {...args} theme={{ value: themeMode, onChange: setThemeMode }} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.userMenu.button)).toBeVisible();
  },
};
