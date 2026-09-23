import { SegmentControl, SegmentControlProps } from '@ds/segment-control';
import { Skeleton } from '@ds/skeleton';
import { memo, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { WidgetAction, WidgetState } from '../../types';
import { Actions } from '../Actions';
import styles from './styles.module.scss';

type ControlBlockProps = {
  actions?: WidgetAction[];
  actionsChildren?: ReactNode;
  segmentControl?: SegmentControlProps;
  wide?: boolean;
  state?: WidgetState;
};

function ControlBlockComponent({ actions, actionsChildren, segmentControl, wide, state }: ControlBlockProps) {
  // В wide-загрузке у макета нет скелетона контрола — только кнопки справа.
  const shouldShowControl = state === 'loading' ? !wide : Boolean(segmentControl);

  if (!shouldShowControl && !wide) {
    return null;
  }

  const content =
    state === 'loading' ? (
      <Skeleton loading className={styles.skeletonControl} />
    ) : (
      segmentControl && <SegmentControl {...segmentControl} />
    );

  return (
    <div className={styles.controlWrapper} data-mobile={!wide || undefined} data-test-id={TEST_IDS.control}>
      {shouldShowControl && content}
      {wide && <Actions actions={actions} actionsChildren={actionsChildren} wide={wide} state={state} />}
    </div>
  );
}

export const ControlBlock = memo<ControlBlockProps>(ControlBlockComponent);
