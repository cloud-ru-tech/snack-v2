import { notReachable } from '../../helpers';
import { TrackDot, TrackDotProps } from '../TrackDot';
import { VARIANT } from '../TrackDot/constants';
import { TrackLine, TrackLineProps } from '../TrackLine';
import { POSITION } from './constants';
import styles from './styles.module.scss';
import { Position } from './types';

export type TrackProps = {
  /** Положение элемента в ленте: первый, промежуточный или последний */
  position: Position;
  /** Стиль нижней линии */
  lineStyle?: TrackLineProps['style'];
  /** Вид маркера */
  dotVariant?: TrackDotProps['variant'];
  /** Семантический цвет маркера */
  dotAppearance?: TrackDotProps['appearance'];
  /** Показывать вертикальные сегменты */
  showLines?: boolean;
};

export function Track({
  position,
  lineStyle,
  dotVariant = VARIANT.Default,
  dotAppearance,
  showLines = true,
}: TrackProps) {
  switch (position) {
    case POSITION.Start:
      return (
        <div
          className={styles.track}
          data-position={position}
          data-dot-variant={dotVariant}
          data-test-id={'timeline-track'}
        >
          <TrackDot variant={dotVariant} appearance={dotAppearance} />
          {showLines && <TrackLine style={lineStyle} />}
        </div>
      );

    case POSITION.Center:
      return (
        <div
          className={styles.track}
          data-position={position}
          data-dot-variant={dotVariant}
          data-test-id={'timeline-track'}
        >
          {showLines && (
            <div className={styles.trackLinePre}>
              <TrackLine style={TrackLine.styles.Default} />
            </div>
          )}
          <TrackDot variant={dotVariant} appearance={dotAppearance} />
          {showLines && <TrackLine style={lineStyle} />}
        </div>
      );

    case POSITION.End:
      return (
        <div
          className={styles.track}
          data-position={position}
          data-dot-variant={dotVariant}
          data-test-id={'timeline-track'}
        >
          {showLines && (
            <div className={styles.trackLinePre}>
              <TrackLine style={TrackLine.styles.Default} />
            </div>
          )}
          <TrackDot variant={dotVariant} appearance={dotAppearance} />
        </div>
      );

    default:
      return notReachable(position);
  }
}
