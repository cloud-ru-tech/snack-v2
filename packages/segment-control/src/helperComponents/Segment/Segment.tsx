import { Counter } from '@ds/counter';
import { TruncateString } from '@ds/truncate-string';
import cn from 'classnames';
import { useEffect, useRef } from 'react';

import { ICON_POSITION, segmentTestId } from '../../constants';
import { Segment as SegmentType, Size } from '../../types';
import { getLayout } from '../../utils';
import styles from './styles.module.scss';

type SegmentProps = SegmentType & {
  size: Size;
  selected: boolean;
  onClick: () => void;
  focusable?: boolean;
  onGetFocusable?: (ref: HTMLButtonElement | null) => void;
  onSelectionUpdated: (element: HTMLButtonElement) => void;
  testId?: string;
};

export function Segment({
  size,
  label,
  value,
  selected,
  onClick,
  disabled,
  icon,
  iconPosition = ICON_POSITION.Before,
  counter,
  focusable,
  onGetFocusable,
  onSelectionUpdated,
  renderWrapSegment,
  testId,
}: SegmentProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focusable) {
      onGetFocusable?.(buttonRef.current);
    }
  }, [focusable, onGetFocusable]);

  useEffect(() => {
    if (selected && buttonRef.current) {
      onSelectionUpdated(buttonRef.current);
    }
  }, [selected, onSelectionUpdated]);

  const layout = getLayout(icon, label, iconPosition);
  const iconBefore = icon && iconPosition === ICON_POSITION.Before;
  const iconAfter = icon && iconPosition === ICON_POSITION.After;

  const segment = (
    <button
      ref={buttonRef}
      data-test-id={testId ?? segmentTestId(value)}
      data-active={selected || undefined}
      data-disabled={disabled || undefined}
      data-layout={layout}
      data-size={size}
      className={cn(styles.segment)}
      onClick={onClick}
      disabled={disabled}
      tabIndex={focusable ? 0 : -1}
      aria-checked={selected}
      role='radio'
      type='button'
    >
      <span className={styles.textWrapper}>
        {iconBefore && (
          <span className={styles.icon} data-text-opacity>
            {icon}
          </span>
        )}
        {label && (
          <span className={styles.label} data-text-opacity>
            <TruncateString text={label} />
          </span>
        )}
        {iconAfter && (
          <span className={styles.icon} data-text-opacity>
            {icon}
          </span>
        )}
        {counter != null && (
          <span className={styles.counter} data-text-opacity>
            <Counter size='xs' appearance='primary' value={Number(counter) || 0} />
          </span>
        )}
      </span>
    </button>
  );

  return renderWrapSegment ? <>{renderWrapSegment(segment)}</> : segment;
}
