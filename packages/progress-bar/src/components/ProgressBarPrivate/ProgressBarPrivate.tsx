import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE } from '../../constants';
import { Appearance, ProgressBarSize } from '../../types';
import { clamp, getProgressBarAriaAttributes } from '../../utils';
import styles from './styles.module.scss';

export type ProgressBarPrivateProps = WithSupportProps<{
  /** Процент загрузки от 0 до 100 */
  progress: number;
  /** Размер */
  size?: ProgressBarSize;
  /** Внешний вид */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
  /** Скорость анимации */
  animationDuration?: number;
}>;

/** Компонент индикатор загрузки */
export function ProgressBarPrivate({
  progress: progressRaw,
  size,
  className,
  appearance = APPEARANCE.Primary,
  animationDuration = 0,
  ...rest
}: ProgressBarPrivateProps) {
  const progress = clamp(0, progressRaw, 100);

  return (
    <div className={cn(styles.progressBarContainer, className)} {...extractSupportProps(rest)} data-size={size}>
      <div
        {...getProgressBarAriaAttributes(progress)}
        className={styles.progressBarFiller}
        data-test-id='progress-bar-filler'
        data-appearance={appearance}
        style={{
          '--snack-progress-bar-value': `${progress}%`,
          '--snack-progress-bar-animation-duration': `${animationDuration}ms`,
        }}
      />
    </div>
  );
}
