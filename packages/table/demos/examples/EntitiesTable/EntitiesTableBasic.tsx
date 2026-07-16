import {
  ColumnDefinition,
  EntitiesTable,
  getRowActionsColumnDef,
  getStatusColumnDef,
  STATUS_APPEARANCE,
} from '@ds/table';

type Entity = {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  owner: string;
};

const ENTITIES: Entity[] = [
  { id: 'e-1', name: 'Compute cluster', status: 'Active', owner: 'Anna' },
  { id: 'e-2', name: 'Object storage', status: 'Paused', owner: 'Boris' },
  { id: 'e-3', name: 'CDN edge', status: 'Active', owner: 'Vera' },
];

const columnDefinitions: ColumnDefinition<Entity>[] = [
  getStatusColumnDef({
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    mapStatusToAppearance: value => (value === 'Active' ? STATUS_APPEARANCE.Green : STATUS_APPEARANCE.Yellow),
    renderDescription: value => String(value),
  }),
  { id: 'name', accessorKey: 'name', header: 'Name', enableSorting: true },
  { id: 'owner', accessorKey: 'owner', header: 'Owner', enableSorting: true },
  getRowActionsColumnDef({
    actionsGenerator: cell => [{ content: { label: `Open ${cell.row.original.name}` }, onClick: () => {} }],
  }),
];

function useEntitiesQuery({
  params,
}: {
  params: { offset: number; limit: number; search?: string; ordering?: string };
}) {
  const normalizedSearch = params.search?.trim().toLowerCase() ?? '';
  const filtered = normalizedSearch
    ? ENTITIES.filter(entity => entity.name.toLowerCase().includes(normalizedSearch))
    : ENTITIES;

  return {
    data: {
      total: filtered.length,
      data: filtered.slice(params.offset, params.offset + params.limit),
    },
    isLoading: false,
    isFetching: false,
    isError: false,
    isSuccess: true,
    refetch: () => {},
  };
}

export function EntitiesTableBasic() {
  return (
    <EntitiesTable<Entity, { params: { offset: number; limit: number; search?: string; ordering?: string } }>
      id='entities-table-basic'
      queryFn={useEntitiesQuery}
      columnDefinitions={columnDefinitions}
      defaultLimit={5}
      searchPlaceholder='Search entities'
      getRowId={entity => entity.id}
    />
  );
}
