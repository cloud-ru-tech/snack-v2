import { Pagination, PAGINATION_SIZE } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.col}>
      <Pagination total={10} page={3} size={PAGINATION_SIZE.S} onChange={fn()} />
      <Pagination total={10} page={3} size={PAGINATION_SIZE.M} onChange={fn()} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const navs = within(canvasElement).getAllByRole('navigation', { name: 'Pagination' });
    expect(navs).toHaveLength(2);
  },
};
