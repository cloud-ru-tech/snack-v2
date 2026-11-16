import { SimpleTable } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { withTableStorySurface } from '../../decorators';
import { EmptyStateRefresh as EmptyStateRefreshExample } from './EmptyStateRefresh';

const meta: Meta<typeof SimpleTable> = {
  title: 'Components/Table/SimpleTable/Examples/EmptyStateRefresh',
  component: SimpleTable,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  decorators: [withTableStorySurface],
};

export default meta;
type Story = StoryObj<typeof SimpleTable>;

export const EmptyStateRefresh: Story = {
  tags: ['dev', 'test'],
  render: () => <EmptyStateRefreshExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryAllByRole('cell')).toHaveLength(0);
    await userEvent.click(canvas.getByRole('button', { name: 'Обновить' }));
    await expect(canvas.getByText('Анна Иванова')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Обновить' })).not.toBeInTheDocument();
  },
};
