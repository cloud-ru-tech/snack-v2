import { PLACEMENT, QuestionTooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof QuestionTooltip> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
  parameters: { layout: 'centered' },
  args: {
    tip: 'Подсказка о поле формы',
    placement: PLACEMENT.Top,
    trigger: TRIGGER.Hover,
    triggerLabel: 'Подсказка',
  },
  argTypes: {
    tip: { control: 'text' },
    placement: { control: 'select', options: Object.values(PLACEMENT) },
    trigger: { control: 'select', options: Object.values(TRIGGER) },
    triggerLabel: { control: 'text', description: 'aria-label триггера-иконки' },
  },
};

export default meta;
type Story = StoryObj<typeof QuestionTooltip>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button')).toBeVisible();
  },
};
