import { SimpleColumnDef, Table, useTreeTableProps } from '@ds/table';

type OrgNode = {
  id: string;
  name: string;
  role: string;
  children?: OrgNode[];
};

const TREE: OrgNode[] = [
  {
    id: 'org-1',
    name: 'Облако',
    role: 'Отдел',
    children: [{ id: 'team-1', name: 'Compute', role: 'Команда' }],
  },
];

const columns: SimpleColumnDef<OrgNode>[] = [{ key: 'role', header: 'Тип', width: 160 }];

export function TreeTableWithHook() {
  const tableProps = useTreeTableProps({
    data: TREE,
    getChildren: row => row.children,
    primaryColumn: { key: 'name', header: 'Подразделение' },
    secondaryColumns: columns,
    getRowId: row => row.id,
    expandingInitialState: { 'org-1': true },
  });

  return <Table {...tableProps} outline />;
}
