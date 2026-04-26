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
      <PaginationSlider total={6} page={2} size={PAGINATION_SLIDER_SIZE.Xs} onChange={fn()} />
      <PaginationSlider total={6} page={2} size={PAGINATION_SLIDER_SIZE.S} onChange={fn()} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const navs = within(canvasElement).getAllByRole('navigation', { name: 'Pagination slider' });
    expect(navs).toHaveLength(2);
  },
};
