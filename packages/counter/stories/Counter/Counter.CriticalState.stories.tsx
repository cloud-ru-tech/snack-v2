import { APPEARANCE, Counter } from '@ds/counter'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Counter>

export const CriticalState: Story = {
  tags: ['dev'],
  args: { value: 3, appearance: APPEARANCE.Critical },
}
