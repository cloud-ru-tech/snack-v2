import { Search } from '@ds/search';
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

export const LoadingState: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.item}>
      <Search placeholder='Поиск' loading />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('searchbox')).toBeVisible();
  },
};
