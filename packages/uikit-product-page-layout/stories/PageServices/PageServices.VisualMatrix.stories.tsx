import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { PageServices } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import {
  RUNNING_STATUS,
  SERVICE_ACTIONS,
  ServiceInfoContent,
  SIDEBAR_HEADER_BACK,
  SIDEBAR_SERVICE_ITEMS,
} from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PageServices> = {
  title: 'Uikit Product/PageLayout/PageServices',
  component: PageServices,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PageServices>;

const sidebar = {
  items: SIDEBAR_SERVICE_ITEMS,
  header: SIDEBAR_HEADER_BACK,
  selected: 'info',
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Desktop'
        firstColumnHeader='sidebar'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'with',
            cells: [
              <div key='d' className={styles.deviceDesktop}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PageServices
                    title='vm-0c7afd'
                    slotAfterTitle={RUNNING_STATUS}
                    actions={SERVICE_ACTIONS}
                    sidebar={sidebar}
                    autoHeight
                    data-test-id={TEST_IDS.pageServices.root}
                  >
                    <ServiceInfoContent />
                  </PageServices>
                </AdaptiveProvider>
              </div>,
            ],
          },
          {
            variantLabel: 'without',
            cells: [
              <div key='d' className={styles.deviceDesktop}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PageServices title='vm-0c7afd' slotAfterTitle={RUNNING_STATUS} actions={SERVICE_ACTIONS} autoHeight>
                    <ServiceInfoContent />
                  </PageServices>
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Mobile'
        firstColumnHeader='sidebar'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'with',
            cells: [
              <div key='m' className={styles.deviceMobile}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <PageServices
                    title='vm-0c7afd'
                    slotAfterTitle={RUNNING_STATUS}
                    actions={SERVICE_ACTIONS}
                    maxVisibleActionsItems={1}
                    sidebar={sidebar}
                    autoHeight
                  >
                    <ServiceInfoContent />
                  </PageServices>
                </AdaptiveProvider>
              </div>,
            ],
          },
          {
            variantLabel: 'without',
            cells: [
              <div key='m' className={styles.deviceMobile}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <PageServices
                    title='vm-0c7afd'
                    slotAfterTitle={RUNNING_STATUS}
                    actions={SERVICE_ACTIONS}
                    maxVisibleActionsItems={1}
                    autoHeight
                  >
                    <ServiceInfoContent />
                  </PageServices>
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
