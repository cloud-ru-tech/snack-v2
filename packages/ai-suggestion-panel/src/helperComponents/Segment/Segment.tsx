import { Sun, SUN_SIZE } from '@ds/loader';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { KeyboardEventHandler, MouseEventHandler, Ref } from 'react';

import { Size } from '../../AiSuggestionPanel';
import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type SegmentProps = {
  label: string;
  size: Size;
  disabled?: boolean;
  loading?: boolean;
  /** «+N» с открытым списком. */
  open?: boolean;
  mobile?: boolean;
  /** Копия для замера ширины: рендерится `<span>` без обработчиков. */
  measure?: boolean;
  value?: string;
  innerRef?: Ref<HTMLButtonElement>;
  className?: string;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'data-test-id'?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
};

export function Segment({
  label,
  size,
  disabled,
  loading,
  open,
  mobile,
  measure,
  value,
  innerRef,
  className,
  onClick,
  onKeyDown,
  ...rest
}: SegmentProps) {
  const content = (
    <>
      {label}
      {loading && <Sun size={SUN_SIZE.XS} data-test-id={measure ? undefined : TEST_IDS.itemLoader} />}
    </>
  );

  const dataProps = {
    'data-size': size,
    'data-loading': loading || undefined,
    'data-open': open || undefined,
    'data-mobile': mobile || undefined,
  };

  if (measure) {
    return (
      <span className={cn(styles.segment, className)} {...dataProps}>
        {content}
      </span>
    );
  }

  return (
    <button
      ref={innerRef}
      type='button'
      className={cn(styles.segment, className)}
      disabled={disabled}
      aria-busy={loading || undefined}
      data-value={value}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...dataProps}
      {...rest}
    >
      {content}
    </button>
  );
}

withInnerRefSupport(Segment);
