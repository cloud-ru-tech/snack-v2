import { Button } from '@ds/button';
import { HotSpot, HotSpotProps, PLACEMENT } from '@ds/hot-spot';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<HotSpotProps> = {
  title: 'Components/HotSpot',
  component: HotSpot,
};

export default meta;
type Story = StoryObj<HotSpotProps>;

const placements = Object.values(PLACEMENT);

export const Placements: Story = {
  tags: ['dev'],
  render: () => (
    <StoryTable
      sectionTitle='Placement'
      firstColumnHeader='Placement'
      columnHeaders={['Preview']}
      rows={placements.map(placement => ({
        variantLabel: placement,
        cells: [
          <HotSpot key={placement} placement={placement} pulse={false}>
            <Button label='Target' view='outline' />
          </HotSpot>,
        ],
      }))}
    />
  ),
};
