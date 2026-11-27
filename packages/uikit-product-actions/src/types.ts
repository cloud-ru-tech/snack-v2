import { ButtonProps } from '@ds/button';
import { Item } from '@ds/list';
import { TooltipProps } from '@ds/tooltip';
import { ButtonDropdownProps } from '@ds/uikit-product-button-predefined';
import { ReactNode } from 'react';

import { BUTTON_TYPE } from './constants';
import { ButtonDroplistProps } from './helperComponents/ButtonDroplist';
import { ButtonKebabProps } from './helperComponents/ButtonKebab';
import { ButtonQuotaProps } from './helperComponents/ButtonQuota';

/**
 * Пропсы простой кнопки действия: `button` по умолчанию либо ссылка — `as='a'` вместе с `href`
 * (`Button` сам рендерит анкор и проставляет `rel='noopener noreferrer'` при `target='_blank'`).
 */
export type ActionButtonProps =
  (ButtonProps & { href?: never; target?: never }) | (Omit<ButtonProps<'a'>, 'as'> & { as: 'a' });

/** Кастомное действие с представлениями для панели и выпадающего меню. */
export type CustomAction = {
  variant: 'custom';
  hidden?: boolean;
  tooltip?: TooltipProps;
  /** Вызывается при рендеринге; React hooks следует использовать внутри компонента default. */
  render(): { default: ReactNode; asListItem: Item };
};

/** Укажите id для сохранения состояния действий при перестановке массива. */
export type Action = (CustomAction | StandardAction) & { id?: string };

type StandardAction = {
  tooltip?: TooltipProps;
  hidden?: boolean;
} & (
  | ({ variant?: typeof BUTTON_TYPE.Filled } & ActionButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Outline } & ActionButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Tonal } & ActionButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Function } & ActionButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Simple } & ActionButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Dropdown } & ButtonDropdownProps)
  | ({ variant: typeof BUTTON_TYPE.Kebab } & ButtonKebabProps)
  | ({ variant: typeof BUTTON_TYPE.Droplist } & ButtonDroplistProps)
  | ({ variant: typeof BUTTON_TYPE.Quota } & ButtonQuotaProps)
);

export type ActionsProps = {
  /** Класс контейнера действий. */
  className?: string;
  /** Действия в порядке приоритета: первое остаётся видимым дольше остальных. */
  items: Action[];
  /** Максимальное число видимых действий. Остальные доступны в меню. */
  maxVisibleItems?: number;
  /** Только desktop: сворачивать действия при нехватке ширины. @default true */
  collapse?: boolean;
  /** Разделять группы пунктов меню. @default true */
  groupDividers?: boolean;
  /** Подпись и тестовый идентификатор кнопки дополнительных действий. */
  moreButtonProps?: Pick<ButtonProps, 'aria-label' | 'data-test-id'>;
  /** Тестовый идентификатор панели. */
  'data-test-id'?: string;
};
