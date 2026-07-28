import { Button, ButtonProps, Size, VIEW } from '@ds/button';
import { Tooltip } from '@ds/tooltip';
import { ButtonDropdown, ButtonDropdownProps } from '@ds/uikit-product-button-predefined';
import { ReactNode } from 'react';

import { ButtonDroplist, ButtonDroplistProps } from './buttons/ButtonDroplist';
import { ButtonKebab, ButtonKebabProps } from './buttons/ButtonKebab';
import { ButtonQuota, ButtonQuotaProps } from './buttons/ButtonQuota';
import { BUTTON_TYPE } from './constants';
import { Action } from './types';

type CommonProps = { className?: string; size?: Size; fullWidth?: boolean };

/**
 * Рендерит один action. Составные варианты (`dropdown`/`kebab`/`droplist`) монтируют адаптивные
 * `@ds`-примитивы, которые берут раскладку из `AdaptiveProvider`. Раскладку фиксируют обёртки
 * `DesktopActions` / `MobileActions` (`withLayoutType`), поэтому отдельный проп `layoutType` не нужен.
 */
export function ActionView({
  variant,
  tooltip,
  hidden = false,
  commonProps,
  ...buttonProps
}: Action & { commonProps: CommonProps }) {
  if (hidden) {
    return null;
  }

  // disableSpanWrapper — кнопка остаётся ПРЯМЫМ flex-потомком контейнера действий: без него Tooltip
  // добавляет span-обёртку (`flex:0 1 auto`), и `fullWidth`-кнопка (`flex:1 1 0`) не растягивается на
  // всю ширину (mobile: 2 действия должны делить строку). Как в MobilePageForm ButtonGroup.
  const addTooltip = (component: ReactNode) =>
    tooltip ? (
      <Tooltip {...tooltip} disableSpanWrapper>
        {component}
      </Tooltip>
    ) : (
      component
    );

  switch (variant) {
    case BUTTON_TYPE.Outline:
      return addTooltip(<Button view={VIEW.Outline} {...(buttonProps as ButtonProps)} {...commonProps} />);
    case BUTTON_TYPE.Tonal:
      return addTooltip(<Button view={VIEW.Tonal} {...(buttonProps as ButtonProps)} {...commonProps} />);
    case BUTTON_TYPE.Function:
      return addTooltip(<Button view={VIEW.Function} {...(buttonProps as ButtonProps)} {...commonProps} />);
    case BUTTON_TYPE.Simple:
      return addTooltip(<Button view={VIEW.Simple} {...(buttonProps as ButtonProps)} {...commonProps} />);
    case BUTTON_TYPE.Dropdown: {
      return addTooltip(<ButtonDropdown {...(buttonProps as ButtonDropdownProps)} {...commonProps} />);
    }
    case BUTTON_TYPE.Kebab: {
      const { button, list } = buttonProps as ButtonKebabProps;
      return addTooltip(<ButtonKebab button={{ ...button, ...commonProps }} list={list} />);
    }
    case BUTTON_TYPE.Droplist: {
      const { button, list } = buttonProps as ButtonDroplistProps;
      return addTooltip(<ButtonDroplist button={{ ...button, ...commonProps }} list={list} />);
    }
    case BUTTON_TYPE.Quota: {
      const quotaProps = buttonProps as ButtonQuotaProps;

      return addTooltip(<ButtonQuota {...quotaProps} buttonProps={quotaProps.buttonProps ?? commonProps} />);
    }
    case BUTTON_TYPE.Filled:
    default:
      return addTooltip(<Button view={VIEW.Filled} {...(buttonProps as ButtonProps)} {...commonProps} />);
  }
}
