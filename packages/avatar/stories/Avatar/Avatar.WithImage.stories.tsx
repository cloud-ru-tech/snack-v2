import { Avatar, SIZE } from '@ds/avatar';
import { Meta, StoryObj } from '@storybook/react';

import portrait from './assets/portrait.svg';
import { AVATAR_TEST_ID } from './testIds';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  tags: ['dev', 'test'],
  args: {
    name: 'Jane Roe',
    size: SIZE.L,
    // svg import resolves to url string at runtime (Vite/Astro)
    src: portrait as unknown as string,
    'data-test-id': AVATAR_TEST_ID,
  },
};
