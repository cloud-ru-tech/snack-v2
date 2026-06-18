import { SimpleColumnDef, TreeTable } from '@ds/table';

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
    children: [
      { id: 'team-1', name: 'Compute', role: 'Команда' },
      { id: 'team-2', name: 'Storage', role: 'Команда' },
    ],
  },
];

const columns: SimpleColumnDef<OrgNode>[] = [{ key: 'role', header: 'Тип', width: 160 }];

export function TreeTableWithSelection() {
  return (
    <TreeTable
      data={TREE}
      getChildren={row => row.children}
      primaryColumn={{ key: 'name', header: 'Подразделение', showToggle: true }}
      secondaryColumns={columns}
      getRowId={row => row.id}
      expandingInitialState={{ 'org-1': true }}
      selection={{ multiRow: true, initialState: { 'team-1': true } }}
      outline
    />
  );
}
