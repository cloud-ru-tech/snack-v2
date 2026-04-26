import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { APPEARANCE, STATUS_INDICATOR_SIZE, StatusIndicator, StatusIndicatorProps } from '../../src';

const meta: Meta<StatusIndicatorProps> = {
  title: 'Components/Status/StatusIndicator',
  component: StatusIndicator,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<StatusIndicatorProps>;

const keySizes = Object.values(STATUS_INDICATOR_SIZE);
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
        cells: keySizes.map(size => <StatusIndicator key={size} size={size} appearance={appearance} />),
      }))}
    />
  ),
};
