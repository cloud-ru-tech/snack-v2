import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipProps, TRIGGER } from '../../src';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const WithClickTrigger: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    content: 'Тултип по клику',
    trigger: TRIGGER.Click,
  },
  render: args => (
    <Tooltip {...args}>
      <button type='button'>Нажми, чтобы показать</button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Тултип открывается по клику на триггер. Удобно для мобильных или когда нужен явный показ подсказки.',
      },
    },
  },
};
