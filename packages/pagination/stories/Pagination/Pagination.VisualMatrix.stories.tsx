import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import readme from '../../README.md?raw';
import { Pagination, PAGINATION_SIZE, type PaginationProps } from '../../src';

const meta: Meta<PaginationProps> = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5707-1465&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<PaginationProps>;

const sizes = Object.values(PAGINATION_SIZE);
const positions: Array<{ label: string; page: number }> = [
  { label: 'Start', page: 1 },
  { label: 'Centre', page: 50 },
  { label: 'End', page: 99 },
];
const total = 100;

function PaginationCell({ size, page: initialPage }: { size: (typeof sizes)[number]; page: number }) {
  const [page, setPage] = useState(initialPage);
  return <Pagination total={total} page={page} size={size} onChange={newPage => setPage(newPage)} />;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Size × Position'
      firstColumnHeader='Position'
      columnHeaders={sizes.map(s => s.toUpperCase())}
      rows={positions.map(({ label, page }) => ({
        variantLabel: label,
        cells: sizes.map(size => <PaginationCell key={size} size={size} page={page} />),
      }))}
    />
  ),
};
