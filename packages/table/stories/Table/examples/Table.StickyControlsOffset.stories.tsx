import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Table, TABLE_CSS_VARS, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint } from '#storybook/components';

import { TableStorySurfaceSync } from '../../components/TableStorySurfaceSync';
import { buildUserColumns, makeUsers } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';
import exampleStyles from './styles.module.scss';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/StickyControlsOffset',
  component: Table,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = buildUserColumns({ withStatusColumn: true });

const STICKY_DEMO_USERS = makeUsers(40);
const STICKY_DEMO_PAGE_SIZE = 20;

const APP_HEADER_HEIGHT = 56;
const TAB_BAR_HEIGHT = 48;

export const StickyControlsOffset: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <TableStorySurfaceSync>
        <div className={exampleStyles.pageScrollDemo}>
          <div
            className={exampleStyles.mockAppHeader}
            style={{ height: APP_HEADER_HEIGHT }}
            data-test-id='mock-app-header'
          >
            Mock app header ({APP_HEADER_HEIGHT}px)
          </div>
          <DemoHint>
            `layoutPresets.mobile.stickyControls`: toolbar и pagination липнут ниже mock app header и выше mock tab bar.
            Прокрутите страницу — chrome таблицы не перекрывает внешний UI.
          </DemoHint>
          <div className={styles.mobileCell}>
            <Table
              data-test-id={TEST_IDS.table.root}
              data={STICKY_DEMO_USERS}
              pageSize={STICKY_DEMO_PAGE_SIZE}
              columnDefinitions={columns}
              layoutPresets={{
                mobile: {
                  // Дефолт mobile — cards; sticky-хром демонстрируется на table-view (строки + пагинация).
                  defaultView: VIEW.Table,
                  stickyControls: {
                    enabled: true,
                    offsetTop: APP_HEADER_HEIGHT,
                    offsetBottom: TAB_BAR_HEIGHT,
                  },
                },
              }}
              sorting={{}}
              outline
            />
          </div>
          <div className={exampleStyles.mockTabBar} style={{ height: TAB_BAR_HEIGHT }} data-test-id='mock-tab-bar'>
            Mock tab bar ({TAB_BAR_HEIGHT}px)
          </div>
        </div>
      </TableStorySurfaceSync>
    </AdaptiveProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await expect(root).toHaveAttribute('data-sticky-controls', 'true');
    await expect(root).toHaveStyle({
      [TABLE_CSS_VARS.stickyControlsOffsetTop]: `${APP_HEADER_HEIGHT}px`,
      [TABLE_CSS_VARS.stickyControlsOffsetBottom]: `${TAB_BAR_HEIGHT}px`,
    });
  },
};
