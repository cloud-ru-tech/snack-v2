import { Pagination } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { PAGINATION_TEST_ID } from './testIds';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Truncated: Story = {
  tags: ['dev'],
  render: () => <Pagination data-test-id={PAGINATION_TEST_ID} total={42} page={12} maxLength={7} onChange={fn()} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(PAGINATION_TEST_ID)).toBeVisible();
  },
};
