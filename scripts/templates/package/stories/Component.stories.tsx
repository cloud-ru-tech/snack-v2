import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'

import { {{COMPONENT_NAME}} } from '@ds/{{PKG_NAME}}'

const meta: Meta<typeof {{COMPONENT_NAME}}> = {
  title: 'Components/{{DISPLAY_TITLE}}',
  component: {{COMPONENT_NAME}},
  parameters: { layout: 'centered' },
  args: {
    children: '{{DISPLAY_TITLE}}',
    variant: 'default',
    'data-test-id': '{{COMPONENT_KEBAB}}',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'outlined'],
    },
  },
}

export default meta
type Story = StoryObj<typeof {{COMPONENT_NAME}}>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getByTestId('{{COMPONENT_KEBAB}}')
    await expect(root).toBeVisible()
  },
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(2, max-content)' }}>
      <{{COMPONENT_NAME}} variant='default'>{{DISPLAY_TITLE}} default</{{COMPONENT_NAME}}>
      <{{COMPONENT_NAME}} variant='outlined'>{{DISPLAY_TITLE}} outlined</{{COMPONENT_NAME}}>
    </div>
  ),
}
