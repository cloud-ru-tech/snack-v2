import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import progressbarReadme from '../../README.md?raw';
import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBarCircle, ProgressBarCircleProps } from '../../src';

const meta: Meta<ProgressBarCircleProps> = {
  title: 'Components/ProgressBar/ProgressBarCircle',
  component: ProgressBarCircle,
  parameters: {
    readme: { content: progressbarReadme },
  },
};

export default meta;
type Story = StoryObj<ProgressBarCircleProps>;

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
        cells: keySizes.map(size => <ProgressBarCircle key={size} progress={60} size={size} appearance={appearance} />),
      }))}
    />
  ),
};
