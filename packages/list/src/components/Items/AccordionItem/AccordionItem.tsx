import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { useCallback } from 'react';

import { TEST_IDS } from '../../../constants';
import { CollapseBlockPrivate } from '../../../helperComponents';
import {
  CollapseLevelContext,
  useCollapseContext,
  useCollapseLevelContext,
  useSelectionContext,
} from '../../Lists/contexts';
import { BaseItem } from '../BaseItem';
import { useGroupItemSelection, useRenderItems } from '../hooks';
import { CommonFlattenProps, FlattenAccordionItem } from '../types';

type AccordionItemProps = Omit<FlattenAccordionItem, 'type'> & CommonFlattenProps;

export function AccordionItem({ id, disabled, allChildIds, items, ...option }: AccordionItemProps) {
  const { level = 0 } = useCollapseLevelContext();
  const { openCollapseItems = [], toggleOpenCollapseItem } = useCollapseContext();

  const { value, isSelectionSingle, isSelectionMultiple } = useSelectionContext();

  const {
    indeterminate,
    handleOnSelect,
    checked: checkedProp,
  } = useGroupItemSelection({
    items,
    id,
    disabled,
    allChildIds,
  });

  const isOpen = Boolean(openCollapseItems.includes(id ?? ''));

  const checked = Boolean(
    (indeterminate && !isOpen && isSelectionSingle && value && allChildIds.includes(value)) ||
    (isSelectionMultiple && checkedProp),
  );

  // Раскрытие переключает вся строка целиком: клик/Enter по телу и ArrowRight с клавиатуры.
  const handleToggle = useCallback(() => {
    toggleOpenCollapseItem?.(id ?? '');
  }, [id, toggleOpenCollapseItem]);

  const itemsJSX = useRenderItems(items);

  return (
    <CollapseBlockPrivate
      header={
        <BaseItem
          {...option}
          id={id}
          disabled={disabled}
          open={isOpen}
          expandIcon={isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
          onToggleExpand={handleToggle}
          isParentNode
          onOpenNestedList={handleToggle}
          checked={checked}
          indeterminate={indeterminate}
          onSelect={!disabled ? handleOnSelect : undefined}
        />
      }
      expanded={isOpen}
      data-test-id={`${TEST_IDS.accordionItem}-${id}`}
    >
      <CollapseLevelContext.Provider value={{ level: level + 1 }}>{itemsJSX}</CollapseLevelContext.Provider>
    </CollapseBlockPrivate>
  );
}
