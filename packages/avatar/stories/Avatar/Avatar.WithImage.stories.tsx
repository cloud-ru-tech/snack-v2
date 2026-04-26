import { Avatar, SIZE } from '@ds/avatar'
import { Meta, StoryObj } from '@storybook/react'

import portrait from './assets/portrait.svg'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  tags: ['dev', 'test'],
  args: {
    name: 'Jane Roe',
    size: SIZE.L,
    src: portrait,
    'data-test-id': 'avatar',
  },
}
