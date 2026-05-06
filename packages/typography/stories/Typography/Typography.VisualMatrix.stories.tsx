import { SIZE, Typography, TypographyProps, VARIANT, WEIGHT } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<TypographyProps>;

const variants = Object.values(VARIANT);
const sizes = Object.values(SIZE);
const weights = Object.values(WEIGHT);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      {weights.map(weight => (
        <StoryTable
          key={weight}
          sectionTitle={`${weight.charAt(0).toUpperCase() + weight.slice(1)} Weight`}
          firstColumnHeader='Variant'
          columnHeaders={sizes.map(s => s.toUpperCase())}
          rows={variants.map(variant => ({
            variantLabel: variant,
            cells: sizes.map(size => (
              <Typography key={size} variant={variant} size={size} weight={weight}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)} {size.toUpperCase()}
              </Typography>
            )),
          }))}
        />
      ))}
    </>
  ),
};
