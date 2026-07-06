import { createRef } from 'react';

import { ITEM_PREFIXES, ITEM_TYPE } from '../../constants';
import { ItemContentProps } from '../../helperComponents';
import { getItemAutoId } from '../../utils';
import {
  AccordionItem,
  BaseItem,
  FlattenItem,
  FlattenSimpleItem,
  FocusFlattenItem,
  GroupItem,
  GroupSelectItem,
  Item,
  ItemId,
  NextListItem,
  ReorderItem,
  SimpleGroupItem,
  SimpleItem,
} from './types';

// `kindFlattenItems`/`flatten` работают и с обычным деревом `Item[]`, и с деревом `SimpleItem[]`
// в режиме drag&drop-переупорядочивания (см. `sortable` ниже) — тип-гварды (`isBaseItem` и т.д.)
// уже структурны (`'items' in item`), им достаточно расширенного объединения.
type FlattenableItem = Item | SimpleItem;

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
// В отличие от остальных `is<Kind>Item`, не требует `'items' in item` — `Simple`-айтемы без
// вложенности (листья) тоже размечаются `type: ITEM_TYPE.Simple` в `kindFlattenItems`.
export function isSimpleItem<ReturnType = FlattenSimpleItem>(item: unknown): item is ReturnType {
  return isRecord(item) && item['type'] === ITEM_TYPE.Simple;
}
// Гарды для «сырого» дерева reorder-режима (payload `onItemsReorder`): группа `SimpleGroupItem`
// несёт `type: Group`, строка `SimpleItem` — без `type`. Отличаются от `isSimpleItem` (он смотрит
// `type: Simple`, проставляемый только при уплощении через `kindFlattenItems`), поэтому на payload'е
// `onItemsReorder` использовать нужно именно эти.
export function isReorderGroup(item: ReorderItem): item is SimpleGroupItem {
  return 'type' in item && item.type === ITEM_TYPE.Group;
}
export function isReorderBaseItem(item: ReorderItem): item is SimpleItem {
  return !isReorderGroup(item);
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
  item: FlattenableItem;
  idx: number;
  prefix?: ItemId;
  parentId?: ItemId;
};

type KindFlattenItemsProps = {
  items: FlattenableItem[];
  prefix?: ItemId;
  parentId?: ItemId;
  /**
   * Дерево — `SimpleItem[]` в режиме drag&drop-переупорядочивания (`onItemsReorder`): каждый
   * узел (лист и контейнер) размечается `type: ITEM_TYPE.Simple`, чтобы `getRenderItems` рендерил
   * его через сортируемую обёртку, а `extractActiveItems` — считал всегда «развёрнутым».
   */
  sortable?: boolean;
};

export function kindFlattenItems({ items, prefix, parentId, sortable }: KindFlattenItemsProps) {
  const flattenItems: Record<string, FlattenItem> = {};
  const focusFlattenItems: Record<string, FocusFlattenItem> = {};

  function flatten({ item, idx, prefix, parentId = ITEM_PREFIXES.default }: FlattenProps): {
    id: ItemId;
    children: ItemId[];
    focusChildren: ItemId[];
    autoId: ItemId;
  } {
    const autoId = prefix !== undefined ? getItemAutoId(prefix, idx) : String(idx);
    // В reorder-режиме (`sortable`) группа несёт собственный `id` (нужен `@dnd-kit` как identity
    // для перестановки групп) — используется он. Обычная (не сортируемая) группа `id` не имеет — `autoId`.
    const itemId = (isGroupItem(item) && !sortable ? undefined : (item as { id?: ItemId }).id) ?? autoId;

    if (isBaseItem(item)) {
      // `type` добавляется в `flattenItems` только в `sortable`-режиме: другой код (например,
      // `useGroupItemSelection`) отличает базовые айтемы от контейнерных через `!('type' in item)`,
      // а не по значению — присутствие ключа `type: undefined` уже сломало бы эту проверку.
      flattenItems[itemId] = {
        ...item,
        items: [],
        allChildIds: [],
        id: itemId,
        ...(sortable ? { type: ITEM_TYPE.Simple } : {}),
      };

      focusFlattenItems[autoId] = {
        // React key = `itemId`, не `autoId`. `autoId` — позиционный путь в focus-дереве
        // (`default-0`, `default-1`, …): при `onItemsReorder` путь остаётся на месте, а данные
        // под ним меняются. Ключ по позиции оставляет тот же инстанс (`Switch` и т.п.) в слоте
        // и проигрывает transition на смене `checked` — `Switch` визуально «переезжает».
        key: itemId,
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
        type: sortable ? ITEM_TYPE.Simple : undefined,
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

    // При `sortable` дерево в рантайме целиком `SimpleItem[]`, но статический тип этого не выражает
    // (структурно совпадает с `BaseItem`) — отсюда каст к `SimpleItem` за `disabled`.
    const containerDisabled = sortable
      ? (item as SimpleItem).disabled
      : (item.type === ITEM_TYPE.Collapse || item.type === ITEM_TYPE.NextList) && item.disabled;

    focusFlattenItems[autoId] = {
      // См. комментарий у листового `key` выше — стабильная identity, не позиционный autoId.
      key: autoId + '_' + itemId,
      originalId: itemId,
      id: autoId,
      parentId,
      items: autoChildIds,
      allChildIds: focusChildren,
      disabled: containerDisabled,
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

      // `Simple` (drag&drop-переупорядочивание, `onItemsReorder`) не имеет collapse-состояния —
      // строка всегда «развёрнута»: сама участвует в навигации (если не disabled) и рекурсия в
      // детей идёт безусловно, в отличие от `Collapse`/`NextList` ниже (гейт `openCollapseItems`).
      if (child.type === ITEM_TYPE.Simple) {
        if (!child.disabled) {
          ids.push(child.id);
          internalFn(child.items);
        }
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
