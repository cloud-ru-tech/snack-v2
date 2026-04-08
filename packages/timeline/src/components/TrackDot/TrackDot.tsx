import { APPEARANCE, VARIANT } from './constants';
import styles from './styles.module.scss';
import type { Appearance, Variant } from './types';

export type TrackDotProps = {
  /** Вид маркера */
  variant?: Variant;
  /** Семантический цвет маркера */
  appearance?: Appearance;
};

export function TrackDot({ variant = VARIANT.Default, appearance = APPEARANCE.Neutral }: TrackDotProps) {
  return (
    <div className={styles.trackDotContainer} data-test-id={'timeline-track-dot'}>
      <div className={styles.trackDot} data-variant={variant} data-appearance={appearance} />
    </div>
  );
}
