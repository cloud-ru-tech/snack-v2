import { ButtonGroup } from '@design-system/button';
import { PlaceholderSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import readme from '../../README.md?raw';
import { ALIGN, InfoBlock, type InfoBlockProps, SIZE } from '../../src';

const meta: Meta<InfoBlockProps> = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  parameters: {
    readme: { content: readme },
  },
};

export default meta;

type Story = StoryObj<InfoBlockProps>;

const sizes = Object.values(SIZE);
const aligns = Object.values(ALIGN);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Align × Size'
        firstColumnHeader='Align'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={aligns.map(align => ({
          variantLabel: align,
          cells: sizes.map(size => (
            <InfoBlock
              key={`${align}-${size}`}
              title='Title text'
              description='Content text'
              icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
              size={size}
              align={align}
              footer={
                <ButtonGroup
                  size={size}
                  primaryAction={{ label: 'Label text', view: 'filled' }}
                  secondaryAction={{ label: 'Label text', view: 'tonal' }}
                />
              }
            />
          )),
        }))}
      />
    </>
  ),
};
