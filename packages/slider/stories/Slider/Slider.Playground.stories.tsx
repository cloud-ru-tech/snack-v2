import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { SLIDER_TEST_ID } from './testIds';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
    handleTip: false,
    marksEqualSpacing: false,
    disabled: false,
    'data-test-id': SLIDER_TEST_ID,
  },
  argTypes: {
    min: { control: 'number', description: 'Минимальное значение' },
    max: { control: 'number', description: 'Максимальное значение' },
    step: { control: 'number', description: 'Шаг' },
    handleTip: { control: 'boolean', description: 'Показывать tooltip со значением на ручке' },
    marksEqualSpacing: {
      control: 'boolean',
      description: 'Равномерное распределение меток при нелинейных значениях',
    },
    disabled: { control: 'boolean', description: 'Отключён' },
    reverse: { control: 'boolean', description: 'Перевёрнутое направление' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SLIDER_TEST_ID)).toBeVisible();
  },
};
