import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '@design-system/popover-private';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type TooltipProps = {
  /** Элемент, при наведении на который показывается тултип */
  children: ReactNode;
  /** Содержимое тултипа (текст или разметка) */
  content: ReactNode;
  /** Задержка открытия по ховеру (мс) */
  hoverDelayOpen?: number;
  /** Задержка закрытия по ховеру (мс) */
  hoverDelayClose?: number;
} & Pick<Partial<PopoverPrivateProps>, 'placement' | 'trigger' | 'offset' | 'triggerClassName'>;

export const DEFAULT_FALLBACK_PLACEMENTS = [PLACEMENT.Top, PLACEMENT.Right, PLACEMENT.Bottom, PLACEMENT.Left];

/**
 * Tooltip — всплывающая подсказка при наведении.
 * Стили и анатомия (отступы, скругления, макс. ширина) из @sbercloud/figma-variables.
 * DOM повторяет структуру из Figma: корневой контейнер и слои (фон, контейнер контента, указатель) с position: absolute.
 */
export function Tooltip({
  children,
  content,
  placement = PLACEMENT.Top,
  trigger = TRIGGER.HoverAndFocusVisible,
  hoverDelayOpen = 0,
  hoverDelayClose = 0,
  offset,
  triggerClassName,
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
      offset={offset}
      popoverContent={
        <div className={styles.tooltipContainer} role='tooltip'>
          {content}
        </div>
      }
    >
      {children}
    </PopoverPrivate>
  );
}
