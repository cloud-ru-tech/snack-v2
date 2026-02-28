import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import readme from '../../README.md?raw';
import { PAGINATION_SLIDER_SIZE, PaginationSlider, type PaginationSliderProps } from '../../src';

const meta: Meta<PaginationSliderProps> = {
  title: 'Components/Pagination/Pagination Slider',
  component: PaginationSlider,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5707-1749&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<PaginationSliderProps>;

const sizes = Object.values(PAGINATION_SLIDER_SIZE);
const slideCounts = [2, 3, 5, 8, 10];

function PaginationSliderCell({
  size,
  total,
  initialPage,
}: {
  size: (typeof sizes)[number];
  total: number;
  initialPage: number;
}) {
  const [page, setPage] = useState(initialPage);
  return <PaginationSlider total={total} page={page} size={size} onChange={newPage => setPage(newPage)} />;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Slides count × Size'
      firstColumnHeader='Slides'
      columnHeaders={sizes.map(s => s.toUpperCase())}
      rows={slideCounts.map(total => ({
        variantLabel: `${total} slides`,
        cells: sizes.map(size => <PaginationSliderCell key={size} size={size} total={total} initialPage={1} />),
      }))}
    />
  ),
};
