import { Button } from '@ds/button';
import { SettingsSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const IconOnly: Story = {
  tags: ['dev'],
  args: {
    icon: <SettingsSVG />,
    'aria-label': 'Settings',
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Settings' });
    await expect(button).toHaveAttribute('data-variant', 'icon-only');
  },
};
