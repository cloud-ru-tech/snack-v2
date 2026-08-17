import { notReachable } from '../../helpers';
import { POSITION } from '../Track/constants';
import { ContentPosition, TrackItemProps } from '../TrackItem';
import { CONTENT_POSITION } from '../TrackItem/constants';

export const getPosition = (index: number, total: number): TrackItemProps['position'] => {
  if (index < 1) {
    return POSITION.Start;
  }

  if (index < total - 1) {
    return POSITION.Center;
  }

  return POSITION.End;
};

export const getContentPosition = (
  contentPosition: ContentPosition,
  index: number,
  itemPosition?: TrackItemProps['contentPosition'],
  alternate?: boolean,
): TrackItemProps['contentPosition'] => {
  if (itemPosition) {
    return itemPosition;
  }

  if (!alternate) {
    return contentPosition;
  }

  switch (contentPosition) {
    case CONTENT_POSITION.Right:
      return index % 2 ? CONTENT_POSITION.Left : CONTENT_POSITION.Right;
    case CONTENT_POSITION.Left:
      return index % 2 ? CONTENT_POSITION.Right : CONTENT_POSITION.Left;

    default:
      return notReachable(contentPosition);
  }
};
