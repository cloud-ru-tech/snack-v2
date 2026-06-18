import { ServerTable } from '../../components/ServerTable';
import { ServerSimpleTableInput } from './toServerSimpleTableProps';
import { useServerSimpleTableProps } from './useServerSimpleTableProps';

/** Минимальная серверная таблица: items, колонки, пагинация с бэкенда */
export function ServerSimpleTable<TData extends object>(props: ServerSimpleTableInput<TData>) {
  const tableProps = useServerSimpleTableProps(props);

  return <ServerTable {...tableProps} />;
}
