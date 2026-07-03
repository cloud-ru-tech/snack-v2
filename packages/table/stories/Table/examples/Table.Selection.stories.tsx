import { TrashSVG } from '@ds/icons';
import { getPageNumberTestId } from '@ds/pagination';
import { RowSelectionState, Table, ToolbarCheckBoxMode } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';

const COMPONENT_TEST_IDS = TEST_IDS.component;
const ALL_ROWS_PAGE_SIZE = 5;

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/Selection',
  ...tableExampleMeta,
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = buildUserColumns({ withStatusColumn: true });

function ControlledSelection() {
  const [selection, setSelection] = useState<RowSelectionState>({ 'u-1': true, 'u-3': true });

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      getRowId={user => user.id}
      rowSelection={{ enable: true, multiRow: true, state: selection, onChange: setSelection }}
      bulkActions={[
        {
          label: 'Удалить выбранные',
          icon: TrashSVG,
          onClick: (_state, resetRowSelection) => {
            setSelection({});
            resetRowSelection();
          },
        },
      ]}
      outline
    />
  );
}

function AllRowsSelection() {
  const [selection, setSelection] = useState<RowSelectionState>({});

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      getRowId={user => user.id}
      pageSize={5}
      pagination={{ options: [5, 10, 20] }}
      toolbarCheckBoxMode={ToolbarCheckBoxMode.AllRows}
      rowSelection={{ enable: true, multiRow: true, state: selection, onChange: setSelection }}
      bulkActions={[
        {
          label: 'Удалить выбранные',
          icon: TrashSVG,
          onClick: (_state, resetRowSelection) => {
            setSelection({});
            resetRowSelection();
          },
        },
      ]}
      outline
    />
  );
}

export const Selection: Story = {
  tags: ['dev', 'test'],
  render: () => <ControlledSelection />,
};

export const SelectionAllRows: Story = {
  tags: ['dev', 'test'],
  render: () => <AllRowsSelection />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await step('select all: master checkbox selects rows on every page', async () => {
      await userEvent.click(within(root).getByTestId(COMPONENT_TEST_IDS.selectAll));

      await waitFor(() => {
        const selectedOnPage1 = within(root)
          .getAllByTestId(COMPONENT_TEST_IDS.bodyRow)
          .filter(row => row.hasAttribute('data-selected'));
        expect(selectedOnPage1).toHaveLength(ALL_ROWS_PAGE_SIZE);
      });

      await userEvent.click(within(root).getByTestId(getPageNumberTestId(2)));

      await waitFor(() => {
        const selectedOnPage2 = within(root)
          .getAllByTestId(COMPONENT_TEST_IDS.bodyRow)
          .filter(row => row.hasAttribute('data-selected'));
        expect(selectedOnPage2).toHaveLength(ALL_ROWS_PAGE_SIZE);
        expect(selectedOnPage2[0]).toHaveAttribute('data-row-id', SAMPLE_USERS[ALL_ROWS_PAGE_SIZE].id);
      });
    });
  },
};
