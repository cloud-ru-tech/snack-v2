import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { NoAccess, NoAccessProps } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<NoAccessProps> = {
  title: 'Uikit Product/Layout/Layout/NoAccess',
  id: 'uikit-product-layout-noaccess',
  component: NoAccess,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<NoAccessProps>;

const adaptiveLayouts = [
  { layoutType: LAYOUT_TYPE.Desktop, label: 'desktop (wide)', cellClass: styles.cellDesktop },
  { layoutType: LAYOUT_TYPE.Mobile, label: 'mobile (narrow)', cellClass: styles.cellMobile },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Layout × ServiceName'
        firstColumnHeader='layoutType'
        columnHeaders={['without serviceName', 'with serviceName']}
        rows={adaptiveLayouts.map(({ layoutType, label, cellClass }) => ({
          variantLabel: label,
          cells: [undefined, 'Название сервиса'].map(serviceName => (
            <AdaptiveProvider key={`${label}-${serviceName ?? 'none'}`} layoutType={layoutType}>
              <div className={cellClass}>
                <NoAccess serviceName={serviceName} />
              </div>
            </AdaptiveProvider>
          )),
        }))}
      />
    </div>
  ),
};
