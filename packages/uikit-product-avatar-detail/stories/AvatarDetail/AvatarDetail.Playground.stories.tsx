import { AvatarDetail } from '@ds/uikit-product-avatar-detail'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'

import { TEST_IDS } from './testIds'

const meta: Meta<typeof AvatarDetail> = {
  title: 'Uikit Product/AvatarDetail',
  component: AvatarDetail,
  parameters: { layout: 'centered' },
  args: {
    name: 'John Doe',
    contactData: 'jdoe@example.com',
    description: 'Some text about the user',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    name: { control: 'text' },
    contactData: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AvatarDetail>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible()
  },
}
