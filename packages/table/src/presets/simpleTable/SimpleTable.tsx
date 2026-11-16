import { Table } from '../../components/Table';
import { SimpleTableInput } from './toSimpleTableProps';
import { useSimpleTableProps } from './useSimpleTableProps';

/** Клиентская таблица с декларативными колонками, без панели инструментов и пагинации. */
export function SimpleTable<TData extends object>(props: SimpleTableInput<TData>) {
  const tableProps = useSimpleTableProps(props);

  return <Table {...tableProps} />;
}
