import { LAYOUT_TYPE } from '@ds/utils';

import { TEST_IDS } from '../../testIds';
import { BulkActionsCheckbox, BulkActionsControls, MobileBulkActionsSheet, SelectionLabel } from './components';
import styles from './styles.module.scss';
import { BulkActionsComponentProps } from './types';

export function BulkActions({
  actions = [],
  checked,
  onCheck,
  indeterminate,
  selectedCount = 0,
  totalCount,
  showBulkCheckbox = true,
  layoutType = LAYOUT_TYPE.Desktop,
  resizingContainerRef,
}: BulkActionsComponentProps) {
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;
  const hasSelection = Boolean(checked || indeterminate);
  const showActions = hasSelection && actions.length > 0;
  const showInlineActions = showActions && !isMobile;
  const showCheckboxInToolbar = showBulkCheckbox && !isMobile;

  return (
    <>
      <div className={styles.bulkTool} data-test-id={TEST_IDS.bulkTool}>
        {showCheckboxInToolbar && (
          <BulkActionsCheckbox checked={checked} indeterminate={indeterminate} onCheck={onCheck} />
        )}

        <SelectionLabel selectedCount={selectedCount} totalCount={totalCount} hasSelection={hasSelection} />

        {showInlineActions && (
          <BulkActionsControls
            variant='toolbar'
            actions={actions}
            layoutType={layoutType}
            resizingContainerRef={resizingContainerRef}
          />
        )}
      </div>

      {isMobile && showActions && (
        <MobileBulkActionsSheet
          open={hasSelection}
          actions={actions}
          selectedCount={selectedCount}
          totalCount={totalCount}
          hasSelection={hasSelection}
          checked={checked}
          indeterminate={indeterminate}
          onCheck={onCheck}
          showBulkCheckbox={showBulkCheckbox}
        />
      )}
    </>
  );
}
