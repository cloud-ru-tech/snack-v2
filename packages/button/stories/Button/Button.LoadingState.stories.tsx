import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const LoadingState: Story = {
  tags: ['dev', 'no-a11y'],
  args: {
    label: 'Submitting',
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('data-loading', 'true');
  },
};
