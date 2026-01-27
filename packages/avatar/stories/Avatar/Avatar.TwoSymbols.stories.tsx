import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarProps } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const TwoSymbols: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    name: 'John Doe',
    showTwoSymbols: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Отображение двух символов вместо одного:

\`\`\`tsx
<Avatar 
  name="John Doe"
  showTwoSymbols={true}
/>
// Отобразит "JD"
\`\`\`
        `,
      },
    },
  },
};
