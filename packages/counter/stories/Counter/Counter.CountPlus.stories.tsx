import { Counter, DEFAULT_PLUS_LIMIT, VARIANT } from '@ds/counter'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Counter>

export const CountPlus: Story = {
  name: 'Variant — count-plus',
  tags: ['dev'],
  args: { value: 42, variant: VARIANT.CountPlus, plusLimit: DEFAULT_PLUS_LIMIT },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('+')).toBeVisible()
  },
}
