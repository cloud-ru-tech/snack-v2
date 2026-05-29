import { Button, VIEW } from '@ds/button';
import { Tooltip } from '@ds/tooltip';
import { memo, ReactNode } from 'react';

import { BUTTON_TYPE } from '../../constants';
import { WidgetAction, WidgetLayoutType } from '../../types';
import { ButtonDroplist } from '../ButtonDroplist';
import { ButtonKebab } from '../ButtonKebab';

type ActionViewProps = WidgetAction & {
  layoutType?: WidgetLayoutType;
  commonProps?: {
    className?: string;
    size?: 's' | 'm' | 'l';
    fullWidth?: boolean;
  };
};

function withTooltip(children: ReactNode, tooltip?: WidgetAction['tooltip']) {
  return tooltip ? <Tooltip {...tooltip}>{children}</Tooltip> : children;
}

function ActionViewComponent({
  variant = BUTTON_TYPE.Filled,
  tooltip,
  hidden = false,
  layoutType,
  commonProps,
  ...rest
}: ActionViewProps) {
  if (hidden) {
    return null;
  }

  switch (variant) {
    case BUTTON_TYPE.Outline:
      return withTooltip(<Button {...rest} {...commonProps} view={VIEW.Outline} />, tooltip);
    case BUTTON_TYPE.Tonal:
      return withTooltip(<Button {...rest} {...commonProps} view={VIEW.Tonal} />, tooltip);
    case BUTTON_TYPE.Function:
      return withTooltip(<Button {...rest} {...commonProps} view={VIEW.Function} />, tooltip);
    case BUTTON_TYPE.Simple:
      return withTooltip(<Button {...rest} {...commonProps} view={VIEW.Simple} />, tooltip);
    case BUTTON_TYPE.Kebab: {
      const { button, list } = rest as Extract<WidgetAction, { variant: typeof BUTTON_TYPE.Kebab }>;
      return withTooltip(
        <ButtonKebab button={{ ...button, ...commonProps }} list={list} layoutType={layoutType} />,
        tooltip,
      );
    }
    case BUTTON_TYPE.Droplist: {
      const { button, list } = rest as Extract<WidgetAction, { variant: typeof BUTTON_TYPE.Droplist }>;
      return withTooltip(<ButtonDroplist button={{ ...button, ...commonProps }} list={list} />, tooltip);
    }
    case BUTTON_TYPE.Filled:
    default:
      return withTooltip(<Button {...rest} {...commonProps} view={VIEW.Filled} />, tooltip);
  }
}

export const ActionView = memo<ActionViewProps>(ActionViewComponent);
