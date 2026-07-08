import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { DEFAULT_PAGE_SIZE, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint } from '#storybook/components';

import { TableStorySurfaceSync } from '../../components/TableStorySurfaceSync';
import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';
import exampleStyles from './styles.module.scss';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/MobileLayout',
  component: Table,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = buildUserColumns({ withStatusColumn: true });

export const MobileLayout: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <TableStorySurfaceSync>
        <DemoHint>
          `layoutType=&quot;mobile&quot;` (из `AdaptiveProvider`) + `defaultView=&quot;cards&quot;` — вертикальный
          список карточек; сортировка и настройки колонок — иконки в строке тулбара (BottomSheet). Переключите на
          table-вид сегментом в тулбаре — появится сетка со строками. По умолчанию `stickyControls=true`: тулбар, header
          (в table-view) и пагинация — sticky при скролле страницы; контент растёт по высоте. `stickyControls=false` —
          сплошной поток без sticky.
        </DemoHint>
        <div className={exampleStyles.pageScrollDemo}>
          <div className={styles.mobileCell}>
            <Table
              data-test-id={TEST_IDS.table.root}
              data={SAMPLE_USERS}
              columnDefinitions={columns}
              showDataView
              headlineId='name'
              rowSelection={{ enable: true, multiRow: true }}
              columnsSettings={{ enableSettingsMenu: true }}
              sorting={{}}
              outline
            />
          </div>
        </div>
      </TableStorySurfaceSync>
    </AdaptiveProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await expect(root).toHaveAttribute('data-layout-type', 'mobile');
    await expect(root).toHaveAttribute('data-sticky-controls', 'true');
    await expect(root).toHaveAttribute('data-view', 'cards');
    await expect(within(root).getAllByTestId(TEST_IDS.component.card)).toHaveLength(DEFAULT_PAGE_SIZE);
    await expect(within(root).queryByTestId(TEST_IDS.component.headerRow)).toBeNull();
  },
};
