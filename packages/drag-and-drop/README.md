# DragAndDrop

`@ds/drag-and-drop` — Визуальные примитивы перетаскивания — поверхность копии, линия вставки и зона приёма.

Три презентационных примитива, из которых собирается визуальная часть для состояния перетаскивания. Логику переноса
(сенсоры, коллизии, порядок) пакет на себя не берёт — её реализует DnD-библиотека потребителя
(`@dnd-kit`, HTML5 DnD, собственные обработчики). Примитивы отвечают только за то, как перенос
выглядит, и делают это одинаково во всех компонентах дизайн-системы.

- `DragGhost` — исходная сущность на время переноса: приглушённая либо уступившая своё место.
- `DragPreview` — поверхность копии, которая едет за курсором.
- `DropIndicator` — линия будущей позиции.
- `DropTarget` — рамка области, в которую переносят сущность из другой зоны.

## Когда использовать

- Перетаскивание собирается в своём компоненте, и нужен вид, совпадающий с остальной дизайн-системой.
- Элемент переносится из одной зоны в другую, и нужно показать, какая зона его примет (`DropTarget`).
- Порядок меняется вставкой, а не обменом местами — точку вставки показывает `DropIndicator` (статический
  перенос) либо пустой слот (динамический).

Когда **не** нужен:

- Готовое переупорядочивание уже есть в компоненте:
  - у `@ds/list` переупорядочивание строк включается пропом `onItemsReorder` — примитивы там уже встроены.
- Нужна сама механика переноса (сенсоры, коллизии, автоскролл):
  - нужна DnD-библиотека, эти примитивы — только визуальный слой.

## Анатомия

### Режимы переноса (default `static`)

Перенос показывается одним из двух способов. Режим выбирается на весь компонент-потребитель, а не
на отдельную сущность: смешивать оба в одном списке нельзя — пользователь читает их как разные
интерфейсы.

- `static` — соседи стоят на месте, исходная сущность приглушается (`DragGhost` с `dragging`),
  будущую позицию отмечает линия (`DropIndicator`). Раскладка на время переноса не меняется, поэтому
  режим уместен там, где сдвиг соседей дорог или сбивает: длинные списки, таблицы, сетки со скроллом.
- `dynamic` — соседи расступаются сразу, а на месте попадания остаётся пустой слот (`DragGhost`
  с `dragging` и `mode='dynamic'`). Линию в этом режиме не рисуют: точку вставки уже показывает
  пустота, а вместе они дублируют друг друга.

Режим не отменяет остальные примитивы: копия за курсором (`DragPreview`) и рамка зоны-приёмника
(`DropTarget`) одинаковы в обоих.

### DragGhost (default `dragging: false`, `mode: static`)

Исходная сущность на время переноса. `dragging` включает вид переноса, `mode` выбирает какой:
`static` — приглушение на своём месте, `dynamic` — сущность становится невидимой, сохраняя своё
место в раскладке, поэтому на её месте получается пустой слот.

Заменяет собой обёртку сущности, а не добавляет уровень вложенности: принимает `innerRef`,
`className` и остальные атрибуты `<div>`. Создаёт контекст позиционирования, поэтому `DropIndicator`
с `placement` можно рендерить прямо внутри.

### DragPreview

Обёртка перетаскиваемой сущности: непрозрачная поверхность с тенью, поэтому копия читается над
любым фоном страницы — в том числе в портале, где своей подложки у сущности нет.

Форму задаёт содержимое — обёртка наследует его скругление. Собственных размеров у неё нет,
ширину и высоту тоже задаёт содержимое.

### DropIndicator (default `horizontal`)

Пунктирная линия будущей позиции — примитив статического переноса. В динамическом её место
занимает пустой слот, и линия не рисуется.

Ориентация:

- `horizontal` — вставка между строками, линия занимает всю ширину родителя.
- `vertical` — вставка между колонками, линия занимает всю высоту родителя.

Вдоль своей оси линия размеров не имеет — их задаёт родитель.

`placement` ставит линию по нужному краю элемента-цели: `before` — перед ним, `after` — после.
С ним линия позиционируется абсолютно (появление не сдвигает раскладку) и центрируется на границе
с соседом. Без `placement` линия остаётся в потоке, и её размещает потребитель.

`atEdge` нужен для первой и последней позиции: у края зоны приёма линия иначе ложится на её обводку
или обрезается скроллом, поэтому смещается внутрь элемента-цели.

### DropTarget (default `active: false`)

Область, принимающая сущность. `active` включает рамку и заливку зоны.

Рамка — признак **переноса между зонами**: она появляется, когда сущность взяли в одной зоне,
а отпускают в другой (перенос из списка в список, из колонки в колонку). Перестановка внутри своей
зоны рамкой не сопровождается: там всё уже показывает линия вставки либо расступившиеся соседи,
а лишняя подсветка только шумит.

Обводка рисуется **внутри** зоны, поэтому рамка не двигает соседей и не меняет её размеры.

## Установка

```bash
pnpm add @ds/drag-and-drop
```

```ts
import {
  DRAG_MODE,
  DragGhost,
  DragPreview,
  DropIndicator,
  DropTarget,
  ORIENTATION,
  PLACEMENT,
} from '@ds/drag-and-drop'
```

## Примеры использования

### Поверхность копии

DragPreview перенимает скругление сущности внутри

```tsx
import { DragPreview } from '@ds/drag-and-drop';

import styles from './demo.module.scss';

export function PreviewSurface() {
  return (
    <DragPreview className={styles.entity}>
      <div className={styles.row}>ListItem 2</div>
    </DragPreview>
  );
}
```

Живой перенос в примерах ниже ведёт `@dnd-kit` — примитивы пакета отвечают только за вид. С другой
DnD-библиотекой меняются источники `isDragging` / `over`, разметка остаётся той же.

### Статический перенос

Потяните строку: соседи стоят на месте, исходная строка приглушена, будущую позицию отмечает линия

```tsx
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
```

### Динамический перенос

Потяните строку: соседи расступаются сразу, а её слот пустеет и сам показывает точку вставки — линия не нужна

```tsx
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DRAG_MODE, DragGhost, DragPreview } from '@ds/drag-and-drop';
import { useState } from 'react';

import styles from './demo.module.scss';

const INITIAL_ROWS = [
  { id: 'row-1', label: 'ListItem 1' },
  { id: 'row-2', label: 'ListItem 2' },
  { id: 'row-3', label: 'ListItem 3' },
  { id: 'row-4', label: 'ListItem 4' },
];

function Row({ id, label }: { id: string; label: string }) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <DragGhost
      innerRef={setNodeRef}
      dragging={isDragging}
      mode={DRAG_MODE.Dynamic}
      className={styles.grabbable}
      // Динамический перенос: соседи расступаются трансляцией от `@dnd-kit`, а слот
      // перетаскиваемой строки пустеет и сам показывает точку вставки — линия не нужна.
      style={{ transform: CSS.Translate.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <div className={styles.row}>{label}</div>
    </DragGhost>
  );
}

export function DynamicGap() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [activeId, setActiveId] = useState<string>();
  // Порог в 4px: без него клик по строке уже считался бы началом переноса.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const activeRow = rows.find(row => row.id === activeId);

  return (
    <DndContext
      // Фиксированный id: без него `@dnd-kit` нумерует свои aria-узлы счётчиком, и на
      // SSR-странице разметка расходится с клиентской.
      id='dynamic-gap'
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
            <Row key={row.id} id={row.id} label={row.label} />
          ))}
        </div>
      </SortableContext>
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
```

### Перенос между зонами

Перетащите строку в соседнюю зону: рамку получает только чужая зона — та, в которую переносят

```tsx
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
```

## Props

### DragGhost

**DragGhostProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Сущность, остающаяся на своей позиции на время переноса. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `dragging` | `boolean` | `false` | Сущность переносится прямо сейчас. По умолчанию: false |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой элемент — к нему привязывается sortable-узел DnD-библиотеки. |
| `mode` | `"dynamic"` \| `"static"` | `static` | Режим переноса: `static` — соседи стоят на месте, сущность приглушается, точку вставки <br/> показывает `DropIndicator`; `dynamic` — соседи расступаются сразу, а слот сущности пустеет <br/> и сам показывает точку вставки (линия в этом режиме не нужна). По умолчанию: static |

#### Related types

- `DragMode` = `"dynamic"` \| `"static"`

### DragPreview

**DragPreviewProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Перетаскиваемая сущность: строка списка, карточка, чип — то, что едет за курсором. |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой элемент |

### DropIndicator

**DropIndicatorProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `atEdge` | `boolean` | `false` | Линия стоит у края зоны приёма (первая или последняя позиция). Смещает её внутрь зоны, иначе <br/> линия ложится на обводку зоны либо обрезается скроллом. Работает вместе с `placement`. <br/> По умолчанию: false |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой элемент |
| `orientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация линии: horizontal — вставка между строками, vertical — между колонками. По умолчанию: horizontal |
| `placement` | `"after"` \| `"before"` | — | Край элемента-цели, у которого стоит линия. Задан — линия позиционируется абсолютно по этому <br/> краю и центрируется на границе с соседом; не задан — линия остаётся в потоке, и её размещает <br/> потребитель. Требует `position` на элементе-цели. |

#### Related types

- `Orientation` = `"horizontal"` \| `"vertical"`

- `Placement` = `"after"` \| `"before"`

### DropTarget

**DropTargetProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | Зона принимает перетаскиваемую сущность прямо сейчас — включает рамку и заливку. По умолчанию: false |
| `children` | `ReactNode` | — | Содержимое зоны |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой элемент — к нему привязывается droppable-узел DnD-библиотеки. |

Все четыре компонента принимают атрибуты `<div>`, `data-test-id` и ARIA — через них передаются обработчики
и `innerRef` для droppable-узла DnD-библиотеки.

## Смотри также

- **List** — переупорядочивание строк на этих примитивах.
