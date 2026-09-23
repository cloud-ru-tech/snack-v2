import { Tooltip, TooltipProps } from '@ds/tooltip';
import { extractSupportProps, throttle, useLayoutEffect, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import { isEllipsisActive } from '../../helpers';
import styles from './styles.module.scss';

export type TruncateStringEndProps = WithSupportProps<{
  className?: string;
  /** Стиль для тултипа */
  tooltipClassName?: string;
  /** Скрывать ли тултип с полным текстом */
  hideTooltip?: boolean;
  /** Максимальное кол-во строк, до которого может сворачиваться текст. */
  maxLines?: number;
  /** Положение тултипа относительно обрезанного текста. */
  placement?: TooltipProps['placement'];
  /** Текст, который будет обрезаться */
  text: string;
  /** Условие отображения тултипа */
  trigger?: TooltipProps['trigger'];
}>;

export function TruncateStringEnd({
  text,
  className,
  tooltipClassName,
  hideTooltip,
  maxLines = 1,
  placement = 'top',
  trigger = 'hoverAndFocusVisible',
  ...rest
}: TruncateStringEndProps) {
  const textElementRef = useRef<HTMLElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleShowTooltip = useCallback(() => {
    setShowTooltip(isEllipsisActive(textElementRef.current));
  }, []);

  useLayoutEffect(() => {
    if (hideTooltip || !textElementRef.current) {
      return;
    }

    toggleShowTooltip();
  }, [text, toggleShowTooltip, hideTooltip]);

  useEffect(() => {
    if (hideTooltip) {
      return;
    }

    const throttledToggleShowTooltip = throttle(() => {
      toggleShowTooltip();
    }, 50);

    let observer: ResizeObserver | undefined;

    const rafId = requestAnimationFrame(() => {
      if (!textElementRef.current) {
        return;
      }

      observer = new ResizeObserver(throttledToggleShowTooltip);
      observer.observe(textElementRef.current);
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [showTooltip, hideTooltip, toggleShowTooltip]);

  const textElement = (
    <span
      ref={textElementRef}
      className={cn(maxLines > 1 ? styles.text2AndMoreLines : styles.text1Line, className)}
      style={{ '--max-lines': maxLines } as CSSProperties}
      {...extractSupportProps(rest)}
    >
      {text}
    </span>
  );

  if (showTooltip && !hideTooltip) {
    return (
      <Tooltip
        tip={text}
        placement={placement}
        hoverDelayOpen={500}
        className={tooltipClassName}
        triggerClassName={styles.tooltipTrigger}
        trigger={trigger}
      >
        {textElement}
      </Tooltip>
    );
  }

  return textElement;
}
