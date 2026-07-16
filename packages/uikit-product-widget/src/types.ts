import { ButtonProps } from '@ds/button';
import type { InfoBlockProps } from '@ds/info-block';
import type { SegmentControlProps } from '@ds/segment-control';
import { TooltipProps } from '@ds/tooltip';
import { TitleClickableProps } from '@ds/uikit-product-title-clickable';
import { WithSupportProps } from '@ds/utils';
import { MouseEventHandler, ReactNode } from 'react';

import { BUTTON_TYPE } from './constants';

export type WidgetState = 'default' | 'loading' | 'error';

export type WidgetLayoutType = 'desktop' | 'mobile';

export type WidgetHeaderProps = Pick<
  TitleClickableProps,
  'title' | 'icon' | 'avatar' | 'href' | 'target' | 'onClick' | 'titleTag' | 'fullWidth' | 'children' | 'className'
>;

export type WidgetLoadingStateProps = {
  /** Кастомный контент для состояния загрузки. */
  loadingContent?: ReactNode;
  /** Показывать skeleton-заглушку в body. */
  showSkeleton?: boolean;
};

export type WidgetErrorStateProps = {
  /** Заголовок ошибки. */
  errorTitle?: string;
  /** Описание ошибки. */
  errorDescription?: string;
  /** Иконка InfoBlock. */
  errorIcon?: InfoBlockProps['icon'];
  /** Текст кнопки повтора. */
  updateButtonLabel?: string;
  /** Клик по кнопке повтора. */
  onClickUpdate: MouseEventHandler<HTMLElement>;
};

export type WidgetActionListItem = {
  content: { label: string };
  beforeContent?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
};

export type WidgetActionListGroup = {
  type: 'group';
  label?: string;
  divider?: boolean;
  items: WidgetActionListItem[];
};

export type WidgetActionListEntry = WidgetActionListItem | WidgetActionListGroup;

export type WidgetActionListProps = {
  items: WidgetActionListEntry[];
  closeDroplistOnItemClick?: boolean;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type BaseAction = {
  /** Tooltip вокруг кнопки действия. */
  tooltip?: TooltipProps;
  /** Скрыть действие без удаления из массива. */
  hidden?: boolean;
};

type ButtonAction = BaseAction &
  Omit<ButtonProps<'button'>, 'view'> & {
    variant?: typeof BUTTON_TYPE.Filled;
  };

type OutlineAction = BaseAction &
  Omit<ButtonProps<'button'>, 'view'> & {
    variant: typeof BUTTON_TYPE.Outline;
  };

type TonalAction = BaseAction &
  Omit<ButtonProps<'button'>, 'view'> & {
    variant: typeof BUTTON_TYPE.Tonal;
  };

type FunctionAction = BaseAction &
  Omit<ButtonProps<'button'>, 'view'> & {
    variant: typeof BUTTON_TYPE.Function;
  };

type SimpleAction = BaseAction &
  Omit<ButtonProps<'button'>, 'view'> & {
    variant: typeof BUTTON_TYPE.Simple;
  };

export type ButtonKebabProps = {
  button?: Omit<ButtonProps<'button'>, 'label' | 'icon' | 'view'>;
  list: WidgetActionListProps;
};

export type ButtonDroplistProps = {
  button:
    | (Omit<ButtonProps<'button'>, 'appearance' | 'view'> & { buttonType?: 'filled' })
    | (Omit<ButtonProps<'button'>, 'icon' | 'iconPosition' | 'appearance' | 'view'> & { buttonType?: 'function' });
  list: WidgetActionListProps;
};

type KebabAction = BaseAction &
  ButtonKebabProps & {
    variant: typeof BUTTON_TYPE.Kebab;
  };

type DroplistAction = BaseAction &
  ButtonDroplistProps & {
    variant: typeof BUTTON_TYPE.Droplist;
  };

export type Action =
  | ButtonAction
  | OutlineAction
  | TonalAction
  | FunctionAction
  | SimpleAction
  | KebabAction
  | DroplistAction;

export type WidgetAction = Action;

export type WidgetProps = WithSupportProps<{
  /** Пропсы кликабельного заголовка. */
  header: WidgetHeaderProps;
  /** Контент виджета. */
  children: ReactNode;
  /** Действия в шапке/footer. */
  actions?: Action[];
  /** Дополнительный слот рядом с действиями. */
  actionsChildren?: ReactNode;
  /** Пропсы SegmentControl в шапке. */
  segmentControl?: SegmentControlProps;
  /** Только desktop: wide-раскладка виджета. На mobile принудительно выключается (`wide && !isMobile`). */
  wide?: boolean;
  /** Состояние виджета. */
  state?: WidgetState;
  /** Настройки loading-состояния. */
  loadingState?: WidgetLoadingStateProps;
  /** Настройки error-состояния. */
  errorState?: WidgetErrorStateProps;
  /** Дополнительный CSS-класс. */
  className?: string;
}>;
