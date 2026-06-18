import { FiltersState } from '@ds/chips';

import { Table } from '../../components/Table';
import { AdminTableInput } from './toAdminTableProps';
import { useAdminTableProps } from './useAdminTableProps';

/** Стандартная админ-таблица: поиск, фильтры, выбор строк, статус и действия */
export function AdminTable<TData extends object, TFilters extends FiltersState = Record<string, unknown>>(
  props: AdminTableInput<TData, TFilters>,
) {
  const tableProps = useAdminTableProps(props);

  return <Table {...tableProps} />;
}
