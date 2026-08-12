import { Button } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { Tooltip } from '@ds/tooltip';
import { useDynamicList } from '@ds/utils';
import { RefObject, useRef, useState } from 'react';

import { toolbarLocale } from '../../../../locale';
import { TEST_IDS } from '../../../../testIds';
import { BulkAction } from '../../types';
import { getBulkActionIndex, getBulkActionKey, mapBulkActionToDroplistItem } from '../../utils';
import { BulkActionsCheckbox } from '../BulkActionsCheckbox';
import { SelectionLabel } from '../SelectionLabel';
import styles from './styles.module.scss';

type BulkActionsControlsVariant = 'toolbar' | 'sheet';

type BulkActionsControlsProps = {
  actions: BulkAction[];
  variant: BulkActionsControlsVariant;
  checked?: boolean;
  indeterminate?: boolean;
  onCheck?(): void;
  showCheckbox?: boolean;
  resizingContainerRef?: RefObject<HTMLDivElement>;
  selectedCount?: number;
  totalCount?: number;
  hasSelection?: boolean;
};

export function BulkActionsControls({
  actions,
  variant,
  checked,
  indeterminate,
  onCheck,
  showCheckbox = false,
  resizingContainerRef,
  selectedCount = 0,
  totalCount,
  hasSelection = false,
}: BulkActionsControlsProps) {
  const { t } = toolbarLocale.useTranslations();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const actionsAreaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isSheet = variant === 'sheet';

  const { visibleItems, hiddenItems } = useDynamicList({
    items: actions,
    resizingContainerRef: isSheet ? undefined : resizingContainerRef,
    parentContainerRef: actionsAreaRef,
  });

  const droplistActions = isSheet ? actions : hiddenItems;

  return (
    <div className={styles.actionsArea} ref={actionsAreaRef} data-variant={variant} data-test-id={TEST_IDS.bulkActions}>
      {showCheckbox && <BulkActionsCheckbox checked={checked} indeterminate={indeterminate} onCheck={onCheck} />}

      <div className={isSheet ? styles.sheetActions : styles.bulkActions}>
        {visibleItems.map((action, visibleIndex) => {
          const { label, icon: Icon, onClick, disabled, tooltip, 'data-test-id': testId } = action;
          const actionIndex = getBulkActionIndex(actions, action, visibleIndex);

          return (
            <Tooltip
              tip={tooltip}
              key={getBulkActionKey(action, actionIndex)}
              open={tooltip ? undefined : false}
              placement='top'
              data-test-id={`${testId}-tooltip`}
              triggerClassName={styles.triggerClassName}
            >
              <Button
                view='tonal'
                appearance='primary'
                className={styles.action}
                data-test-id={testId}
                iconPosition='before'
                icon={<Icon />}
                label={label}
                size='s'
                onClick={onClick}
                disabled={disabled}
              />
            </Tooltip>
          );
        })}
      </div>

      {hiddenItems.length > 0 && (
        <Droplist
          label={isSheet ? t('multipleActions') : undefined}
          // TODO: slotAfterTitle должен расширяться на всю ширину, а section-label уходить вправо
          slotAfterTitle={
            isSheet ? (
              <SelectionLabel
                placement='headline'
                selectedCount={selectedCount}
                totalCount={totalCount}
                hasSelection={hasSelection}
              />
            ) : undefined
          }
          open={isMoreOpen}
          onOpenChange={setIsMoreOpen}
          trigger='clickAndFocusVisible'
          triggerElemRef={triggerRef}
          triggerClassName={styles.triggerClassName}
          closeDroplistOnItemClick
          placement='bottom-end'
          scroll
          size='s'
          items={droplistActions.map((action, index) =>
            mapBulkActionToDroplistItem(action, getBulkActionIndex(actions, action, index)),
          )}
        >
          {({ onKeyDown }) => (
            <Button
              view='function'
              appearance='neutral'
              className={styles.moreActionButton}
              size='s'
              icon={<KebabSVG />}
              data-test-id={TEST_IDS.moreBulkActionsButton}
              innerRef={triggerRef}
              onKeyDown={onKeyDown}
            />
          )}
        </Droplist>
      )}
    </div>
  );
}
