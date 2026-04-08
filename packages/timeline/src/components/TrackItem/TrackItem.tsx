import type { ReactNode } from 'react';

import { notReachable } from '../../helpers';
import { Track, type TrackProps } from '../Track';
import { POSITION } from './constants';
import styles from './styles.module.scss';
import type { Position } from './types';

export type TrackItemProps = {
  /** Уникальный ключ */
  key?: string;
  /** Контент */
  content: ReactNode;
  /** Положение контента */
  contentPosition?: Position;
  /** Роль */
  role: TrackProps['role'];
  /** Контент в противоположной колонке */
  opposite?: ReactNode;
  /** Стиль нижней линии */
  lineStyle?: TrackProps['lineStyle'];
  /** Вид маркера */
  dotVariant?: TrackProps['dotVariant'];
  /** Семантический цвет маркера */
  dotAppearance?: TrackProps['dotAppearance'];
  /** Показывать вертикальные сегменты */
  showLines?: boolean;
  /** Перемешать положение контента */
  alternateMode?: boolean;
};

export function TrackItem({
  content,
  role,
  contentPosition = POSITION.Right,
  opposite,
  lineStyle,
  dotVariant,
  dotAppearance,
  alternateMode,
  showLines,
}: TrackItemProps) {
  const showOppositeBlock = Boolean(opposite || alternateMode);

  switch (contentPosition) {
    case POSITION.Right:
      return (
        <div className={styles.trackItem} data-test-id={'timeline-track-item'}>
          {showOppositeBlock && (
            <div className={styles.opposite} data-test-id={'timeline-track-item-opposite'}>
              {opposite || null}
            </div>
          )}
          <Track
            role={role}
            lineStyle={lineStyle}
            dotVariant={dotVariant}
            dotAppearance={dotAppearance}
            showLines={showLines}
          />
          <div className={styles.content}>{content}</div>
        </div>
      );

    case POSITION.Left:
      return (
        <div className={styles.trackItem} data-test-id={'timeline-track-item'}>
          <div className={styles.content}>{content}</div>
          <Track
            role={role}
            lineStyle={lineStyle}
            dotVariant={dotVariant}
            dotAppearance={dotAppearance}
            showLines={showLines}
          />
          {showOppositeBlock && (
            <div className={styles.opposite} data-test-id={'timeline-track-item-opposite'}>
              {opposite || null}
            </div>
          )}
        </div>
      );

    default:
      return notReachable(contentPosition);
  }
}
