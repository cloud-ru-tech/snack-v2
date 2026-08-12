import { HeaderLayout } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Breadcrumbs, BreadcrumbsMobile, Logo, Menu, ProjectSelect, Toolbar } from '../PlugElement';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof HeaderLayout> = {
  title: 'Uikit Product/Layout/Header Legacy/HeaderLayout',
  component: HeaderLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof HeaderLayout>;

const layouts = [
  { isMobile: false, label: 'wide' },
  { isMobile: true, label: 'narrow' },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Layout'
      firstColumnHeader='Viewport'
      columnHeaders={['with all slots']}
      rows={layouts.map(({ isMobile, label }) => ({
        variantLabel: label,
        cells: [
          <HeaderLayout
            key={label}
            data-test-id={TEST_IDS.root}
            isMobile={isMobile}
            menu={<Menu />}
            logo={<Logo />}
            select={<ProjectSelect />}
            breadcrumbs={isMobile ? <BreadcrumbsMobile /> : <Breadcrumbs />}
            toolbar={<Toolbar />}
          />,
        ],
      }))}
    />
  ),
};
