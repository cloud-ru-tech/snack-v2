import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { APPEARANCE, HotSpot, type HotSpotProps } from '../../src';

const meta: Meta<HotSpotProps> = {
  title: 'Components/HotSpot',
  component: HotSpot,
};

export default meta;
type Story = StoryObj<HotSpotProps>;

const keyAppearances = Object.values(APPEARANCE);
const pulseVariants = [true, false] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Appearance × Pulse'
      firstColumnHeader='Appearance'
      columnHeaders={pulseVariants.map(p => (p ? 'Pulse on' : 'Pulse off'))}
      rows={keyAppearances.map(appearance => ({
        variantLabel: appearance,
        cells: pulseVariants.map(pulse => (
          <HotSpot key={`${appearance}-${pulse}`} appearance={appearance} pulse={pulse} />
        )),
      }))}
    />
  ),
};
