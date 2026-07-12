import { createRef } from 'react';

import { ITEM_PREFIXES, ITEM_TYPE } from '../../constants';
import { ItemContentProps } from '../../helperComponents';
import { getItemAutoId } from '../../utils';
import {
  AccordionItem,
  BaseItem,
  FlattenItem,
  FocusFlattenItem,
  GroupItem,
  GroupSelectItem,
  Item,
  ItemId,
  NextListItem,
} from './types';

function isRecord(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null;
}

export function isBaseItem<ReturnType = BaseItem>(item: unknown): item is ReturnType {
  return isRecord(item) && !('items' in item);
}
export function isAccordionItem<ReturnType = AccordionItem>(item: unknown): item is ReturnType {
  return isRecord(item) && 'items' in item && item['type'] === ITEM_TYPE.Collapse;
}
export function isNextListItem<ReturnType = NextListItem>(item: unknown): item is ReturnType {
  return isRecord(item) && 'items' in item && item['type'] === ITEM_TYPE.NextList;
}
export function isGroupItem<ReturnType = GroupItem>(item: unknown): item is ReturnType {
  return isRecord(item) && 'items' in item && item['type'] === ITEM_TYPE.Group;
}
export function isGroupSelectItem<ReturnType = GroupSelectItem>(item: unknown): item is ReturnType {
  return isRecord(item) && 'items' in item && item['type'] === ITEM_TYPE.GroupSelect;
}
export function isContentItem(item: unknown): item is ItemContentProps {
  return isRecord(item) && item['option'] !== undefined;
}

/**
 * Примитивный `content` (строка/число) — это шорткат для `{ option: content }`:
 * такой айтем рендерится через `ItemContent` и получает размерную высоту строки
 * (`min-height` по `size`), а не схлопывается до высоты текста, как произвольный ReactNode.
 */
export function isPrimitiveContent(item: unknown): item is string | number {
  return typeof item === 'string' || typeof item === 'number';
}

// Публичные дискриминаторы пропсов айтемов (документированы в README, потребитель
// сужает union `Item` по типу). Внутри пакета используются короткие формы `isBaseItem`
// и т.д.; наружу отдаём `is<Kind>Props`, как в публичном API типов (`<Kind>Props`).
export const isBaseItemProps = isBaseItem;
export const isAccordionItemProps = isAccordionItem;
export const isNextListItemProps = isNextListItem;
export const isGroupItemProps = isGroupItem;
export const isGroupSelectItemProps = isGroupSelectItem;

type FlattenProps = {
  item: Item;
  idx: number;
  prefix?: ItemId;
  parentId?: ItemId;
};

type KindFlattenItemsProps = {
  items: Item[];
  prefix?: ItemId;
  parentId?: ItemId;
};

export function kindFlattenItems({ items, prefix, parentId }: KindFlattenItemsProps) {
  const flattenItems: Record<string, FlattenItem> = {};
  const focusFlattenItems: Record<string, FocusFlattenItem> = {};

  function flatten({ item, idx, prefix, parentId = ITEM_PREFIXES.default }: FlattenProps): {
    id: ItemId;
    children: ItemId[];
    focusChildren: ItemId[];
    autoId: ItemId;
  } {
    const autoId = prefix !== undefined ? getItemAutoId(prefix, idx) : String(idx);
    const itemId = (!isGroupItem(item) ? item.id : undefined) ?? autoId;

    if (isBaseItem(item)) {
      flattenItems[itemId] = {
        ...item,
        items: [],
        allChildIds: [],
        id: itemId,
      };

      focusFlattenItems[autoId] = {
        key: autoId,
        originalId: itemId,
        id: autoId,
        // `inactive` элемент выпадает из клавиатурной навигации наравне с `disabled`
        // (см. JSDoc `BaseItem.inactive`). Гейтит только nav/bulk-select через
        // `extractActiveItems`; рендерный `disabled` в `flattenItems` остаётся исходным.
        disabled: item.disabled || item.inactive,
        parentId,
        items: [],
        allChildIds: [],
        itemRef: item.itemRef || createRef<HTMLElement>(),
      };

      return { id: itemId, children: [itemId], autoId, focusChildren: [autoId] };
    }

    let allChildIds: ItemId[] = [];
    let allFocusChildIds: ItemId[] = [];
    const closeChildIds: ItemId[] = [];
    const autoChildIds: ItemId[] = [];

    const { items, ...rest } = item;
    const childActiveParent = isGroupItem(item) ? (parentId ?? ITEM_PREFIXES.default) : autoId;

    const filteredItems = items.filter(item => !item.hidden);

    for (let idx = 0; idx < filteredItems.length; idx++) {
      const { id, children, autoId, focusChildren } = flatten({
        item: filteredItems[idx],
        idx,
        prefix: itemId,
        parentId: childActiveParent,
      });

      autoChildIds.push(autoId);
      closeChildIds.push(id);
      allChildIds = allChildIds.concat(children);
      allFocusChildIds = allFocusChildIds.concat(focusChildren);
    }

    const children = [...new Set(allChildIds.concat(closeChildIds))];
    const focusChildren = [...new Set(allFocusChildIds.concat(autoChildIds))];

    flattenItems[itemId] = {
      ...rest,
      id: itemId,
      items: [],
      allChildIds: children,
    };

    focusFlattenItems[autoId] = {
      key: autoId,
      originalId: itemId,
      id: autoId,
      parentId,
      items: autoChildIds,
      allChildIds: focusChildren,
      disabled: (item.type === ITEM_TYPE.Collapse || item.type === ITEM_TYPE.NextList) && item.disabled,
      type: item.type,
      itemRef: !isGroupItem(item) ? (item.itemRef ?? createRef<HTMLElement>()) : undefined,
    };

    return { id: itemId, children, autoId, focusChildren };
  }

  const closeChildIds: ItemId[] = [];
  const autoChildIds: ItemId[] = [];
  let allChildIds: ItemId[] = [];

  const filteredItems = items.filter(item => !item.hidden);

  for (let idx = 0; idx < filteredItems.length; idx++) {
    const { id, children, autoId } = flatten({ item: filteredItems[idx], idx, prefix, parentId });

    autoChildIds.push(autoId);
    closeChildIds.push(id);
    allChildIds.push(id);
    allChildIds = allChildIds.concat(children);
  }

  const children = [...new Set(allChildIds)];

  return {
    focusCloseChildIds: autoChildIds,
    allChildIds: children,
    flattenItems,
    focusFlattenItems,
  };
}

type ExtractActiveItemsProps = {
  focusFlattenItems: Record<string, FocusFlattenItem>;
  focusCloseChildIds: ItemId[];
  openCollapseItems: ItemId[];
  isSelectionMultiple?: boolean;
};

type ExtractActiveItemsReturnType = {
  ids: ItemId[];
  expandedIds: ItemId[];
};

export function extractActiveItems({
  focusFlattenItems,
  focusCloseChildIds,
  openCollapseItems,
  isSelectionMultiple,
}: ExtractActiveItemsProps): ExtractActiveItemsReturnType {
  const ids: ItemId[] = [];
  const expandedIds: ItemId[] = [];

  function internalFn(focusCloseChildIds: ItemId[]) {
    focusCloseChildIds.forEach(id => {
      const child = focusFlattenItems[id];

      if (child.type === ITEM_TYPE.Group) {
        internalFn(child.items);
        return;
      }

      if (!child.disabled) {
        if (child.type === ITEM_TYPE.GroupSelect) {
          if (isSelectionMultiple) {
            ids.push(child.id);
          }

          internalFn(child.items);
          return;
        }

        ids.push(child.id);

        if (child.type) {
          expandedIds.push(id);

          if (openCollapseItems.includes(child.originalId)) {
            internalFn(child.items);
          }
        }
      }
    });
  }

  internalFn(focusCloseChildIds);

  return {
    ids,
    expandedIds,
  };
}
