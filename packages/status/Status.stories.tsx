import type { Meta, StoryObj } from '@storybook/react';
import { APPEARANCE, Status, STATUS_SIZE, StatusProps } from './src';

const meta: Meta<StatusProps> = {
  title: 'Components/Status/Status',
  component: Status,
  args: {
    children: 'Label text',
    appearance: APPEARANCE.Primary,
    size: STATUS_SIZE.Xs,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст статуса',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    size: {
      control: 'select',
      options: Object.values(STATUS_SIZE),
      description: 'Размер статуса',
    },
  },
};

export default meta;
type Story = StoryObj<StatusProps>;

export const Basic: Story = {
  args: {
    children: 'Label text',
    appearance: APPEARANCE.Primary,
    size: STATUS_SIZE.Xs,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Status appearance={APPEARANCE.Primary} size={STATUS_SIZE.Xs}>
        Label text
      </Status>
      <Status appearance={APPEARANCE.Primary} size={STATUS_SIZE.S}>
        Label text
      </Status>
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Status appearance={APPEARANCE.Primary}>Label text</Status>
        <Status appearance={APPEARANCE.Neutral}>Label text</Status>
        <Status appearance={APPEARANCE.Red}>Label text</Status>
        <Status appearance={APPEARANCE.Orange}>Label text</Status>
        <Status appearance={APPEARANCE.Yellow}>Label text</Status>
        <Status appearance={APPEARANCE.Green}>Label text</Status>
        <Status appearance={APPEARANCE.Blue}>Label text</Status>
        <Status appearance={APPEARANCE.Violet}>Label text</Status>
        <Status appearance={APPEARANCE.Pink}>Label text</Status>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(STATUS_SIZE).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ minWidth: 40, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <Status key={appearance} appearance={appearance} size={size}>
              Label text
            </Status>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithCustomText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Status appearance={APPEARANCE.Green}>Online</Status>
        <Status appearance={APPEARANCE.Neutral}>Offline</Status>
        <Status appearance={APPEARANCE.Red}>Error</Status>
        <Status appearance={APPEARANCE.Orange}>Pending</Status>
        <Status appearance={APPEARANCE.Yellow}>Warning</Status>
        <Status appearance={APPEARANCE.Blue}>Processing</Status>
      </div>
    </div>
  ),
};

















