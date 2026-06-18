import { Table } from '../../components/Table';
import { SimpleTableInput } from './toSimpleTableProps';
import { useSimpleTableProps } from './useSimpleTableProps';

/** Минимальная клиентская таблица: данные, колонки, пагинация */
export function SimpleTable<TData extends object>(props: SimpleTableInput<TData>) {
  const tableProps = useSimpleTableProps(props);

  return <Table {...tableProps} />;
}
