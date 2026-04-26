import { PLACEMENT, Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: {
    tip: 'Подсказка о кнопке',
    placement: PLACEMENT.Top,
    trigger: TRIGGER.HoverAndFocusVisible,
    disableMaxWidth: false,
    children: <button type='button'>Наведите на меня</button>,
  },
  argTypes: {
    tip: { control: 'text', description: 'Содержимое подсказки' },
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Позиция относительно триггера',
    },
    trigger: {
      control: 'select',
      options: Object.values(TRIGGER),
      description: 'Что открывает тултип',
    },
    disableMaxWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button')).toBeVisible();
  },
};
