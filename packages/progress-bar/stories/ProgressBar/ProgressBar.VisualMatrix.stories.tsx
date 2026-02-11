import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import progressbarReadme from '../../README.md?raw';
import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBar, ProgressBarProps } from '../../src';

const meta: Meta<ProgressBarProps> = {
  title: 'Components/ProgressBar/ProgressBar',
  component: ProgressBar,
  parameters: {
    readme: { content: progressbarReadme },
  },
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

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
