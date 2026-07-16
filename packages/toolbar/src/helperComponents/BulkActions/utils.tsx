import { Tooltip } from '@ds/tooltip';
import { ReactNode } from 'react';

import { BulkAction } from './types';

export function getBulkActionKey(action: BulkAction, index: number): string {
  return action['data-test-id'] ?? `bulk-action__${index}`;
}

export function getBulkActionIndex(actions: BulkAction[], action: BulkAction, fallbackIndex: number): number {
  const index = actions.indexOf(action);

  return index >= 0 ? index : fallbackIndex;
}

export function mapBulkActionToDroplistItem(action: BulkAction, index: number) {
  const { label, icon: Icon, onClick, disabled, tooltip, 'data-test-id': testId } = action;

  return {
    id: getBulkActionKey(action, index),
    content: { label },
    beforeContent: <Icon />,
    onClick,
    disabled,
    itemWrapRender: (item: ReactNode) => (
      <Tooltip tip={tooltip} open={tooltip ? undefined : false} placement='right' data-test-id={`${testId}-tooltip`}>
        {item}
      </Tooltip>
    ),
    'data-test-id': testId,
  };
}
