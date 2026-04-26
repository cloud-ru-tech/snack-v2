import { Sun, SUN_SIZE } from '@ds/loader'
import { Meta, StoryObj } from '@storybook/react'

import { StoryTable } from '#storybook/components'

const meta: Meta<typeof Sun> = {
  title: 'Components/Loader/Sun',
  component: Sun,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Sun>

const keySizes = Object.values(SUN_SIZE)

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle="Sun × Size"
      firstColumnHeader="Component"
      columnHeaders={keySizes.map((size) => size.toUpperCase())}
      rows={[
        {
          variantLabel: 'Sun',
          cells: keySizes.map((size) => <Sun key={size} size={size} />),
        },
      ]}
    />
  ),
}
