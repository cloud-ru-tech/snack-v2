import cn from 'classnames';
import { CSSProperties } from 'react';

import { AUTO_CLOSE_TIME, TEST_IDS, TOASTER_TYPE } from '../../constants';
import { useToastProgress } from '../../context';
import styles from './styles.module.scss';

export type TimerProps = {
  /**
   * Длительность таймера в мс. По умолчанию — `AUTO_CLOSE_TIME[UserAction]`.
   * Используется только как fallback для standalone-рендера (без
   * `ToasterContainer`) и для вычисления отображаемой цифры — `scaleX`
   * индикатора берётся из реального состояния auto-close таймера менеджера.
   */
  duration?: number;
  className?: string;
};

const SIZE = 24;
const CENTER = SIZE / 2;
const STROKE_WIDTH = 2;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// AUTO_CLOSE_TIME[UserAction] зафиксирован числом в constants.ts; cast здесь
// нужен только для сужения union number|false → number.
const DEFAULT_DURATION = AUTO_CLOSE_TIME[TOASTER_TYPE.UserAction] as number;

type TimerCSSProperties = CSSProperties & {
  '--timer-circumference': number;
};

/**
 * Круговой обратный отсчёт UserAction-тоста. Прогресс синхронизирован с
 * фактическим состоянием auto-close таймера через `useToastProgress` —
 * пауза/возобновление, hover, collapsed↔expanded переходы стека отражаются
 * без рассинхрона с моментом реального закрытия.
 *
 * `stroke-dashoffset` интерполируется напрямую из `progress`, а отображаемая
 * цифра — из `remainingMs / 1000`. Standalone-рендер вне `ToasterContainer`
 * (например, в VisualMatrix) даёт `progress = 1` и зафиксированную цифру.
 */
export function Timer({ duration = DEFAULT_DURATION, className }: TimerProps) {
  const live = useToastProgress();
  const autoCloseMs = typeof live.autoClose === 'number' && live.autoClose > 0 ? live.autoClose : duration;
  const remainingMs = autoCloseMs * live.progress;
  const totalSeconds = Math.max(1, Math.ceil(autoCloseMs / 1000));
  const secondsLeft = live.autoClose === false ? totalSeconds : Math.max(0, Math.ceil(remainingMs / 1000));
  const offset = CIRCUMFERENCE * (1 - live.progress);

  const style: TimerCSSProperties = {
    '--timer-circumference': CIRCUMFERENCE,
  };

  return (
    <span
      className={cn(styles.timer, className)}
      data-test-id={TEST_IDS.userActionTimer}
      data-paused={!live.running || undefined}
      style={style}
    >
      <svg
        className={styles.svg}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden='true'
        focusable='false'
      >
        <circle className={styles.track} cx={CENTER} cy={CENTER} r={RADIUS} fill='none' strokeWidth={STROKE_WIDTH} />
        <circle
          className={styles.indicator}
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill='none'
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </svg>
      <span className={styles.digit} aria-hidden='true'>
        {secondsLeft}
      </span>
    </span>
  );
}
