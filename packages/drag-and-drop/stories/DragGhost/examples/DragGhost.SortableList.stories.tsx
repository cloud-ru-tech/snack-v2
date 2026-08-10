import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DRAG_MODE, DragGhost, DragMode, DragPreview, DropIndicator, PLACEMENT } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../../stories.module.scss';

const LIST_TEST_ID = 'sortable-list';

const INITIAL_ROWS = [
  { id: 'row-1', label: 'ListItem 1' },
  { id: 'row-2', label: 'ListItem 2' },
  { id: 'row-3', label: 'ListItem 3' },
  { id: 'row-4', label: 'ListItem 4' },
];

type SortableRowProps = {
  id: string;
  label: string;
  mode: DragMode;
  lastIndex: number;
};

function SortableRow({ id, label, mode, lastIndex }: SortableRowProps) {
  const { activeIndex, attributes, index, isDragging, listeners, overIndex, setNodeRef, transform, transition } =
    useSortable({ id });

  const dynamic = mode === DRAG_MODE.Dynamic;

  // Статический перенос: соседи стоят на месте, поэтому трансляцию от `@dnd-kit` строке
  // не применяем, а точку вставки показываем линией на строке-цели. Сторона линии — по тому,
  // откуда пришла перетаскиваемая строка: сверху вставка идёт после цели, снизу — перед ней.
  const showIndicator = !dynamic && activeIndex !== -1 && index === overIndex && index !== activeIndex;
  const indicatorPlacement = overIndex > activeIndex ? PLACEMENT.After : PLACEMENT.Before;

  return (
    <DragGhost
      innerRef={setNodeRef}
      dragging={isDragging}
      mode={mode}
      className={styles.grabbable}
      // Трансляция соседей приходит из `@dnd-kit` рантаймом — классом её не выразить.
      style={dynamic ? { transform: CSS.Translate.toString(transform), transition } : undefined}
      data-test-id={id}
      {...attributes}
      {...listeners}
    >
      <div className={styles.row}>{label}</div>
      {showIndicator && (
        <DropIndicator
          placement={indicatorPlacement}
          atEdge={
            (index === 0 && indicatorPlacement === PLACEMENT.Before) ||
            (index === lastIndex && indicatorPlacement === PLACEMENT.After)
          }
        />
      )}
    </DragGhost>
  );
}

function SortableListDemo({ mode = DRAG_MODE.Static }: { mode?: DragMode }) {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [activeId, setActiveId] = useState<string>();
  // Порог в 4px: без него клик по строке уже считался бы началом переноса.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const activeRow = rows.find(row => row.id === activeId);

  return (
    <DndContext
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
        <div className={cn(styles.canvas, styles.list)} data-test-id={LIST_TEST_ID}>
          {rows.map(row => (
            <SortableRow key={row.id} id={row.id} label={row.label} mode={mode} lastIndex={rows.length - 1} />
          ))}
        </div>
      </SortableContext>
      {/* Копия за курсором: `DragOverlay` рендерит её `position: fixed`, поверхность даёт `DragPreview`. */}
      <DragOverlay dropAnimation={null}>
        {activeRow && (
          <DragPreview className={cn(styles.entity, styles.radiusRounded)}>
            <div className={styles.row}>{activeRow.label}</div>
          </DragPreview>
        )}
      </DragOverlay>
    </DndContext>
  );
}

const meta: Meta<typeof DragGhost> = {
  title: 'Components/DragAndDrop/DragGhost/Examples/SortableList',
  component: DragGhost,
  parameters: { layout: 'fullscreen' },
  args: {
    mode: DRAG_MODE.Static,
  },
  argTypes: {
    // Состояние переноса ведёт `@dnd-kit`, слоты и разметку — сама story.
    dragging: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    innerRef: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DragGhost>;

export const SortableList: Story = {
  tags: ['dev', 'test'],
  render: ({ mode }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>SortableList</DemoTitle>
        <DemoHint>
          Живой перенос: потяните строку мышью. Механику даёт `@dnd-kit`, примитивы пакета отвечают только за вид —
          `DragGhost` на исходной строке, `DragPreview` за курсором, `DropIndicator` на строке-цели. Переключите `mode`,
          чтобы сравнить статический перенос с динамическим (в нём линии нет — точку вставки показывает пустой слот).
        </DemoHint>
        <DemoActions align='center'>
          <SortableListDemo mode={mode} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(LIST_TEST_ID)).toBeVisible();
  },
};
