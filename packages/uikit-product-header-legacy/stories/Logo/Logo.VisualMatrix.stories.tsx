import { HEADER_LOGO_MODE, Logo } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof Logo> = {
  title: 'Uikit Product/Layout/Header Legacy/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Logo>;

const modes = Object.values(HEADER_LOGO_MODE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Mode'
      firstColumnHeader='mode'
      columnHeaders={['default']}
      rows={modes.map(mode => ({
        variantLabel: mode,
        cells: [<Logo key={mode} href='#' mode={mode} />],
      }))}
    />
  ),
};
