import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SIZE, SkeletonText, SkeletonTextProps, VARIANT } from '../../src';

const meta: Meta<SkeletonTextProps> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
};

export default meta;
type Story = StoryObj<SkeletonTextProps>;

const keyVariants = [VARIANT.Body, VARIANT.Label, VARIANT.Title, VARIANT.Headline, VARIANT.Display];
const keySizes = [SIZE.S, SIZE.M, SIZE.L];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Purpose × Size'
      firstColumnHeader='Purpose'
      columnHeaders={keySizes.map(s => s.toUpperCase())}
      rows={keyVariants.map(variant => ({
        variantLabel: variant,
        cells: keySizes.map(size => <SkeletonText key={size} loading lines={2} variant={variant} size={size} />),
      }))}
    />
  ),
};
