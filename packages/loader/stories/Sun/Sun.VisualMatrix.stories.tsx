import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { StoryTable } from '#storybook/components';

import loaderReadme from '../../README.md?raw';
import { Sun, SUN_SIZE, SunProps } from '../../src';

const meta: Meta<SunProps> = {
  title: 'Components/Loader/Sun',
  component: Sun,
  parameters: {
    readme: { content: loaderReadme },
  },
};

export default meta;
type Story = StoryObj<SunProps>;

const sizes = Object.values(SUN_SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      firstColumnHeader='Size'
      columnHeaders={sizes.map(s => s.toUpperCase())}
      rows={[
        {
          variantLabel: 'Preview',
          cells: sizes.map(size => <Sun key={size} size={size} />),
        },
      ]}
    />
  ),
};
