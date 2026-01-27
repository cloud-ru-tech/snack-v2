import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Avatar, AvatarProps, SIZE } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Sizes: Story = {
  tags: ['dev', 'autodocs'],
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="XS" size={SIZE.Xs} />
      <Avatar name="S" size={SIZE.S} />
      <Avatar name="M" size={SIZE.M} />
      <Avatar name="L" size={SIZE.L} />
      <Avatar name="6XL" size={SIZE['6Xl']} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Ключевые размеры аватара от extra small до extra large:

\`\`\`tsx
import { Avatar, SIZE } from '@design-system/avatar';

// Extra Small (16px)
<Avatar name="User" size={SIZE.Xs} />

// Small (24px)
<Avatar name="User" size={SIZE.S} />

// Medium (32px) - default
<Avatar name="User" size={SIZE.M} />

// Large (48px)
<Avatar name="User" size={SIZE.L} />

// 6XL (96px)
<Avatar name="User" size={SIZE['6Xl']} />
\`\`\`
        `,
      },
    },
  },
};
