import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '@design-system/popover-private';
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
} & Pick<Partial<PopoverPrivateProps>, 'placement' | 'trigger'>;

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
  hoverDelayOpen = 200,
  hoverDelayClose = 100,
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
      popoverContent={
        <div className={styles.root} role='tooltip'>
          <div className={styles.layerBackground} aria-hidden />
          <div className={styles.layerContainer}>
            <div className={styles.content}>{content}</div>
          </div>
        </div>
      }
    >
      {children}
    </PopoverPrivate>
  );
}
