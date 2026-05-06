import { SWITCH_ROW_TYPES, SwitchRow } from '@ds/uikit-product-switch-row';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { SWITCH_ROW_TEST_ID } from './testIds';

const meta: Meta<typeof SwitchRow> = {
  title: 'Uikit Product/SwitchRow',
  component: SwitchRow,
  parameters: { layout: 'centered' },
  args: {
    title: 'Включить уведомления',
    description: 'Раз в сутки будет приходить дайджест событий',
    defaultChecked: false,
    disabled: false,
    loading: false,
    disableTitleTruncate: false,
    type: SWITCH_ROW_TYPES.Block,
    'data-test-id': SWITCH_ROW_TEST_ID,
  },
  argTypes: {
    title: { control: 'text', description: 'Заголовок' },
    description: { control: 'text', description: 'Описание под заголовком' },
    disabled: { control: 'boolean', description: 'Отключено' },
    loading: { control: 'boolean', description: 'Состояние загрузки' },
    disableTitleTruncate: { control: 'boolean', description: 'Отключить truncation заголовка' },
    type: {
      control: 'radio',
      options: Object.values(SWITCH_ROW_TYPES),
      description: 'Вариант лейаута: block (карточка) / line (inline)',
    },
    tip: { control: 'text', description: 'Подсказка рядом с заголовком' },
    disabledToggleTip: { control: 'text', description: 'Тултип поверх Switch в disabled-состоянии' },
    name: { control: 'text', description: 'name для нативного input' },
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchRow>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SWITCH_ROW_TEST_ID)).toBeVisible();
  },
};
