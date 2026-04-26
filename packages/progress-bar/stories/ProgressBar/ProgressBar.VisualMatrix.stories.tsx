import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBar } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/ProgressBar',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const keySizes = Object.values(PROGRESS_BAR_SIZE);
const keyAppearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Appearance × Size'
      firstColumnHeader='Appearance'
      columnHeaders={keySizes.map(s => s.toUpperCase())}
      rows={keyAppearances.map(appearance => ({
        variantLabel: appearance,
        cells: keySizes.map(size => <ProgressBar key={size} progress={60} size={size} appearance={appearance} />),
      }))}
    />
  ),
};
