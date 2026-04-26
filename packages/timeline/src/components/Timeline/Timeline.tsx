import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TrackItem, type TrackItemProps } from '../TrackItem';
import { POSITION } from '../TrackItem/constants';
import { getContentPosition, getRole } from './helpers';
import styles from './styles.module.scss';

export type TimelineItem = Omit<TrackItemProps, 'fullWidth' | 'role'>;

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
  contentPosition = POSITION.Right,
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
            role={getRole(index, items.length)}
            alternateMode={alternate}
            showLines={items.length > 1}
            {...itemProps}
          />
        ))}
      </div>
    </div>
  );
}
