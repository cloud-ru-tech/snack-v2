import { extractSupportProps, withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { Ref } from 'react';

import { APPEARANCE, STATUS_INDICATOR_SIZE } from '../../constants';
import { Appearance, StatusIndicatorSize } from '../../types';
import styles from './styles.module.scss';

export type StatusIndicatorProps = WithSupportProps<{
  /** Размер */
  size?: StatusIndicatorSize;
  /** Внешний вид */
  appearance?: Appearance;
  className?: string;
  /**
   * Ref на корневой DOM-элемент.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: Ref<HTMLDivElement>;
}>;

export function StatusIndicator({
  size = STATUS_INDICATOR_SIZE.S,
  appearance = APPEARANCE.Neutral,
  className,
  innerRef,
  ...rest
}: StatusIndicatorProps) {
  return (
    <div
      ref={innerRef}
      className={cn(styles.statusIndicator, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-appearance={appearance}
    ></div>
  );
}

withInnerRefSupport(StatusIndicator);
