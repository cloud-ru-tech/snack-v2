import { ColumnDefinition, ServerTable, SortingState } from '@ds/table';
import { useEffect, useRef, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  balance: number;
};

const NAMES = [
  'Анна Иванова',
  'Борис Петров',
  'Вера Сидорова',
  'Глеб Кузнецов',
  'Дарья Орлова',
  'Егор Морозов',
  'Жанна Волкова',
  'Захар Соколов',
];

const ROLES = ['Owner', 'Admin', 'Editor', 'Viewer'];

const ALL_USERS: User[] = Array.from({ length: 23 }, (_, index) => ({
  id: `u-${index + 1}`,
  name: NAMES[index % NAMES.length],
  email: `user-${index + 1}@example.com`,
  role: ROLES[index % ROLES.length],
  balance: (index * 1730) % 20000,
}));

function compareUsers(a: User, b: User, columnId: string, desc: boolean): number {
  const left = a[columnId as keyof User];
  const right = b[columnId as keyof User];
  const order =
    typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right));

  return desc ? -order : order;
}

type PageResponse = {
  items: User[];
  total: number;
};

// Имитация бэкенда: фильтрация по имени, сортировка и срез по offset/limit с задержкой.
function fetchUsers(offset: number, limit: number, query: string, sorting: SortingState): Promise<PageResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      const filtered = query
        ? ALL_USERS.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        : ALL_USERS;
      const sortRule = sorting[0];
      const sorted = sortRule ? [...filtered].sort((a, b) => compareUsers(a, b, sortRule.id, sortRule.desc)) : filtered;

      resolve({ items: sorted.slice(offset, offset + limit), total: sorted.length });
    }, 400);
  });
}

const columns: ColumnDefinition<User>[] = [
  { accessorKey: 'name', header: 'Имя', enableSorting: true, size: 200 },
  { accessorKey: 'email', header: 'Email', size: 240 },
  { accessorKey: 'role', header: 'Роль', size: 140 },
  { accessorKey: 'balance', header: 'Баланс', align: 'right', headerAlign: 'right', enableSorting: true, size: 140 },
];

export function ServerDriven() {
  const [items, setItems] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;

    setLoading(true);
    fetchUsers(offset, limit, search, sorting).then(response => {
      // Ответы устаревших запросов отбрасываются — состояние обновляет только последний.
      if (currentRequest !== requestId.current) {
        return;
      }

      setItems(response.items);
      setTotal(response.total);
      setLoading(false);
    });
  }, [offset, limit, search, sorting]);

  return (
    <ServerTable
      items={items}
      total={total}
      limit={limit}
      offset={offset}
      loading={loading}
      columnDefinitions={columns}
      onChangePage={(nextOffset, nextLimit) => {
        setOffset(nextOffset);
        setLimit(nextLimit);
      }}
      search={{
        state: search,
        placeholder: 'Поиск по имени',
        loading,
        onChange: value => {
          setOffset(0);
          setSearch(value);
        },
      }}
      sorting={{
        state: sorting,
        onChange: nextSorting => {
          setOffset(0);
          setSorting(nextSorting);
        },
      }}
      manualSorting
      pagination={{ options: [5, 10] }}
      outline
    />
  );
}
