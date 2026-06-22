import { isValidElement } from 'react';

import { DESCRIPTION_STATE } from './constants';
import {
  AiFieldNoticeDescriptionContent,
  AiFieldNoticeDescriptionItem,
  AiFieldNoticeDescriptionListItem,
  DescriptionState,
} from './types';

export function resolveDescriptionIndex(
  state: DescriptionState,
  messageCount: number,
  options: {
    restingIndex?: number;
    hoverIndex?: number;
  } = {},
): number {
  if (messageCount <= 1) {
    return 0;
  }

  const restingIndex = options.restingIndex ?? messageCount - 1;
  const hoverIndex = options.hoverIndex ?? Math.min(1, messageCount - 1);

  switch (state) {
    case DESCRIPTION_STATE.FirstMessage:
      return 0;
    case DESCRIPTION_STATE.SecondMessage:
      return Math.min(1, messageCount - 1);
    case DESCRIPTION_STATE.DefaultMessage:
      return restingIndex;
    case DESCRIPTION_STATE.HoverMessage:
      return hoverIndex;
    default:
      return 0;
  }
}

export function isDescriptionItem(value: unknown): value is AiFieldNoticeDescriptionItem {
  return typeof value === 'object' && value !== null && !isValidElement(value) && 'content' in value;
}

export function isDescriptionItemsArray(
  value: AiFieldNoticeDescriptionContent | undefined,
): value is readonly AiFieldNoticeDescriptionListItem[] {
  return Array.isArray(value);
}

export function normalizeDescriptionItems(
  items: readonly AiFieldNoticeDescriptionListItem[],
): AiFieldNoticeDescriptionItem[] {
  return items.map(item => (isDescriptionItem(item) ? item : { content: item }));
}

/** Логика `getContent` из ChatStatusAnnouncement. */
export function getDescriptionContent(content: AiFieldNoticeDescriptionContent): AiFieldNoticeDescriptionItem[] {
  if (!isDescriptionItemsArray(content)) {
    return [{ content }];
  }

  const items = normalizeDescriptionItems(content);

  if (items.length === 1) {
    return items;
  }

  const hoverItem = items.find(item => item.shouldFocusOnHover);

  if (!hoverItem) {
    return items;
  }

  return [...items, { content: hoverItem.content }];
}
