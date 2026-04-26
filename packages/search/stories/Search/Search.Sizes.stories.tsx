import { Search, SIZE } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.col}>
      <Search size={SIZE.S} placeholder='Small' />
      <Search size={SIZE.M} placeholder='Medium' />
      <Search size={SIZE.L} placeholder='Large' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const boxes = within(canvasElement).getAllByRole('searchbox');
    expect(boxes).toHaveLength(3);
  },
};
