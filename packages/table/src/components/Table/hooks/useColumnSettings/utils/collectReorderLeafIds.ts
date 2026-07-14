import { isReorderGroup, ReorderItem } from '@ds/list';

/**
 * Собирает id листовых строк из payload'а `onItemsReorder` в порядке обхода, разворачивая группы:
 * реальные колонки лежат внутри `SimpleGroupItem.items`, поэтому группу нельзя отбросить — иначе
 * её колонки не попадут в новый порядок и `mergeColumnOrderFromSettings` молча оставит их на старых
 * слотах. Вложенность reorder-дерева ограничена одним уровнем (в группе только листовые строки).
 */
export function collectReorderLeafIds(items: ReorderItem[]): string[] {
  return items.flatMap(item => (isReorderGroup(item) ? item.items.map(leaf => String(leaf.id)) : [String(item.id)]));
}
