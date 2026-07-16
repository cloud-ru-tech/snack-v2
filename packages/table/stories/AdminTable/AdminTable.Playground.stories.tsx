import { AdminTable, AdminTableInput, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, useMemo, useState } from 'react';
import { expect, within } from 'storybook/test';

import { withTableStorySurface } from '../decorators';
import { filterUsers, USER_FILTERS, UserFiltersState } from '../fixtures';
import { PRESET_ADMIN_USERS, presetAdminColumns, presetAdminStatusColumn } from '../presetFixtures';
import { TEST_IDS } from '../testIds';

const presetAdminRowActions: NonNullable<AdminTableInput<(typeof PRESET_ADMIN_USERS)[number]>['rowActions']> = {
  actionsGenerator: () => [
    { content: { label: 'Дублировать' }, onClick: () => {} },
    { content: { label: 'Удалить' }, onClick: () => {} },
  ],
};

type StoryToggles = {
  showStatusColumn: boolean;
  showRowActions: boolean;
  showFilters: boolean;
  showSelection: boolean;
  selectionMultiRow: boolean;
};

type StoryArgs = AdminTableInput<(typeof PRESET_ADMIN_USERS)[number], UserFiltersState> & StoryToggles;

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/AdminTable',
  component: AdminTable as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    data: PRESET_ADMIN_USERS,
    columns: presetAdminColumns,
    pageSize: 5,
    getRowId: user => user.id,
    headlineKey: 'name',
    defaultView: VIEW.Table,
    outline: true,
    loading: false,
    search: true,
    showStatusColumn: true,
    showRowActions: false,
    showFilters: false,
    showSelection: false,
    selectionMultiRow: true,
    'data-test-id': TEST_IDS.table.root,
  },
  argTypes: {
    showStatusColumn: { name: '[Stories]: showStatusColumn', control: 'boolean' },
    showRowActions: { name: '[Stories]: showRowActions', control: 'boolean' },
    showFilters: { name: '[Stories]: showFilters', control: 'boolean' },
    showSelection: { name: '[Stories]: showSelection', control: 'boolean' },
    selectionMultiRow: {
      name: '[Stories]: selectionMultiRow',
      control: 'boolean',
      if: { arg: 'showSelection', eq: true },
    },

    headlineKey: { if: { arg: 'defaultView', eq: VIEW.Cards } },
    view: { table: { disable: true } },
    onViewChange: { table: { disable: true } },

    data: { table: { disable: true } },
    columns: { table: { disable: true } },
    statusColumn: { table: { disable: true } },
    rowActions: { table: { disable: true } },
    filters: { table: { disable: true } },
    selection: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    renderCard: { table: { disable: true } },
    pagination: { table: { disable: true } },
    sorting: { table: { disable: true } },
    columnsSettings: { table: { disable: true } },
    savedState: { table: { disable: true } },
    moreActions: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
    onRowClick: { table: { disable: true } },
    getRowBackgroundColor: { control: false, table: { disable: true } },
    scrollRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    toolbarCheckBoxMode: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

function PlaygroundRender({
  showStatusColumn,
  showRowActions,
  showFilters,
  showSelection,
  selectionMultiRow,
  data,
  ...rest
}: StoryArgs) {
  const [filters, setFilters] = useState<UserFiltersState>({});

  const tableData = useMemo(() => (showFilters ? filterUsers(data, filters) : data), [data, showFilters, filters]);

  return (
    <AdminTable
      {...rest}
      data={tableData}
      {...(showStatusColumn ? { statusColumn: presetAdminStatusColumn } : {})}
      {...(showRowActions ? { rowActions: presetAdminRowActions } : {})}
      {...(showFilters
        ? {
            filters: {
              filters: USER_FILTERS,
              value: filters,
              onChange: setFilters,
              initialOpen: true,
            },
          }
        : {})}
      {...(showSelection ? { selection: { multiRow: selectionMultiRow } } : {})}
    />
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: PlaygroundRender,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.table.root)).toBeVisible();
  },
};
