import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';

import { APPEARANCE, STATUS_INDICATOR_SIZE } from '../../constants';
import { Appearance, StatusIndicatorSize } from '../../types';
import styles from './styles.module.scss';

export type StatusIndicatorProps = WithSupportProps<{
  /** Размер */
  size?: StatusIndicatorSize;
  /** Внешний вид */
  appearance?: Appearance;
  className?: string;
}>;

export function StatusIndicator({
  size = STATUS_INDICATOR_SIZE.S,
  appearance = APPEARANCE.Neutral,
  className,
  ...rest
}: StatusIndicatorProps) {
  return (
    <div
      className={cn(styles.statusIndicator, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-appearance={appearance}
    ></div>
  );
}
