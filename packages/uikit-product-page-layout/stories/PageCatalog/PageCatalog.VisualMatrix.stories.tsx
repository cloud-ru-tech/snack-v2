import { LAYOUT_TYPE } from '@ds/adaptive';
import { PageCatalog } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, StoryTable } from '#storybook/components';

import { CatalogCards, PAGE_ACTIONS } from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PageCatalog> = {
  title: 'Uikit Product/PageLayout/PageCatalog',
  component: PageCatalog,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PageCatalog>;

const content = <CatalogCards />;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='layoutType'
        firstColumnHeader='layoutType'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'desktop',
            cells: [
              <div key='d' className={styles.deviceDesktop}>
                <LayoutScope layoutType={LAYOUT_TYPE.Desktop}>
                  <PageCatalog title='Каталог сервисов' actions={PAGE_ACTIONS} data-test-id={TEST_IDS.pageCatalog.root}>
                    {content}
                  </PageCatalog>
                </LayoutScope>
              </div>,
            ],
          },
          {
            variantLabel: 'mobile',
            cells: [
              <div key='m' className={styles.deviceMobile}>
                <LayoutScope layoutType={LAYOUT_TYPE.Mobile}>
                  <PageCatalog title='Каталог сервисов' actions={PAGE_ACTIONS} maxVisibleActionsItems={1}>
                    {content}
                  </PageCatalog>
                </LayoutScope>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
