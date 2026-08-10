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
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../../stories.module.scss';

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

function DraggableRow({ id, label }: Pick<Item, 'id' | 'label'>) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({ id });

  return (
    <DragGhost
      innerRef={setNodeRef}
      dragging={isDragging}
      className={styles.grabbable}
      data-test-id={id}
      {...attributes}
      {...listeners}
    >
      <div className={styles.row}>{label}</div>
    </DragGhost>
  );
}

type ZoneProps = {
  id: string;
  label: string;
  items: Item[];
  /** Зона, из которой взяли сущность; `undefined`, пока перенос не идёт. */
  sourceZoneId?: string;
};

function Zone({ id, label, items, sourceZoneId }: ZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  // Рамка — признак переноса между зонами: своя зона её не получает, там перестановку
  // показывают линия вставки либо расступившиеся соседи.
  const active = isOver && sourceZoneId !== undefined && sourceZoneId !== id;

  return (
    <DropTarget innerRef={setNodeRef} active={active} className={cn(styles.canvas, styles.zone)} data-test-id={id}>
      <div className={styles.zoneLabel}>{label}</div>
      {items.map(item => (
        <DraggableRow key={item.id} id={item.id} label={item.label} />
      ))}
    </DropTarget>
  );
}

function CrossZoneDemo() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [activeId, setActiveId] = useState<string>();
  // Порог в 4px: без него клик по строке уже считался бы началом переноса.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const activeItem = items.find(item => item.id === activeId);

  return (
    <DndContext
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
          <DragPreview className={cn(styles.entity, styles.radiusRounded)}>
            <div className={styles.row}>{activeItem.label}</div>
          </DragPreview>
        )}
      </DragOverlay>
    </DndContext>
  );
}

const meta: Meta<typeof DropTarget> = {
  title: 'Components/DragAndDrop/DropTarget/Examples/CrossZone',
  component: DropTarget,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof DropTarget>;

export const CrossZone: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>CrossZone</DemoTitle>
        <DemoHint>
          Живой перенос между зонами: потяните строку в соседнюю зону. Рамку (`active`) получает только чужая зона — та,
          в которую переносят; над своей зоной подсветки нет.
        </DemoHint>
        <DemoActions align='center'>
          <CrossZoneDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(ZONES[0].id)).toBeVisible();
  },
};
