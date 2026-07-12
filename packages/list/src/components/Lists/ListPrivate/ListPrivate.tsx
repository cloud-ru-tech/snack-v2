import { Spinner } from '@ds/loader';
import { Scroll } from '@ds/scroll';
import { extractSupportProps, useLayoutEffect } from '@ds/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ForwardedRef, forwardRef, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../../constants';
import { ListEmptyState, useEmptyState } from '../../../helperComponents';
import { stopPropagation } from '../../../utils';
import { ItemId, PinBottomGroupItem, PinTopGroupItem, SearchItem, useRenderItems } from '../../Items';
import { useNewListContext, useSelectionContext } from '../contexts';
import commonStyles from '../styles.module.scss';
import { ListPrivateProps } from '../types';
import { ALL_SIZES, SPINNER_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

type ScrollState = {
  virtualizer: ItemId | null;
  browser: ItemId | null;
  measured: boolean;
};

/**
 * Центрирует элемент внутри своего scroll-контейнера правкой `scrollTop` контейнера.
 * В отличие от `element.scrollIntoView({ block: 'center' })`, НЕ скроллит вышестоящие предки
 * (включая window) — иначе при монтировании списка с `scrollToSelectedItem` страница доков
 * «дёргалась» (окно прыгало, чтобы показать выбранный элемент). См. ревью MR!101.
 */
function centerItemInScrollContainer(container: HTMLElement | null, item: HTMLElement | null) {
  if (!container || !item) {
    return;
  }
  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const delta = itemRect.top - containerRect.top - (container.clientHeight - itemRect.height) / 2;
  container.scrollTop += delta;
}

export const ListPrivate = forwardRef(
  (
    {
      items,
      pinTop,
      pinBottom,
      onKeyDown,
      onBlur,
      onFocus,
      tabIndex,
      active,
      scroll,
      nested,
      search,
      searchItem,
      scrollRef,
      scrollContainerRef,
      onScroll,
      footer,
      header,
      headerDivider,
      footerDivider,
      loading,
      limitedScrollHeight,
      untouchableScrollbars,
      className,
      noDataState,
      noResultsState,
      errorDataState,
      dataError,
      dataFiltered,
      scrollToSelectedItem = false,
      virtualized = false,
      scrollContainerClassName,
      barHideStrategy = 'never',
      ...props
    }: ListPrivateProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { size = 'm', flattenItems, focusFlattenItems } = useNewListContext();
    const { value, isSelectionSingle } = useSelectionContext();
    const innerScrollRef = useRef<HTMLElement | null>(null);
    // `@ds/scroll` (OverlayScrollbars) разрешает свой ref в viewport-элемент только после
    // инициализации инстанса. До этого `innerScrollRef.current` === null, и виртуализатор
    // не получает scroll-элемент → рендерит пустой контейнер. Флаг поднимается из
    // `onInitialized` и форсит повторный `measure()` уже с готовым viewport'ом.
    const [scrollElementReady, setScrollElementReady] = useState(false);

    const itemsJSX = useRenderItems(items);
    const itemsPinTopJSX = useRenderItems(pinTop);
    const itemsPinBottomJSX = useRenderItems(pinBottom);

    const pinTopItemsPresent = Number(pinTop?.length) > 0;
    const pinBottomItemsPresent = Number(pinBottom?.length) > 0;

    const [scrollState, setScrollState] = useState<ScrollState>({ virtualizer: null, browser: null, measured: false });

    const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });
    const hasNoItems = items.length === 0;

    const { selectedItemIndex, selectedItem } = useMemo(() => {
      const result = {
        selectedItemIndex: -1,
        selectedItem: undefined,
      };

      if (!scrollToSelectedItem || !value) {
        return result;
      }

      const selectedItem = isSelectionSingle ? flattenItems[value] : flattenItems[value[0]];
      if (!selectedItem?.id) {
        return result;
      }

      const allFocusFlattenItems = Object.values(focusFlattenItems);
      const index = allFocusFlattenItems.findIndex(item => item.originalId === selectedItem.id);
      if (index < 0) {
        return result;
      }

      return {
        selectedItemIndex: index,
        selectedItem: allFocusFlattenItems[index],
      };
    }, [flattenItems, focusFlattenItems, isSelectionSingle, scrollToSelectedItem, value]);

    // Реальная высота строки может превышать однострочный `ALL_SIZES[size]` (например, item с
    // `description` — двухстрочный). Если estimateSize занижен, незамеренные строки оцениваются
    // меньше реальных, и по мере прокрутки `measureElement` правит totalSize — контент «скачет».
    // Меряем фактическую высоту первой отрисованной строки и используем как оценку для остальных:
    // totalSize становится точным сразу, скачок пропадает. measureElement по-прежнему уточняет
    // разнородные строки построчно.
    const [measuredRowSize, setMeasuredRowSize] = useState<number | null>(null);

    const virtualizer = useVirtualizer({
      count: itemsJSX.length,
      // Зависимость на `scrollElementReady` заставляет виртуализатор перечитать scroll-элемент
      // после инициализации OverlayScrollbars (когда `innerScrollRef.current` уже не null).
      getScrollElement: () => (scroll && scrollElementReady ? innerScrollRef.current : null),
      estimateSize: () => measuredRowSize ?? ALL_SIZES[size],
      enabled: virtualized,
      overscan: 5, // Amount of elements in DOM before/after visible ones
    });
    const virtualItems = virtualizer.getVirtualItems();

    // Сбрасываем измеренную оценку при смене size — однострочная база снова станет дефолтом
    // до первого замера новой плотности.
    useEffect(() => {
      setMeasuredRowSize(null);
    }, [size]);

    // Замер реальной высоты первой строки после её отрисовки (до того, как пользователь начнёт
    // скроллить). Один замер на size: как только оценка зафиксирована, эффект больше ничего не
    // делает (measureElement продолжает уточнять разнородные строки построчно).
    const hasRenderedRows = virtualItems.length > 0;
    useLayoutEffect(() => {
      if (!virtualized || !scrollElementReady || measuredRowSize !== null || !hasRenderedRows) {
        return;
      }
      const firstRow = innerScrollRef.current?.querySelector<HTMLElement>('[data-index]');
      const height = firstRow?.offsetHeight;
      if (height && Math.abs(height - ALL_SIZES[size]) > 1) {
        setMeasuredRowSize(height);
      }
    }, [virtualized, scrollElementReady, measuredRowSize, hasRenderedRows, size]);

    useEffect(() => {
      if (!scrollElementReady) {
        return; // Scroll-элемент ещё не готов — измерять нечего, иначе фиксируем пустой кадр.
      }
      if (scrollState.measured) {
        return;
      }

      virtualizer.measure();

      setScrollState(prevState => ({
        ...prevState,
        measured: true,
      }));
    }, [scrollElementReady, scrollState.measured, virtualizer]);

    const isScrollToItemEnabled = scroll && scrollToSelectedItem && virtualized;

    useEffect(() => {
      if (isScrollToItemEnabled) {
        if (!scrollState.measured) {
          return; // Not measured yet
        }
        if (selectedItemIndex < 0 || !selectedItem) {
          return; // Cannot scroll to non-existing item
        }
        if (scrollState.virtualizer === selectedItem.originalId) {
          return; // No need to re-scroll to the same item during re-renders
        }
        if (selectedItem?.itemRef && innerScrollRef.current?.contains(selectedItem?.itemRef.current)) {
          return; // No need to scroll to manually clicked item currently present in DOM
        }

        virtualizer.scrollToIndex(selectedItemIndex, { align: 'center' });

        setScrollState(prevState => ({
          ...prevState,
          virtualizer: selectedItem.originalId,
        }));
      }
    }, [isScrollToItemEnabled, scrollState, selectedItem, selectedItemIndex, virtualizer]);

    const isTargetPresentInDom = Boolean(selectedItem?.itemRef?.current);

    useEffect(() => {
      if (!selectedItem) {
        return;
      }
      if (scrollState.virtualizer === null) {
        return; // Not scrolled by virtualizer yet, no need for additional scroll
      }
      if (!isTargetPresentInDom) {
        return; // Target element is not present in DOM yet, additional scroll does not work without it
      }
      if (scrollState.virtualizer === scrollState.browser) {
        return; // Virtualizer scroll has not been executed => no need for additional scroll
      }

      centerItemInScrollContainer(innerScrollRef.current, selectedItem.itemRef?.current ?? null);

      setScrollState(prevState => ({
        ...prevState,
        browser: selectedItem.originalId,
      }));
    }, [scrollState, selectedItem, isTargetPresentInDom, selectedItemIndex]);

    // Non-virtualized: центрируем выбранный элемент в собственном scroll-контейнере при смене
    // `selection` (на первом маунте это делает `onScrollInitialized`). Виртуализованный путь
    // ведут эффекты выше через виртуализатор, поэтому здесь только `!virtualized`. Хелпер тот
    // же `centerItemInScrollContainer` — обычному листу отдельный виртуализатор не нужен.
    useEffect(() => {
      if (virtualized || !scroll || !scrollToSelectedItem || !scrollElementReady) {
        return;
      }

      const container = innerScrollRef.current;
      const item = selectedItem?.itemRef?.current ?? null;
      if (!container || !item) {
        return;
      }

      centerItemInScrollContainer(container, item);
    }, [virtualized, scroll, scrollToSelectedItem, scrollElementReady, selectedItem]);

    const loadingJSX = useMemo(
      () =>
        loading && (
          <div
            role={'status'}
            tabIndex={-1}
            className={styles.loader}
            data-size={size}
            data-no-items={hasNoItems || undefined}
            data-test-id={TEST_IDS.loader}
          >
            <Spinner size={SPINNER_SIZE_MAP[size]} />
          </div>
        ),
      [hasNoItems, loading, size],
    );

    const content = useMemo(
      () => (
        <>
          {virtualized ? (
            <div className={styles.virtualizedContainer} style={{ height: virtualizer.getTotalSize() }} tabIndex={-1}>
              {virtualItems.map(virtualRow => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  tabIndex={-1}
                  className={styles.virtualizedPositionBox}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {itemsJSX[virtualRow.index]}
                </div>
              ))}
            </div>
          ) : (
            itemsJSX
          )}
          {loadingJSX}

          <ListEmptyState
            loading={loading}
            dataError={dataError}
            emptyStates={emptyStates}
            hasNoItems={hasNoItems}
            dataFiltered={dataFiltered ?? Boolean(search?.value)}
            size={size}
          />
        </>
      ),
      [
        dataError,
        dataFiltered,
        emptyStates,
        hasNoItems,
        itemsJSX,
        loading,
        loadingJSX,
        search?.value,
        size,
        virtualItems,
        virtualized,
        virtualizer,
      ],
    );

    const onScrollInitialized = useCallback(() => {
      // OverlayScrollbars инициализирован — ref указывает на viewport. Поднимаем флаг,
      // чтобы виртуализатор перечитал scroll-элемент и сделал первый корректный замер.
      setScrollElementReady(true);

      if (!selectedItem) {
        return;
      }

      centerItemInScrollContainer(innerScrollRef.current, selectedItem?.itemRef?.current ?? null);
    }, [selectedItem]);

    const listJSX = (
      <ul
        className={cn(commonStyles.listContainer, className)}
        ref={ref as ForwardedRef<HTMLUListElement>}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        onFocus={onFocus}
        onBlur={onBlur}
        data-active={active || undefined}
        role='menu'
        {...extractSupportProps(props)}
      >
        {header && (
          <div className={styles.header} data-divider={headerDivider || undefined} onFocus={stopPropagation}>
            {header}
          </div>
        )}

        {(pinTopItemsPresent || search) && (
          <PinTopGroupItem>
            {search && <SearchItem search={search} {...searchItem} />}

            {pinTopItemsPresent && itemsPinTopJSX}
          </PinTopGroupItem>
        )}

        {scroll ? (
          <Scroll
            className={cn(
              {
                [commonStyles.scrollContainerS]: scroll && limitedScrollHeight && size === 's',
                [commonStyles.scrollContainerM]: scroll && limitedScrollHeight && size === 'm',
                [commonStyles.scrollContainerL]: scroll && limitedScrollHeight && size === 'l',
              },
              scrollContainerClassName,
            )}
            barHideStrategy={barHideStrategy}
            size={'s'}
            ref={mergeRefs(innerScrollRef, scrollContainerRef)}
            untouchableScrollbars={untouchableScrollbars}
            onScroll={onScroll}
            onInitialized={onScrollInitialized}
          >
            {content}

            <div className={styles.scrollStub} ref={scrollRef as Ref<HTMLDivElement>} />
          </Scroll>
        ) : (
          <>{content}</>
        )}

        {pinBottomItemsPresent && <PinBottomGroupItem>{itemsPinBottomJSX}</PinBottomGroupItem>}

        {footer && (
          <div className={styles.footer} data-divider={footerDivider || undefined} onFocus={stopPropagation}>
            {footer}
          </div>
        )}
      </ul>
    );

    if (!nested) {
      return listJSX;
    }

    return (
      <li className={styles.nestedItem} role='menuitem'>
        {listJSX}
      </li>
    );
  },
);
