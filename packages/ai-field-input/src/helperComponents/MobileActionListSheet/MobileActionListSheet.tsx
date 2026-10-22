import { Droplist } from '@ds/list';
import { ReactElement, useCallback } from 'react';

import { TEST_IDS } from '../../constants';
import { AiFieldInputActionListItem, AiFieldInputActionListProps } from '../../types';
import { useActionListLevels } from '../shared';

export type MobileActionListSheetProps = {
  items: AiFieldInputActionListProps['items'];
  onPick(item: AiFieldInputActionListItem): void;
  onClose(): void;
};

export function MobileActionListSheet({ items, onPick, onClose }: MobileActionListSheetProps): ReactElement {
  const handlePick = useCallback(
    (item: AiFieldInputActionListItem) => {
      onClose();
      onPick(item);
    },
    [onClose, onPick],
  );

  const { listItems } = useActionListLevels(handlePick, { items });

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) onClose();
    },
    [onClose],
  );

  return (
    <Droplist items={listItems} open onOpenChange={handleOpenChange} size='m' scroll data-test-id={TEST_IDS.actionList}>
      <span aria-hidden />
    </Droplist>
  );
}
