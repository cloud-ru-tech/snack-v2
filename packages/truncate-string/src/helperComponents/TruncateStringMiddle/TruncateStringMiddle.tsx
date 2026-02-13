import { Tooltip, TooltipProps } from '@design-system/tooltip';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import { useEffect, useRef, useState } from 'react';

import { isEllipsisActive, truncateStringMiddle } from '../../helpers';
import styles from './styles.module.scss';

export type TruncateStringMiddleProps = WithSupportProps<{
  className?: string;
  /** Стиль для тултипа */
  tooltipClassName?: string;
  hideTooltip?: boolean;
  placement?: TooltipProps['placement'];
  text: string;
  trigger?: TooltipProps['trigger'];
}>;

export function TruncateStringMiddle({
  text,
  className,
  tooltipClassName,
  hideTooltip,
  placement = 'top',
  trigger = 'hoverAndFocusVisible',
  ...rest
}: TruncateStringMiddleProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [truncatedString, setTruncatedString] = useState(text);
  const textElementRef = useRef<HTMLElement>(null);
  const truncatedTextElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const setTruncate = throttle(() => {
      setTruncatedString(
        truncateStringMiddle({
          element: textElementRef.current,
          truncatedElement: truncatedTextElementRef.current,
          text,
        }),
      );
      setShowTooltip(isEllipsisActive(textElementRef.current));
    }, 50);

    setTruncate();

    const observer = new ResizeObserver(setTruncate);

    if (textElementRef.current) {
      observer.observe(textElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showTooltip, text, hideTooltip]);

  const textElement = (
    <>
      <span ref={textElementRef} className={styles.fullText} data-test-id='full-text'>
        {text}
      </span>
      <span ref={truncatedTextElementRef} className={styles.truncatedText} data-test-id='truncated-text'>
        {truncatedString}
      </span>
    </>
  );

  return (
    <span className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      {showTooltip && !hideTooltip ? (
        <Tooltip
          tip={text}
          placement={placement}
          hoverDelayOpen={500}
          triggerClassName={styles.textContainer}
          className={tooltipClassName}
          trigger={trigger}
        >
          {textElement}
        </Tooltip>
      ) : (
        textElement
      )}
    </span>
  );
}
