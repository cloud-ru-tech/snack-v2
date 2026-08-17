import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TrackItem, TrackItemProps } from '../TrackItem';
import { CONTENT_POSITION } from '../TrackItem/constants';
import { getContentPosition, getPosition } from './helpers';
import styles from './styles.module.scss';

export type TimelineItem = Omit<TrackItemProps, 'fullWidth' | 'position'>;

export type TimelineProps = WithSupportProps<{
  /** Пункты таймлайна */
  items: TimelineItem[];
  /** Положение контента */
  contentPosition?: TrackItemProps['contentPosition'];
  /** Перемешать положение контента */
  alternate?: boolean;
  /** Сделать таймлайн во всю ширину */
  fullWidth?: boolean;
  /** CSS-класс для элемента с контентом */
  className?: string;
}>;

export function Timeline({
  items,
  fullWidth,
  contentPosition = CONTENT_POSITION.Right,
  alternate,
  className,
  ...rest
}: TimelineProps) {
  return (
    <div
      className={cn(styles.timelineWrapper, className)}
      {...extractSupportProps(rest)}
      data-full-width={fullWidth || undefined}
    >
      <div className={styles.timeline}>
        {items.map(({ contentPosition: itemContentPosition, ...itemProps }, index) => (
          <TrackItem
            key={itemProps.key || String(index)}
            contentPosition={getContentPosition(contentPosition, index, itemContentPosition, alternate)}
            position={getPosition(index, items.length)}
            alternateMode={alternate}
            showLines={items.length > 1}
            {...itemProps}
          />
        ))}
      </div>
    </div>
  );
}
