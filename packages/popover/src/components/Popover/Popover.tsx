import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import cn from 'classnames';

import { PopoverProps } from '../../types';
import styles from './styles.module.scss';

export function Popover({
  content,
  placement = PLACEMENT.Top,
  trigger = TRIGGER.Click,
  triggerClassName,
  className,
  ...rest
}: PopoverProps) {
  const popoverContent = <div className={styles.tooltipContainer}>{content}</div>;
  const privateProps = {
    ...rest,
    placement,
    trigger,
    hasArrow: true,
    triggerClassName: cn(styles.triggerClassName, triggerClassName),
    className,
    arrowContainerClassName: styles.pointerWrapper,
    arrowElementClassName: styles.pointerShape,
    popoverContent,
  } as PopoverPrivateProps;
  return <PopoverPrivate {...privateProps} />;
}
