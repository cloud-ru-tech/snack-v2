import { InfiniteTable, SimpleColumnDef } from '@ds/table';
import { useCallback, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const ALL_USERS: User[] = Array.from({ length: 20 }, (_, index) => ({
  id: `u-${index + 1}`,
  name: `Пользователь ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 2 === 0 ? 'Editor' : 'Viewer',
}));

const columns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', width: 140 },
];

const PAGE = 5;

export function InfiniteTableBasic() {
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

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'minmax(0, 1fr)', height: 360 }}>
      <InfiniteTable
        data={items}
        columns={columns}
        getRowId={user => user.id}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        outline
      />
    </div>
  );
}
