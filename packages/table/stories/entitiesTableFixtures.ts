import { FiltersState } from '@ds/chips';
import {
  ColumnDefinition,
  EntitiesTableProps,
  EntityQueryFn,
  getRowActionsColumnDef,
  getStatusColumnDef,
  STATUS_APPEARANCE,
} from '@ds/table';

export type StoryEntity = {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Archived';
  owner: string;
  region: string;
  service: string;
  createdAt: string;
};

export type StoryFilters = FiltersState & {
  params: {
    offset: number;
    limit: number;
    search?: string;
    ordering?: string;
  };
  single?: string;
  multiple?: string[];
  date?: Date;
};

export type StoryProps = EntitiesTableProps<StoryEntity, StoryFilters>;

const STATUSES: StoryEntity['status'][] = ['Active', 'Paused', 'Archived'];
const REGIONS = ['Moscow', 'SPB', 'Kazan', 'Novosibirsk'];
const SERVICES = ['Compute', 'Storage', 'Database', 'CDN'];

const STATUS_APPEARANCES: Record<StoryEntity['status'], (typeof STATUS_APPEARANCE)[keyof typeof STATUS_APPEARANCE]> = {
  Active: STATUS_APPEARANCE.Green,
  Paused: STATUS_APPEARANCE.Yellow,
  Archived: STATUS_APPEARANCE.Neutral,
};

export const noop = () => {};

export const entitiesColumnFilters: NonNullable<StoryProps['columnFilters']> = {
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
    {
      id: 'multiple',
      type: 'multiple',
      label: 'Service',
      pinned: true,
      options: [
        { value: 'compute', label: 'Compute' },
        { value: 'storage', label: 'Storage' },
        { value: 'database', label: 'Database' },
        { value: 'cdn', label: 'CDN' },
      ],
    },
    {
      id: 'date',
      type: 'date',
      label: 'Created at',
    },
  ],
};

export const MOCK_ENTITIES: StoryEntity[] = Array.from({ length: 30 }, (_, index) => ({
  id: `entity-${index + 1}`,
  name: `Entity ${index + 1}`,
  status: STATUSES[index % STATUSES.length],
  owner: `Owner ${index + 1}`,
  region: REGIONS[index % REGIONS.length],
  service: SERVICES[index % SERVICES.length],
  createdAt: new Date(2024, index % 12, (index % 28) + 1).toLocaleDateString('ru-RU'),
}));

export const entitiesColumnDefinitions: ColumnDefinition<StoryEntity>[] = [
  getStatusColumnDef({
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    mapStatusToAppearance: value =>
      STATUS_APPEARANCES[String(value) as StoryEntity['status']] || STATUS_APPEARANCE.Neutral,
    renderDescription: value => String(value),
  }),
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    columnSettings: { label: 'Name', mode: 'defaultVisible' },
    enableSorting: true,
  },
  {
    id: 'owner',
    accessorKey: 'owner',
    header: 'Owner',
    columnSettings: { label: 'Owner', mode: 'defaultVisible' },
    enableSorting: true,
  },
  {
    id: 'region',
    accessorKey: 'region',
    header: 'Region',
    columnSettings: { label: 'Region', mode: 'defaultVisible' },
    enableSorting: true,
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: 'Service',
    columnSettings: { label: 'Service', mode: 'defaultVisible' },
    enableSorting: true,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Created at',
    columnSettings: { label: 'Created at', mode: 'defaultVisible' },
    enableSorting: true,
  },
  getRowActionsColumnDef({
    pinned: true,
    actionsGenerator: cell => [
      {
        id: 'open',
        content: { option: `Open ${cell.row.original.name}` },
        onClick: noop,
      },
      {
        id: 'edit',
        content: { option: `Edit ${cell.row.original.name}` },
        onClick: noop,
      },
    ],
  }),
];

function filterAndPaginateEntities({ params, single, multiple, date }: StoryFilters) {
  const normalizedSearch = params.search?.trim().toLowerCase() ?? '';
  const selectedStatus = single?.toLowerCase();
  const selectedServices = multiple?.map(value => value.toLowerCase()) ?? [];
  const selectedDate = date ? new Date(date).toLocaleDateString('ru-RU') : undefined;

  const filteredData = MOCK_ENTITIES.filter(item => {
    const matchesSearch =
      !normalizedSearch ||
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.owner.toLowerCase().includes(normalizedSearch) ||
      item.status.toLowerCase().includes(normalizedSearch) ||
      item.region.toLowerCase().includes(normalizedSearch) ||
      item.service.toLowerCase().includes(normalizedSearch);
    const matchesStatus = !selectedStatus || item.status.toLowerCase() === selectedStatus;
    const matchesService = !selectedServices.length || selectedServices.includes(item.service.toLowerCase());
    const matchesDate = !selectedDate || item.createdAt === selectedDate;

    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  const sortedData = [...filteredData];

  if (params.ordering) {
    const isDesc = params.ordering.startsWith('-');
    const sortKey = params.ordering.replace(/^-/, '') as keyof StoryEntity;

    sortedData.sort((left, right) => {
      const leftValue = String(left[sortKey]);
      const rightValue = String(right[sortKey]);

      return isDesc ? rightValue.localeCompare(leftValue) : leftValue.localeCompare(rightValue);
    });
  }

  const paginatedData = sortedData.slice(params.offset, params.offset + params.limit);

  return {
    total: sortedData.length,
    data: paginatedData,
  };
}

export function createMockEntitiesQueryFn(
  overrides?: Partial<ReturnType<EntityQueryFn<StoryFilters, StoryEntity>>>,
): EntityQueryFn<StoryFilters, StoryEntity> {
  return queryProps => {
    const payload = filterAndPaginateEntities(queryProps);

    return {
      data: payload,
      refetch: async () => payload,
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      ...overrides,
    };
  };
}

export const mockEntitiesQueryFn = createMockEntitiesQueryFn();
