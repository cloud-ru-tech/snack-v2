import { TrashSVG } from '@ds/icons';
import { RowSelectionState, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/Selection',
  component: Table,
  parameters: { layout: 'fullscreen' },
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

export const Selection: Story = {
  tags: ['dev', 'test'],
  render: () => <ControlledSelection />,
};
