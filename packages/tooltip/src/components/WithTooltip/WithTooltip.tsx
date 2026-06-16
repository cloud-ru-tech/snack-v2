import { Tooltip, TooltipProps } from '../Tooltip';

type WithTooltipProps = {
  /** Настройки для тултипа */
  tooltip?: Omit<TooltipProps, 'children'>;
  /** Триггер поповера (подробнее в TooltipProps) */
  children: TooltipProps['children'];
};

export function WithTooltip({ tooltip, children }: WithTooltipProps) {
  if (!tooltip?.tip) {
    return <>{children}</>;
  }

  return <Tooltip {...tooltip}>{children}</Tooltip>;
}
