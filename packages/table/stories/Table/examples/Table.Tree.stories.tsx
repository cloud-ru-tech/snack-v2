import { ColumnDefinition, RowAppearance, RowSelectionState, Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { getUserSubRows, TREE_USERS, User } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/Tree',
  component: Table,
  parameters: {
    layout: 'fullscreen',
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=22907-28616',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// `name` рендерится tree-колонкой (expandingColumnDefinition), поэтому в обычных
// колонках его нет — иначе значение продублируется.
const treeColumns: ColumnDefinition<User>[] = [
  { accessorKey: 'role', header: 'Тип', size: 160 },
  {
    accessorKey: 'email',
    header: 'Email',
    //  size: 260
  },
];

/** Базовое дерево без выбора */
export const Tree: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={TREE_USERS}
      columnDefinitions={treeColumns}
      getRowId={user => user.id}
      expanding={{
        getSubRows: getUserSubRows,
        expandingColumnDefinition: { accessorKey: 'name', header: 'Подразделение' },
        initialState: { 'org-cloud': true },
      }}
      suppressPagination
      outline
    />
  ),
};

/** Дерево без линий-направляющих вложенности */
export const TreeWithoutLines: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={TREE_USERS}
      columnDefinitions={treeColumns}
      getRowId={user => user.id}
      expanding={{
        getSubRows: getUserSubRows,
        expandingColumnDefinition: { accessorKey: 'name', header: 'Подразделение', showLines: false },
        initialState: { 'org-cloud': true },
      }}
      suppressPagination
      outline
    />
  ),
};

/** Дерево с мульти-выбором через чекбоксы */
function TreeWithMultiSelectionRender() {
  const [selection, setSelection] = useState<RowSelectionState>({
    'team-compute': true,
    't-compute-1': true,
    't-compute-2': true,
  });

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={TREE_USERS}
      columnDefinitions={treeColumns}
      getRowId={user => user.id}
      expanding={{
        getSubRows: getUserSubRows,
        expandingColumnDefinition: {
          accessorKey: 'name',
          header: 'Подразделение',
          showToggle: true,
        },
        initialState: { 'org-cloud': true, 'org-data': true, 'team-analytics': true },
      }}
      rowSelection={{ enable: true, multiRow: true, state: selection, onChange: setSelection }}
      suppressPagination
      outline
    />
  );
}

export const TreeWithMultiSelection: Story = {
  tags: ['dev', 'test'],
  render: () => <TreeWithMultiSelectionRender />,
};

/** Дерево с единственным выбором через радио */
function TreeWithSingleSelectionRender() {
  const [selection, setSelection] = useState<RowSelectionState>({ 't-analytics-1': true });

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={TREE_USERS}
      columnDefinitions={treeColumns}
      getRowId={user => user.id}
      expanding={{
        getSubRows: getUserSubRows,
        expandingColumnDefinition: {
          accessorKey: 'name',
          header: 'Подразделение',
          showToggle: true,
        },
        initialState: { 'org-cloud': true, 'org-data': true, 'team-analytics': true },
      }}
      rowSelection={{ enable: true, multiRow: false, state: selection, onChange: setSelection }}
      suppressPagination
      outline
    />
  );
}

export const TreeWithSingleSelection: Story = {
  tags: ['dev', 'test'],
  render: () => <TreeWithSingleSelectionRender />,
};

/** Дерево с частично отключёнными строками (disabled leaf-узлы) */
export const TreeWithDisabledRows: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={TREE_USERS}
      columnDefinitions={treeColumns}
      getRowId={user => user.id}
      expanding={{
        getSubRows: getUserSubRows,
        expandingColumnDefinition: {
          accessorKey: 'name',
          header: 'Подразделение',
          showToggle: true,
        },
        initialState: { 'org-cloud': true, 'org-data': true, 'team-analytics': true },
      }}
      rowSelection={{
        enable: row => row.original.status !== 'blocked',
        multiRow: true,
        appearance: RowAppearance.Disabled,
      }}
      suppressPagination
      outline
    />
  ),
};

/** Дерево с автоматической высотой строк (rowAutoHeight) */
export const TreeWithRowAutoHeight: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={TREE_USERS}
      columnDefinitions={[
        { accessorKey: 'role', header: 'Тип', size: 160 },
        {
          accessorKey: 'email',
          header: 'Описание',
          // size: 200,
          cell: ctx => {
            const user = ctx.row.original;

            return (
              <span>
                {user.email}
                {!user.subRows && (
                  <>
                    <br />
                    <small>{user.status}</small>
                  </>
                )}
              </span>
            );
          },
        },
      ]}
      getRowId={user => user.id}
      expanding={{
        getSubRows: getUserSubRows,
        expandingColumnDefinition: { accessorKey: 'name', header: 'Подразделение' },
        initialState: { 'org-cloud': true, 'org-data': true, 'team-analytics': true },
      }}
      rowAutoHeight
      suppressPagination
      outline
    />
  ),
};
