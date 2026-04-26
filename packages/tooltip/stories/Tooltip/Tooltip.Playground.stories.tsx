import { PLACEMENT, Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { TOOLTIP_CONTENT_TEST_ID, TOOLTIP_TRIGGER_TEST_ID } from './testIds';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: {
    tip: 'Подсказка о кнопке',
    placement: PLACEMENT.Top,
    trigger: TRIGGER.HoverAndFocusVisible,
    disableMaxWidth: false,
    children: (
      <button type='button' data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
        Наведите на меня
      </button>
    ),
    'data-test-id': TOOLTIP_CONTENT_TEST_ID,
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
    await expect(within(canvasElement).getByTestId(TOOLTIP_TRIGGER_TEST_ID)).toBeVisible();
  },
};
