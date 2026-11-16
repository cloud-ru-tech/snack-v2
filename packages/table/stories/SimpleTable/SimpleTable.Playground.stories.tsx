import { SimpleTable, SimpleTableInput } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import { expect, within } from 'storybook/test';

import { withTableStorySurface } from '../decorators';
import { PRESET_USERS, presetUserColumns } from '../presetFixtures';
import { TEST_IDS } from '../testIds';

type StoryArgs = SimpleTableInput<(typeof PRESET_USERS)[number]> & { showEmpty: boolean };

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/SimpleTable',
  component: SimpleTable as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    data: PRESET_USERS,
    columns: presetUserColumns,
    getRowId: user => user.id,
    outline: true,
    fullWidth: true,
    loading: false,
    dataError: false,
    dataFiltered: false,
    rowAutoHeight: false,
    suppressHeader: false,
    showEmpty: false,
    'data-test-id': TEST_IDS.table.root,
  },
  argTypes: {
    showEmpty: { name: '[Stories]: showEmpty', control: 'boolean' },

    data: { table: { disable: true } },
    columns: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    onRowClick: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
    rowPinning: { table: { disable: true } },
    noResultsState: { table: { disable: true } },
    noDataState: { table: { disable: true } },
    errorDataState: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showEmpty, dataError, dataFiltered, ...args }) => (
    <SimpleTable
      {...args}
      dataError={dataError}
      dataFiltered={dataFiltered}
      data={showEmpty || dataError || dataFiltered ? [] : args.data}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.table.root)).toBeVisible();
  },
};
