import { ButtonProps } from '@ds/button';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { PropsWithChildren, ReactNode, Ref } from 'react';

import { FOOTER_ACTIONS_ORIENTATION, MEDIA_KIND } from './constants';

/**
 * Пропсы action-кнопки футера — объект пропсов `Button` из `@ds/button`. `view` / `appearance` имеют
 * дефолты по слоту (переопределяемы); `size` (m) и full-width задаёт `ButtonGroup`, поэтому исключены.
 * `data-test-id` слота фиксирует `TEST_IDS` (через `WithSupportProps` у `ButtonGroup`).
 *
 * По умолчанию рендерится как `<button>`. Для CTA-ссылки передайте `as='a'` + `href` (`Button`
 * полиморфен и отрендерит `<a>` — доступен middle-click / контекстное меню). Union `button | anchor`
 * ниже раскрывает анкорные атрибуты. Для нестандартного футера остаётся `footer: ReactNode`.
 */
export type BottomSheetActionButton =
  Omit<ButtonProps<'button'>, 'fullWidth' | 'size'> | Omit<ButtonProps<'a'>, 'fullWidth' | 'size'>;

export type MediaKind = ValueOf<typeof MEDIA_KIND>;

export type FooterActionsOrientation = ValueOf<typeof FOOTER_ACTIONS_ORIENTATION>;

export type PopupMediaProps = {
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

export type PopupHeaderProps = WithSupportProps<{
  /** Заголовок. Типографика зависит от поверхности: `title-l` на sheet, `headline-s` на window (modal/drawer). */
  title?: ReactNode;
  /** `id` заголовка — для связи с `aria-labelledby` dialog'а (accessible name). */
  titleId?: string;
  /** Slot справа от title (например, `QuestionTooltip` из `@ds/tooltip`). */
  slotAfterTitle?: ReactNode;
  /** Текстовая строка-подзаголовок под title (Figma `subtitleWrapper`). Рендерится на всех поверхностях. */
  subtitle?: ReactNode;
  /**
   * Slot под подзаголовком — типично `SearchBar`, `SegmentControl` или `Filter`.
   * Рендерится на обеих поверхностях: `secondWrapper` в мастере `bottomSheet`,
   * `subHeadlineWrapper` в мастере `window` (modal / drawer).
   */
  slotSecondTitle?: ReactNode;
  /**
   * Callback клика на back-кнопку (слева в шапке).
   * Наличие callback'а авто-рендерит `Button view='function' icon={<ArrowLeftSVG />}`.
   */
  onBackButtonClick?(): void;
  /** Slot справа от headline-строки (любой `ReactNode`, обычно `Button` с иконкой). */
  actionButton?: ReactNode;
  /**
   * Усечение строковых `title`/`subtitle` через `TruncateString` (число строк). Применяется только
   * когда задано — по умолчанию текст не усекается. Актуально для window-поверхности (modal/drawer),
   * где длинный заголовок иначе переносится на несколько строк.
   */
  truncate?: {
    title?: number;
    subtitle?: number;
  };
  /**
   * Переопределение `data-test-id` слотов шапки. Каждый пропущенный ключ берётся из `TEST_IDS`.
   * Потребитель-обёртка (drawer/modal) прокидывает сюда свои id, чтобы сохранить публичный контракт.
   */
  testIds?: PopupHeaderTestIds;
  /** CSS-класс контейнера header'а. */
  className?: string;
}>;

/** `data-test-id` слотов `PopupHeader` — для переопределения потребителем. */
export type PopupHeaderTestIds = {
  header?: string;
  title?: string;
  slotAfterTitle?: string;
  subtitle?: string;
  slotSecondTitle?: string;
  backButton?: string;
  actionButton?: string;
};

export type PopupBodyProps = WithSupportProps<
  PropsWithChildren<{
    /** Содержимое body (альтернатива `children`). */
    content?: ReactNode;
    /**
     * Горизонтальные паддинги body. При `false` контент идёт во всю ширину sheet'а (edge-to-edge) —
     * для карт, изображений, списков без отступов. Соответствует Figma-оси `padding=false`.
     * @default true
     */
    bodyPadding?: boolean;
    /** Ссылка на скроллируемый контейнер body. */
    innerRef?: Ref<HTMLElement>;
    /** CSS-класс контейнера body. */
    className?: string;
  }>
>;

export type PopupFooterProps = WithSupportProps<
  PropsWithChildren<{
    /** CSS-класс контейнера footer'а. */
    className?: string;
  }>
>;
