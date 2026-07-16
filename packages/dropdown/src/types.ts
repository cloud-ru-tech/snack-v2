import { InfoBlockProps } from '@ds/info-block';
import { PopoverPrivateProps } from '@ds/popover-private';
import { WithSupportProps } from '@ds/utils';
import { PropsWithChildren, ReactNode } from 'react';

import { STATE } from './constants';

type ActionButtonProps = {
  /** Лейбл кнопки-действия */
  actionLabel?: string;
  /** Действие при клике по кнопке */
  onActionClick?(): void;
};

type BlockProps = Pick<InfoBlockProps, 'content'>;
type BlockPropsWithIcon = Pick<InfoBlockProps, 'content' | 'icon'>;

export type DropdownState =
  | { type: typeof STATE.Loading }
  | ({ type: typeof STATE.NotFound } & ActionButtonProps & BlockProps)
  | ({ type: typeof STATE.NoData } & ActionButtonProps & BlockPropsWithIcon)
  | ({ type: typeof STATE.DataError } & ActionButtonProps & BlockPropsWithIcon);

/**
 * Адаптивный Dropdown: на desktop рендерит popover, на `mobile` (по `AdaptiveProvider`) — `BottomSheet`
 * из `@ds/bottom-sheet`. Публичный API единый для обеих поверхностей.
 *
 * Только desktop: пропы позиционирования/поведения popover'а ниже работают только на desktop-поверхности
 * и молча игнорируются на mobile (у `BottomSheet` своё позиционирование снизу):
 * `placement`, `widthStrategy`, `offset`, `fallbackPlacements`, `hoverDelayOpen`, `hoverDelayClose`,
 * `closeOnEscapeKey`, `triggerClickByKeys`, `outsideClick`, `disableSpanWrapper`, `triggerClassName`,
 * `triggerRef`, `container` (на mobile портал берётся из `@ds/portal-context`), `stopPropagation`.
 * Кросс-платформенные: `content`, `title`, `slotAfterHeadline`, `search`, `footer`, `headerDivider`,
 * `footerDivider`, `state`, `open`, `onOpenChange`, `closeOnPopstate`, `className`, `bodyPadding`.
 */
export type DropdownProps = WithSupportProps<
  PropsWithChildren<{
    /** Содержимое внутри поповера (body) */
    content: ReactNode;
    /** Заголовок в шапке (topBar) */
    title?: ReactNode;
    /** Подсказка-иконка рядом с заголовком (потребитель собирает, напр. `<QuestionTooltip />`) */
    slotAfterHeadline?: ReactNode;
    /** Слот поиска в шапке (topBar) */
    search?: ReactNode;
    /** Слот футера (bottomBar) */
    footer?: ReactNode;
    /** Divider между шапкой и body */
    headerDivider?: boolean;
    /** Divider между body и футером */
    footerDivider?: boolean;
    /** Состояние */
    state?: DropdownState;
    /** CSS-класс */
    className?: string;
    /**
     * Паддинги body. `false` — убрать (контент во всю ширину; на mobile прокидывается в `BottomSheet`).
     * @default true
     */
    bodyPadding?: boolean;
  }> &
    Pick<
      PopoverPrivateProps,
      | 'triggerClassName'
      | 'open'
      | 'onOpenChange'
      | 'hoverDelayOpen'
      | 'hoverDelayClose'
      | 'widthStrategy'
      | 'offset'
      | 'closeOnEscapeKey'
      | 'triggerClickByKeys'
      | 'triggerRef'
      | 'outsideClick'
      | 'fallbackPlacements'
      | 'disableSpanWrapper'
      | 'closeOnPopstate'
      | 'container'
      | 'stopPropagation'
    > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement'>>
>;
