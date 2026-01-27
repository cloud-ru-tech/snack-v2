import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Avatar, AvatarProps } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const LongNameTest: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="John" />
      <Avatar name="John Doe" />
      <Avatar name="John Michael Doe" />
      <Avatar name="John Michael Doe" showTwoSymbols />
    </div>
  ),
};
