import { Button, ICON_POSITION } from '@ds/button';
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

export const CounterInline: Story = {
  tags: ['dev'],
  args: {
    label: 'Inbox',
    counter: { value: 12 },
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveAttribute('data-counter', 'true');
  },
};

export const CounterBadge: Story = {
  tags: ['dev'],
  args: {
    label: 'Notifications',
    icon: <SettingsSVG />,
    iconPosition: ICON_POSITION.After,
    counter: { value: 5 },
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveAttribute('data-counter', 'true');
    await expect(button).toHaveAttribute('data-variant', 'icon-after');
  },
};
