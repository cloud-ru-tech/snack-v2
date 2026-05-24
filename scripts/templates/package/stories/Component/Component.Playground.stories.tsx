import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'

import { {{COMPONENT_NAME}}, VARIANT } from '@ds/{{PKG_NAME}}'

import { TEST_IDS } from './testIds'

const meta: Meta<typeof {{COMPONENT_NAME}}> = {
  title: 'Components/{{DISPLAY_TITLE}}',
  component: {{COMPONENT_NAME}},
  parameters: { layout: 'centered' },
  args: {
    children: '{{DISPLAY_TITLE}}',
    variant: VARIANT.Default,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    variant: { control: 'radio', options: Object.values(VARIANT) },
  },
}

export default meta
type Story = StoryObj<typeof {{COMPONENT_NAME}}>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible()
  },
}
