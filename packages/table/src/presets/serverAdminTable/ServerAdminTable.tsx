import { FiltersState } from '@ds/chips';

import { ServerTable } from '../../components/ServerTable';
import { ServerAdminTableInput } from './toServerAdminTableProps';
import { useServerAdminTableProps } from './useServerAdminTableProps';

/** Серверная админ-таблица: поиск, фильтры, выбор строк, статус и действия */
export function ServerAdminTable<TData extends object, TFilters extends FiltersState = Record<string, unknown>>(
  props: ServerAdminTableInput<TData, TFilters>,
) {
  const tableProps = useServerAdminTableProps(props);

  return <ServerTable {...tableProps} />;
}
