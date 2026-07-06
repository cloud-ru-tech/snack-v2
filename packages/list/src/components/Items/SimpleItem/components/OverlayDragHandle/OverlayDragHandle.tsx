import { DragHandle } from '../DragHandle';

/** Статичная ручка для копий строк/заголовков в `DragOverlay` (без sortable-обработчиков). */
export function OverlayDragHandle() {
  return <DragHandle tabIndex={-1} />;
}
