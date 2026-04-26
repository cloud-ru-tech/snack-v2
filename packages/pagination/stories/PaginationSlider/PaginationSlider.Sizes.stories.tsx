import { PAGINATION_SLIDER_SIZE, PaginationSlider } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof PaginationSlider> = {
  title: 'Components/Pagination/PaginationSlider',
  component: PaginationSlider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PaginationSlider>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.col}>
      <PaginationSlider
        data-test-id='pagination-slider-xs'
        total={6}
        page={2}
        size={PAGINATION_SLIDER_SIZE.Xs}
        onChange={fn()}
      />
      <PaginationSlider
        data-test-id='pagination-slider-s'
        total={6}
        page={2}
        size={PAGINATION_SLIDER_SIZE.S}
        onChange={fn()}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('pagination-slider-xs')).toBeVisible();
    await expect(canvas.getByTestId('pagination-slider-s')).toBeVisible();
  },
};
