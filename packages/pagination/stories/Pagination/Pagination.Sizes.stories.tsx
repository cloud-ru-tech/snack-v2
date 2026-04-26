import { Pagination, PAGINATION_SIZE } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.col}>
      <Pagination data-test-id='pagination-s' total={10} page={3} size={PAGINATION_SIZE.S} onChange={fn()} />
      <Pagination data-test-id='pagination-m' total={10} page={3} size={PAGINATION_SIZE.M} onChange={fn()} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('pagination-s')).toBeVisible();
    await expect(canvas.getByTestId('pagination-m')).toBeVisible();
  },
};
