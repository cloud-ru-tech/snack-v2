import { Button, ButtonProps } from '@ds/button';
import { useThemeClassnames } from '@ds/theme';
import { TooltipProps, WithTooltip } from '@ds/tooltip';
import cn from 'classnames';
import { ElementType } from 'react';

import styles from './styles.module.scss';

export type HeaderButtonProps<T extends ElementType = 'button'> = Omit<
  ButtonProps<T>,
  'size' | 'appearance' | 'view'
> & {
  /** Настройки тултипа. `placement` и `disableSpanWrapper` зафиксированы под анатомию хедера */
  tooltip?: Omit<TooltipProps, 'placement'>;
  isMobile?: boolean;
};

/**
 * HeaderButton — кнопка хедера с тултипом (лого, пользовательское меню и т.п.).
 * `size`, `appearance`, `view` кнопки и `placement`/`disableSpanWrapper` тултипа зафиксированы,
 * остальное API `Button` и `Tooltip` передаётся как есть.
 */
export function HeaderButton<T extends ElementType = 'button'>({
  tooltip,
  isMobile,
  className,
  ...rest
}: HeaderButtonProps<T>) {
  const compactThemeClassName = useThemeClassnames({ density: 'compact' });

  return (
    // FIXME: typescript ломается, если не указать tip явно
    //  пока не разбирался почему так
    <WithTooltip
      tooltip={
        isMobile
          ? undefined
          : {
              disableSpanWrapper: true,
              hoverDelayOpen: 300,
              tip: tooltip?.tip,
              placement: 'bottom',
              ...tooltip,
              triggerClassName: styles.tooltipTrigger,
            }
      }
    >
      <Button<T>
        {...(rest as ButtonProps<T>)}
        size='m'
        appearance='neutral'
        view='simple'
        className={cn(styles.headerButton, compactThemeClassName, className)}
      />
    </WithTooltip>
  );
}
