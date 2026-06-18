import { SimpleColumnDef, Table, useInfiniteTableProps } from '@ds/table';
import { useCallback, useState } from 'react';

type User = { id: string; name: string; email: string };

const ALL_USERS: User[] = Array.from({ length: 12 }, (_, index) => ({
  id: `u-${index + 1}`,
  name: `Пользователь ${index + 1}`,
  email: `user${index + 1}@example.com`,
}));

const columns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', width: 200 },
  { key: 'email', header: 'Email', width: 240 },
];

const PAGE = 4;

export function InfiniteTableWithHook() {
  const [items, setItems] = useState(() => ALL_USERS.slice(0, PAGE));
  const [loading, setLoading] = useState(false);
  const hasMore = items.length < ALL_USERS.length;

  const onLoadMore = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setItems(ALL_USERS.slice(0, Math.min(items.length + PAGE, ALL_USERS.length)));
      setLoading(false);
    }, 300);
  }, [items.length]);

  const tableProps = useInfiniteTableProps({
    data: items,
    columns,
    getRowId: user => user.id,
    loading,
    hasMore,
    onLoadMore,
  });

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'minmax(0, 1fr)', height: 360 }}>
      <Table {...tableProps} outline />
    </div>
  );
}
