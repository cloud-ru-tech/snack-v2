/**
 * Отключает FLIP-анимацию перестановки после отпускания (общий контракт `SimpleItem` и `SimpleGroupBlock`).
 * Порядок применяется синхронно через `onItemsReorder`; без флага `@dnd-kit` доигрывает `transform 200ms`
 * из старого слота в новый — отпущенная строка дёргается обратно и уезжает на место.
 */
export function animateLayoutChanges(): boolean {
  return false;
}
