import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBarCircle } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof ProgressBarCircle> = {
  title: 'Components/ProgressBar/ProgressBarCircle',
  component: ProgressBarCircle,
};

export default meta;
type Story = StoryObj<typeof ProgressBarCircle>;

const keySizes = Object.values(PROGRESS_BAR_SIZE);
const keyAppearances = Object.values(APPEARANCE);
const keyProgressValues = [0, 60, 100] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Appearance × Size (progress=60)'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <ProgressBarCircle key={size} progress={60} size={size} appearance={appearance} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Progress edge values × Size (appearance=primary)'
        firstColumnHeader='progress'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyProgressValues.map(progress => ({
          variantLabel: String(progress),
          cells: keySizes.map(size => (
            <ProgressBarCircle key={size} progress={progress} size={size} appearance={APPEARANCE.Primary} />
          )),
        }))}
      />
    </>
  ),
};
