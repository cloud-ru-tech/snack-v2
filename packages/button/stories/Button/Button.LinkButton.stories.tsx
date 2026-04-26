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

export const LinkButton: Story = {
  tags: ['dev'],
  args: {
    as: 'a',
    href: 'https://example.com',
    target: '_blank',
    label: 'Open docs',
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: 'Open docs' });
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};
