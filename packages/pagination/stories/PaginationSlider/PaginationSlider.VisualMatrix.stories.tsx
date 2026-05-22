import { PAGINATION_SLIDER_SIZE, PaginationSlider } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof PaginationSlider> = {
  title: 'Components/Pagination/PaginationSlider',
  component: PaginationSlider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PaginationSlider>;

const sizes = [PAGINATION_SLIDER_SIZE.Xs, PAGINATION_SLIDER_SIZE.S] as const;
const pages = [1, 3, 6] as const;

const noop = () => {};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × Current page (total=6)'
        firstColumnHeader='Size'
        columnHeaders={pages.map(p => `page ${p}`)}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: pages.map(page => (
            <PaginationSlider key={`${size}-${page}`} total={6} page={page} size={size} onChange={noop} />
          )),
        }))}
      />
    </div>
  ),
};
