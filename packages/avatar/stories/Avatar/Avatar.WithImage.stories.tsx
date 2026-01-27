import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarProps } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const WithImage: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
  },
  parameters: {
    docs: {
      description: {
        story: `
Avatar с изображением. При ошибке загрузки автоматически отобразятся инициалы:

\`\`\`tsx
<Avatar 
  name="John Doe"
  src="https://i.pravatar.cc/150?img=1"
/>
\`\`\`
        `,
      },
    },
  },
};
