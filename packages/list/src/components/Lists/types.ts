import { DragEndEvent } from '@dnd-kit/core';
import { BottomSheetProps } from '@ds/bottom-sheet';
import { DropdownProps } from '@ds/dropdown';
import { WithSupportProps } from '@ds/utils';
import { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { EmptyStateProps } from '../../helperComponents';
import { ScrollProps, SearchState } from '../../types';
import { FlattenBaseItem, Item, ItemId, ReorderItem } from '../Items';
import { CollapseState, PublicListContextType, SelectionState } from './contexts';

export type EmptyState = {
  /** Текущий пустой список — результат поиска/фильтра: показывается `noResultsState` вместо `noDataState` */
  dataFiltered?: boolean;
  /** Загрузка данных завершилась ошибкой: показывается `errorDataState` */
  dataError?: boolean;
  /** Экран при отсутствии данных */
  noDataState?: EmptyStateProps;
  /** Экран при отсутствии результатов поиска или фильтров */
  noResultsState?: EmptyStateProps;
  /** Экран при ошибке запроса */
  errorDataState?: EmptyStateProps;
};

type ListPropsCommon = WithSupportProps<
  {
    /** Элементы списка, закрепленные сверху */
    pinTop?: Item[];
    /** Элементы списка, закрепленные снизу */
    pinBottom?: Item[];
    /**
     * Кастомизируемый элемент в конце списка
     * @type ReactNode;
     */
    footer?: ReactNode;
    /**
     * Кастомизируемый элемент в начале списка — Figma `dropdownContainer.topBar`.
     * Подходит для заголовка / справочного блока над поиском.
     * @type ReactNode;
     */
    header?: ReactNode;
    /** Показывать divider между header и body (Figma `dropdownContainer.dividerWrapper` сверху) */
    headerDivider?: boolean;
    /** Показывать divider между body и footer (Figma `dropdownContainer.dividerWrapper` снизу) */
    footerDivider?: boolean;
    /** Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка  */
    footerActiveElementsRefs?: RefObject<HTMLElement>[];
    /** Ссылка на управление навигацией листа с клавиатуры  */
    keyboardNavigationRef?: RefObject<{ focusItem(id: ItemId): void }>;
    /** Настройки поисковой строки */
    search?: SearchState;

    /** `tabIndex` корневого элемента списка (для управления порядком фокуса) */
    tabIndex?: number;
    /** Настройки раскрытия элементов */
    collapse?: CollapseState;
    /** CSS-класс */
    className?: string;

    /** Флаг, отвечающий за состояние загрузки списка */
    loading?: boolean;

    /** Обработчик события по нажатию клавиш */
    onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
    /** Флаг, отвечающий за включение самого родительского контейнера листа в цепочку фокусирующихся элементов */
    hasListInFocusChain?: boolean;
    /** Флаг, отвечающий за прокручивание до выбранного элемента */
    scrollToSelectedItem?: boolean;
    /** CSS-класс для scroll обертки основного списка айтемов */
    scrollContainerClassName?: string;
    /** Ограничить максимальную высоту скролл-контейнера в зависимости от `size` */
    limitedScrollHeight?: boolean;
  } & SelectionState &
    Omit<PublicListContextType, 'virtualized'> &
    ScrollProps &
    EmptyState
>;

/** Props `List` — список обычных айтемов (все виды: base / collapse / group / next-list). */
export type ListProps = ListPropsCommon & {
  /** Основные элементы списка */
  items: Item[];
  /** Включить виртуализацию элементов списка. Рекомендуется при количестве элементов от 1000. */
  virtualized?: boolean;
};

/**
 * Props `ReorderableList` — список с drag&drop-переупорядочиванием строк за ручку.
 *
 * Отдельный компонент, а не режим `List`: модель айтемов другая (`ReorderItem` — плоская строка
 * либо группа с заголовком, без `collapse`/`next-list`/`group-select`), а виртуализация здесь
 * невозможна в принципе — `@dnd-kit` и виртуализатор применяют к строке свой `transform`.
 */
export type ReorderableListProps = ListPropsCommon & {
  /**
   * Основные элементы списка: строки `SimpleItem` и/или группы с заголовком `SimpleGroupItem`
   * (`type: 'group'` + `label` + сортируемые `items`).
   */
  items: ReorderItem[];
  /**
   * Колбек по завершению drag&drop-переупорядочивания элементов списка. Список остаётся
   * управляемым: сам не хранит порядок, а отдаёт наружу целиком обновлённое дерево `items` —
   * потребитель обновляет свой стейт этим значением. Переупорядочивание работает только среди
   * «братьев» одного уровня (строки без группы либо строки внутри одной группы; перенос между
   * группами не поддерживается).
   */
  onItemsReorder(items: ReorderItem[]): void;
};

/**
 * @internal Props общей реализации `List`/`ReorderableList` — принимает обе модели айтемов сразу.
 * Наружу не отдаётся: публичные `ListProps`/`ReorderableListProps` плоские, потому что union в
 * публичном props-типе ломает `react-docgen-typescript` (`props.json` схлопывается в `alias`),
 * вывод `Meta`/`StoryObj` и narrowing при spread'е.
 */
export type ListImplProps = ListPropsCommon & {
  items: Item[] | ReorderItem[];
  virtualized?: boolean;
  onItemsReorder?(items: ReorderItem[]): void;
};

/** Собственные props дроплиста — всё, что не приходит из `List`. */
type DroplistOwnProps = {
  /** Ссылка на элемент-триггер для дроплиста */
  triggerElemRef?: RefObject<HTMLElement>;
  /**
   * Контейнер портала (ref). Переопределяет `PortalContext` для этого дроплиста
   * (по аналогии с `container` у Modal/Drawer). По умолчанию — из `PortalContextProvider`.
   */
  container?: RefObject<HTMLElement | null>;
  /** Ссылка на элемент выпадающего списка */
  listRef?: RefObject<HTMLElement>;
  /**
   * Закрывать выпадающий список после клика на базовый айтем.
   *
   * Работает в режимах selection: 'none' | 'single'
   *
   * @default false
   */
  closeDroplistOnItemClick?: boolean;

  /** Триггер для дроплиста
   * @type ReactNode | ({onKeyDown}) => ReactNode
   *
   * Рендер функция принимает аргументы `onKeyDown` - хендлер ввода, для поддержки управления с клавиатуры
   */
  children: ReactNode | ((params: { onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void }) => ReactNode);
} & Pick<
  DropdownProps,
  'trigger' | 'placement' | 'widthStrategy' | 'open' | 'onOpenChange' | 'triggerClassName' | 'closeOnPopstate'
>;

/** Props списка, которые дроплист пробрасывает в `List` (навигацией управляет он сам). */
type DroplistListProps<T> = Omit<T, 'tabIndex' | 'onKeyDown' | 'hasListInFocusChain' | 'keyboardNavigationRef'>;

/** Базовые props дроплиста: собственные + props обычного `List`. */
export type BaseDroplistProps = DroplistOwnProps & DroplistListProps<ListProps>;

/** Базовые props дроплиста с drag&drop-переупорядочиванием: собственные + props `ReorderableList`. */
export type ReorderableBaseDroplistProps = DroplistOwnProps & DroplistListProps<ReorderableListProps>;

/**
 * @internal Props общей реализации дроплиста (`DesktopDroplist`/`MobileDroplist`) — принимает обе
 * модели айтемов. Публичные `DroplistProps`/`ReorderableDroplistProps` плоские, см. `ListImplProps`.
 */
export type DesktopDroplistProps = DroplistOwnProps & DroplistListProps<ListImplProps>;

/** Только mobile (`BottomSheet`)-слоты адаптивного `Droplist`. */
type DroplistMobileSlots = {
  /** Только mobile (`BottomSheet`): заголовок шапки. */
  label?: string;
  /** Только mobile (`BottomSheet`): action-кнопка справа в шапке. */
  actionButton?: ReactNode;
  /** Только mobile (`BottomSheet`): slot справа от заголовка. */
  slotAfterTitle?: ReactNode;
  /** Только mobile (`BottomSheet`): callback back-кнопки. */
  onBackButtonClick?(): void;
};

/**
 * Props адаптивного `Droplist` (дефолтный droplist): базовые props + mobile-слоты `BottomSheet`.
 * Раскладку берёт из `AdaptiveProvider` (контекст): на `mobile` рендерит `MobileDroplist`
 * (список size `l` в `BottomSheet`), иначе — `DesktopDroplist` (анкорный popover). Mobile-слоты
 * применяются только на mobile.
 */
export type DroplistProps = BaseDroplistProps & DroplistMobileSlots & Pick<BottomSheetProps, 'snapPoints'>;

/**
 * Props адаптивного `ReorderableDroplist`: props `ReorderableList` + popover/mobile-обвязка
 * `Droplist`. Отдельный компонент по той же причине, что и `ReorderableList`.
 */
export type ReorderableDroplistProps = ReorderableBaseDroplistProps & DroplistMobileSlots;

/** @internal Props общей реализации адаптивного дроплиста: реализация + mobile-слоты. */
export type DroplistImplProps = DesktopDroplistProps & DroplistMobileSlots;

/**
 * @internal Props mobile-реализации (`BottomSheet`): реализация дроплиста без popover-пропов
 * + mobile-слоты.
 */
export type MobileDroplistProps = Omit<
  DesktopDroplistProps,
  'trigger' | 'placement' | 'widthStrategy' | 'triggerElemRef' | 'listRef' | 'triggerClassName'
> &
  Pick<BottomSheetProps, 'snapPoints'> &
  DroplistMobileSlots;

export type ListPrivateProps = Omit<
  ListImplProps,
  'pinTop' | 'pinBottom' | 'items' | 'hasListInFocusChain' | 'onItemsReorder' | 'virtualized'
> & {
  nested?: boolean;
  active?: boolean;
  tabIndex?: number;
  virtualized?: boolean;
  onFocus?(e: FocusEvent<HTMLElement>): void;
  onBlur?(e: FocusEvent<HTMLElement>): void;
  onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  limitedScrollHeight?: boolean;
  searchItem?: FlattenBaseItem;
  pinTop?: ItemId[];
  items: ItemId[];
  pinBottom?: ItemId[];
  /**
   * @internal Обработчик завершения drag&drop-переупорядочивания (см. публичный `onItemsReorder`
   * у `List`/`Droplist`) — вычисляется в `useListItemsModel` и оперирует исходным (не плоским)
   * деревом `items`. Наличие принудительно включает невиртуализированный рендер и оборачивает айтемы в
   * `DndContext`/`SortableContext`.
   */
  onDragEnd?(event: DragEndEvent): void;
  /** @internal Плоский список id всех сортируемых элементов (все уровни) для `SortableContext` */
  sortableIds?: ItemId[];
};
