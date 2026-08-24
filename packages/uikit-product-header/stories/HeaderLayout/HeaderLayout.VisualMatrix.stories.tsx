import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { HeaderLayout } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Breadcrumbs, Logo, Menu, ProjectSelect, Toolbar } from '../PlugElement';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof HeaderLayout> = {
  title: 'Uikit Product/Layout/Header/HeaderLayout',
  id: 'uikit-product-header-headerlayout',
  component: HeaderLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof HeaderLayout>;

const layouts = [
  { layoutType: LAYOUT_TYPE.Desktop, label: 'desktop' },
  { layoutType: LAYOUT_TYPE.Mobile, label: 'mobile' },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Layout'
      firstColumnHeader='layoutType'
      columnHeaders={['default']}
      rows={layouts.map(({ layoutType, label }) => ({
        variantLabel: label,
        cells: [
          <AdaptiveProvider key={label} layoutType={layoutType}>
            <div className={styles.cell}>
              <HeaderLayout
                data-test-id={TEST_IDS.headerLayout.root}
                menu={<Menu />}
                logo={<Logo />}
                select={<ProjectSelect />}
                breadcrumbs={<Breadcrumbs />}
                toolbar={<Toolbar />}
              />
            </div>
          </AdaptiveProvider>,
        ],
      }))}
    />
  ),
};
