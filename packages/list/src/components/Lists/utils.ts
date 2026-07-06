import { arrayMove } from '@dnd-kit/sortable';

import { isGroupItem, ItemId, ReorderItem, SimpleGroupItem } from '../Items';

/**
 * Переупорядочивание reorder-дерева (`onItemsReorder`). Перестановка допускается только среди
 * «братьев» одного уровня: сначала проверяется верхний уровень (строки без группы), затем — строки
 * внутри каждой группы. Если `activeId` и `overId` лежат в разных контейнерах (в разных группах
 * либо строка-vs-группа), дерево возвращается без изменений — перенос между группами не поддержан.
 */
export function reorderItems(items: ReorderItem[], activeId: ItemId, overId: ItemId): ReorderItem[] {
  // Верхний уровень: строки без группы и сами группы лежат здесь как «братья» — `id` обязателен у
  // обеих сущностей, поэтому группа находится по нему наравне со строкой и переставляется целиком.
  const topActiveIndex = items.findIndex(item => 'id' in item && item.id === activeId);
  const topOverIndex = items.findIndex(item => 'id' in item && item.id === overId);
  if (topActiveIndex !== -1 && topOverIndex !== -1) {
    return arrayMove(items, topActiveIndex, topOverIndex);
  }

  // Иначе ищется группа, внутри которой обе строки — «братья», и перестановка идёт только там.
  return items.map(item => {
    if (isGroupItem<SimpleGroupItem>(item)) {
      const activeIndex = item.items.findIndex(child => child.id === activeId);
      const overIndex = item.items.findIndex(child => child.id === overId);
      if (activeIndex !== -1 && overIndex !== -1) {
        return { ...item, items: arrayMove(item.items, activeIndex, overIndex) };
      }
    }

    return item;
  });
}
