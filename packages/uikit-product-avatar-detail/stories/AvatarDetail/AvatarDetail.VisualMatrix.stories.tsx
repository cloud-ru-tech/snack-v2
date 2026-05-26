import { APPEARANCE, SHAPE } from '@ds/avatar'
import { APPEARANCE as STATUS_APPEARANCE } from '@ds/status'
import { AvatarDetail } from '@ds/uikit-product-avatar-detail'
import { Meta, StoryObj } from '@storybook/react'

import { StoryTable } from '#storybook/components'

const meta: Meta<typeof AvatarDetail> = {
  title: 'Uikit Product/AvatarDetail',
  component: AvatarDetail,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof AvatarDetail>

const keyAppearances = [
  APPEARANCE.Neutral,
  APPEARANCE.Primary,
  APPEARANCE.Red,
  APPEARANCE.Green,
  APPEARANCE.Blue,
  APPEARANCE.Violet,
] as const

const keyShapes = Object.values(SHAPE)

const keyStatuses = Object.values(STATUS_APPEARANCE)

const PLACEHOLDER_AVATAR_SRC = `data:image/svg+xml;base64,${btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">' +
    '<rect width="64" height="64" rx="32" fill="#E0E0E0"/>' +
    '<circle cx="32" cy="24" r="10" fill="#9E9E9E"/>' +
    '<path d="M12 56c0-11.046 8.954-20 20-20s20 8.954 20 20" fill="#9E9E9E"/>' +
    '</svg>',
)}`

const contentVariants = [
  { label: 'name only', props: { name: 'John Doe' } },
  { label: 'name + contactData', props: { name: 'John Doe', contactData: 'jdoe@example.com' } },
  {
    label: 'name + description',
    props: { name: 'John Doe', description: 'Some text about the user' },
  },
  {
    label: 'all fields',
    props: {
      name: 'John Doe',
      contactData: 'jdoe@example.com',
      description: 'Some text about the user',
    },
  },
] as const

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <StoryTable
        cellAlign='start'
        sectionTitle='Content combinations'
        firstColumnHeader='Variant'
        columnHeaders={['Rendered']}
        rows={contentVariants.map(({ label, props }) => ({
          variantLabel: label,
          cells: [<AvatarDetail key={label} {...props} />],
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Avatar appearance'
        firstColumnHeader='Appearance'
        columnHeaders={[...keyShapes]}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keyShapes.map(shape => (
            <AvatarDetail
              key={shape}
              name='John Doe'
              contactData='jdoe@example.com'
              avatar={{ appearance, shape }}
            />
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Avatar status indicator'
        firstColumnHeader='Status'
        columnHeaders={[...keyShapes]}
        rows={keyStatuses.map(status => ({
          variantLabel: status,
          cells: keyShapes.map(shape => (
            <AvatarDetail
              key={shape}
              name='John Doe'
              contactData='jdoe@example.com'
              avatar={{ status, shape }}
            />
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Avatar with image'
        firstColumnHeader='Variant'
        columnHeaders={[...keyShapes]}
        rows={[
          {
            variantLabel: 'image only',
            cells: keyShapes.map(shape => (
              <AvatarDetail
                key={shape}
                name='John Doe'
                contactData='jdoe@example.com'
                avatar={{ src: PLACEHOLDER_AVATAR_SRC, shape }}
              />
            )),
          },
          {
            variantLabel: 'image + status',
            cells: keyShapes.map(shape => (
              <AvatarDetail
                key={shape}
                name='John Doe'
                contactData='jdoe@example.com'
                avatar={{ src: PLACEHOLDER_AVATAR_SRC, shape, status: STATUS_APPEARANCE.Green }}
              />
            )),
          },
          {
            variantLabel: 'image + all fields',
            cells: keyShapes.map(shape => (
              <AvatarDetail
                key={shape}
                name='John Doe'
                contactData='jdoe@example.com'
                description='Some text about the user'
                avatar={{ src: PLACEHOLDER_AVATAR_SRC, shape, status: STATUS_APPEARANCE.Green }}
              />
            )),
          },
        ]}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Long content (truncation)'
        firstColumnHeader='Case'
        columnHeaders={['Rendered']}
        rows={[
          {
            variantLabel: 'long name',
            cells: [
              <AvatarDetail
                key='long-name'
                name='Extremely Long Username That Should Be Truncated By The Component'
                contactData='jdoe@example.com'
              />,
            ],
          },
          {
            variantLabel: 'long contactData',
            cells: [
              <AvatarDetail
                key='long-contact'
                name='John Doe'
                contactData='very-long-email-address-that-should-be-truncated@subdomain.example.com'
              />,
            ],
          },
          {
            variantLabel: 'long description',
            cells: [
              <AvatarDetail
                key='long-desc'
                name='John Doe'
                contactData='jdoe@example.com'
                description='Very long description text that should be truncated by the component to a single line to test the TruncateString behavior'
              />,
            ],
          },
        ]}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Avatar with showTwoSymbols (single vs multi-word name)'
        firstColumnHeader='Name'
        columnHeaders={['Rendered']}
        rows={[
          {
            variantLabel: 'single word',
            cells: [<AvatarDetail key='single' name='John' contactData='jdoe@example.com' />],
          },
          {
            variantLabel: 'two words',
            cells: [<AvatarDetail key='two' name='John Doe' contactData='jdoe@example.com' />],
          },
          {
            variantLabel: 'three words',
            cells: [<AvatarDetail key='three' name='John Michael Doe' contactData='jdoe@example.com' />],
          },
        ]}
      />
    </div>
  ),
}
