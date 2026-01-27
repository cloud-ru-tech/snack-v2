import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { APPEARANCE, Avatar, AvatarProps } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Appearances: Story = {
  tags: ['dev', 'autodocs'],
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="Neutral" appearance={APPEARANCE.Neutral} />
      <Avatar name="Primary" appearance={APPEARANCE.Primary} />
      <Avatar name="Red" appearance={APPEARANCE.Red} />
      <Avatar name="Green" appearance={APPEARANCE.Green} />
      <Avatar name="Blue" appearance={APPEARANCE.Blue} />
      <Avatar name="Violet" appearance={APPEARANCE.Violet} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Ключевые цветовые схемы для различных состояний:

\`\`\`tsx
import { Avatar, APPEARANCE } from '@design-system/avatar';

// Нейтральный (по умолчанию)
<Avatar name="User" appearance={APPEARANCE.Neutral} />

// Акцентный
<Avatar name="User" appearance={APPEARANCE.Primary} />

// Семантические цвета
<Avatar name="Error" appearance={APPEARANCE.Red} />
<Avatar name="Success" appearance={APPEARANCE.Green} />
<Avatar name="Info" appearance={APPEARANCE.Blue} />

// Дополнительный цвет
<Avatar name="User" appearance={APPEARANCE.Violet} />
\`\`\`
        `,
      },
    },
  },
};
