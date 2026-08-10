import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DRAG_MODE, DragGhost, DragPreview, DropIndicator, PLACEMENT } from '@ds/drag-and-drop';
import { useState } from 'react';

import styles from './demo.module.scss';

const INITIAL_ROWS = [
  { id: 'row-1', label: 'ListItem 1' },
  { id: 'row-2', label: 'ListItem 2' },
  { id: 'row-3', label: 'ListItem 3' },
  { id: 'row-4', label: 'ListItem 4' },
];

function Row({ id, label, lastIndex }: { id: string; label: string; lastIndex: number }) {
  const { activeIndex, attributes, index, isDragging, listeners, overIndex, setNodeRef } = useSortable({ id });

  // Статический перенос: соседи стоят на месте, поэтому трансляцию от `@dnd-kit` строке
  // не применяем. Точку вставки отмечает линия на строке-цели, сторона — по тому, откуда
  // пришла перетаскиваемая строка.
  const showIndicator = activeIndex !== -1 && index === overIndex && index !== activeIndex;
  const placement = overIndex > activeIndex ? PLACEMENT.After : PLACEMENT.Before;

  return (
    <DragGhost
      innerRef={setNodeRef}
      dragging={isDragging}
      mode={DRAG_MODE.Static}
      className={styles.grabbable}
      {...attributes}
      {...listeners}
    >
      <div className={styles.row}>{label}</div>
      {showIndicator && (
        <DropIndicator
          placement={placement}
          atEdge={
            (index === 0 && placement === PLACEMENT.Before) || (index === lastIndex && placement === PLACEMENT.After)
          }
        />
      )}
    </DragGhost>
  );
}

export function InsertionLine() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [activeId, setActiveId] = useState<string>();
  // Порог в 4px: без него клик по строке уже считался бы началом переноса.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const activeRow = rows.find(row => row.id === activeId);

  return (
    <DndContext
      // Фиксированный id: без него `@dnd-kit` нумерует свои aria-узлы счётчиком, и на
      // SSR-странице разметка расходится с клиентской.
      id='insertion-line'
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveId(String(active.id))}
      onDragCancel={() => setActiveId(undefined)}
      onDragEnd={({ active, over }) => {
        setActiveId(undefined);

        if (!over || active.id === over.id) {
          return;
        }

        setRows(rows =>
          arrayMove(
            rows,
            rows.findIndex(row => row.id === active.id),
            rows.findIndex(row => row.id === over.id),
          ),
        );
      }}
    >
      <SortableContext items={rows.map(row => row.id)} strategy={verticalListSortingStrategy}>
        <div className={styles.list}>
          {rows.map(row => (
            <Row key={row.id} id={row.id} label={row.label} lastIndex={rows.length - 1} />
          ))}
        </div>
      </SortableContext>
      {/* Копия за курсором: позиционирует её `DragOverlay`, поверхность даёт `DragPreview`. */}
      <DragOverlay dropAnimation={null}>
        {activeRow && (
          <DragPreview className={styles.entity}>
            <div className={styles.row}>{activeRow.label}</div>
          </DragPreview>
        )}
      </DragOverlay>
    </DndContext>
  );
}
