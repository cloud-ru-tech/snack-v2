import { Dropdown } from '@ds/dropdown';
import { focusWithoutScroll, preventScrollOnVerticalArrows, useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { cloneElement, isValidElement, KeyboardEvent, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';

import { SearchItem } from '../../Items';
import {
  CollapseContext,
  FocusListContext,
  NewListContextProvider,
  OpenListContext,
  SelectionProvider,
} from '../contexts';
import { useListItemsModel, useNewKeyboardNavigation } from '../hooks';
import { ListPrivate } from '../ListPrivate';
import styles from '../styles.module.scss';
import { DroplistProps } from '../types';
import { DEFAULT_FALLBACK_PLACEMENTS, DEFAULT_SIZE, FOCUS_DEFERRAL_TIMEOUT } from './constants';

export function Droplist({
  items: itemsProp,
  search,
  pinBottom: pinBottomProp = [],
  pinTop: pinTopProp = [],
  footerActiveElementsRefs,
  children,
  trigger,
  placement,
  widthStrategy,
  triggerElemRef: triggerElemRefProp,
  container,
  open: openProp,
  onOpenChange,
  collapse = {},
  triggerClassName,
  selection,
  contentRender,
  size = DEFAULT_SIZE,
  marker = true,
  closeDroplistOnItemClick = false,
  className,
  listRef: listRefProp,
  untouchableScrollbars = false,
  virtualized = false,
  closeOnPopstate,
  header,
  headerDivider,
  footer,
  footerDivider,
  ...props
}: DroplistProps) {
  const {
    hasSearch,
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

  const [open = false, setOpen] = useValueControl<boolean>({
    value: openProp,
    defaultValue: false,
    onChange: onOpenChange,
  });

  const triggerElemRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const { handleListKeyDownFactory, resetActiveItemId, activeItemId, forceUpdateActiveItemId } =
    useNewKeyboardNavigation({
      mainRef: triggerElemRefProp ?? triggerElemRef,
      focusFlattenItems,
      hasListInFocusChain: true,
      firstItemId,
    });

  const handleListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => handleListKeyDownFactory(ids, expandedIds)(e),
    [handleListKeyDownFactory, ids, expandedIds],
  );

  // Закрытие по Escape должно вернуть фокус на триггер (a11y). Закрытие
  // outside-click'ом фокус не отбирает (пользователь намеренно ушёл в другое место),
  // поэтому различаем источник: флаг ставится Escape-обработчиком на контенте дроплиста.
  const closedByKeyboardRef = useRef(false);
  // Возврат фокуса откладывается на следующий тик (после размонтирования портала).
  // Храним id таймера, чтобы отменить его при размонтировании компонента.
  const focusTriggerTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(
    () => () => {
      clearTimeout(focusTriggerTimerRef.current);
    },
    [],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      resetActiveItemId();

      if (!open && closedByKeyboardRef.current) {
        const triggerEl = (triggerElemRefProp ?? triggerElemRef).current;
        focusTriggerTimerRef.current = setTimeout(() => triggerEl?.focus(), FOCUS_DEFERRAL_TIMEOUT);
      }

      closedByKeyboardRef.current = false;

      setOpen(open);
    },
    [resetActiveItemId, setOpen, triggerElemRefProp],
  );

  const handleContentKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      closedByKeyboardRef.current = true;
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>, cb?: (e: KeyboardEvent<HTMLElement>) => void) => {
      // Up/Down открывают/закрывают дроплист — гасим их нативный скролл страницы. Только
      // вертикальные: триггером может быть текстовое поле, где Left/Right двигают каретку.
      preventScrollOnVerticalArrows(e);

      if (e.key === 'ArrowDown') {
        setOpen(true);

        focusTriggerTimerRef.current = setTimeout(() => {
          resetActiveItemId();
          focusWithoutScroll(listRef.current);
        }, FOCUS_DEFERRAL_TIMEOUT);
      }

      if (e.key === 'ArrowUp') {
        setOpen(false);
      }

      cb?.(e);
    },
    [resetActiveItemId, setOpen],
  );

  const isValid = useMemo(() => isValidElement(children), [children]);

  const triggerElem: ReactNode = useMemo(() => {
    if (isValidElement(children)) {
      const props = typeof children.props === 'object' ? children.props : {};

      return cloneElement(children, {
        ...props,
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
          onKeyDown(e, children.props?.onKeyDown);
        },
      });
    }

    if (typeof children === 'function') {
      return children({ onKeyDown });
    }

    return children;
  }, [onKeyDown, children]);

  // search и footer вынесены из `<ul>` в слоты шапки/футера dropdown. Т.к. их события
  // клавиатуры больше не всплывают на `<ul>`-onKeyDown, навигацию по списку им отдаём
  // явно через `handleListKeyDown` (тот же factory). Фокус-хэндофф идёт через общие
  // refs (searchItem.itemRef / footerActiveElementsRefs), уже зарегистрированные в `ids`.
  const searchNode = hasSearch ? (
    <SearchItem
      search={search}
      itemRef={searchItem.itemRef}
      inTopBar
      onNavKeyDown={handleListKeyDown}
      onFocus={() => forceUpdateActiveItemId?.(searchItem.id)}
    />
  ) : undefined;

  const footerNode = footer ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={handleListKeyDown}>{footer}</div>
  ) : undefined;

  const collapseContextValue = useMemo(
    () => ({ openCollapseItems, toggleOpenCollapseItem }),
    [openCollapseItems, toggleOpenCollapseItem],
  );

  const focusListContextValue = useMemo(
    () => ({ activeItemId, handleListKeyDownFactory, forceUpdateActiveItemId }),
    [activeItemId, handleListKeyDownFactory, forceUpdateActiveItemId],
  );

  const closeDroplist = useCallback(() => {
    setOpen(false);
    resetActiveItemId();
    (triggerElemRefProp ?? triggerElemRef).current?.focus();
  }, [setOpen, resetActiveItemId, triggerElemRefProp]);

  const openListContextValue = useMemo(
    () => ({ closeDroplistOnItemClick, closeDroplist }),
    [closeDroplistOnItemClick, closeDroplist],
  );

  // virtualized-список не имеет собственной ширины (строки позиционируются absolute),
  // поэтому `auto` схлопывает дроплист в 0 — минимально допустимая стратегия `gte`.
  const effectiveWidthStrategy =
    virtualized && (widthStrategy === undefined || widthStrategy === 'auto') ? 'gte' : widthStrategy;

  return (
    <NewListContextProvider
      flattenItems={flattenItems}
      focusFlattenItems={focusFlattenItems}
      contentRender={contentRender}
      size={size}
      marker={marker}
      firstItemId={firstItemId}
      virtualized={virtualized}
    >
      <SelectionProvider {...selection}>
        <CollapseContext.Provider value={collapseContextValue}>
          <FocusListContext.Provider value={focusListContextValue}>
            <OpenListContext.Provider value={openListContextValue}>
              <Dropdown
                content={
                  // onKeyDown — пассивный детектор Escape для возврата фокуса на триггер
                  // (см. handleContentKeyDown). Контейнер презентационный, не интерактивный.
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div className={cn(styles.wrapper, className)} onKeyDown={handleContentKeyDown}>
                    <ListPrivate
                      {...props}
                      items={memorizedItems.items.focusCloseChildIds}
                      pinTop={memorizedItems.pinTop.focusCloseChildIds}
                      pinBottom={memorizedItems.pinBottom.focusCloseChildIds}
                      virtualized={virtualized}
                      onKeyDown={handleListKeyDown}
                      tabIndex={0}
                      ref={mergeRefs(listRef, listRefProp)}
                      dataFiltered={props.dataFiltered ?? Boolean(search?.value)}
                      onFocus={e => {
                        e.stopPropagation();

                        forceUpdateActiveItemId?.(ids[0]);
                      }}
                      limitedScrollHeight
                      untouchableScrollbars={untouchableScrollbars}
                    />
                  </div>
                }
                contentClassName={styles.droplistBody}
                headline={header}
                headerDivider={headerDivider}
                search={searchNode}
                footer={footerNode}
                footerDivider={footerDivider}
                container={container}
                outsideClick
                triggerClassName={triggerClassName}
                fallbackPlacements={DEFAULT_FALLBACK_PLACEMENTS}
                trigger={trigger}
                placement={placement}
                widthStrategy={effectiveWidthStrategy}
                triggerRef={!triggerElemRefProp ? triggerElemRef : (isValid && triggerElemRefProp) || undefined}
                open={open}
                onOpenChange={handleOpenChange}
                closeOnPopstate={closeOnPopstate}
              >
                {triggerElem}
              </Dropdown>
            </OpenListContext.Provider>
          </FocusListContext.Provider>
        </CollapseContext.Provider>
      </SelectionProvider>
    </NewListContextProvider>
  );
}
