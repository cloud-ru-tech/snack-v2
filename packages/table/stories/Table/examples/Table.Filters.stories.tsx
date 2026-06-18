// Filter-row тулбара (@ds/toolbar) рендерится чипами @ds/chips —
// test-id'ы импортируются из их публичных констант.
import { CHIP_CHOICE_ROW_TEST_IDS, CHIP_CHOICE_TEST_IDS } from '@ds/chips';
import { DEFAULT_PAGE_SIZE, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  buildUserColumns,
  filterUsers,
  SAMPLE_USERS,
  USER_FILTERS,
  USER_ROLES,
  UserFiltersState,
  UserTableFilters,
} from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/Filters',
  component: Table,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Table>;

const COMPONENT_TEST_IDS = TEST_IDS.component;

const columns = buildUserColumns({ withStatusColumn: true });

// Story-level id чипов: ChipChoice проксирует support-props на корень триггера,
// поэтому id из объекта фильтра адресует сам чип (droplist имеет собственный
// фиксированный id `chip-choice__droplist`).
const FILTER_CHIP_TEST_IDS: Record<string, string> = {
  role: 'table-filter-role',
  status: 'table-filter-status',
};

// pinned: чипы видны сразу, без кнопки «Добавить фильтр».
const FILTERS: UserTableFilters = USER_FILTERS.map(filter => ({
  ...filter,
  pinned: true,
  'data-test-id': FILTER_CHIP_TEST_IDS[filter.id],
}));

// Дефолтный data-test-id опции droplist'а чипа-фильтра: `list__base-item_<value>`
// (BaseItem из @ds/list — рендер droplist'ов @ds/chips).
// Синхронизируй при обновлении этих пакетов.
const filterOptionTestId = (value: string): string => `list__base-item_${value}`;

const FILTERED_ROLE = USER_ROLES[1]; // 'Admin'
const FILTERED_ROLE_USERS_COUNT = filterUsers(SAMPLE_USERS, { role: FILTERED_ROLE }).length;

function FilteredTable() {
  const [filters, setFilters] = useState<UserFiltersState>({});
  // Фильтрация — на стороне потребителя: Table только рисует filter-row и отдаёт
  // состояние через columnFilters.onChange.
  const data = useMemo(() => filterUsers(SAMPLE_USERS, filters), [filters]);
  const hasActiveFilters = Boolean(filters.role) || Boolean(filters.status?.length);

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={data}
      columnDefinitions={columns}
      columnFilters={{
        filters: FILTERS,
        value: filters,
        onChange: setFilters,
        initialOpen: true,
      }}
      // при пустом результате фильтрации показывается noResults-экран, а не noData
      dataFiltered={hasActiveFilters}
      outline
    />
  );
}

export const Filters: Story = {
  tags: ['dev', 'test'],
  render: () => <FilteredTable />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // Droplist чипа монтируется в портал за пределами canvasElement.
    const body = within(document.body);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await step('filters: чипы фильтров отрисованы под тулбаром', async () => {
      expect(canvas.getByTestId(FILTER_CHIP_TEST_IDS.role)).toBeVisible();
      expect(canvas.getByTestId(FILTER_CHIP_TEST_IDS.status)).toBeVisible();
      // пагинация активна: на первой странице DEFAULT_PAGE_SIZE строк из 15
      expect(within(root).getAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(DEFAULT_PAGE_SIZE);
    });

    await step('filter: выбор роли уменьшает количество строк', async () => {
      await userEvent.click(canvas.getByTestId(FILTER_CHIP_TEST_IDS.role));
      await waitFor(() => expect(body.getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeVisible());

      await userEvent.click(body.getByTestId(filterOptionTestId(FILTERED_ROLE)));

      await waitFor(() => {
        expect(within(root).getAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(FILTERED_ROLE_USERS_COUNT);
      });
    });

    await step('clear: сброс фильтров возвращает все строки', async () => {
      await userEvent.click(canvas.getByTestId(CHIP_CHOICE_ROW_TEST_IDS.clearButton));

      await waitFor(() => {
        expect(within(root).getAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(DEFAULT_PAGE_SIZE);
      });
    });
  },
};
