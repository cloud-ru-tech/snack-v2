import { Skeleton } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const shapes = [
  { label: 'Rect (0px)', borderRadius: 0, isCircle: false },
  { label: 'Rounded (8px)', borderRadius: 8, isCircle: false },
  { label: 'Circle', borderRadius: '50%' as const, isCircle: true },
];

const sizes = [
  { label: 'S', width: 80, height: 20, circleSize: 24 },
  { label: 'M', width: 160, height: 24, circleSize: 40 },
  { label: 'L', width: 280, height: 32, circleSize: 56 },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Shape × Size'
      firstColumnHeader='Shape'
      columnHeaders={sizes.map(s => s.label)}
      rows={shapes.map(shape => ({
        variantLabel: shape.label,
        cells: sizes.map(size => (
          <Skeleton
            key={size.label}
            loading
            width={shape.isCircle ? size.circleSize : size.width}
            height={shape.isCircle ? size.circleSize : size.height}
            borderRadius={shape.borderRadius}
          />
        )),
      }))}
    />
  ),
};
