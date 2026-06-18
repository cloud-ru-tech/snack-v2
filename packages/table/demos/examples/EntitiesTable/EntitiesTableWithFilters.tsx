import { FiltersState } from '@ds/chips';
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
  status: 'Active' | 'Paused' | 'Archived';
  service: string;
};

type QueryParams = FiltersState & {
  params: { offset: number; limit: number; search?: string; ordering?: string };
  single?: string;
};

const ENTITIES: Entity[] = [
  { id: 'e-1', name: 'Compute cluster', status: 'Active', service: 'compute' },
  { id: 'e-2', name: 'Object storage', status: 'Paused', service: 'storage' },
  { id: 'e-3', name: 'CDN edge', status: 'Archived', service: 'cdn' },
];

const columnDefinitions: ColumnDefinition<Entity>[] = [
  getStatusColumnDef({
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    mapStatusToAppearance: value => {
      if (value === 'Active') return STATUS_APPEARANCE.Green;
      if (value === 'Paused') return STATUS_APPEARANCE.Yellow;
      return STATUS_APPEARANCE.Neutral;
    },
    renderDescription: value => String(value),
  }),
  { id: 'name', accessorKey: 'name', header: 'Name', enableSorting: true },
  { id: 'service', accessorKey: 'service', header: 'Service', enableSorting: true },
  getRowActionsColumnDef({
    actionsGenerator: cell => [{ content: { option: `Open ${cell.row.original.name}` }, onClick: () => {} }],
  }),
];

function useEntitiesQuery(queryProps: QueryParams) {
  const { params, single } = queryProps;
  const filtered = ENTITIES.filter(entity => {
    const matchesSearch = !params.search || entity.name.toLowerCase().includes(params.search.toLowerCase());
    const matchesStatus = !single || entity.status.toLowerCase() === single.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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

export function EntitiesTableWithFilters() {
  return (
    <EntitiesTable<Entity, QueryParams>
      id='entities-table-with-filters'
      queryFn={useEntitiesQuery}
      columnDefinitions={columnDefinitions}
      defaultLimit={5}
      searchPlaceholder='Search entities'
      getRowId={entity => entity.id}
      columnFilters={{
        filters: [
          {
            id: 'single',
            type: 'single',
            label: 'Status',
            pinned: true,
            options: [
              { value: 'active', label: 'Active' },
              { value: 'paused', label: 'Paused' },
              { value: 'archived', label: 'Archived' },
            ],
          },
        ],
      }}
    />
  );
}
