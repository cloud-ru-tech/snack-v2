import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import loaderReadme from '../../README.md?raw';
import { LOADER_SIZE, Spinner, SpinnerProps } from '../../src';

const meta: Meta<SpinnerProps> = {
  title: 'Components/Loader/Spinner',
  component: Spinner,
  parameters: {
    readme: { content: loaderReadme },
  },
};

export default meta;
type Story = StoryObj<SpinnerProps>;

const sizes = Object.values(LOADER_SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      firstColumnHeader='Size'
      columnHeaders={sizes.map(s => s.toUpperCase())}
      rows={[
        {
          variantLabel: 'Preview',
          cells: sizes.map(size => <Spinner key={size} size={size} />),
        },
      ]}
    />
  ),
};
