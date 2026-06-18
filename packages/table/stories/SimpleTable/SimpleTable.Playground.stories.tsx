import { SimpleTable, SimpleTableInput, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import { expect, within } from 'storybook/test';

import { withTableStorySurface } from '../decorators';
import { PRESET_USERS, presetUserColumns } from '../presetFixtures';
import { TEST_IDS } from '../testIds';

type StoryArgs = SimpleTableInput<(typeof PRESET_USERS)[number]>;

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/SimpleTable',
  component: SimpleTable as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    data: PRESET_USERS,
    columns: presetUserColumns,
    pageSize: 5,
    getRowId: user => user.id,
    headlineKey: 'name',
    defaultView: VIEW.Table,
    outline: true,
    fullWidth: true,
    loading: false,
    'data-test-id': TEST_IDS.table.root,
  },
  argTypes: {
    headlineKey: { if: { arg: 'defaultView', eq: VIEW.Cards } },
    view: { table: { disable: true } },
    onViewChange: { table: { disable: true } },

    data: { table: { disable: true } },
    columns: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    renderCard: { table: { disable: true } },
    pagination: { table: { disable: true } },
    sorting: { table: { disable: true } },
    columnFilters: { table: { disable: true } },
    rowSelection: { table: { disable: true } },
    columnsSettings: { table: { disable: true } },
    bulkActions: { table: { disable: true } },
    savedState: { table: { disable: true } },
    moreActions: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
    onRowClick: { table: { disable: true } },
    search: { table: { disable: true } },
    expanding: { table: { disable: true } },
    rowPinning: { table: { disable: true } },
    getRowBackgroundColor: { control: false, table: { disable: true } },
    scrollRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    toolbarCheckBoxMode: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <SimpleTable {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.table.root)).toBeVisible();
  },
};
