import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import {
  ColumnDefinition,
  getRowActionsColumnDef,
  getStatusColumnDef,
  RowAppearance,
  STATUS_APPEARANCE,
  StatusAppearance,
  Table,
  TABLE_ROW_COLOR,
  TableRowColor,
  VIEW,
} from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { buildUserColumns, SAMPLE_USERS, User } from '../fixtures';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const SMALL_DATA = SAMPLE_USERS.slice(0, 4);
// Срез с заблокированным пользователем (u-5) — для selection-режимов disabled/hide-toggler
const SELECTION_DATA = SAMPLE_USERS.slice(2, 6);
const columns = buildUserColumns({ withStatusColumn: true });
const plainColumns = buildUserColumns();
const noop = () => {};
const getUserRowId = (user: User) => user.id;

const EMPTY_STATES = {
  noData: { title: 'Нет данных', description: 'Список пуст' },
  noResults: { title: 'Ничего не найдено', description: 'Измените запрос или фильтры' },
  error: { title: 'Ошибка загрузки', description: 'Не удалось получить данные' },
} as const;

// Демо-строки палитры статусов: значение поля `status` строки — само appearance,
// маппинг тождественный, в описании видно имя значения.
type StatusDemoRow = {
  id: string;
  name: string;
  status: StatusAppearance;
};

const STATUS_DEMO_ROWS: StatusDemoRow[] = Object.values(STATUS_APPEARANCE).map((appearance, index) => ({
  id: `status-${appearance}`,
  name: `Сервис ${index + 1}`,
  status: appearance,
}));

const statusDemoColumns: ColumnDefinition<StatusDemoRow>[] = [
  getStatusColumnDef<StatusDemoRow>({
    accessorKey: 'status',
    mapStatusToAppearance: value => value as StatusAppearance,
    renderDescription: value => String(value),
    header: 'Статус',
    size: 160,
  }),
  { accessorKey: 'name', header: 'Имя', size: 200 },
];

// Тонировка строк: i-я строка получает i-й цвет из TABLE_ROW_COLOR
// (red, orange, yellow, green, blue, violet, pink, neutral).
const ROW_COLORS: TableRowColor[] = Object.values(TABLE_ROW_COLOR);
const ROW_COLOR_DATA = SAMPLE_USERS.slice(0, ROW_COLORS.length);
const rowColorById = new Map<string, TableRowColor>(ROW_COLOR_DATA.map((user, index) => [user.id, ROW_COLORS[index]]));
const getDemoRowBackgroundColor = (user: User) => rowColorById.get(user.id);

// Суммарная ширина колонок больше контейнера .narrowCell (360px) — горизонтальный
// скролл делает видимыми pinned-блоки (status слева, rowActions справа) и divider.
const pinnedColumns: ColumnDefinition<User>[] = [
  ...buildUserColumns({ withStatusColumn: true }),
  getRowActionsColumnDef<User>({
    pinned: true,
    actionsGenerator: () => [{ content: { label: 'Открыть' }, onClick: noop }],
  }),
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='View'
        firstColumnHeader='View'
        columnHeaders={['Default']}
        rows={[
          {
            variantLabel: 'table',
            cells: [
              <div key='view-table' className={styles.cell}>
                <Table data={SMALL_DATA} columnDefinitions={columns} view={VIEW.Table} suppressPagination outline />
              </div>,
            ],
          },
          {
            variantLabel: 'cards',
            cells: [
              <div key='view-cards' className={styles.cardCell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  view={VIEW.Cards}
                  headlineId='name'
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'cards selected',
            cells: [
              <div key='view-cards-selected' className={styles.cardCell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  view={VIEW.Cards}
                  headlineId='name'
                  getRowId={getUserRowId}
                  rowSelection={{ enable: true, multiRow: true, initialState: { 'u-1': true } }}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'cards single (radio)',
            cells: [
              <div key='view-cards-single' className={styles.cardCell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  view={VIEW.Cards}
                  headlineId='name'
                  getRowId={getUserRowId}
                  rowSelection={{ enable: true, multiRow: false, initialState: { 'u-2': true } }}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Status appearance'
        firstColumnHeader='Axis'
        columnHeaders={['Все значения STATUS_APPEARANCE']}
        rows={[
          {
            variantLabel: 'status',
            cells: [
              <div key='status-appearance' className={styles.cell}>
                <Table
                  data={STATUS_DEMO_ROWS}
                  columnDefinitions={statusDemoColumns}
                  getRowId={row => row.id}
                  suppressToolbar
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Row color'
        firstColumnHeader='Axis'
        columnHeaders={['Все значения TABLE_ROW_COLOR']}
        rows={[
          {
            variantLabel: 'row colors',
            cells: [
              <div key='row-colors' className={styles.cell}>
                <Table
                  data={ROW_COLOR_DATA}
                  columnDefinitions={plainColumns}
                  getRowId={getUserRowId}
                  getRowBackgroundColor={getDemoRowBackgroundColor}
                  suppressToolbar
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Selection & Sorting'
        firstColumnHeader='State'
        columnHeaders={['Table']}
        rows={[
          {
            variantLabel: 'multi (checkbox)',
            cells: [
              <div key='selection-multi' className={styles.cell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  rowSelection={{ enable: true, multiRow: true, initialState: { 'u-1': true } }}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'single (radio)',
            cells: [
              <div key='selection-single' className={styles.cell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  rowSelection={{ enable: true, multiRow: false, initialState: { 'u-2': true } }}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'appearance: disabled',
            cells: [
              <div key='selection-disabled' className={styles.cell}>
                <Table
                  data={SELECTION_DATA}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  rowSelection={{
                    enable: row => row.original.status !== 'blocked',
                    multiRow: true,
                    appearance: RowAppearance.Disabled,
                  }}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'appearance: hide-toggler',
            cells: [
              <div key='selection-hide-toggler' className={styles.cell}>
                <Table
                  data={SELECTION_DATA}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  rowSelection={{
                    enable: row => row.original.status !== 'blocked',
                    multiRow: true,
                    appearance: RowAppearance.HideToggler,
                  }}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'sorted',
            cells: [
              <div key='sorted' className={styles.cell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  sorting={{ initialState: [{ id: 'name', desc: false }] }}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Pinned columns'
        firstColumnHeader='State'
        columnHeaders={['Narrow container (overflow)']}
        rows={[
          {
            variantLabel: 'left + right pinned',
            cells: [
              <div key='pinned-columns' className={styles.narrowCell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={pinnedColumns}
                  getRowId={getUserRowId}
                  suppressToolbar
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Pinned rows'
        firstColumnHeader='State'
        columnHeaders={['Table']}
        rows={[
          {
            variantLabel: 'top pinned',
            cells: [
              <div key='pinned-rows' className={styles.cell}>
                <Table
                  data={SAMPLE_USERS.slice(0, 6)}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  rowPinning={{ top: ['u-3', 'u-5'] }}
                  keepPinnedRows
                  suppressToolbar
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Toolbar & chrome'
        firstColumnHeader='State'
        columnHeaders={['Table']}
        rows={[
          {
            // bulk-бар (чекбокс + счётчик выбранных) рендерится только при multiRow
            variantLabel: 'full toolbar (bulk bar)',
            cells: [
              <div key='toolbar-full' className={styles.wideCell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  rowSelection={{ enable: true, multiRow: true, initialState: { 'u-1': true, 'u-2': true } }}
                  onRefresh={noop}
                  onExport={noop}
                  moreActions={[{ content: { label: 'Ещё' }, onClick: noop }]}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            // сегмент-контрол table/cards в тулбаре
            variantLabel: 'data view toggle',
            cells: [
              <div key='toolbar-data-view' className={styles.wideCell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  showDataView
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'suppress search',
            cells: [
              <div key='toolbar-no-search' className={styles.cell}>
                <Table
                  data={SMALL_DATA}
                  columnDefinitions={columns}
                  getRowId={getUserRowId}
                  rowSelection={{ enable: true, multiRow: true }}
                  suppressSearch
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'suppress toolbar',
            cells: [
              <div key='toolbar-suppressed' className={styles.cell}>
                <Table data={SMALL_DATA} columnDefinitions={columns} suppressToolbar suppressPagination outline />
              </div>,
            ],
          },
          {
            variantLabel: 'suppress header',
            cells: [
              <div key='header-suppressed' className={styles.cell}>
                <Table data={SMALL_DATA} columnDefinitions={columns} suppressHeader suppressPagination outline />
              </div>,
            ],
          },
          {
            variantLabel: 'no outline',
            cells: [
              <div key='no-outline' className={styles.cell}>
                <Table data={SMALL_DATA} columnDefinitions={columns} suppressPagination />
              </div>,
            ],
          },
          {
            variantLabel: 'rows-per-page options',
            cells: [
              <div key='pagination-options' className={styles.cell}>
                <Table
                  data={SAMPLE_USERS}
                  columnDefinitions={columns}
                  pageSize={5}
                  pagination={{ options: [5, 10] }}
                  outline
                />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Layout type'
        firstColumnHeader='layoutType'
        columnHeaders={['table view', 'cards view']}
        rows={[
          {
            variantLabel: 'mobile',
            cells: [
              <div key='layout-mobile-table' className={styles.mobileCell}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <Table
                    data={SMALL_DATA}
                    columnDefinitions={columns}
                    view={VIEW.Table}
                    getRowId={getUserRowId}
                    rowSelection={{ enable: true, multiRow: true }}
                    columnsSettings={{ enableSettingsMenu: true }}
                    sorting={{}}
                    suppressPagination
                    outline
                  />
                </AdaptiveProvider>
              </div>,
              <div key='layout-mobile-cards' className={styles.mobileCell}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <Table
                    data={SMALL_DATA}
                    columnDefinitions={columns}
                    view={VIEW.Cards}
                    headlineId='name'
                    getRowId={getUserRowId}
                    rowSelection={{ enable: true, multiRow: true }}
                    columnsSettings={{ enableSettingsMenu: true }}
                    sorting={{}}
                    suppressPagination
                    outline
                  />
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Loading & Empty states'
        firstColumnHeader='State'
        columnHeaders={['Table']}
        rows={[
          {
            variantLabel: 'loading',
            cells: [
              <div key='loading' className={styles.cell} data-test-id={TEST_IDS.visualMatrix.loadingSection}>
                <Table data={[]} columnDefinitions={columns} loading suppressPagination outline />
              </div>,
            ],
          },
          {
            // skeleton-строки добавляются под уже загруженные данные
            variantLabel: 'infinite loading',
            cells: [
              <div key='infinite-loading' className={styles.cell}>
                <Table data={SMALL_DATA} columnDefinitions={columns} infiniteLoading loading outline />
              </div>,
            ],
          },
          {
            variantLabel: 'no data',
            cells: [
              <div key='no-data' className={styles.cell}>
                <Table
                  data={[]}
                  columnDefinitions={columns}
                  noDataState={EMPTY_STATES.noData}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'no results',
            cells: [
              <div key='no-results' className={styles.cell}>
                <Table
                  data={[]}
                  columnDefinitions={columns}
                  dataFiltered
                  noResultsState={EMPTY_STATES.noResults}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'error',
            cells: [
              <div key='error' className={styles.cell}>
                <Table
                  data={[]}
                  columnDefinitions={columns}
                  dataError
                  errorDataState={EMPTY_STATES.error}
                  suppressPagination
                  outline
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
