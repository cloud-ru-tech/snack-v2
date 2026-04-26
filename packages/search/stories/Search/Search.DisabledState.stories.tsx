import { Search } from '@ds/search';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { SEARCH_TEST_ID } from './testIds';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const DisabledState: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.item}>
      <Search placeholder='Поиск' disabled data-test-id={SEARCH_TEST_ID} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SEARCH_TEST_ID)).toBeDisabled();
  },
};
