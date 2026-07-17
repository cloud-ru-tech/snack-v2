import { Dropdown } from '@ds/dropdown';
import { ChevronRightSVG } from '@ds/icons/interface/system';
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ITEM_PREFIXES } from '../../../constants';
import { useCollapseContext, useFocusListContext, useNewListContext, useSelectionContext } from '../../Lists/contexts';
import { ListPrivate } from '../../Lists/ListPrivate';
import { BaseItem } from '../BaseItem';
import { useGroupItemSelection } from '../hooks';
import { FlattenNextListItem } from '../types';
import { extractActiveItems, isNextListItem } from '../utils';
import { FALLBACK_PLACEMENTS } from './constants';
import { NextListItemProps } from './types';

export function NextListItem({
  items,
  placement = 'right-start',
  id,
  scroll,
  scrollRef,
  disabled,
  onSublistOpenChanged,
  allChildIds,
  loading = false,
  dataError = false,
  dataFiltered = false,
  focusId = id,
  untouchableScrollbars = false,
  ...option
}: NextListItemProps) {
  const { flattenItems, focusFlattenItems, virtualized } = useNewListContext();
  const { value, isSelectionSingle, isSelectionMultiple } = useSelectionContext();
  const { openCollapseItems = [] } = useCollapseContext();

  const item = flattenItems[id];

  const { ids, expandedIds } = useMemo(() => {
    const { ids, expandedIds } = extractActiveItems({
      focusCloseChildIds: items,
      focusFlattenItems,
      openCollapseItems,
      isSelectionMultiple,
    });

    return { ids, expandedIds: expandedIds.concat([id]) };
  }, [focusFlattenItems, id, isSelectionMultiple, items, openCollapseItems]);

  const { handleListKeyDownFactory, activeItemId, forceUpdateActiveItemId } = useFocusListContext();

  const [open, setOpen] = useState<boolean>();

  const handleListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      handleListKeyDownFactory(ids, expandedIds)(e);

      if (e.key === 'ArrowLeft') {
        forceUpdateActiveItemId?.(focusId);
        setOpen(false);
        e.stopPropagation();

        return;
      }
    },
    [handleListKeyDownFactory, ids, expandedIds, forceUpdateActiveItemId, focusId],
  );

  const {
    indeterminate,
    checked: checkedProp,
    handleOnSelect,
  } = useGroupItemSelection({
    items: isNextListItem<FlattenNextListItem>(item) ? item.items : [],
    id,
    disabled,
    allChildIds,
  });

  const handleOutsideClick = useCallback(() => {
    forceUpdateActiveItemId?.(ITEM_PREFIXES.dropFocus);
    setOpen(false);
    return true;
  }, [forceUpdateActiveItemId]);

  const isOpen = useMemo(
    () => Boolean(!disabled && activeItemId && focusFlattenItems[focusId]?.allChildIds.includes(activeItemId)),
    [activeItemId, disabled, focusFlattenItems, focusId],
  );

  const checked = Boolean(
    (indeterminate && !open && isSelectionSingle && value && allChildIds.includes(value)) ||
    (isSelectionMultiple && checkedProp),
  );

  useEffect(() => {
    setOpen(open => open && isOpen);
  }, [isOpen]);

  const listRef = useRef<HTMLElement>(null);

  const openSublist = useCallback(() => {
    setOpen(true);
    setTimeout(() => {
      listRef.current?.focus();
    }, 0);
  }, []);

  return (
    <Dropdown
      outsideClick={handleOutsideClick}
      fallbackPlacements={FALLBACK_PLACEMENTS}
      bodyPadding={false}
      content={
        <ListPrivate
          onKeyDown={handleListKeyDown}
          items={items}
          nested
          scroll={scroll}
          virtualized={virtualized}
          tabIndex={0}
          ref={listRef}
          onFocus={e => {
            e.stopPropagation();
            forceUpdateActiveItemId?.(ids[0]);
          }}
          scrollRef={scrollRef}
          limitedScrollHeight
          untouchableScrollbars={untouchableScrollbars}
          loading={loading}
          dataError={dataError}
          dataFiltered={dataFiltered}
        />
      }
      trigger='hover'
      open={isOpen || open}
      onOpenChange={value => {
        setOpen(value);
        onSublistOpenChanged?.(value, id);
      }}
      placement={placement}
      widthStrategy='auto'
    >
      <BaseItem
        {...option}
        disabled={disabled}
        open={isOpen || open}
        expandIcon={<ChevronRightSVG />}
        id={id}
        isParentNode
        indeterminate={indeterminate}
        checked={checked}
        onOpenNestedList={openSublist}
        onExpandIconClick={openSublist}
        onSelect={handleOnSelect}
      />
    </Dropdown>
  );
}
