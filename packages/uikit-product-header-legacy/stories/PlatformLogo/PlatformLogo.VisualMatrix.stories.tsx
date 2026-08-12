import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof PlatformLogo> = {
  title: 'Uikit Product/Layout/Header Legacy/Platform Logo',
  component: PlatformLogo,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PlatformLogo>;

const variants = Object.values(VARIANT);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Variant'
      firstColumnHeader='variant'
      columnHeaders={['default']}
      rows={variants.map(variant => ({
        variantLabel: variant,
        cells: [<PlatformLogo key={variant} variant={variant} />],
      }))}
    />
  ),
};
