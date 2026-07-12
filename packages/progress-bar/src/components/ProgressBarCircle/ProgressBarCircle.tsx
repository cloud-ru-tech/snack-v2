import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { APPEARANCE, PROGRESS_BAR_CIRCLE_SIZE } from '../../constants';
import { Appearance, ProgressBarCircleSize } from '../../types';
import { clamp, getProgressBarAriaAttributes } from '../../utils';
import styles from './styles.module.scss';

export type ProgressBarCircleProps = WithSupportProps<{
  /** Процент загрузки от 0 до 100 */
  progress: number;
  /** Размер */
  size?: ProgressBarCircleSize;
  /** Внешний вид */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент индикатор загрузки */
export function ProgressBarCircle({
  className,
  progress: progressRaw,
  size = PROGRESS_BAR_CIRCLE_SIZE.S,
  appearance = APPEARANCE.Primary,
  ...rest
}: ProgressBarCircleProps) {
  const progress = clamp(0, progressRaw, 100);

  return (
    <div
      {...getProgressBarAriaAttributes(progress)}
      {...extractSupportProps(rest)}
      className={cn(styles.progressBarCircleContainer, className)}
      data-size={size}
      data-appearance={appearance}
      style={{
        '--snack-progress-bar-circle-value': `${progress}%`,
      }}
    ></div>
  );
}
