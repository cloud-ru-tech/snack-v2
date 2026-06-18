import { Checkbox } from '@ds/toggles';
import type { Table } from '@tanstack/react-table';
import { MouseEvent, ReactNode } from 'react';

import { TEST_IDS } from '../constants';

type RenderMasterSelectionToggleParams<TData> = {
  table: Table<TData>;
  isAllRowsMode: boolean;
  className?: string;
};

export function renderMasterSelectionToggle<TData>({
  table,
  isAllRowsMode,
  className,
}: RenderMasterSelectionToggleParams<TData>): ReactNode {
  const { enableMultiRowSelection } = table.options;
  const isMulti = typeof enableMultiRowSelection === 'boolean' ? enableMultiRowSelection : true;

  if (!isMulti) {
    return null;
  }

  const { checked, indeterminate } = isAllRowsMode
    ? { checked: table.getIsAllRowsSelected(), indeterminate: table.getIsSomeRowsSelected() }
    : { checked: table.getIsAllPageRowsSelected(), indeterminate: table.getIsSomePageRowsSelected() };

  const handleMasterToggle = (event: MouseEvent) => {
    event.stopPropagation();
    isAllRowsMode ? table.toggleAllRowsSelected() : table.toggleAllPageRowsSelected();
  };

  return (
    <div role='presentation' onClick={handleMasterToggle} className={className} data-test-id={TEST_IDS.selectAll}>
      <Checkbox size='xs' checked={checked} indeterminate={indeterminate} tabIndex={-1} />
    </div>
  );
}
