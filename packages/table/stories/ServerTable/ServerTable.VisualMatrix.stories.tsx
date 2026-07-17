import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ServerTable, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { buildUserColumns, SAMPLE_USERS } from '../fixtures';
import styles from '../Table/styles.module.scss';

const meta: Meta<typeof ServerTable> = {
  title: 'Components/Table/ServerTable',
  component: ServerTable,
};

export default meta;
type Story = StoryObj<typeof ServerTable>;

const columns = buildUserColumns({ withStatusColumn: true });
const PAGE = SAMPLE_USERS.slice(0, 4);
// offset = 4 при limit = 4 — данные второй страницы
const PAGE_TWO = SAMPLE_USERS.slice(4, 8);
// результат поиска «Анна» — одна строка
const SEARCH_RESULT = SAMPLE_USERS.slice(0, 1);
const noop = () => {};

const serverSearch = { state: '', onChange: noop };

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='ServerTable states'
        firstColumnHeader='State'
        columnHeaders={['Default']}
        rows={[
          {
            variantLabel: 'with data',
            cells: [
              <div key='data' className={styles.cell}>
                <ServerTable
                  items={PAGE}
                  total={20}
                  limit={4}
                  offset={0}
                  onChangePage={noop}
                  columnDefinitions={columns}
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'loading',
            cells: [
              <div key='loading' className={styles.cell}>
                <ServerTable
                  items={[]}
                  total={0}
                  limit={4}
                  offset={0}
                  onChangePage={noop}
                  columnDefinitions={columns}
                  loading
                  outline
                />
              </div>,
            ],
          },
          {
            variantLabel: 'empty',
            cells: [
              <div key='empty' className={styles.cell}>
                <ServerTable
                  items={[]}
                  total={0}
                  limit={4}
                  offset={0}
                  onChangePage={noop}
                  columnDefinitions={columns}
                  noDataState={{ title: 'Нет данных', content: 'Список пуст' }}
                  outline
                />
              </div>,
            ],
          },
          {
            // ChipChoice выбора числа строк рядом с пагинацией
            variantLabel: 'rows-per-page options',
            cells: [
              <div key='rows-per-page' className={styles.cell}>
                <ServerTable
                  items={PAGE}
                  total={20}
                  limit={4}
                  offset={0}
                  onChangePage={noop}
                  pagination={{ options: [4, 8] }}
                  columnDefinitions={columns}
                  outline
                />
              </div>,
            ],
          },
          {
            // спиннер в поле поиска при загрузке результатов
            variantLabel: 'search loading',
            cells: [
              <div key='search-loading' className={styles.cell}>
                <ServerTable
                  items={SEARCH_RESULT}
                  total={1}
                  limit={4}
                  offset={0}
                  onChangePage={noop}
                  search={{ state: 'Анна', loading: true, onChange: noop }}
                  columnDefinitions={columns}
                  outline
                />
              </div>,
            ],
          },
          {
            // активная вторая страница в пагинации
            variantLabel: 'page 2',
            cells: [
              <div key='page-2' className={styles.cell}>
                <ServerTable
                  items={PAGE_TWO}
                  total={20}
                  limit={4}
                  offset={4}
                  onChangePage={noop}
                  columnDefinitions={columns}
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
                  <ServerTable
                    items={PAGE}
                    total={20}
                    limit={4}
                    offset={0}
                    onChangePage={noop}
                    columnDefinitions={columns}
                    view={VIEW.Table}
                    search={serverSearch}
                    columnsSettings={{ enableSettingsMenu: true }}
                    sorting={{}}
                    outline
                  />
                </AdaptiveProvider>
              </div>,
              <div key='layout-mobile-cards' className={styles.mobileCell}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <ServerTable
                    items={PAGE}
                    total={20}
                    limit={4}
                    offset={0}
                    onChangePage={noop}
                    columnDefinitions={columns}
                    view={VIEW.Cards}
                    headlineId='name'
                    search={serverSearch}
                    columnsSettings={{ enableSettingsMenu: true }}
                    sorting={{}}
                    outline
                  />
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
