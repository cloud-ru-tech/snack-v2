import { APPEARANCE, IconPredefined, IconPredefinedProps, SIZE } from '@ds/icon-predefined';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<IconPredefinedProps> = {
  title: 'Components/IconPredefined',
  component: IconPredefined,
};

export default meta;

type Story = StoryObj<IconPredefinedProps>;

const keySizes = Object.values(SIZE);
const keyShapes = ['rounded', 'squared'] as const;
const keyAppearances = Object.values(APPEARANCE);

const columnHeaders = keySizes.flatMap(size => keyShapes.map(shape => `${size} ${shape}`));

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
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
              background
            />
          )),
        ),
      }))}
    />
  ),
};
