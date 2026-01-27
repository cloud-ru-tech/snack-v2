import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Avatar, AvatarProps, SHAPE } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Shapes: Story = {
  tags: ['dev', 'autodocs'],
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="Round" shape={SHAPE.Round} />
      <Avatar name="Square" shape={SHAPE.Square} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Две доступные формы аватара:

\`\`\`tsx
import { Avatar, SHAPE } from '@design-system/avatar';

// Круглый (для пользователей)
<Avatar name="John Doe" shape={SHAPE.Round} />

// Квадратный (для организаций/брендов)
<Avatar name="Company" shape={SHAPE.Square} />
\`\`\`
        `,
      },
    },
  },
};
