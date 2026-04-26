import { Counter, VARIANT } from '@ds/counter'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Counter>

export const CountK: Story = {
  name: 'Variant — count-k',
  tags: ['dev'],
  args: { value: 2500, variant: VARIANT.CountK },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('K')).toBeVisible()
  },
}
