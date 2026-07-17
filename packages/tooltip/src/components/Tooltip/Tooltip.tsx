import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type TooltipProps = WithSupportProps<{
  /** Содержимое тултипа (текст или разметка) */
  tip: ReactNode;
  /** Отключение ограничения ширины тултипа @default false */
  disableMaxWidth?: boolean;
}> &
  Pick<
    PopoverPrivateProps,
    | 'className'
    | 'triggerClassName'
    | 'offset'
    | 'open'
    | 'onOpenChange'
    | 'hoverDelayOpen'
    | 'hoverDelayClose'
    | 'triggerRef'
    | 'disableSpanWrapper'
    | 'fallbackPlacements'
    | 'closeOnPopstate'
  > &
  Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement' | 'children'>>;

export const DEFAULT_FALLBACK_PLACEMENTS = [PLACEMENT.Top, PLACEMENT.Right, PLACEMENT.Bottom, PLACEMENT.Left];

/**
 * Tooltip — всплывающая подсказка при наведении.
 * Стили и анатомия (отступы, скругления, макс. ширина) из @ds/figma-variables.
 * DOM повторяет структуру из Figma: корневой контейнер и слои (фон, контейнер контента, указатель) с position: absolute.
 */
export function Tooltip({
  children,
  tip,
  placement = PLACEMENT.Top,
  trigger = TRIGGER.HoverAndFocusVisible,
  hoverDelayOpen = 0,
  hoverDelayClose = 0,
  triggerClassName,
  disableMaxWidth = false,
  ...otherProps
}: TooltipProps) {
  return (
    <PopoverPrivate
      trigger={trigger}
      placement={placement}
      hasArrow
      arrowContainerClassName={styles.pointerWrapper}
      arrowElementClassName={styles.pointerShape}
      hoverDelayOpen={hoverDelayOpen}
      hoverDelayClose={hoverDelayClose}
      fallbackPlacements={DEFAULT_FALLBACK_PLACEMENTS}
      triggerClassName={cn(styles.triggerClassName, triggerClassName)}
      popoverContent={
        <div className={styles.tooltipContainer} data-disable-max-width={disableMaxWidth} role='tooltip'>
          {tip}
        </div>
      }
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
