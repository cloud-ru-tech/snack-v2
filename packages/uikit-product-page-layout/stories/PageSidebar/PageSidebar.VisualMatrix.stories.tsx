import { PageSidebar } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import {
  SIDEBAR_FOOTER_ITEMS,
  SIDEBAR_HEADER_BACK,
  SIDEBAR_HEADER_TITLE,
  SIDEBAR_ITEMS,
  SIDEBAR_SERVICE_ITEMS,
} from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PageSidebar> = {
  title: 'Uikit Product/PageLayout/PageSidebar',
  component: PageSidebar,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PageSidebar>;

const baseProps = {
  items: SIDEBAR_ITEMS,
  footerItems: SIDEBAR_FOOTER_ITEMS,
  selected: 'overview',
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State'
        firstColumnHeader='Scenario'
        columnHeaders={['header title + search', 'header back + flat items + badge']}
        rows={[
          {
            variantLabel: 'expanded',
            cells: [
              <div key='title' className={styles.sidebarFrame}>
                <PageSidebar
                  {...baseProps}
                  header={SIDEBAR_HEADER_TITLE}
                  hasSearch
                  defaultOpen
                  data-test-id={TEST_IDS.pageSidebar.root}
                />
              </div>,
              // «back»-заголовок + плоский список пунктов, часть с бейджем «Preview» в afterContent.
              <div key='back' className={styles.sidebarFrame}>
                <PageSidebar
                  {...baseProps}
                  items={SIDEBAR_SERVICE_ITEMS}
                  selected='info'
                  header={SIDEBAR_HEADER_BACK}
                  defaultOpen
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
