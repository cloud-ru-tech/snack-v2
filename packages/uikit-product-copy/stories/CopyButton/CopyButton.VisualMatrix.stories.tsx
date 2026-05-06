import { CopyButton } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof CopyButton> = {
  title: 'Uikit Product/Copy/CopyButton',
  component: CopyButton,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

const sizes = ['s', 'm', 'l'] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Size × Label'
      firstColumnHeader='Size'
      columnHeaders={['Icon only', 'With label']}
      rows={sizes.map(size => ({
        variantLabel: size,
        cells: [
          <CopyButton key={`${size}-icon`} size={size} valueToCopy='copy-me' />,
          <CopyButton key={`${size}-label`} size={size} valueToCopy='copy-me' label='Copy' />,
        ],
      }))}
    />
  ),
};
