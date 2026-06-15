import { DropdownProps } from '@ds/dropdown';
import { WithSupportProps } from '@ds/utils';
import { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { EmptyStateProps } from '../../helperComponents';
import { ScrollProps, SearchState } from '../../types';
import { FlattenBaseItem, Item, ItemId } from '../Items';
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

export type ListProps = WithSupportProps<
  {
    /** Основные элементы списка */
    items: Item[];
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
    /**
     * Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка
     */
    virtualized?: boolean;
    /** Ограничить максимальную высоту скролл-контейнера в зависимости от `size` */
    limitedScrollHeight?: boolean;
  } & SelectionState &
    PublicListContextType &
    ScrollProps &
    EmptyState
>;

export type DroplistProps = {
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
> &
  Omit<ListProps, 'tabIndex' | 'onKeyDown' | 'hasListInFocusChain' | 'keyboardNavigationRef'>;

export type ListPrivateProps = Omit<ListProps, 'pinTop' | 'pinBottom' | 'items' | 'hasListInFocusChain'> & {
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
};
