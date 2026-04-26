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
      <Search size={SIZE.S} placeholder='Small' data-test-id='search-s' />
      <Search size={SIZE.M} placeholder='Medium' data-test-id='search-m' />
      <Search size={SIZE.L} placeholder='Large' data-test-id='search-l' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('search-s')).toBeVisible();
    await expect(within(canvasElement).getByTestId('search-m')).toBeVisible();
    await expect(within(canvasElement).getByTestId('search-l')).toBeVisible();
  },
};
