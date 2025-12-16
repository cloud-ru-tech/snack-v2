import type { Meta, StoryObj } from '@storybook/react';
import { APPEARANCE, STATUS_INDICATOR_SIZE, StatusIndicator, StatusIndicatorProps } from './src';

const meta: Meta<StatusIndicatorProps> = {
  title: 'Components/Status/Status Indicator',
  component: StatusIndicator,
  args: {
    appearance: APPEARANCE.Primary,
    size: STATUS_INDICATOR_SIZE.Xs,
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    size: {
      control: 'select',
      options: Object.values(STATUS_INDICATOR_SIZE),
      description: 'Размер индикатора',
    },
  },
};

export default meta;
type Story = StoryObj<StatusIndicatorProps>;

export const Basic: Story = {
  args: {
    appearance: APPEARANCE.Primary,
    size: STATUS_INDICATOR_SIZE.Xs,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#666' }}>4xs</div>
        <StatusIndicator appearance={APPEARANCE.Primary} size={STATUS_INDICATOR_SIZE['4Xs']} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#666' }}>3xs</div>
        <StatusIndicator appearance={APPEARANCE.Primary} size={STATUS_INDICATOR_SIZE['3Xs']} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#666' }}>2xs</div>
        <StatusIndicator appearance={APPEARANCE.Primary} size={STATUS_INDICATOR_SIZE['2Xs']} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#666' }}>xs</div>
        <StatusIndicator appearance={APPEARANCE.Primary} size={STATUS_INDICATOR_SIZE.Xs} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#666' }}>s</div>
        <StatusIndicator appearance={APPEARANCE.Primary} size={STATUS_INDICATOR_SIZE.S} />
      </div>
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <StatusIndicator appearance={APPEARANCE.Primary} />
      <StatusIndicator appearance={APPEARANCE.Neutral} />
      <StatusIndicator appearance={APPEARANCE.Red} />
      <StatusIndicator appearance={APPEARANCE.Orange} />
      <StatusIndicator appearance={APPEARANCE.Yellow} />
      <StatusIndicator appearance={APPEARANCE.Green} />
      <StatusIndicator appearance={APPEARANCE.Blue} />
      <StatusIndicator appearance={APPEARANCE.Violet} />
      <StatusIndicator appearance={APPEARANCE.Pink} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(STATUS_INDICATOR_SIZE).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ minWidth: 60, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <StatusIndicator key={appearance} appearance={appearance} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};


