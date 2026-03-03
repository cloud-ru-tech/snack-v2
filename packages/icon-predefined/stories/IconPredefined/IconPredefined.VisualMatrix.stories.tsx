import { PlaceholderSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { APPEARANCE, IconPredefined, type IconPredefinedProps, SIZE } from '../../src';

const meta: Meta<IconPredefinedProps> = {
  title: 'Components/IconPredefined',
  component: IconPredefined,
};

export default meta;

type Story = StoryObj<IconPredefinedProps>;

const keySizes = Object.values(SIZE);
const keyShapes = ['round', 'square'] as const;
const keyAppearances = Object.values(APPEARANCE);

const columnHeaders = keySizes.flatMap(size => keyShapes.map(shape => `${size} ${shape}`));

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Appearance × Size × Shape'
      firstColumnHeader='Appearance'
      columnHeaders={columnHeaders}
      rows={keyAppearances.map(appearance => ({
        variantLabel: appearance,
        cells: keySizes.flatMap(size =>
          keyShapes.map(shape => (
            <IconPredefined
              key={`${size}-${shape}`}
              icon={PlaceholderSVG}
              appearance={appearance}
              size={size}
              shape={shape}
              decor
            />
          )),
        ),
      }))}
    />
  ),
};
