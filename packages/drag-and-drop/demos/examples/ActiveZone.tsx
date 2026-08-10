import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DragGhost, DragPreview, DropTarget } from '@ds/drag-and-drop';
import { useState } from 'react';

import styles from './demo.module.scss';

const ZONES = [
  { id: 'zone-1', label: 'Зона 1' },
  { id: 'zone-2', label: 'Зона 2' },
];

const INITIAL_ITEMS = [
  { id: 'item-1', label: 'ListItem 1', zoneId: 'zone-1' },
  { id: 'item-2', label: 'ListItem 2', zoneId: 'zone-1' },
  { id: 'item-3', label: 'ListItem 3', zoneId: 'zone-2' },
];

type Item = (typeof INITIAL_ITEMS)[number];

function Row({ id, label }: Pick<Item, 'id' | 'label'>) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({ id });

  return (
    <DragGhost innerRef={setNodeRef} dragging={isDragging} className={styles.grabbable} {...attributes} {...listeners}>
      <div className={styles.row}>{label}</div>
    </DragGhost>
  );
}

function Zone({ id, label, items, sourceZoneId }: { id: string; label: string; items: Item[]; sourceZoneId?: string }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  // Рамка — признак переноса между зонами: своя зона её не получает.
  const active = isOver && sourceZoneId !== undefined && sourceZoneId !== id;

  return (
    <DropTarget innerRef={setNodeRef} active={active} className={styles.zone}>
      <div className={styles.zoneLabel}>{label}</div>
      {items.map(item => (
        <Row key={item.id} id={item.id} label={item.label} />
      ))}
    </DropTarget>
  );
}

export function ActiveZone() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [activeId, setActiveId] = useState<string>();
  // Порог в 4px: без него клик по строке уже считался бы началом переноса.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const activeItem = items.find(item => item.id === activeId);

  return (
    <DndContext
      // Фиксированный id: без него `@dnd-kit` нумерует свои aria-узлы счётчиком, и на
      // SSR-странице разметка расходится с клиентской.
      id='active-zone'
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(String(active.id))}
      onDragCancel={() => setActiveId(undefined)}
      onDragEnd={({ active, over }) => {
        setActiveId(undefined);

        if (!over) {
          return;
        }

        setItems(items => items.map(item => (item.id === active.id ? { ...item, zoneId: String(over.id) } : item)));
      }}
    >
      <div className={styles.zones}>
        {ZONES.map(zone => (
          <Zone
            key={zone.id}
            id={zone.id}
            label={zone.label}
            items={items.filter(item => item.zoneId === zone.id)}
            sourceZoneId={activeItem?.zoneId}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeItem && (
          <DragPreview className={styles.entity}>
            <div className={styles.row}>{activeItem.label}</div>
          </DragPreview>
        )}
      </DragOverlay>
    </DndContext>
  );
}
