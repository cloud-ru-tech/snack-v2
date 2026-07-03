import { Checkbox } from '@ds/toggles';
import type { Table } from '@tanstack/react-table';
import { MouseEvent, ReactNode } from 'react';

import { TEST_IDS } from '../constants';
import { getMasterSelectionState, MasterSelectionOptions, toggleMasterSelection } from './masterSelection';

type RenderMasterSelectionToggleParams<TData> = {
  table: Table<TData>;
  masterSelection: MasterSelectionOptions;
  className?: string;
};

export function renderMasterSelectionToggle<TData>({
  table,
  masterSelection,
  className,
}: RenderMasterSelectionToggleParams<TData>): ReactNode {
  const { enableMultiRowSelection } = table.options;
  const isMulti = typeof enableMultiRowSelection === 'boolean' ? enableMultiRowSelection : true;

  if (!isMulti) {
    return null;
  }

  const { checked, indeterminate } = getMasterSelectionState(table, masterSelection);

  const handleMasterToggle = (event: MouseEvent) => {
    event.stopPropagation();
    toggleMasterSelection(table, masterSelection);
  };

  return (
    <div role='presentation' onClick={handleMasterToggle} className={className} data-test-id={TEST_IDS.selectAll}>
      <Checkbox size='xs' checked={checked} indeterminate={indeterminate} tabIndex={-1} />
    </div>
  );
}
