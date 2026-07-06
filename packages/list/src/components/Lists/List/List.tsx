import { isBrowser } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ForwardedRef, forwardRef, KeyboardEvent, useCallback, useMemo, useRef } from 'react';

import { HiddenTabButton } from '../../../helperComponents';
import { CollapseContext, FocusListContext, NewListContextProvider, SelectionProvider } from '../contexts';
import { useListItemsModel, useNewKeyboardNavigation } from '../hooks';
import { ListPrivate } from '../ListPrivate';
import styles from '../styles.module.scss';
import { ListImplProps, ListProps, ReorderableListProps } from '../types';

const ListImpl = forwardRef(
  (
    {
      items: itemsProp = [],
      search,
      pinBottom: pinBottomProp = [],
      pinTop: pinTopProp = [],
      footerActiveElementsRefs,
      onKeyDown,
      tabIndex = 0,
      className,
      collapse = {},
      selection,
      contentRender,
      size = 'm',
      marker = true,
      keyboardNavigationRef,
      hasListInFocusChain = true,
      onItemsReorder,
      ...props
    }: ListImplProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const {
      openCollapseItems,
      toggleOpenCollapseItem,
      searchItem,
      flattenItems,
      focusFlattenItems,
      memorizedItems,
      ids,
      expandedIds,
      firstItemId,
      onDragEnd,
      sortableIds,
    } = useListItemsModel({
      items: itemsProp,
      pinTop: pinTopProp,
      pinBottom: pinBottomProp,
      search,
      collapse,
      selectionMode: selection?.mode,
      footerActiveElementsRefs,
      onItemsReorder,
    });

    const listRef = useRef<HTMLElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const { handleListKeyDownFactory, activeItemId, resetActiveItemId, forceUpdateActiveItemId } =
      useNewKeyboardNavigation({
        mainRef: listRef,
        btnRef,
        focusFlattenItems,
        keyboardNavigationRef,
        hasListInFocusChain,
        firstItemId,
      });

    const handleListKeyDown = useCallback(
      (e: KeyboardEvent<HTMLElement>) => handleListKeyDownFactory(ids, expandedIds)(e),
      [handleListKeyDownFactory, ids, expandedIds],
    );

    const isActive = isBrowser() && listRef.current === document.activeElement && activeItemId === undefined;

    const mergedHandlerKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(e);
      handleListKeyDown?.(e);
    };

    const handleOnFocus = () => {
      resetActiveItemId();
    };

    const collapseContextValue = useMemo(
      () => ({ openCollapseItems, toggleOpenCollapseItem }),
      [openCollapseItems, toggleOpenCollapseItem],
    );

    const focusListContextValue = useMemo(
      () => ({ activeItemId, handleListKeyDownFactory, forceUpdateActiveItemId }),
      [activeItemId, handleListKeyDownFactory, forceUpdateActiveItemId],
    );

    return (
      <NewListContextProvider
        flattenItems={flattenItems}
        focusFlattenItems={focusFlattenItems}
        contentRender={contentRender}
        size={size}
        marker={marker}
        firstItemId={firstItemId}
        virtualized={props.virtualized}
      >
        <SelectionProvider {...selection}>
          <CollapseContext.Provider value={collapseContextValue}>
            <FocusListContext.Provider value={focusListContextValue}>
              <div className={cn(styles.wrapper, className)} data-active={isActive || undefined}>
                <ListPrivate
                  {...props}
                  items={memorizedItems.items.focusCloseChildIds}
                  pinTop={memorizedItems.pinTop.focusCloseChildIds}
                  pinBottom={memorizedItems.pinBottom.focusCloseChildIds}
                  searchItem={searchItem}
                  ref={mergeRefs(ref, listRef)}
                  onFocus={handleOnFocus}
                  onKeyDown={mergedHandlerKeyDown}
                  tabIndex={hasListInFocusChain ? tabIndex : undefined}
                  search={search}
                  nested={false}
                  onDragEnd={onDragEnd}
                  sortableIds={sortableIds}
                />

                {hasListInFocusChain && <HiddenTabButton ref={btnRef} listRef={listRef} tabIndex={tabIndex} />}
              </div>
            </FocusListContext.Provider>
          </CollapseContext.Provider>
        </SelectionProvider>
      </NewListContextProvider>
    );
  },
);

ListImpl.displayName = 'ListImpl';

/** Список айтемов: base / collapse / group / next-list, с опциональной виртуализацией. */
export const List = forwardRef((props: ListProps, ref: ForwardedRef<HTMLElement>) => <ListImpl {...props} ref={ref} />);

List.displayName = 'List';

/**
 * Список с drag&drop-переупорядочиванием строк за ручку слева. Управляемый: порядок не хранит,
 * а отдаёт обновлённое дерево в `onItemsReorder`. Модель айтемов — `ReorderItem` (плоская строка
 * либо группа с заголовком); `collapse`/`next-list`/`group-select` и виртуализация не поддержаны.
 */
export const ReorderableList = forwardRef((props: ReorderableListProps, ref: ForwardedRef<HTMLElement>) => (
  <ListImpl {...props} ref={ref} />
));

ReorderableList.displayName = 'ReorderableList';
