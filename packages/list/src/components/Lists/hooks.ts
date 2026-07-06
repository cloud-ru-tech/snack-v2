import { DragEndEvent } from '@dnd-kit/core';
import { preventScrollOnArrowKeys, useValueControl } from '@ds/utils';
import { KeyboardEvent, RefObject, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { ITEM_PREFIXES, ITEM_TYPE, MODE } from '../../constants';
import { Mode, SearchState } from '../../types';
import {
  extractActiveItems,
  FocusFlattenItem,
  Item,
  ItemId,
  kindFlattenItems,
  ReorderItem,
  useCreateBaseItems,
} from '../Items';
import { CollapseState } from './contexts';
import { reorderItems } from './utils';

// Селектор фокусируемых узлов для возврата фокуса на триггер при «выходе вверх» из списка.
const FOCUSABLE_SELECTOR = 'input,textarea,select,button,a[href],[tabindex]';

/**
 * Вернуть фокус на триггер списка. `mainRef` может указывать не на сам фокусируемый узел, а на
 * обёртку popover'а (`PopoverPrivate` перезаписывает переданный `triggerRef.current` своим span-
 * wrapper'ом — см. MR!101). Span не фокусируется, поэтому если узел сам не focusable — фокусируем
 * первый focusable-потомок (input у FieldSelect, Button у голого Droplist).
 */
function focusReturnTarget(el: HTMLElement | null | undefined) {
  if (!el) {
    return;
  }
  const target = el.matches(FOCUSABLE_SELECTOR) ? el : el.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
  target?.focus();
}

type UseListItemsModelProps = {
  items: Item[] | ReorderItem[];
  pinTop: Item[];
  pinBottom: Item[];
  search?: SearchState;
  collapse: CollapseState;
  selectionMode?: Mode;
  footerActiveElementsRefs?: RefObject<HTMLElement>[];
  /**
   * Колбек drag&drop-переупорядочивания (см. `ListProps.onItemsReorder`). Наличие переключает
   * `items` в сортируемый режим: `kindFlattenItems` размечает каждый узел `type: ITEM_TYPE.Simple`,
   * а хук дополнительно возвращает `onDragEnd`/`sortableIds` для `DndContext`/`SortableContext`
   * (собираемых уже в `ListPrivate`).
   */
  onItemsReorder?(items: ReorderItem[]): void;
};

/**
 * Единая модель данных списка для `List` и `Droplist`: collapse-состояние,
 * плоские карты айтемов (`flattenItems` / `focusFlattenItems`) и производный
 * порядок навигации (`ids` / `expandedIds`). Оба компонента собирают одну и ту же
 * структуру, поэтому она живёт в одном хуке — расхождение между списком и дроплистом
 * физически невозможно.
 */
export function useListItemsModel({
  items: itemsProp,
  pinTop: pinTopProp,
  pinBottom: pinBottomProp,
  search,
  collapse,
  selectionMode,
  footerActiveElementsRefs,
  onItemsReorder,
}: UseListItemsModelProps) {
  const hasSearch = useMemo(() => Boolean(search), [search]);
  const sortable = Boolean(onItemsReorder);

  const [openCollapseItems = [], setOpenCollapsedItems] = useValueControl<ItemId[] | undefined>(collapse);
  const toggleOpenCollapseItem = useCallback(
    (id: ItemId) =>
      setOpenCollapsedItems((items: ItemId[]) =>
        items?.includes(id) ? items.filter(item => item !== id) : (items ?? []).concat([id]),
      ),
    [setOpenCollapsedItems],
  );

  const { searchItem, footerItems } = useCreateBaseItems({ footerActiveElementsRefs });

  /**
   * Объект с пропсами всех вложенных айтемов; ключ id
   */
  const { flattenItems, focusFlattenItems, ...memorizedItems } = useMemo(() => {
    const pinTop = kindFlattenItems({
      items: pinTopProp,
      prefix: ITEM_PREFIXES.pinTop,
      parentId: ITEM_PREFIXES.default,
    });
    const items = kindFlattenItems({
      items: itemsProp,
      prefix: ITEM_PREFIXES.default,
      parentId: ITEM_PREFIXES.default,
      sortable,
    });
    const pinBottom = kindFlattenItems({
      items: pinBottomProp,
      prefix: ITEM_PREFIXES.pinBottom,
      parentId: ITEM_PREFIXES.default,
    });

    const flattenItems = { ...pinTop.flattenItems, ...pinBottom.flattenItems, ...items.flattenItems };
    const focusFlattenItems = {
      ...pinTop.focusFlattenItems,
      ...pinBottom.focusFlattenItems,
      ...items.focusFlattenItems,
    };

    [...footerItems, searchItem].forEach(item => {
      flattenItems[item.id] = item;
      focusFlattenItems[item.id] = { ...item, originalId: item.id, items: [], key: item.id, allChildIds: [] };
    });

    return { items, pinTop, pinBottom, flattenItems, focusFlattenItems };
  }, [itemsProp, pinTopProp, pinBottomProp, searchItem, footerItems, sortable]);

  const { ids, expandedIds } = useMemo(() => {
    const { pinTop, items, pinBottom } = memorizedItems;

    let ids: ItemId[] = [];
    let expandedIds: ItemId[] = [];

    if (hasSearch) {
      ids.push(searchItem.id);
    }

    [pinTop, items, pinBottom].forEach(({ focusFlattenItems, focusCloseChildIds }) => {
      const activeItems = extractActiveItems({
        focusFlattenItems,
        focusCloseChildIds,
        openCollapseItems,
        isSelectionMultiple: selectionMode === MODE.Multiple,
      });

      ids = ids.concat(activeItems.ids);
      expandedIds = expandedIds.concat(activeItems.expandedIds);
    });

    footerItems.forEach(footerItem => {
      ids.push(footerItem.id);
    });

    return { ids, expandedIds };
  }, [footerItems, hasSearch, memorizedItems, openCollapseItems, searchItem.id, selectionMode]);

  // Работает с исходным (не плоским) деревом `itemsProp` — гарантированно `ReorderItem[]`, когда
  // `onItemsReorder` передан (см. дискриминированный `ListProps` — вызывающая сторона это
  // обеспечивает на уровне типов, здесь только рантайм-каст).
  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!onItemsReorder || !over || active.id === over.id) {
        return;
      }

      onItemsReorder(reorderItems(itemsProp as ReorderItem[], active.id, over.id));
    },
    [itemsProp, onItemsReorder],
  );

  return {
    hasSearch,
    openCollapseItems,
    toggleOpenCollapseItem,
    searchItem,
    footerItems,
    flattenItems,
    focusFlattenItems,
    memorizedItems,
    ids,
    expandedIds,
    firstItemId: ids[0],
    // Всегда `undefined`, когда `onItemsReorder` не передан — `ListPrivate` включает
    // `DndContext`/`SortableContext` и принудительно отключает виртуализацию по наличию `onDragEnd`.
    onDragEnd: sortable ? handleDragEnd : undefined,
    // Внешний `SortableContext` держит сортируемые элементы верхнего уровня: строки без группы
    // (`Simple`) и сами группы (`Group`) — группы переставляются между собой за ручку на заголовке.
    // Строки внутри групп сортируются в собственных `SortableContext` (их разворачивает
    // `getRenderItems`), чтобы переупорядочивание шло строго внутри группы. Для плоского списка —
    // просто все id.
    sortableIds: sortable
      ? memorizedItems.items.focusCloseChildIds
          .map(focusId => focusFlattenItems[focusId])
          .filter(item => item?.type === ITEM_TYPE.Simple || item?.type === ITEM_TYPE.Group)
          .map(item => item.originalId)
      : undefined,
  };
}

type UseNewKeyboardNavigationProps<T extends HTMLElement> = {
  mainRef?: RefObject<T>;
  btnRef?: RefObject<HTMLButtonElement>;
  focusFlattenItems: Record<string, FocusFlattenItem>;
  keyboardNavigationRef?: RefObject<{ focusItem(item: ItemId): void }>;
  hasListInFocusChain: boolean;
  firstItemId: ItemId;
};

export function useNewKeyboardNavigation<T extends HTMLElement>({
  mainRef,
  btnRef,
  focusFlattenItems,
  keyboardNavigationRef,
  hasListInFocusChain,
  firstItemId,
}: UseNewKeyboardNavigationProps<T>) {
  const defaultActiveItemId = hasListInFocusChain ? undefined : firstItemId;
  const [activeItemId, setActiveItemId] = useState<ItemId | undefined>(() => defaultActiveItemId);
  const activeItemIdRef = useRef<ItemId | undefined>(defaultActiveItemId);

  const resetActiveItemId = useCallback(() => {
    setActiveItemId(defaultActiveItemId);
    activeItemIdRef.current = defaultActiveItemId;
  }, [defaultActiveItemId]);

  const handleListKeyDownFactory = useCallback(
    (ids: ItemId[], expandedIds: ItemId[]) => (e: KeyboardEvent<T>) => {
      // Стрелки навигации по списку гасим централизованно — иначе нативное поведение скроллит
      // страницу (элементы — кнопки/li, не текст, поэтому безопасны все четыре стрелки).
      preventScrollOnArrowKeys(e);

      switch (e.key) {
        case 'ArrowDown': {
          if (activeItemIdRef.current !== undefined) {
            const activeIndex = ids.findIndex(id => id === activeItemIdRef.current);

            const nextId = Math.min(activeIndex + 1, ids.length - 1);
            const itemId = ids[nextId];
            const item = focusFlattenItems[itemId];

            activeItemIdRef.current = itemId;
            setActiveItemId(itemId);

            if (item?.type !== ITEM_TYPE.Group) {
              item?.itemRef?.current?.focus();
            }
          } else {
            const itemId = ids[0];
            const item = focusFlattenItems[itemId];

            activeItemIdRef.current = itemId;
            setActiveItemId(itemId);

            if (item?.type !== ITEM_TYPE.Group) {
              item?.itemRef?.current?.focus();
            }
          }

          e.stopPropagation();
          return;
        }
        case 'ArrowUp': {
          if (ids[0] === activeItemIdRef.current) {
            if (hasListInFocusChain) {
              const item = focusFlattenItems[ids[0]];

              if (item?.parentId === ITEM_PREFIXES.default) {
                activeItemIdRef.current = undefined;
                setActiveItemId(undefined);
                focusReturnTarget(mainRef?.current);
              }
            }
          } else if (activeItemIdRef.current !== undefined) {
            const activeIndex = ids.findIndex(id => id === activeItemIdRef.current);
            const nextId = Math.max(activeIndex - 1, 0);
            const itemId = ids[nextId];
            const item = focusFlattenItems[itemId];

            activeItemIdRef.current = itemId;
            setActiveItemId(itemId);

            if (item?.type !== ITEM_TYPE.Group) {
              item?.itemRef?.current?.focus();
            }
          }

          e.stopPropagation();
          return;
        }

        case 'ArrowRight': {
          if (activeItemIdRef.current !== undefined && expandedIds.includes(activeItemIdRef.current)) {
            const item = focusFlattenItems[activeItemIdRef.current];
            const newItemId = item?.items[0];

            if (newItemId === undefined) {
              return;
            }

            const newItem = focusFlattenItems[newItemId];

            activeItemIdRef.current = newItemId;
            setActiveItemId(newItemId);

            setTimeout(() => newItem?.itemRef?.current?.focus(), 0);

            e.stopPropagation();
          }

          return;
        }

        case 'Tab': {
          if (activeItemIdRef.current !== undefined) {
            if (hasListInFocusChain) {
              e.preventDefault();
              e.stopPropagation();

              activeItemIdRef.current = undefined;
              setActiveItemId(undefined);
              focusReturnTarget(mainRef?.current);
            } else {
              resetActiveItemId();
            }
          } else {
            btnRef && !e.shiftKey ? btnRef?.current?.focus() : focusReturnTarget(mainRef?.current);
          }

          return;
        }
        default: {
          return;
        }
      }
    },
    [focusFlattenItems, hasListInFocusChain, mainRef, resetActiveItemId, btnRef],
  );

  const forceUpdateActiveItemId = useCallback(
    (itemId: ItemId) => {
      setActiveItemId(itemId);
      activeItemIdRef.current = itemId;

      const item = focusFlattenItems[itemId];

      item?.itemRef?.current?.focus();
    },
    [focusFlattenItems],
  );

  useImperativeHandle(keyboardNavigationRef, () => ({ focusItem: forceUpdateActiveItemId }), [forceUpdateActiveItemId]);

  return {
    resetActiveItemId,
    activeItemId,
    forceUpdateActiveItemId,
    handleListKeyDownFactory,
  };
}
