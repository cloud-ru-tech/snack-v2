import { ItemId } from '@ds/list';

import { FieldSelectItem } from '../types';
import { WithIdContent } from './extract';

export function flatten(items: FieldSelectItem[]): WithIdContent[] {
  const out: WithIdContent[] = [];

  for (const item of items) {
    out.push(item as WithIdContent);

    if ('items' in item && Array.isArray(item.items)) {
      out.push(...flatten(item.items as FieldSelectItem[]));
    }
  }

  return out;
}

export function findItem(items: FieldSelectItem[], id: ItemId): WithIdContent | undefined {
  for (const item of flatten(items)) {
    if (item.id === id) {
      return item;
    }
  }

  return undefined;
}

/** Айтем для выбранного значения, которого нет в `items` (кастомная опция, ленивая подгрузка). */
export function createPlaceholderItem(id: ItemId): FieldSelectItem {
  return { id, content: { label: String(id) } };
}

/** Выбранные id, которых нет в дереве айтемов — в дроплист их нужно добавить отдельно. */
export function getMissingSelectedItems(selectedIds: ItemId[], allItems: FieldSelectItem[]): FieldSelectItem[] {
  if (selectedIds.length === 0) {
    return [];
  }

  const existingIds = new Set<ItemId>();

  for (const item of flatten(allItems)) {
    if (item.id !== undefined) {
      existingIds.add(item.id);
    }
  }

  const missing: FieldSelectItem[] = [];

  for (const id of selectedIds) {
    if (id !== '' && !existingIds.has(id)) {
      missing.push(createPlaceholderItem(id));
    }
  }

  return missing;
}
