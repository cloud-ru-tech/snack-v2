import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipProps } from '../../src';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<TooltipProps>;

const longContent =
  'Длинный текст подсказки: компонент ограничивает максимальную ширину и переносит строки. Так тултип остаётся читаемым на любых экранах.';

export const WithLongContent: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    content: longContent,
  },
  render: args => (
    <Tooltip {...args}>
      <button type='button'>Наведи для длинного текста</button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Тултип с длинным текстом: макс. ширина задаётся стилями, текст переносится.',
      },
    },
  },
};
