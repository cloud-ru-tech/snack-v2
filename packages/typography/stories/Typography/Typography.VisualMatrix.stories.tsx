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

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      {weights.map(weight => (
        <StoryTable
          key={weight}
          sectionTitle={`${capitalize(weight)} Weight`}
          firstColumnHeader='Variant'
          columnHeaders={sizes.map(s => s.toUpperCase())}
          rows={variants.map(variant => ({
            variantLabel: variant,
            cells: sizes.map(size => (
              <Typography key={size} variant={variant} size={size} weight={weight}>
                {capitalize(variant)} {size.toUpperCase()}
              </Typography>
            )),
          }))}
        />
      ))}
    </>
  ),
};
