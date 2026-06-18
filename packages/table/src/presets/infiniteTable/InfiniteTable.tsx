import { Table } from '../../components/Table';
import { InfiniteTableInput } from './toInfiniteTableProps';
import { useInfiniteTableProps } from './useInfiniteTableProps';

/** Таблица с бесконечной прокруткой */
export function InfiniteTable<TData extends object>(props: InfiniteTableInput<TData>) {
  const tableProps = useInfiniteTableProps(props);

  return <Table {...tableProps} />;
}
