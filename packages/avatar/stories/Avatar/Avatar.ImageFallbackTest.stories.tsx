import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Avatar, AvatarProps } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const ImageFallbackTest: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="John Doe" src="https://invalid-url.com/image.jpg" />
      <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" />
      <Avatar name="Bob Johnson" src="https://invalid-url.com/image.jpg" showTwoSymbols />
    </div>
  ),
};
