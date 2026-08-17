import { ReactNode } from 'react';

import { notReachable } from '../../helpers';
import { Track, TrackProps } from '../Track';
import { CONTENT_POSITION } from './constants';
import styles from './styles.module.scss';
import { ContentPosition } from './types';

export type TrackItemProps = {
  /** Уникальный ключ */
  key?: string;
  /** Контент */
  content: ReactNode;
  /** Положение контента */
  contentPosition?: ContentPosition;
  /** Положение элемента в ленте: первый, промежуточный или последний */
  position: TrackProps['position'];
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
  /** Стабильный идентификатор для e2e/tests */
  'data-test-id'?: string;
};

export function TrackItem({
  content,
  position,
  contentPosition = CONTENT_POSITION.Right,
  opposite,
  lineStyle,
  dotVariant,
  dotAppearance,
  alternateMode,
  showLines,
}: TrackItemProps) {
  const showOppositeBlock = Boolean(opposite || alternateMode);

  switch (contentPosition) {
    case CONTENT_POSITION.Right:
      return (
        <div className={styles.trackItem} data-test-id={'timeline-track-item'}>
          {showOppositeBlock && (
            <div className={styles.opposite} data-test-id={'timeline-track-item-opposite'}>
              {opposite || null}
            </div>
          )}
          <Track
            position={position}
            lineStyle={lineStyle}
            dotVariant={dotVariant}
            dotAppearance={dotAppearance}
            showLines={showLines}
          />
          <div className={styles.content}>{content}</div>
        </div>
      );

    case CONTENT_POSITION.Left:
      return (
        <div className={styles.trackItem} data-test-id={'timeline-track-item'}>
          <div className={styles.content}>{content}</div>
          <Track
            position={position}
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
