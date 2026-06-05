import { BottomSheet } from '@ds/bottom-sheet';
import { useLocale } from '@ds/locale';
import { usePortalContext } from '@ds/portal-context';
import { getThemeClassnames, useLayoutEffect } from '@ds/utils';
import { useState } from 'react';

import { TEST_IDS } from '../../../../testIds';
import { BulkAction } from '../../types';
import { BulkActionsControls } from '../BulkActionsControls';
import { SelectionLabel } from '../SelectionLabel';

type MobileBulkActionsSheetProps = {
  open: boolean;
  actions: BulkAction[];
  selectedCount: number;
  totalCount?: number;
  hasSelection: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  onCheck?(): void;
  showBulkCheckbox?: boolean;
};

const CLOSE_STUB_CALLBACK = () => undefined;

export function MobileBulkActionsSheet({
  open,
  actions,
  selectedCount,
  totalCount,
  hasSelection,
  checked,
  indeterminate,
  onCheck,
  showBulkCheckbox,
}: MobileBulkActionsSheetProps) {
  const { t } = useLocale('Toolbar');
  const portalContext = usePortalContext();
  const [bottomSheetKey, setBottomSheetKey] = useState('notReady');

  useLayoutEffect(() => {
    setBottomSheetKey('ready');
  }, []);

  return (
    <BottomSheet
      className={getThemeClassnames({ density: 'comfort' })}
      key={bottomSheetKey}
      container={portalContext.current ?? undefined}
      open={open}
      onClose={CLOSE_STUB_CALLBACK}
      title={t('multipleActions')}
      // TODO: slotAfterHeadline должен расширяться на всю ширину, а section-label уходить вправо
      slotAfterHeadline={
        <SelectionLabel
          placement='headline'
          selectedCount={selectedCount}
          totalCount={totalCount}
          hasSelection={hasSelection}
        />
      }
      content={
        <BulkActionsControls
          variant='sheet'
          actions={actions}
          checked={checked}
          indeterminate={indeterminate}
          onCheck={onCheck}
          showCheckbox={showBulkCheckbox}
          selectedCount={selectedCount}
          totalCount={totalCount}
          hasSelection={hasSelection}
        />
      }
      showBackdrop={false}
      swipeEnabled={false}
      lockScroll={false}
      closeOnPopstate={false}
      safeArea={false}
      withDividers={false}
      data-test-id={TEST_IDS.mobileBulkActionsSheet}
    />
  );
}
