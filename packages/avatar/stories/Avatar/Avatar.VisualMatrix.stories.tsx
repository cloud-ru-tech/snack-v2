import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import avatarReadme from '../../README.md?raw';
import { APPEARANCE, Avatar, AvatarProps, SHAPE, SIZE } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    readme: { content: avatarReadme },
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L];
const keyAppearances = [APPEARANCE.Neutral, APPEARANCE.Primary, APPEARANCE.Red, APPEARANCE.Blue];
const shapes = Object.values(SHAPE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      {shapes.map(shape => (
        <StoryTable
          key={shape}
          sectionTitle={`${shape} Shape`}
          firstColumnHeader='Appearance'
          columnHeaders={keySizes.map(s => s.toUpperCase())}
          rows={keyAppearances.map(appearance => ({
            variantLabel: appearance,
            cells: keySizes.map(size => (
              <Avatar key={size} name='JD' size={size} shape={shape} appearance={appearance} />
            )),
          }))}
        />
      ))}
    </>
  ),
};
