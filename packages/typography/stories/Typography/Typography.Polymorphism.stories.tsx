import { SIZE, Typography, TypographyProps, VARIANT } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<TypographyProps>;

export const Polymorphism: Story = {
  tags: ['dev'],
  args: {
    as: 'span',
    variant: VARIANT.body,
    size: SIZE.m,
    children: 'Body text as <span>',
  },
};
