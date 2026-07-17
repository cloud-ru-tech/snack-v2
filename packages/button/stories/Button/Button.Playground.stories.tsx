import { APPEARANCE, Button, ICON_POSITION, SIZE, VIEW } from '@ds/button';
import { DownloadSVG, PlusSVG, SettingsSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кнопка действия с настраиваемым видом, размером и иконкой.</DemoHint>
        <DemoActions align='center'>
          <Button {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    label: 'Button',
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
    view: VIEW.Elevated,
    iconPosition: ICON_POSITION.Before,
    disabled: false,
    loading: false,
    fullWidth: false,
    'data-test-id': TEST_IDS.button.root,
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
    await expect(within(canvasElement).getByTestId(TEST_IDS.button.root)).toBeVisible();
  },
};
