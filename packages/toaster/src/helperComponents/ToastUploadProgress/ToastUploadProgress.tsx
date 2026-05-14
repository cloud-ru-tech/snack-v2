import cn from 'classnames';
import { HTMLAttributes } from 'react';

import { MAX_PROGRESS_PERCENT } from '../../components/ToastUpload/constants';
import styles from './styles.module.scss';

export type ToastUploadProgressAppearance = 'neutral' | 'green' | 'red';

export type ToastUploadProgressProps = HTMLAttributes<HTMLDivElement> & {
  /** Процент заполнения 0..100. */
  progress: number;
  /** Цветовая схема. */
  appearance: ToastUploadProgressAppearance;
};

/**
 * Прогресс-бар для ToastUpload. Палитра по Figma — track: invertNeutral-decor,
 * filler: invertNeutral-accent / green-accent / red-accent. Локальная
 * реализация, потому что `@ds/progress-bar` работает в светлой палитре и не
 * подходит для тёмной подложки тоста.
 */
export function ToastUploadProgress({ progress, appearance, className, ...rest }: ToastUploadProgressProps) {
  const clamped = Math.min(MAX_PROGRESS_PERCENT, Math.max(0, progress));

  return (
    <div
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={MAX_PROGRESS_PERCENT}
      aria-valuenow={clamped}
      className={cn(styles.track, className)}
      {...rest}
    >
      <div className={styles.filler} data-appearance={appearance} style={{ width: `${clamped}%` }} />
    </div>
  );
}
