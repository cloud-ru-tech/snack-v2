import { Meta, StoryObj } from '@storybook/react'

import { StoryTable } from '#storybook/components'
import { {{COMPONENT_NAME}}, VARIANT } from '@ds/{{PKG_NAME}}'

const meta: Meta<typeof {{COMPONENT_NAME}}> = {
  title: 'Components/{{DISPLAY_TITLE}}',
  component: {{COMPONENT_NAME}},
}

export default meta
type Story = StoryObj<typeof {{COMPONENT_NAME}}>

const keyVariants = Object.values(VARIANT)

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Variant'
      firstColumnHeader='Variant'
      columnHeaders={['Default content']}
      rows={keyVariants.map(variant => ({
        variantLabel: variant,
        cells: [<{{COMPONENT_NAME}} key={variant} variant={variant}>{{DISPLAY_TITLE}}</{{COMPONENT_NAME}}>],
      }))}
    />
  ),
}
