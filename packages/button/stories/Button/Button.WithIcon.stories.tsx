import { Button, ICON_POSITION } from '@ds/button';
import { DownloadSVG, SettingsSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const IconBefore: Story = {
  tags: ['dev'],
  args: {
    label: 'Settings',
    icon: <SettingsSVG />,
    iconPosition: ICON_POSITION.Before,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'data-variant',
      'icon-before',
    );
  },
};

export const IconAfter: Story = {
  tags: ['dev'],
  args: {
    label: 'Download',
    icon: <DownloadSVG />,
    iconPosition: ICON_POSITION.After,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Download' })).toHaveAttribute(
      'data-variant',
      'icon-after',
    );
  },
};
