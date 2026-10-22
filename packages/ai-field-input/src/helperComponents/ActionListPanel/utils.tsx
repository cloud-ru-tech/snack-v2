import { ArrowLeftSVG, ChevronRightSVG } from '@ds/icons/interface/system';
import { Item } from '@ds/list';
import { SIZE as TAG_SIZE, Tag } from '@ds/tag';
import { Tooltip } from '@ds/tooltip';
import { ReactNode } from 'react';

import { ACTION_LIST_ITEM_TYPE } from '../../constants';
import { AiFieldInputActionListItem, AiFieldInputActionListProps } from '../../types';
import { isActionListGroup } from '../../utils';

function renderAfterContent(item: AiFieldInputActionListItem): ReactNode {
  if (item.type === ACTION_LIST_ITEM_TYPE.DrillDown) {
    return <ChevronRightSVG size={16} />;
  }

  if (item.type !== ACTION_LIST_ITEM_TYPE.Back && item.shortcut) {
    return <Tag label={item.shortcut} size={TAG_SIZE.Xs} />;
  }

  return undefined;
}

function toListItem(item: AiFieldInputActionListItem, onSelect: (item: AiFieldInputActionListItem) => void): Item {
  const isBack = item.type === ACTION_LIST_ITEM_TYPE.Back;
  const tooltip = item.tooltip;

  return {
    id: item.id,
    beforeContent: isBack ? <ArrowLeftSVG /> : item.icon,
    content: { label: item.label, caption: isBack ? undefined : item.caption },
    afterContent: renderAfterContent(item),
    onClick: () => onSelect(item),
    itemWrapRender: tooltip
      ? node => (
          <Tooltip tip={tooltip} placement='right' disableSpanWrapper>
            {node}
          </Tooltip>
        )
      : undefined,
    'data-test-id': item.id,
  };
}

export function toListItems(
  items: AiFieldInputActionListProps['items'],
  onSelect: (item: AiFieldInputActionListItem) => void,
): Item[] {
  return items.map(item =>
    isActionListGroup(item)
      ? {
          id: item.id,
          type: 'group',
          label: item.label,
          divider: item.divider,
          items: item.items.map(groupItem => toListItem(groupItem, onSelect)),
        }
      : toListItem(item, onSelect),
  );
}
