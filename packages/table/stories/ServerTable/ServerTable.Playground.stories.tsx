import { ServerTable, ServerTableProps, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, useCallback, useEffect, useRef, useState } from 'react';
import { expect, within } from 'storybook/test';

import { withTableStorySurface } from '../decorators';
import { buildUserColumns, SAMPLE_USERS, User } from '../fixtures';
import { TEST_IDS } from '../testIds';

// `ServerTableProps` — дженерик от TData. `Meta<typeof ServerTable>` резолвит
// TData в `object` и ломает типизацию `columnDefinitions`/`args`. Берём
// конкретную инстанциацию под `User` и кастуем компонент.
type StoryArgs = ServerTableProps<User>;

const LOAD_DELAY_MS = 400;

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/ServerTable',
  component: ServerTable as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    defaultView: VIEW.Table,
    headlineId: 'name',
    outline: true,
    pagination: { options: [5, 10, 20], optionsLabel: 'Строк на странице' },
    'data-test-id': TEST_IDS.serverTable.root,
  },
  argTypes: {
    // Режим переключается тулбаром компонента (uncontrolled через defaultView),
    // поэтому controlled `view` и его колбэк спрятаны из панели.
    view: { table: { disable: true } },
    onViewChange: { table: { disable: true } },
    // headlineId имеет смысл только в режиме карточек
    headlineId: { if: { arg: 'defaultView', eq: VIEW.Cards } },
    // Сложные структурные пропсы не редактируются из панели Controls
    columnDefinitions: { table: { disable: true } },
    items: { table: { disable: true } },
    onChangePage: { table: { disable: true } },
    search: { table: { disable: true } },
    sorting: { table: { disable: true } },
    rowSelection: { table: { disable: true } },
    expanding: { table: { disable: true } },
    columnFilters: { table: { disable: true } },
    loading: { table: { disable: true } },
    // Страницей управляет state Playground'а (см. ServerTablePlayground ниже) —
    // контролы total/limit/offset были бы «мёртвыми»
    total: { table: { disable: true } },
    limit: { table: { disable: true } },
    offset: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const columns = buildUserColumns({ withStatusColumn: true });

type ServerResponse = {
  items: User[];
  total: number;
};

// Имитация бэкенда: фильтрация по имени + срез по offset/limit с задержкой.
function fetchUsers(offset: number, limit: number, query: string): Promise<ServerResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      const filtered = query
        ? SAMPLE_USERS.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        : SAMPLE_USERS;
      resolve({ items: filtered.slice(offset, offset + limit), total: filtered.length });
    }, LOAD_DELAY_MS);
  });
}

// Кастомный render обязателен: `onChangePage` — required-проп, а `search.state`
// по типу ServerTable controlled-only — без локального state Playground не работает.
function ServerTablePlayground(args: Partial<StoryArgs>) {
  const [items, setItems] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const requestId = useRef(0);

  const load = useCallback((nextOffset: number, nextLimit: number, query: string) => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    fetchUsers(nextOffset, nextLimit, query).then(response => {
      // отбрасываем ответы устаревших запросов
      if (currentRequest !== requestId.current) {
        return;
      }
      setItems(response.items);
      setTotal(response.total);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    load(offset, limit, search);
  }, [load, offset, limit, search]);

  return (
    <ServerTable
      {...args}
      items={items}
      total={total}
      limit={limit}
      offset={offset}
      loading={loading}
      onChangePage={(nextOffset, nextLimit) => {
        setOffset(nextOffset);
        setLimit(nextLimit);
      }}
      columnDefinitions={columns}
      search={{
        state: search,
        placeholder: 'Поиск по имени',
        loading,
        onChange: value => {
          setOffset(0);
          setSearch(value);
        },
      }}
    />
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <ServerTablePlayground {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.serverTable.root)).toBeVisible();
  },
};
