import { within, expect } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { {{COMPONENT_NAME}} } from '@ds/{{PKG_NAME}}'

const meta: Meta<typeof {{COMPONENT_NAME}}> = {
  title: 'Components/{{DISPLAY_TITLE}}',
  component: {{COMPONENT_NAME}},
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
    },
  },
}

export default meta
type Story = StoryObj<typeof {{COMPONENT_NAME}}>

export const Default: Story = {
  args: { children: '{{DISPLAY_TITLE}}', variant: 'default' },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement).getByText('{{DISPLAY_TITLE}}')
    await expect(el).toBeVisible()
  },
}

export const Outlined: Story = {
  args: { children: '{{DISPLAY_TITLE}}', variant: 'outlined' },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement).getByText('{{DISPLAY_TITLE}}')
    await expect(el).toBeVisible()
  },
}
