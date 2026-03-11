import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { APPEARANCE, SIZE, Tag, type TagProps } from '../../src';

const meta: Meta<TagProps> = {
  title: 'Components/Tag/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<TagProps>;

const keySizes = [SIZE.Xs, SIZE.S, SIZE.M];
const keyAppearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => <Tag key={size} label='Label text' size={size} appearance={appearance} />),
        }))}
      />

      <StoryTable
        sectionTitle='Removable × Size'
        firstColumnHeader='Size'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'Removable',
            cells: keySizes.map(size => (
              <Tag key={size} label='Label text' size={size} appearance={APPEARANCE.Primary} onDelete={() => {}} />
            )),
          },
        ]}
      />
    </>
  ),
};
