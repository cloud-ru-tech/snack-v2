import { Meta, StoryObj } from '@storybook/react';

import { APPEARANCE, STATUS_INDICATOR_SIZE, StatusIndicator, StatusIndicatorProps } from '../../src';

const meta: Meta<StatusIndicatorProps> = {
  title: 'Components/Status/StatusIndicator',
  component: StatusIndicator,
  parameters: { layout: 'centered' },
  args: {
    size: STATUS_INDICATOR_SIZE.S,
    appearance: APPEARANCE.Neutral,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(STATUS_INDICATOR_SIZE),
      description: 'Размер индикатора',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид (цветовая схема)',
    },
    className: {
      control: 'text',
      description: 'CSS-класс',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StatusIndicatorProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
