import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBar } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/ProgressBar',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const STEPS = [0, 25, 50, 75, 100] as const;

export const ProgressStates: Story = {
  tags: ['dev'],
  render: () => (
    <StoryTable
      sectionTitle='Заполненность'
      firstColumnHeader='Size'
      columnHeaders={STEPS.map(v => `${v}%`)}
      rows={Object.values(PROGRESS_BAR_SIZE).map(size => ({
        variantLabel: size,
        cells: STEPS.map(v => <ProgressBar key={v} progress={v} size={size} appearance={APPEARANCE.Primary} />),
      }))}
    />
  ),
};
