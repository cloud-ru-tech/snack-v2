import { FiltersState } from '@ds/chips';
import { Toolbar, ToolbarPersistConfig, ToolbarProps } from '@ds/toolbar';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../../../constants';
import { TableProps } from '../../../types';
import styles from '../../styles.module.scss';

type TableToolbarBulkProps = Pick<
  ToolbarProps<Record<string, unknown>>,
  'checked' | 'indeterminate' | 'onCheck' | 'bulkActions' | 'selectedCount' | 'totalCount' | 'showBulkCheckbox'
>;

type TableToolbarProps<TFilters extends FiltersState> = {
  search?: {
    value: string;
    onChange: (value: string) => void;
    loading?: boolean;
    placeholder?: string;
  };
  onRefresh?: () => void;
  persist?: ToolbarPersistConfig<TFilters>;
  outline?: boolean;
  dataView?: {
    show: boolean;
    value: 'list' | 'compact';
    onChange: (value: 'list' | 'compact') => void;
  };
  after?: ReactNode;
  moreActions?: TableProps<object>['moreActions'];
  filterRow?: TableProps<object>['columnFilters'];
} & Partial<TableToolbarBulkProps>;

export function TableToolbar<TFilters extends FiltersState = Record<string, unknown>>({
  search,
  onRefresh,
  persist,
  checked,
  indeterminate,
  onCheck,
  bulkActions,
  selectedCount,
  totalCount,
  showBulkCheckbox,
  outline,
  dataView,
  after,
  moreActions,
  filterRow,
}: TableToolbarProps<TFilters>) {
  return (
    <Toolbar
      search={search}
      className={styles.toolbar}
      onRefresh={onRefresh}
      persist={persist}
      checked={checked}
      indeterminate={indeterminate}
      onCheck={onCheck}
      bulkActions={bulkActions}
      selectedCount={selectedCount}
      totalCount={totalCount}
      showBulkCheckbox={showBulkCheckbox}
      outline={outline}
      dataView={dataView}
      after={after}
      moreActions={moreActions}
      filterRow={filterRow}
      data-test-id={TEST_IDS.toolbar}
    />
  );
}
