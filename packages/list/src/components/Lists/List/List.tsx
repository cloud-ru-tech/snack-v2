import { isBrowser } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ForwardedRef, forwardRef, KeyboardEvent, useCallback, useMemo, useRef } from 'react';

import { HiddenTabButton } from '../../../helperComponents';
import { CollapseContext, FocusListContext, NewListContextProvider, SelectionProvider } from '../contexts';
import { useListItemsModel, useNewKeyboardNavigation } from '../hooks';
import { ListPrivate } from '../ListPrivate';
import styles from '../styles.module.scss';
import { ListProps } from '../types';

export const List = forwardRef(
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
      ...props
    }: ListProps,
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
    } = useListItemsModel({
      items: itemsProp,
      pinTop: pinTopProp,
      pinBottom: pinBottomProp,
      search,
      collapse,
      selectionMode: selection?.mode,
      footerActiveElementsRefs,
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
