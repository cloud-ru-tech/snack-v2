import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SIZE, TimePicker } from '../../src';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/Calendar/Time Picker',
  component: TimePicker,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

const sizes = Object.values(SIZE);
const fixedValue = { hours: 12, minutes: 34, seconds: 56 };

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Size × showSeconds'
      firstColumnHeader='Size'
      columnHeaders={['showSeconds=true', 'showSeconds=false']}
      rows={sizes.map(size => ({
        variantLabel: size,
        cells: [
          <TimePicker
            key={`with-${size}`}
            data-test-id={`timepicker-matrix-${size}-seconds`}
            size={size}
            showSeconds
            value={fixedValue}
            fitToContainer={false}
          />,
          <TimePicker
            key={`without-${size}`}
            data-test-id={`timepicker-matrix-${size}-no-seconds`}
            size={size}
            showSeconds={false}
            value={fixedValue}
            fitToContainer={false}
          />,
        ],
      }))}
    />
  ),
};
