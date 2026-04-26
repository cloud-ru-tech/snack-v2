import { Pagination, VARIANT } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const AsLink: Story = {
  tags: ['dev'],
  render: () => (
    <Pagination total={8} page={2} variant={VARIANT.Link} hrefFormatter={page => `?page=${page}`} onChange={fn()} />
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  },
};
