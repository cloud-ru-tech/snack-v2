import { useHierarchicalSelection } from '@ds/utils';
import { createRef, RefObject, useMemo } from 'react';

import { ITEM_PREFIXES } from '../../constants';
import { Separator } from '../../helperComponents';
import { getFooterItemId } from '../../utils';
import { useNewListContext, useSelectionContext } from '../Lists/contexts';
import { AccordionItem } from './AccordionItem';
import { BaseItem } from './BaseItem';
import { GroupSelectItem } from './GroupSelectItem';
import { NextListItem } from './NextListItem';
import { SimpleGroupBlock, SimpleItem } from './SimpleItem';
import {
  Flatten,
  FlattenAccordionItem,
  FlattenBaseItem,
  FlattenGroupSelectListItem,
  FlattenItem,
  FlattenNextListItem,
  FlattenSimpleItem,
  FocusFlattenItem,
  ItemId,
} from './types';
import { isAccordionItem, isGroupItem, isGroupSelectItem, isNextListItem, isSimpleItem } from './utils';

type GetRenderItemsProps = {
  focusCloseChildIds?: ItemId[];
  flattenItems: Record<string, FlattenItem>;
  focusFlattenItems: Record<string, FocusFlattenItem>;
  isSelectionMultiple?: boolean;
  /**
   * Id группы-родителя для строк режима переупорядочивания — передаётся в `data` `useSortable`
   * (kind=row).
   */
  groupId?: ItemId;
};

function getRenderItems({
  focusCloseChildIds,
  focusFlattenItems,
  flattenItems,
  isSelectionMultiple,
  groupId,
}: GetRenderItemsProps): (JSX.Element | null)[] {
  if (!focusCloseChildIds) {
    return [null];
  }

  return focusCloseChildIds.flatMap(id => {
    const { itemRef, key, originalId, items } = focusFlattenItems[id];

    const flattenItem = flattenItems[originalId];

    if (
      isGroupItem(flattenItem) ||
      (!isSelectionMultiple && isGroupSelectItem<FlattenGroupSelectListItem>(flattenItem))
    ) {
      // Группа в reorder-режиме: её строки размечены `type: Simple`. Заголовок + строки оборачиваются
      // в единый сортируемый блок `SimpleGroupBlock` — за ручку заголовка группа перетаскивается
      // целиком (строки едут вместе), а строки внутри блока переставляются собственным
      // `SortableContext`. Переупорядочивание строго по уровням, см. `reorderReorderItems`.
      const sortableChildIds = items
        .map(focusId => focusFlattenItems[focusId]?.originalId)
        .filter((childId): childId is ItemId => {
          const child = childId != null ? flattenItems[childId] : undefined;
          return Boolean(child && isSimpleItem(child));
        });

      const isSortableGroup = isGroupItem(flattenItem) && sortableChildIds.length > 0;

      const innerItemsJSX = getRenderItems({
        focusCloseChildIds: items,
        focusFlattenItems,
        flattenItems,
        isSelectionMultiple,
        groupId: isSortableGroup ? originalId : groupId,
      });

      if (isSortableGroup) {
        return (
          <SimpleGroupBlock
            id={originalId}
            label={flattenItem.label}
            beforeContent={flattenItem.beforeContent}
            truncate={flattenItem.truncate}
            divider={flattenItem.divider}
            groupVariant={flattenItem.groupVariant}
            rowIds={sortableChildIds}
            key={key}
          >
            {innerItemsJSX}
          </SimpleGroupBlock>
        );
      }

      return [
        <Separator
          label={flattenItem.label}
          beforeContent={flattenItem.beforeContent}
          truncate={flattenItem.truncate}
          divider={flattenItem.divider}
          groupVariant={flattenItem.groupVariant}
          key={key + '_separator'}
        />,
        ...innerItemsJSX,
      ];
    }
    if (isGroupSelectItem<FlattenGroupSelectListItem>(flattenItem)) {
      return <GroupSelectItem {...flattenItem} items={items} itemRef={itemRef} key={key} />;
    }
    if (isAccordionItem<FlattenAccordionItem>(flattenItem)) {
      return <AccordionItem {...flattenItem} items={items} itemRef={itemRef} key={key} />;
    }
    if (isNextListItem<FlattenNextListItem>(flattenItem)) {
      return <NextListItem {...flattenItem} focusId={id} items={items} itemRef={itemRef} key={key} />;
    }
    if (isSimpleItem<FlattenSimpleItem>(flattenItem)) {
      return <SimpleItem {...flattenItem} items={items} itemRef={itemRef} groupId={groupId} key={key} />;
    }

    return <BaseItem {...flattenItem} itemRef={itemRef} key={key} />;
  });
}

export function useRenderItems(focusCloseChildIds?: ItemId[]) {
  const { focusFlattenItems, flattenItems } = useNewListContext();
  const { isSelectionMultiple } = useSelectionContext();

  return useMemo(
    () => getRenderItems({ flattenItems, focusFlattenItems, focusCloseChildIds, isSelectionMultiple }),
    [flattenItems, focusCloseChildIds, focusFlattenItems, isSelectionMultiple],
  );
}

type UseCreateBaseItemsProps = {
  search?: boolean;
  footerActiveElementsRefs?: RefObject<HTMLElement>[];
};

export function useCreateBaseItems({ footerActiveElementsRefs }: UseCreateBaseItemsProps): {
  searchItem: Flatten<FlattenBaseItem, 'itemRef'>;
  footerItems: Flatten<FlattenBaseItem, 'itemRef'>[];
} {
  return useMemo(
    () => ({
      searchItem: {
        itemRef: createRef<HTMLInputElement>(),
        id: ITEM_PREFIXES.search,
        parentId: ITEM_PREFIXES.default,
        items: [],
        allChildIds: [],
      },
      footerItems:
        footerActiveElementsRefs?.map((itemRef, idx) => ({
          id: getFooterItemId(idx),
          itemRef,
          parentId: ITEM_PREFIXES.default,
          items: [],
          allChildIds: [],
        })) ?? [],
    }),
    [footerActiveElementsRefs],
  );
}

type UseGroupItemSelectionProps = {
  allChildIds: ItemId[];
  items: ItemId[];
  id: ItemId;
  disabled?: boolean;
};

export function useGroupItemSelection({ id, allChildIds }: UseGroupItemSelectionProps) {
  const selection = useSelectionContext();
  const { value, isSelectionMultiple } = selection;
  const { getSelectionState, toggleSelection } = useHierarchicalSelection({ includeParentsInValue: false });
  // group-select работает только в multiple-режиме — там setValue оперирует ItemId[].
  const setMultipleValue = selection.isSelectionMultiple ? selection.setValue : undefined;
  const { flattenItems } = useNewListContext();

  const baseChildIds = useMemo(
    () =>
      allChildIds.filter(itemId => {
        const item = flattenItems[itemId];

        return item && !('type' in item);
      }),
    [allChildIds, flattenItems],
  );

  const enableChildIds = useMemo(
    () =>
      baseChildIds.filter(itemId => {
        const item = flattenItems[itemId];

        return item && !('type' in item) && !item.disabled;
      }),
    [baseChildIds, flattenItems],
  );

  const selectionState = useMemo(
    () =>
      isSelectionMultiple
        ? getSelectionState({
            nodeId: id,
            childIds: baseChildIds,
            selectedIds: value ?? [],
          })
        : undefined,
    [baseChildIds, getSelectionState, id, isSelectionMultiple, value],
  );

  const checked = selectionState?.checked;
  const indeterminate = isSelectionMultiple ? selectionState?.indeterminate : baseChildIds.includes(value ?? '');

  const handleOnSelect = () => {
    if (!isSelectionMultiple) {
      return;
    }

    setMultipleValue?.(prev =>
      toggleSelection({
        nodeId: id,
        descendantIds: baseChildIds,
        selectableDescendantIds: enableChildIds,
        childIds: baseChildIds,
        selectedIds: prev ?? [],
      }),
    );
  };

  return { checked, indeterminate, handleOnSelect };
}
