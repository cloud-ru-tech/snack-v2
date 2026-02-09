import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { StoryTable } from '#storybook/components';

import typographyReadme from '../../README.md?raw';
import { SIZE, Typography, TypographyProps, VARIANT, WEIGHT } from '../../src';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    readme: { content: typographyReadme },
  },
};

export default meta;
type Story = StoryObj<TypographyProps>;

const variants = Object.values(VARIANT);
const sizes = Object.values(SIZE);
const weights = Object.values(WEIGHT);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
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
