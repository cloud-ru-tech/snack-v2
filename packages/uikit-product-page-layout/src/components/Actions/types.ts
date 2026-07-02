import { ButtonProps } from '@ds/button';
import { TooltipProps } from '@ds/tooltip';
import { ButtonDropdownProps } from '@ds/uikit-product-button-predefined';

import { ButtonDroplistProps } from './buttons/ButtonDroplist';
import { ButtonKebabProps } from './buttons/ButtonKebab';
import { ButtonQuotaProps } from './buttons/ButtonQuota';
import { BUTTON_TYPE } from './constants';

/**
 * Action — один элемент панели действий. Дискриминированный union по `variant` (`BUTTON_TYPE`).
 * Простые кнопки (`filled`/`outline`/`tonal`/`function`/`simple`) маппятся на единый `Button` из
 * `@ds/button` с соответствующим `view`; составные (`dropdown`/`kebab`/`droplist`/`quota`) — на
 * предопределённые обёртки.
 */
export type Action = {
  tooltip?: TooltipProps;
  hidden?: boolean;
} & (
  | ({ variant?: typeof BUTTON_TYPE.Filled } & ButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Outline } & ButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Tonal } & ButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Function } & ButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Simple } & ButtonProps)
  | ({ variant: typeof BUTTON_TYPE.Dropdown } & ButtonDropdownProps)
  | ({ variant: typeof BUTTON_TYPE.Kebab } & ButtonKebabProps)
  | ({ variant: typeof BUTTON_TYPE.Droplist } & ButtonDroplistProps)
  | ({ variant: typeof BUTTON_TYPE.Quota } & ButtonQuotaProps)
);

export type ActionsProps = {
  items: Action[];
  maxVisibleItems?: number;
};
