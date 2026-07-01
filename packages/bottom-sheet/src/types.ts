import { ButtonProps } from '@ds/button';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { PropsWithChildren, ReactNode } from 'react';

import { FOOTER_ACTIONS_ORIENTATION, MEDIA_KIND } from './constants';

/**
 * Пропсы action-кнопки футера — объект пропсов `Button` из `@ds/button`. `view` / `appearance` имеют
 * дефолты по слоту (переопределяемы); `size` (m) и full-width задаёт `ButtonGroup`, поэтому исключены.
 * `data-test-id` слота фиксирует `TEST_IDS` (через `WithSupportProps` у `ButtonGroup`).
 *
 * Рендерится как `<button>` (как и `ButtonGroup`-action) — для CTA-ссылки (`as='a'` / `href`) в футере
 * используйте произвольный `footer: ReactNode`.
 */
export type BottomSheetActionButton = Omit<ButtonProps, 'fullWidth' | 'size'>;

/**
 * Фиксированная позиция bottom-sheet'а по высоте.
 *
 * - `number` ∈ (0, 1] — доля от высоты viewport'а (`0.5` = половина экрана; `1` = full-viewport).
 * - `'<n>px'`         — абсолютные пиксели (`'320px'`).
 * - `'<n>%'`          — процент от высоты viewport (`'50%'`).
 * - `'<n>dvh'` / `'<n>svh'` / `'<n>lvh'` — dynamic / small / large viewport-units (`'90dvh'`).
 * - `'fit-content'`   — высота по контенту (auto).
 */
export type SnapPoint =
  | number
  | `${number}px`
  | `${number}%`
  | `${number}dvh`
  | `${number}svh`
  | `${number}lvh`
  | 'fit-content';

export type MediaKind = ValueOf<typeof MEDIA_KIND>;

export type FooterActionsOrientation = ValueOf<typeof FOOTER_ACTIONS_ORIENTATION>;

export type BottomSheetMediaProps = {
  /** URL изображения / иконки. */
  src: string;
  /** Альтернативный текст (a11y). */
  alt: string;
  /**
   * Режим:
   * - `'image'` — изображение во всю ширину (высота `184px`), прижато к шапке (убирается
   *   верхний отступ контент-блока). Горизонтальные паддинги body не затрагивает — для edge-to-edge body
   *   используйте `bodyPadding={false}` отдельно.
   * - `'icon'` — иконка с `padding-top: 24px`.
   * @default 'image'
   */
  kind?: MediaKind;
};

export type BottomSheetHeaderProps = WithSupportProps<{
  /** Заголовок (Typography title-l). */
  title?: ReactNode;
  /** `id` заголовка — для связи с `aria-labelledby` dialog'а (accessible name). */
  titleId?: string;
  /** Slot справа от title (например, `QuestionTooltip` из `@ds/tooltip`). */
  slotAfterHeadline?: ReactNode;
  /**
   * Slot под headline-строкой во весь блок subHeadlineWrapper —
   * типично `SearchBar`, `SegmentControl` или `Filter`.
   */
  subHeadline?: ReactNode;
  /**
   * Callback клика на back-кнопку (слева в шапке).
   * Наличие callback'а авто-рендерит `Button view='function' icon={<ArrowLeftSVG />}`.
   */
  onBackButtonClick?(): void;
  /** Slot справа от headline-строки (любой `ReactNode`, обычно `Button` с иконкой). */
  actionButton?: ReactNode;
  /** CSS-класс контейнера header'а. */
  className?: string;
}>;

export type BottomSheetBodyProps = WithSupportProps<
  PropsWithChildren<{
    /** Содержимое body (альтернатива `children`). */
    content?: ReactNode;
    /**
     * Горизонтальные паддинги body. При `false` контент идёт во всю ширину sheet'а (edge-to-edge) —
     * для карт, изображений, списков без отступов. Соответствует Figma-оси `padding=false`.
     * @default true
     */
    bodyPadding?: boolean;
    /** CSS-класс контейнера body. */
    className?: string;
  }>
>;

export type BottomSheetFooterProps = WithSupportProps<
  PropsWithChildren<{
    /** CSS-класс контейнера footer'а. */
    className?: string;
  }>
>;

export type BottomSheetCustomProps = WithSupportProps<
  PropsWithChildren<{
    /** Управление состоянием показан / не показан. */
    open: boolean;
    /** Колбэк закрытия (вызывается при click outside, Esc, swipe-down, browser-back). */
    onClose(): void;
    /**
     * Отображение тёмной подложки за sheet'ом. При `false` фон не затемняется и click-outside
     * не закрывает sheet (нет backdrop-узла, по которому ловится клик).
     * @default true
     */
    showBackdrop?: boolean;
    /**
     * Блокировать ли скролл фона на время открытия (`react-remove-scroll`). При `false` страница
     * под sheet'ом остаётся прокручиваемой — для non-modal сценариев (sheet поверх контента, с
     * которым продолжают взаимодействовать). Обычно используется вместе с `showBackdrop={false}`.
     * @default true
     */
    lockScroll?: boolean;
    /**
     * Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point.
     * При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом.
     * @default true
     */
    swipeEnabled?: boolean;
    /**
     * Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` —
     * sheet `height: auto` с одним snap'ом по высоте контента.
     *
     * Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает
     * до full-viewport; drag вниз ниже `0.5` ведёт к закрытию.
     *
     * Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на
     * стороне потребителя):
     * - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded;
     * - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут
     *   одну высоту → дубль-индекс будет недостижим свайпом);
     * - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива
     *   фиксированных позиций его «контентная» высота не определена.
     */
    snapPoints?: SnapPoint[];
    /**
     * Индекс snap'а, на котором sheet открывается по дефолту. Игнорируется при controlled `snapIndex`.
     * @default 0
     */
    defaultSnapIndex?: number;
    /**
     * Controlled-индекс активного snap'а. Если задан, sheet всегда находится на этом snap'е;
     * swipe-up/down вызывают `onSnapIndexChange`, но не меняют позицию сами — consumer должен
     * передать новое значение.
     */
    snapIndex?: number;
    /**
     * Callback изменения активного snap'а (пересечение swipe-границы или click по UI).
     * Не вызывается при программной смене controlled `snapIndex`.
     */
    onSnapIndexChange?(snapIndex: number): void;
    /**
     * Закрывать sheet при `popstate` (browser-back на mobile).
     * @default true
     */
    closeOnPopstate?: boolean;
    /**
     * Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом
     * на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop)
     * inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный.
     * Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch).
     * @default true
     */
    safeArea?: boolean;
    /** Контейнер для портала. По дефолту — `body` либо контекст-провайдер `@ds/portal-context`. */
    container?: string | HTMLElement;
    /** CSS-класс самого sheet-контейнера. */
    className?: string;
    /** CSS-класс корневого элемента portal'а. */
    rootClassName?: string;
  }>
>;

export type BottomSheetProps = Omit<BottomSheetCustomProps, 'children'> & {
  /** Заголовок в шапке. */
  title?: ReactNode;
  /** Slot справа от title (внутри той же строки) — типично `QuestionTooltip`, status badge. */
  slotAfterHeadline?: ReactNode;
  /** Slot под headline-строкой — типично `SearchBar`, `SegmentControl`. */
  subHeadline?: ReactNode;
  /**
   * Callback клика на back-кнопку (слева в шапке).
   * Наличие callback'а рендерит ArrowLeft-кнопку.
   */
  onBackButtonClick?(): void;
  /** Action-кнопка справа в шапке (любой ReactNode — обычно `Button view='function'`). */
  actionButton?: ReactNode;
  /** Media-блок над шапкой: изображение / иконка либо произвольный `ReactNode`. */
  media?: BottomSheetMediaProps | ReactNode;
  /** Основное содержимое (рендерится в `BottomSheetCustom.Body`). */
  content?: ReactNode;
  /**
   * Горизонтальные паддинги body. При `false` контент идёт во всю ширину (edge-to-edge) — для карт,
   * изображений, списков без отступов. Соответствует Figma-оси `padding=false`.
   * @default true
   */
  bodyPadding?: boolean;
  /**
   * Тонкие линии между topBar↔body и body↔footer. Включайте для длинного scrollable content'а,
   * чтобы разграничить sticky-header / footer от плывущего контента.
   * @default false
   */
  withDividers?: boolean;
  /**
   * Основная кнопка действия — объект пропсов `Button` (по умолчанию `view='filled'`,
   * `appearance='primary'`). Ширина зависит от `footerActionsOrientation` и числа кнопок.
   */
  approveButton?: BottomSheetActionButton;
  /**
   * Кнопка отмены — объект пропсов `Button` (по умолчанию `view='outline'`, `appearance='neutral'`).
   */
  cancelButton?: BottomSheetActionButton;
  /**
   * Дополнительная (третья) кнопка — объект пропсов `Button` (по умолчанию `view='simple'`,
   * `appearance='neutral'`).
   */
  additionalButton?: BottomSheetActionButton;
  /**
   * Ориентация кнопок футера, собранных из `approveButton` / `cancelButton` / `additionalButton`.
   * Применяется **только при ровно двух** кнопках (canonical cancel/confirm):
   *
   * - `'horizontal'` — кнопки в ряд через space-between: secondary слева, primary справа,
   *   ширина по контенту. Точное соответствие Figma `bottomBar.buttonGroup`.
   * - `'vertical'`   — кнопки в столбик, full-width (primary сверху).
   *
   * Одна кнопка всегда рендерится full-width (одиночный CTA); три кнопки не помещаются в ряд на
   * mobile-вьюпорте и всегда идут в столбик — для них значение игнорируется.
   *
   * Игнорируется при заданном `footer` (произвольная разметка футера).
   * @default 'horizontal'
   */
  footerActionsOrientation?: FooterActionsOrientation;
  /** Небольшой текст под кнопками футера (дисклеймер, ссылка и т.п.). */
  disclaimer?: ReactNode;
  /**
   * Произвольный футер. Если задан — имеет приоритет над
   * `approveButton` / `cancelButton` / `additionalButton` / `disclaimer`.
   */
  footer?: ReactNode;
  /**
   * Переопределение `data-test-id` собранных слотов футера (approve/cancel/additional/disclaimer).
   * По умолчанию — собственные id `BottomSheet`. Адаптивные `Modal`/`Drawer` передают сюда свои
   * `TEST_IDS.footer*`, чтобы футер метился одинаково на desktop-поверхности и в mobile-sheet'е.
   */
  footerTestIds?: { approve?: string; cancel?: string; additional?: string; disclaimer?: string };
};
