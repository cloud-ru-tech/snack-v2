import { APPEARANCE, Button, ICON_POSITION, SIZE, VIEW } from '@ds/button';
import { DownloadSVG, PlusSVG, SettingsSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { BUTTON_TEST_ID } from './testIds';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: {
    label: 'Button',
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
    view: VIEW.Elevated,
    iconPosition: ICON_POSITION.Before,
    disabled: false,
    loading: false,
    fullWidth: false,
    className: '',
    'data-test-id': BUTTON_TEST_ID,
  },
  argTypes: {
    label: { control: 'text', description: 'Текст кнопки' },
    appearance: {
      control: 'radio',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема: primary / neutral / critical',
    },
    view: {
      control: 'select',
      options: Object.values(VIEW),
      description: 'Оформление: filled / outline / simple / tonal / elevated / function',
    },
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер: s / m / l' },
    icon: {
      control: 'select',
      options: ['none', 'settings', 'download', 'plus'],
      mapping: {
        none: undefined,
        settings: <SettingsSVG />,
        download: <DownloadSVG />,
        plus: <PlusSVG />,
      },
      description: 'Иконка (none | settings | download | plus)',
    },
    iconPosition: {
      control: 'radio',
      options: Object.values(ICON_POSITION),
      description: 'Позиция иконки относительно лейбла',
      if: { arg: 'icon', neq: 'none' },
    },
    disabled: { control: 'boolean', description: 'Отключена' },
    loading: { control: 'boolean', description: 'Состояние загрузки (aria-busy)' },
    fullWidth: { control: 'boolean', description: 'На всю ширину контейнера' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(BUTTON_TEST_ID)).toBeVisible();
  },
};
