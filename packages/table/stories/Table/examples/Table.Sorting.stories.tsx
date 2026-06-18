import { SortingState, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/Sorting',
  component: Table,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Table>;

// withDates добавляет колонку «Создан» с `sortingFn: SORT_FN.DateTime` — даты в
// fixtures намеренно перемешаны относительно алфавитного порядка имён, сортировка
// по дате видимо переставляет строки (alphanumeric-сортировка ISO-строк дала бы тот же
// порядок, datetime сравнивает значения как Date).
const columns = buildUserColumns({ withStatusColumn: true, withDates: true });

function ControlledSorting() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'amount', desc: true }]);

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      sorting={{ state: sorting, onChange: setSorting }}
      outline
    />
  );
}

export const Sorting: Story = {
  tags: ['dev', 'test'],
  render: () => <ControlledSorting />,
};
