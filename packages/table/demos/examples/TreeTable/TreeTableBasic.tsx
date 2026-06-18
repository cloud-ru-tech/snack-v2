import { SimpleColumnDef, TreeTable } from '@ds/table';

type OrgNode = {
  id: string;
  name: string;
  role: string;
  email: string;
  children?: OrgNode[];
};

const TREE: OrgNode[] = [
  {
    id: 'org-1',
    name: 'Облако',
    role: 'Отдел',
    email: 'cloud@example.com',
    children: [
      { id: 'team-1', name: 'Compute', role: 'Команда', email: 'compute@example.com' },
      { id: 'team-2', name: 'Storage', role: 'Команда', email: 'storage@example.com' },
    ],
  },
];

const columns: SimpleColumnDef<OrgNode>[] = [
  { key: 'role', header: 'Тип', width: 160 },
  { key: 'email', header: 'Email', width: 240 },
];

export function TreeTableBasic() {
  return (
    <TreeTable
      data={TREE}
      getChildren={row => row.children}
      primaryColumn={{ key: 'name', header: 'Подразделение' }}
      secondaryColumns={columns}
      getRowId={row => row.id}
      expandingInitialState={{ 'org-1': true }}
      outline
    />
  );
}
