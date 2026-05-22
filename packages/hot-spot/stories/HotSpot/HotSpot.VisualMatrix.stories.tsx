import { Button } from '@ds/button';
import { APPEARANCE, HotSpot, HotSpotProps, PLACEMENT } from '@ds/hot-spot';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<HotSpotProps> = {
  title: 'Components/HotSpot',
  component: HotSpot,
};

export default meta;
type Story = StoryObj<HotSpotProps>;

const keyAppearances = Object.values(APPEARANCE);
const pulseVariants = [true, false] as const;
const placements = Object.values(PLACEMENT);
const placementShowcaseAppearances = [APPEARANCE.Primary, APPEARANCE.Red, APPEARANCE.Green] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
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
      <StoryTable
        sectionTitle='Placement × Appearance'
        firstColumnHeader='Placement'
        columnHeaders={placementShowcaseAppearances.map(a => a)}
        rows={placements.map(placement => ({
          variantLabel: placement,
          cells: placementShowcaseAppearances.map(appearance => (
            <HotSpot key={`${placement}-${appearance}`} placement={placement} appearance={appearance} pulse={false}>
              <Button label='Target' view='outline' />
            </HotSpot>
          )),
        }))}
      />
    </div>
  ),
};
