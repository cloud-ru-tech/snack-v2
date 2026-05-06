import { SIZE, SkeletonText, VARIANT } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

const keyVariants = [VARIANT.Body, VARIANT.Label, VARIANT.Title, VARIANT.Headline, VARIANT.Display];
const keySizes = [SIZE.S, SIZE.M, SIZE.L];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
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
