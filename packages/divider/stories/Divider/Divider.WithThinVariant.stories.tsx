import type { Meta, StoryObj } from '@storybook/react';

import { Divider, type DividerProps, VARIANT } from '../../src';

const meta: Meta<DividerProps> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<DividerProps>;

export const WithThinVariant: Story = {
  tags: ['!dev', 'autodocs'],
  args: {
    variant: VARIANT.Thin,
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Тонкая линия (0.5px) для менее акцентного разделения контента.',
      },
    },
  },
};
