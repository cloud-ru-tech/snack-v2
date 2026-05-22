import { notReachable } from '../../helpers';
import { ROLE } from '../Track/constants';
import { Position, TrackItemProps } from '../TrackItem';
import { POSITION } from '../TrackItem/constants';

export const getRole = (index: number, total: number): TrackItemProps['role'] => {
  if (index < 1) {
    return ROLE.Start;
  }

  if (index < total - 1) {
    return ROLE.Center;
  }

  return ROLE.End;
};

export const getContentPosition = (
  contentPosition: Position,
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
    case POSITION.Right:
      return index % 2 ? POSITION.Left : POSITION.Right;
    case POSITION.Left:
      return index % 2 ? POSITION.Right : POSITION.Left;

    default:
      return notReachable(contentPosition);
  }
};
