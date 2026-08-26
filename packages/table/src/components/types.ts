import { LayoutPresets } from '@ds/adaptive';
import { FiltersState } from '@ds/chips';
import { BACKGROUND_PREDEFINED_FILL, BackgroundPredefinedFill } from '@ds/materials';
import { FilterRow, ToolbarPersistConfig, ToolbarProps } from '@ds/toolbar';
import { ValueOf, WithSupportProps } from '@ds/utils';
import {
  PaginationState,
  Row,
  RowPinningState,
  RowSelectionOptions,
  RowSelectionState,
  SortingState,
  Table,
} from '@tanstack/react-table';
import { Virtualizer, VirtualizerOptions } from '@tanstack/react-virtual';
import { MutableRefObject, ReactNode, Ref, RefObject } from 'react';

/** Инстанс row-virtualizer'а (`useVirtualizer` из `@tanstack/react-virtual`) */
export type RowVirtualizer = Virtualizer<HTMLElement, Element> | null;
/** Инстанс column-virtualizer'а (`useVirtualizer` из `@tanstack/react-virtual`) */
export type ColumnVirtualizer = Virtualizer<HTMLElement, Element> | null;

import { TABLE_ROW_COLOR, View } from '../constants';
import { EmptyStateProps, RowClickHandler, TreeColumnDefinitionProps } from '../helperComponents';
import { ColumnDefinition, ExpandedState } from '../types';

export type TableRowColor = ValueOf<typeof TABLE_ROW_COLOR>;

/** Заливка neutral/default — только для sticky chrome таблицы (нет в общем `BACKGROUND_PREDEFINED_FILL`). */
export const TABLE_STICKY_CONTROLS_BACKGROUND_NEUTRAL = 'neutralBackground' as const;

/** Допустимые заливки подложки sticky chrome таблицы (без прозрачных вариантов). */
export type TableStickyControlsBackgroundPredefined =
  | Exclude<
      BackgroundPredefinedFill,
      typeof BACKGROUND_PREDEFINED_FILL.Transparent | typeof BACKGROUND_PREDEFINED_FILL.DecorTransparent
    >
  | typeof TABLE_STICKY_CONTROLS_BACKGROUND_NEUTRAL;

/** Конфигурация sticky-хрома таблицы (тулбар, header колонок, пагинация). */
export type StickyControls = {
  /**
   * Включить sticky-хром при скролле страницы.
   * @default desktop — `false`; mobile — `true` (`TABLE_LAYOUT_PRESETS`).
   */
  enabled?: boolean;
  /**
   * Отступ сверху (px): высота внешнего sticky UI над таблицей (app header, tabs).
   * Только при `enabled: true`. @default mobile — `0`; на desktop дефолта нет (sticky выключен).
   */
  offsetTop?: number;
  /**
   * Отступ снизу (px): высота внешнего sticky UI под таблицей (mobile tab bar).
   * Только при `enabled: true`. @default mobile — `0`; на desktop дефолта нет (sticky выключен).
   */
  offsetBottom?: number;
  /**
   * Подложка chrome-контролов (тулбар, header колонок, пагинация, плита table-view):
   * слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`).
   * @default neutralBackground1Level
   */
  backgroundPredefined?: TableStickyControlsBackgroundPredefined;
};

/** Адаптивные поля `stickyControls` — дефолты по раскладке (preset-класс). */
export type StickyControlsLayoutDefaults = Pick<StickyControls, 'enabled' | 'offsetTop' | 'offsetBottom'>;

/** Пропы `Table`, дефолты которых меняет адаптив (preset-класс). */
export type TableLayoutDefaults = {
  stickyControls: StickyControlsLayoutDefaults;
  /** @default true; на mobile — всегда `true` (`TABLE_LAYOUT_PRESETS`) */
  fullWidth: boolean;
  /** Начальный вид (uncontrolled). @default `table`; на mobile — `cards` (`TABLE_LAYOUT_PRESETS`) */
  defaultView: View;
};

export const TABLE_STICKY_CONTROLS_BACKGROUND_PREDEFINED_OPTIONS = [
  BACKGROUND_PREDEFINED_FILL.PrimaryBackground,
  TABLE_STICKY_CONTROLS_BACKGROUND_NEUTRAL,
  BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
  BACKGROUND_PREDEFINED_FILL.RedBackground,
  BACKGROUND_PREDEFINED_FILL.OrangeBackground,
  BACKGROUND_PREDEFINED_FILL.YellowBackground,
  BACKGROUND_PREDEFINED_FILL.GreenBackground,
  BACKGROUND_PREDEFINED_FILL.BlueBackground,
  BACKGROUND_PREDEFINED_FILL.VioletBackground,
  BACKGROUND_PREDEFINED_FILL.PinkBackground,
] as const satisfies readonly TableStickyControlsBackgroundPredefined[];

type BulkAction = Omit<NonNullable<ToolbarProps<Record<string, string>>['bulkActions']>[number], 'onClick'> & {
  onClick?(selectionState: RowSelectionState, resetRowSelection: (defaultState?: boolean) => void): void;
};

/** Режим отображения недоступной для выбора строки */
export const RowAppearance = {
  Disabled: 'disabled',
  HideToggler: 'hide-toggler',
} as const;

export type RowAppearance = ValueOf<typeof RowAppearance>;

/** Режим работы чекбокса в тулбаре (по всем страницам или по текущей) */
export const ToolbarCheckBoxMode = {
  PageRows: 'pageRows',
  AllRows: 'allRows',
} as const;

export type ToolbarCheckBoxMode = ValueOf<typeof ToolbarCheckBoxMode>;

/** Контекст кастомного рендера карточки (`renderCard`) в режиме `view='cards'` */
export type RenderCardContext<TData extends object> = {
  /** Строка tanstack-таблицы (row.original — данные, getIsSelected/toggleSelected — выбор) */
  row: Row<TData>;
  /** Инстанс tanstack-таблицы */
  table: Table<TData>;
  /** Готовый элемент дефолтной карточки — можно вернуть как есть или обернуть */
  defaultRender: ReactNode;
};

type BaseTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>> = WithSupportProps<{
  /** Данные для отрисовки */
  data: TData[];
  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];
  /** Параметр отвечает за отображение закрепленных строк на всех страницах таблицы @default false */
  keepPinnedRows?: boolean;
  /** Параметр отвечает за сохранение закрепленных строк в теле таблицы @default false */
  copyPinnedRows?: boolean;
  /** Параметр отвечает за чекбокс выбора закрепленных строк */
  enableSelectPinned?: boolean;
  /**
   * Параметры отвечают за возможность сортировки:
   * `initialState` — начальное состояние; `state` — управляемое снаружи; `onChange` — колбэк на изменение.
   */
  sorting?: {
    initialState?: SortingState;
    state?: SortingState;
    onChange?(state: SortingState): void;
  };
  /**
   * Настройки колонок: `enableDrag` — переупорядочивание (заголовки таблицы и строки в меню настроек);
   * `enableSettingsMenu` — меню показа колонок.
   */
  columnsSettings?: {
    enableDrag?: boolean;
    enableSettingsMenu?: boolean;
  };
  /**
   * Общие настройки раскрывающихся (tree) строк: `getSubRows`, `expandingColumnDefinition`,
   * `initialState`, `state`, `onChange`.
   */
  expanding?: {
    getSubRows: (element: TData) => TData[] | undefined;
    expandingColumnDefinition: TreeColumnDefinitionProps<TData>;
    /** Начальное состояние раскрытых строк при неконтролируемом режиме. */
    initialState?: ExpandedState;
    state?: ExpandedState;
    onChange?(state: ExpandedState): void;
  };
  /**
   * Параметры выбора строк: `initialState`, `state`, `enable`, `appearance`, `multiRow`, `onChange`.
   */
  rowSelection?: {
    initialState?: RowSelectionState;
    state?: RowSelectionState;
    enable?: RowSelectionOptions<TData>['enableRowSelection'];
    multiRow?: boolean;
    onChange?(state: RowSelectionState): void;
    appearance?: RowAppearance;
  };
  /**
   * Параметры глобального поиска: `initialState`, `state`, `placeholder`, `loading`, `onChange`.
   */
  search?: {
    initialState?: string;
    state?: string;
    placeholder?: string;
    loading?: boolean;
    onChange?(value: string): void;
  };
  /** Включить нечеткий поиск */
  enableFuzzySearch?: boolean;
  rowAutoHeight?: boolean;
  /** Максимальное кол-во строк на страницу @default 10 */
  pageSize?: number;
  /** Колбэк клика по строке */
  onRowClick?: RowClickHandler<TData>;
  /**
   * Режим отображения таблицы (controlled).
   * `table` — классическая сетка; `cards` — карточки (заголовок берётся из колонки `headlineId`).
   * Переключатель вида в тулбаре включается отдельным пропом `showDataView`.
   * @default 'table' (на mobile — `cards`)
   */
  view?: View;
  /**
   * Начальный режим отображения (uncontrolled).
   * Если не задан — дефолт по раскладке: `table` на desktop, `cards` на mobile (`TABLE_LAYOUT_PRESETS`).
   * @default 'table' (на mobile — `cards`)
   */
  defaultView?: View;
  /** Колбэк на смену режима отображения */
  onViewChange?(view: View): void;
  /**
   * Показывать переключатель вида (таблица/карточки) в тулбаре.
   * Управляет только видимостью тоггла; сам вид задаётся `view` / `defaultView`.
   * По умолчанию тоггла нет — таблица показывает один вид (`defaultView` либо
   * адаптивный дефолт). Включите `showDataView`, чтобы дать пользователю
   * переключать table/cards.
   * @default false
   */
  showDataView?: boolean;
  /**
   * Id колонки, чей рендер используется как заголовок карточки в режиме `view='cards'`.
   * Имеет смысл только при `view='cards'`.
   */
  headlineId?: string;
  /**
   * Желаемое число колонок карточного вида (`view='cards'`).
   * На широком контейнере рисуется ровно столько колонок; при сужении сетка
   * схлопывается до меньшего числа (порог — `cardMinWidth`). Без пропа число
   * колонок определяется только шириной контейнера и `cardMinWidth` (auto-fill).
   */
  cardColumns?: number;
  /**
   * Минимальная ширина карточки в `view='cards'`, px. Порог, ниже которого
   * колонки схлопываются. Карточка ужимается до ширины контейнера, если он уже.
   * @default 320
   */
  cardMinWidth?: number;
  /**
   * Кастомный рендер карточки в `view='cards'`. Получает контекст с tanstack
   * `row` / `table` и `defaultRender` (готовый элемент дефолтной карточки —
   * можно обернуть). Возврат заменяет дефолтную карточку.
   */
  renderCard?(context: RenderCardContext<TData>): ReactNode;
  /** CSS-класс */
  className?: string;
  /** Состояние загрузки */
  loading?: boolean;
  /** Колбэк обновления данных */
  onRefresh?(): void;
  /** Колбэк экспорта данных. Рендерит иконку в тулбаре перед настройками колонок. */
  onExport?(): void;
  /** Внешний бордер для тулбара и таблицы */
  outline?: boolean;
  /**
   * Растягивать таблицу на всю ширину контейнера.
   * При `false` ширина определяется суммой колонок (лучше всего, когда у всех колонок задан `size` / `width`).
   * Явный проп = desktop-значение; на mobile всегда `true` (`TABLE_LAYOUT_PRESETS`).
   * @default true
   */
  fullWidth?: boolean;
  /** Фильтры */
  columnFilters?: FilterRow<TFilters> & {
    initialOpen?: boolean;
  };
  /** Флаг, показывающий что данные были отфильтрованы при пустых данных */
  dataFiltered?: boolean;
  /** Флаг, показывающий что произошла ошибка запроса при пустых данных */
  dataError?: boolean;
  /** Экран при отсутствии данных */
  noDataState?: EmptyStateProps;
  /** Экран при отсутствии результатов поиска или фильтров */
  noResultsState?: EmptyStateProps;
  /** Экран при ошибке запроса */
  errorDataState?: EmptyStateProps;
  /** Отключение тулбара */
  suppressToolbar?: boolean;
  /** Отключение хедера таблицы; в режиме `view='cards'` скрывает подписи-заголовки полей карточки */
  suppressHeader?: boolean;
  /** Отключение поиска */
  suppressSearch?: boolean;
  /** Список действий для массовых операций */
  bulkActions?: BulkAction[];
  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: ToolbarProps<TFilters>['moreActions'];
  /** Дополнительный слот в `Toolbar` после строки поиска */
  toolbarAfter?: ReactNode;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  /** Функция получения уникального идентификатора строки */
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  /** Ссылка на элемент, обозначающий самый конец прокручиваемого списка */
  scrollRef?: Ref<HTMLElement>;
  /** Ссылка на контейнер, который скроллится */
  scrollContainerRef?: RefObject<HTMLElement>;
  /**
   * Sticky-хром при скролле страницы: при `enabled: true` тулбар и пагинация липнут к верху/низу
   * viewport, в table-view заголовок колонок — под тулбаром; тело растёт по контенту.
   * При `enabled: false` все блоки идут сплошным потоком без sticky.
   *
   * Дефолты: desktop — `enabled: false` (offsets не применяются);
   * mobile — `{ enabled: true, offsetTop: 0, offsetBottom: 0 }` (`TABLE_LAYOUT_PRESETS`);
   * `backgroundPredefined` — `neutralBackground1Level` на всех раскладках.
   *
   * Явный проп = desktop-значение; mobile-override — `layoutPresets.mobile`.
   * @example `stickyControls={{ enabled: true, offsetTop: 64 }}` — sticky на desktop, app header 64px.
   */
  stickyControls?: StickyControls;
  /**
   * Override дефолтов адаптива для этого инстанса (`mergePresets` поверх `TABLE_LAYOUT_PRESETS`).
   * `stickyControls` в пресете tier'а заменяет DS-объект целиком — указывайте все нужные поля.
   * Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`.
   */
  layoutPresets?: LayoutPresets<TableLayoutDefaults>;
  /** Определение, какие строки должны быть закреплены в таблице */
  rowPinning?: Pick<RowPinningState, 'top'>;
  /**
   * Конфиг сохранения состояния в localStorage и queryParams.
   * `id` должен быть уникальным для разных таблиц в рамках приложения.
   */
  savedState?: Pick<ToolbarPersistConfig<TFilters>, 'serializer' | 'parser'> & {
    id: string;
    filterQueryKey?: string;
    resize?: boolean;
    columnSettings?: boolean;
  };
  /**
   * Функция определения цвета фона строки по её данным.
   * Работает только в `view='table'` — карточки (`view='cards'`) не тонируются.
   * @param data данные строки
   * @returns цвет фона строки или `undefined`
   */
  getRowBackgroundColor?: (data: TData) => TableRowColor | undefined;
  /**
   * Accent-тон фона строки заголовков колонок (`tableHeadLine`).
   * Работает только в `view='table'`.
   */
  headerRowBackgroundColor?: TableRowColor;
  /**
   * Включает виртуализацию строк (windowing по вертикали).
   * Рекомендуется при > 200 строк. Несовместимо с `view='cards'` — при картах игнорируется.
   *
   * 🔴 Требует `size` у колонок: виртуализованные строки позиционируются абсолютно и не участвуют в
   * расчёте внутренней ширины, поэтому колонка без `size` делит ширину контейнера поровну с
   * остальными вместо растягивания по содержимому.
   *
   * @default false
   */
  enableRowVirtualization?: boolean;
  /**
   * Дополнительные параметры row-virtualizer'а (`@tanstack/react-virtual`).
   * Переопределяют дефолты (overscan=10, estimateSize=40).
   */
  rowVirtualizerOptions?: Partial<VirtualizerOptions<HTMLElement, Element>>;
  /** Ref на инстанс row-virtualizer'а для управления прокруткой снаружи */
  rowVirtualizerInstanceRef?: MutableRefObject<RowVirtualizer>;
  /**
   * Включает виртуализацию колонок (windowing по горизонтали).
   * Рекомендуется при > 30 видимых колонок. Несовместимо с `view='cards'`.
   * Pinned-колонки (left/right) всегда отрисовываются вне зависимости от настройки.
   * @default false
   */
  enableColumnVirtualization?: boolean;
  /**
   * Дополнительные параметры column-virtualizer'а (`@tanstack/react-virtual`).
   * Переопределяют дефолты (overscan=3).
   */
  columnVirtualizerOptions?: Partial<VirtualizerOptions<HTMLElement, Element>>;
  /** Ref на инстанс column-virtualizer'а для управления прокруткой снаружи */
  columnVirtualizerInstanceRef?: MutableRefObject<ColumnVirtualizer>;
}>;

export type LoadMoreTrigger = 'scroll' | 'button';

export type InfiniteTableProps<
  TData extends object,
  TFilters extends FiltersState = Record<string, unknown>,
> = BaseTableProps<TData, TFilters> & {
  pagination?: never;
  autoResetPageIndex?: never;
  pageCount?: never;
  /** Режим работы "бесконечной" загрузки */
  infiniteLoading?: boolean;
  suppressPagination?: never;
  manualPagination?: never;
  toolbarCheckBoxMode?: never;
  /**
   * Колбэк дозагрузки следующей порции данных.
   * В режиме `loadMoreTrigger='scroll'` вызывается автоматически при достижении конца списка;
   * в режиме `loadMoreTrigger='button'` — по нажатию кнопки «Загрузить ещё».
   */
  onLoadMore?: () => void;
  /** Есть ли ещё данные для загрузки. Управляет видимостью кнопки / активностью observer-а. */
  hasMore?: boolean;
  /**
   * Механизм подгрузки следующей порции данных.
   * - `'scroll'` (по умолчанию) — IntersectionObserver на scroll-stub в конце списка.
   * - `'button'` — кнопка «Загрузить ещё» под таблицей.
   */
  loadMoreTrigger?: LoadMoreTrigger;
};

export type ClientTableProps<
  TData extends object,
  TFilters extends FiltersState = Record<string, unknown>,
> = BaseTableProps<TData, TFilters> & {
  /**
   * Параметры пагинации: `state`, `options`, `optionsLabel`, `onChange`, `optionsRender`.
   */
  pagination?: {
    state?: PaginationState;
    options?: number[];
    optionsLabel?: string;
    onChange?(state: PaginationState): void;
    optionsRender?(value: string | number, idx: number): string | number;
  };
  /** Автоматический сброс пагинации к первой странице при изменении данных/фильтров/сортировки */
  autoResetPageIndex?: boolean;
  /** Кол-во страниц (для внешнего управления) */
  pageCount?: number;
  /** Отключение пагинации */
  suppressPagination?: boolean;
  manualPagination?: boolean;
  infiniteLoading?: never;
  onLoadMore?: never;
  hasMore?: never;
  loadMoreTrigger?: never;
  /** Охват мастер-чекбокса выбора: текущая страница или все строки `data` (только клиентская таблица) */
  toolbarCheckBoxMode?: ToolbarCheckBoxMode;
};

export type TableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>> =
  InfiniteTableProps<TData, TFilters> | ClientTableProps<TData, TFilters>;

export type ServerTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>> = Omit<
  ClientTableProps<TData, TFilters>,
  'pageSize' | 'pageCount' | 'pagination' | 'search' | 'data' | 'toolbarCheckBoxMode'
> & {
  /** Данные для отрисовки */
  items?: TData[];
  /** Общее кол-во строк @default 10 */
  total?: number;
  /** Кол-во строк на страницу @default 10 */
  limit?: number;
  /** Смещение @default 0 */
  offset?: number;
  onChangePage(offset: number, limit: number): void;
  /**
   * Параметры глобального поиска: `initialState`, `state`, `placeholder`, `loading`, `onChange`.
   */
  search?: {
    initialState?: string;
    state: string;
    placeholder?: string;
    loading?: boolean;
    onChange(value: string): void;
  };
  /** Параметры пагинации: `options`, `optionsLabel` */
  pagination?: {
    options?: number[];
    optionsLabel?: string;
  };
};
