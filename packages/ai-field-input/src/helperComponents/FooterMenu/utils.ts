import { ItemProps } from '@ds/list';
import { MutableRefObject, Ref } from 'react';

import { TEST_IDS } from '../../constants';
import { AiFieldInputFooterMenuItem } from '../../types';

export function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    (ref as MutableRefObject<T | null>).current = node;
  }
}

export function filterMenuItems(items: AiFieldInputFooterMenuItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter(item => item.label.toLowerCase().includes(normalizedQuery));
}

export function toDroplistItems(items: AiFieldInputFooterMenuItem[], onSelect?: (id: string) => void): ItemProps[] {
  return items.map(({ id, label, description }) => ({
    id,
    content: { label, description },
    'data-test-id': TEST_IDS.menuItem,
    onClick: () => onSelect?.(id),
  }));
}
