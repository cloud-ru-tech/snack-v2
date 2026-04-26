import { SIZE, Typography, TypographyProps, VARIANT } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<TypographyProps>;

export const HeadlineSizes: Story = {
  tags: ['dev'],
  render: () => (
    <>
      <Typography variant={VARIANT.headline} size={SIZE.s} data-test-id='typography-s'>
        Headline S
      </Typography>
      <Typography variant={VARIANT.headline} size={SIZE.m} data-test-id='typography-m'>
        Headline M
      </Typography>
      <Typography variant={VARIANT.headline} size={SIZE.l} data-test-id='typography-l'>
        Headline L
      </Typography>
    </>
  ),
};
