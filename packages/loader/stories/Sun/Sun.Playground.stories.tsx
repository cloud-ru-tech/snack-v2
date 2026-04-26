import { Sun, SUN_SIZE } from '@ds/loader'
import { Meta, StoryObj } from '@storybook/react'
import { expect } from 'storybook/test'

const meta: Meta<typeof Sun> = {
  title: 'Components/Loader/Sun',
  component: Sun,
  parameters: { layout: 'centered' },
  args: { size: SUN_SIZE.M },
  argTypes: {
    size: { control: 'radio', options: Object.values(SUN_SIZE), description: 'Размер' },
  },
}

export default meta
type Story = StoryObj<typeof Sun>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('#SunSVG')).toBeVisible()
  },
}
