import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Spinner } from '@ds/loader';
import { usePortalContext } from '@ds/portal-context';
import { Scroll } from '@ds/scroll';
import { extractSupportProps, isBrowser, useLayoutEffect } from '@ds/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ForwardedRef, forwardRef, ReactNode, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DEFAULT_SIZE, TEST_IDS } from '../../../constants';
import { ListEmptyState, useEmptyState } from '../../../helperComponents';
import { stopPropagation } from '../../../utils';
import {
  FlattenSimpleItem,
  isGroupItem,
  isSimpleItem,
  ItemId,
  PinBottomGroupItem,
  PinTopGroupItem,
  SearchItem,
  useRenderItems,
} from '../../Items';
import { SimpleGroupBlockOverlay, SimpleItemOverlay } from '../../Items/SimpleItem';
import { useNewListContext, useSelectionContext } from '../contexts';
import commonStyles from '../styles.module.scss';
import { ListPrivateProps } from '../types';
import { ALL_SIZES, SPINNER_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

// Отделяет клик (activation через `onClick` айтема) от начала перетаскивания — тот же порог активации,
// что у `@ds/table` (`useColumnOrderByDrag`), для единообразия поведения по репо.
const draggingOptions = { activationConstraint: { distance: 5 } };

// Пересчитывать rect'ы droppable-строк на каждом кадре перетаскивания. В `Droplist` (popover) список лежит
// в скролл-контейнере с трансформами: измеренные при монтировании rect'ы устаревают, коллизия
// указывает на последнюю строку и строка «улетает» в конец. `Always` держит измерения свежими.
const measuringConfig = { droppable: { strategy: MeasuringStrategy.Always } };

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
      virtualized: virtualizedProp = false,
      scrollContainerClassName,
      barHideStrategy = 'never',
      onDragEnd,
      sortableIds,
      ...props
    }: ListPrivateProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { size = DEFAULT_SIZE, flattenItems, focusFlattenItems } = useNewListContext();
    const { value, isSelectionSingle } = useSelectionContext();
    // `onDragEnd`/`SortableContext` конфликтуют с виртуализатором: обе стороны применяют свой
    // `transform` к строке (см. JSDoc `ListPrivateProps.onDragEnd`) — запрещено уже на уровне
    // типов (`ListProps`), здесь рантайм-зеркало на случай прямого использования `ListPrivate`.
    const virtualized = virtualizedProp && !onDragEnd;
    const sensors = useSensors(
      useSensor(MouseSensor, draggingOptions),
      useSensor(TouchSensor, {}),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );
    // Id перетаскиваемой строки — для рендера её копии в `DragOverlay`. Копия живёт в портале
    // над страницей и не режется `overflow: hidden` контейнера `List` (сама строка на время
    // переноса уступает место — её слот пустеет). `null`, когда перетаскивание не идёт.
    const [activeDragId, setActiveDragId] = useState<ItemId | null>(null);
    const handleDragStart = useCallback((event: DragStartEvent) => setActiveDragId(event.active.id), []);
    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        setActiveDragId(null);
        onDragEnd?.(event);
      },
      [onDragEnd],
    );
    const handleDragCancel = useCallback(() => setActiveDragId(null), []);
    const activeOverlayItem = activeDragId != null ? flattenItems[activeDragId] : undefined;

    // Переупорядочивание строго внутри одного sortable-контейнера: верхний уровень (строки без группы + сами
    // группы — «братья») либо контейнер конкретной группы (её строки). Остаются только droppable
    // того же контейнера, что и активный элемент (`container` в `data` ставят `SimpleItem`/
    // `SimpleGroupBlock`).
    const collisionDetection = useCallback<CollisionDetection>(args => {
      const activeContainer = (args.active.data.current as { container?: ItemId } | undefined)?.container;
      const droppableContainers = args.droppableContainers.filter(
        container => (container.data.current as { container?: ItemId } | undefined)?.container === activeContainer,
      );

      // Сначала — droppable под курсором (`pointerWithin`). Группа сортируется целым блоком
      // (`SimpleGroupBlock`: заголовок + строки), поэтому её droppable-rect высокий; `closestCenter`
      // сравнивал бы расстояние до центра блока — курсор над заголовком группы был далеко от центра,
      // и цель «перепрыгивала» через всю группу (строка вставала под неё). `pointerWithin` берёт тот
      // блок, над которым реально курсор, — вставка идёт туда, где визуально находится указатель.
      const pointerCollisions = pointerWithin({ ...args, droppableContainers });
      if (pointerCollisions.length > 0) {
        return pointerCollisions;
      }

      // Fallback для клавиатурного сенсора (у него нет координат указателя → `pointerWithin` пуст).
      return closestCenter({ ...args, droppableContainers });
    }, []);

    // Портал `DragOverlay` — в themed-корень (`@ds/portal-context`), а не в `document.body`. Все
    // `--sn-*` токены объявлены на theme-scope (`RootThemeProvider`), а не на `:root`; в `body`
    // копия строки теряла их и падала на дефолты (раздутые паддинги/цвета — «гигантский призрак»).
    // Корень портал-контекста лежит внутри theme-scope и не трансформирован, поэтому `position:
    // fixed` у `DragOverlay` остаётся относительно вьюпорта (в т.ч. внутри popover-Droplist).
    const portalRoot = usePortalContext();

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

    const content = useMemo(() => {
      const itemsBody: ReactNode = virtualized ? (
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
      );

      // Содержимое `DragOverlay`: копия строки (`SimpleItemOverlay`) либо заголовка группы
      // (`SimpleGroupBlockOverlay`) — по типу активного элемента.
      let dragOverlayContent: ReactNode = null;
      if (activeOverlayItem && isSimpleItem(activeOverlayItem)) {
        dragOverlayContent = <SimpleItemOverlay {...activeOverlayItem} />;
      } else if (activeOverlayItem && isGroupItem(activeOverlayItem)) {
        const rows = ((activeOverlayItem as { allChildIds?: ItemId[] }).allChildIds ?? [])
          .map(rowId => flattenItems[rowId])
          .filter((row): row is FlattenSimpleItem => isSimpleItem(row));
        dragOverlayContent = (
          <SimpleGroupBlockOverlay
            size={size}
            rows={rows}
            label={activeOverlayItem.label}
            beforeContent={activeOverlayItem.beforeContent}
            truncate={activeOverlayItem.truncate}
            divider={activeOverlayItem.divider}
            groupVariant={activeOverlayItem.groupVariant}
          />
        );
      }

      // `SortableContext`/`DndContext` — чистые провайдеры контекста, не рендерят DOM-узлов,
      // поэтому оборачивание всего блока (включая loader/empty-state) безопасно и не меняет
      // разметку `<ul>`.
      const body = onDragEnd ? (
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          measuring={measuringConfig}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {/* Зону приёма (`DropTarget`) список не рисует: рамка означает перенос между зонами,
              а здесь перестановка идёт строго внутри своей. */}
          <SortableContext items={sortableIds ?? []} strategy={verticalListSortingStrategy}>
            {itemsBody}
          </SortableContext>
          {/* Портал в themed-корень портал-контекста (см. `portalRoot` выше): `DragOverlay`
              позиционируется `position: fixed`, а корень не трансформирован — копия остаётся у
              курсора и вне `overflow: hidden` контейнера `List` (в т.ч. в popover-Droplist), при
              этом сохраняет `--sn-*` токены темы. `dropAnimation={null}`: порядок применяется
              синхронно в `onItemsReorder`, копию не анимируем «в слот». */}
          {isBrowser() &&
            createPortal(
              <DragOverlay dropAnimation={null}>{dragOverlayContent}</DragOverlay>,
              portalRoot.current ?? document.body,
            )}
        </DndContext>
      ) : (
        itemsBody
      );

      return (
        <>
          {body}
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
      );
    }, [
      activeOverlayItem,
      collisionDetection,
      dataError,
      dataFiltered,
      emptyStates,
      flattenItems,
      handleDragCancel,
      handleDragEnd,
      handleDragStart,
      hasNoItems,
      itemsJSX,
      loading,
      loadingJSX,
      onDragEnd,
      portalRoot,
      search?.value,
      sensors,
      size,
      sortableIds,
      virtualItems,
      virtualized,
      virtualizer,
    ]);

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
