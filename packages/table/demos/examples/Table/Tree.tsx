import { ColumnDefinition, Table } from '@ds/table';

type OrgNode = {
  id: string;
  name: string;
  type: string;
  email: string;
  subRows?: OrgNode[];
};

const ORG_TREE: OrgNode[] = [
  {
    id: 'org-cloud',
    name: 'Cloud Platform',
    type: 'Организация',
    email: 'platform@example.com',
    subRows: [
      {
        id: 'team-compute',
        name: 'Compute',
        type: 'Команда',
        email: 'compute@example.com',
        subRows: [
          { id: 'p-1', name: 'Анна Иванова', type: 'Owner', email: 'anna.ivanova@example.com' },
          { id: 'p-2', name: 'Борис Петров', type: 'Admin', email: 'boris.petrov@example.com' },
        ],
      },
      {
        id: 'team-storage',
        name: 'Storage',
        type: 'Команда',
        email: 'storage@example.com',
        subRows: [{ id: 'p-3', name: 'Вера Сидорова', type: 'Editor', email: 'vera.sidorova@example.com' }],
      },
    ],
  },
  {
    id: 'org-data',
    name: 'Data Platform',
    type: 'Организация',
    email: 'data@example.com',
    subRows: [{ id: 'p-4', name: 'Егор Морозов', type: 'Admin', email: 'egor.morozov@example.com' }],
  },
];

// `name` рендерится tree-колонкой (`expandingColumnDefinition`), поэтому
// в обычных колонках его нет — иначе значение продублируется.
const columns: ColumnDefinition<OrgNode>[] = [
  { accessorKey: 'type', header: 'Тип', size: 160 },
  { accessorKey: 'email', header: 'Email', size: 260 },
];

export function Tree() {
  return (
    <Table
      data={ORG_TREE}
      columnDefinitions={columns}
      getRowId={node => node.id}
      expanding={{
        getSubRows: node => node.subRows,
        expandingColumnDefinition: { accessorKey: 'name', header: 'Подразделение' },
      }}
      suppressPagination
      outline
    />
  );
}
