import { Table } from '../../components/Table';
import { TreeTableInput } from './toTreeTableProps';
import { useTreeTableProps } from './useTreeTableProps';

/** Иерархическая таблица с раскрывающимися строками */
export function TreeTable<TData extends object>(props: TreeTableInput<TData>) {
  const tableProps = useTreeTableProps(props);

  return <Table {...tableProps} />;
}
