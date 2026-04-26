import { LOADER_SIZE, Spinner } from '@ds/loader'
import { Meta, StoryObj } from '@storybook/react'

import { StoryTable } from '#storybook/components'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Loader/Spinner',
  component: Spinner,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Spinner>

const keySizes = Object.values(LOADER_SIZE)

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle="Spinner × Size"
      firstColumnHeader="Component"
      columnHeaders={keySizes.map((size) => size.toUpperCase())}
      rows={[
        {
          variantLabel: 'Spinner',
          cells: keySizes.map((size) => <Spinner key={size} size={size} />),
        },
      ]}
    />
  ),
}
