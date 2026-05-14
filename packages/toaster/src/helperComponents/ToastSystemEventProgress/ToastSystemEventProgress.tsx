import { CSSProperties } from 'react';

import { ToastSystemEventAppearance } from '../../components/ToastSystemEvent/types';
import { TEST_IDS } from '../../constants';
import { useToastProgress } from '../../manager/runtimeContext';
import styles from './styles.module.scss';

export type ToastSystemEventProgressProps = {
  /** Цветовая схема — берётся из appearance тоста. */
  appearance: ToastSystemEventAppearance;
  /**
   * Зарезервирован. Раньше задавал `animation-duration` CSS-кейфрейма; сейчас
   * scaleX полоски считается из реального состояния авто-close таймера через
   * `useToastProgress`, и этот параметр в рантайме не используется. Оставлен
   * в API на случай standalone-рендера карточки вне `ToasterContainer` —
   * там контекста менеджера нет, и полоска зафиксируется на `scaleX(1)`.
   */
  durationMs?: number;
  /**
   * Статическое значение 0..1 для визуальных матриц. Когда задано — рендер без
   * подписки на менеджер, бар замораживается на этом scaleX.
   */
  value?: number;
};

/**
 * Прогресс-полоса нижней части `ToastSystemEvent`. По Figma —
 * filler `<appearance>-accent` без track (выводится поверх тёмной подложки).
 *
 * `scaleX` берётся из `useToastProgress` — она тикает в rAF и подписана на
 * фактический `elapsedMs/autoClose` менеджера, поэтому полоска корректно
 * паузится на hover/touch и не «перезапускается» при раскрытии стопки
 * (collapsed↔expanded), как это делала старая CSS-keyframe анимация.
 */
export function ToastSystemEventProgress({ appearance, value }: ToastSystemEventProgressProps) {
  const isStatic = typeof value === 'number';
  const live = useToastProgress();

  const scaleX = isStatic ? Math.min(1, Math.max(0, value as number)) : live.progress;

  const style: CSSProperties = {
    transform: `scaleX(${scaleX})`,
  };

  return (
    <div
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={scaleX}
      data-test-id={TEST_IDS.systemEventProgressBar}
      data-appearance={appearance}
      data-static={isStatic || undefined}
      className={styles.progress}
      style={style}
    />
  );
}
