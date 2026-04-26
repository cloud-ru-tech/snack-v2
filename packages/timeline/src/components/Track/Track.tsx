import { notReachable } from '../../helpers';
import { TrackDot, type TrackDotProps } from '../TrackDot';
import { VARIANT } from '../TrackDot/constants';
import { TrackLine, type TrackLineProps } from '../TrackLine';
import { ROLE } from './constants';
import styles from './styles.module.scss';
import { Role } from './types';

export type TrackProps = {
  /** Роль */
  role: Role;
  /** Стиль нижней линии */
  lineStyle?: TrackLineProps['style'];
  /** Вид маркера */
  dotVariant?: TrackDotProps['variant'];
  /** Семантический цвет маркера */
  dotAppearance?: TrackDotProps['appearance'];
  /** Показывать вертикальные сегменты */
  showLines?: boolean;
};

export function Track({ role, lineStyle, dotVariant = VARIANT.Default, dotAppearance, showLines = true }: TrackProps) {
  switch (role) {
    case ROLE.Start:
      return (
        <div
          className={styles.track}
          data-position={role}
          data-dot-variant={dotVariant}
          data-test-id={'timeline-track'}
        >
          <TrackDot variant={dotVariant} appearance={dotAppearance} />
          {showLines && <TrackLine style={lineStyle} />}
        </div>
      );

    case ROLE.Center:
      return (
        <div
          className={styles.track}
          data-position={role}
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

    case ROLE.End:
      return (
        <div
          className={styles.track}
          data-position={role}
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
      return notReachable(role);
  }
}
