# Tree

`@ds/tree` — Иерархический список с раскрывающимися узлами, выбором (single/multi), кастомными иконками, контекстными действиями и асинхронной подгрузкой потомков.

Дерево с раскрывающимися узлами для навигации по иерархии (файлы, регионы, теги, ACL). Поддерживает одиночный и множественный выбор, кастомные иконки и асинхронную подгрузку.

## Когда использовать

- Реальная иерархия с переменной глубиной (≥ 3 уровней): файловая система, dataset-навигация, организационные структуры.
- Нужно одновременно видеть несколько уровней, а не цепочку breadcrumb'ов.
- Большие наборы лениво подгружаются — `onDataLoad` доставляет потомков по раскрытию.

Когда **не** нужен:

- Плоский список 5–20 элементов:
  - используйте `List` или `Select`.
- Фиксированные 2–7 разделов одного уровня:
  - используйте `Tabs`.
- Пошаговый процесс:
  - используйте `Stepper`.

## Анатомия

### Selection mode (default — без выбора)

- `undefined` — read-only режим, узлы только раскрываются.
- `'single'` — один выбранный узел, рендерится `Radio` (если `showToggle`) либо подсвечивается строка.
- `'multi'` — множественный выбор через `Checkbox` на каждом узле; родитель показывает indeterminate-состояние от детей.

### Size (default `m`)

- `s` — плотные списки, sidebar-навигация (16px-иконки).
- `m` — стандартная плотность для админок.
- `l` — крупные посадочные/landing-страницы.

Текущая ось `size` соответствует **только compact-плотности** Figma-мастера (`compact/S=24px`, `compact/M=32px`, `compact/L=40px` row-h). Альтернативная density `comfort` (40/48/56px row-h из Figma-узла `26653:105451`) **не реализована** — в публичном API нет пропа `density`. Если потребитель просит «comfort»-плотность, на текущей версии её получить нельзя. Track: расширить `constants.ts` осью `DENSITY` и пересчитать токены `density-size-icon-*` на обе плотности.

### Show lines (default `false`)

Полосы вложенности `└─`, соединяющие родителя с его детьми. Включай для глубоких структур (3+ уровней) — без них теряется визуальная иерархия.

### Show icons (default `true`)

Folder/file-иконки слева от названия. Отключай, если узел сам по себе уже визуально отличим (например, цветной чип-роль).

## Установка

```bash
pnpm add @ds/tree
```

```ts
import { SELECTION_MODE, SIZE, Tree } from '@ds/tree'
```

## Примеры использования

### Базовый просмотр

Read-only дерево с раскрытием через onExpand

```tsx
import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'fruits',
    title: 'Fruits',
    nested: [
      { id: 'apple', title: 'Apple' },
      { id: 'banana', title: 'Banana' },
      {
        id: 'citrus',
        title: 'Citrus',
        nested: [
          { id: 'orange', title: 'Orange' },
          { id: 'lemon', title: 'Lemon' },
        ],
      },
    ],
  },
  {
    id: 'vegetables',
    title: 'Vegetables',
    nested: [
      { id: 'carrot', title: 'Carrot' },
      { id: 'potato', title: 'Potato' },
    ],
  },
];

export function Basic() {
  const [expanded, setExpanded] = useState<string[]>(['fruits']);

  return <Tree data={DATA} expandedNodes={expanded} onExpand={setExpanded} showLines />;
}
```

### Одиночный выбор

selectionMode=single + showToggle: один Radio на дерево

```tsx
import { SELECTION_MODE, Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'docs',
    title: 'Documents',
    nested: [
      { id: 'specs', title: 'Specs.pdf' },
      { id: 'budget', title: 'Budget.xlsx' },
      { id: 'roadmap', title: 'Roadmap.md' },
    ],
  },
  {
    id: 'media',
    title: 'Media',
    nested: [
      { id: 'logo', title: 'Logo.svg' },
      { id: 'hero', title: 'Hero.png' },
    ],
  },
];

export function SingleSelect() {
  const [selected, setSelected] = useState<string | undefined>('specs');
  const [expanded, setExpanded] = useState<string[]>(['docs', 'media']);

  return (
    <Tree
      data={DATA}
      selectionMode={SELECTION_MODE.Single}
      selected={selected}
      onSelect={setSelected}
      expandedNodes={expanded}
      onExpand={setExpanded}
      showToggle
      showLines
    />
  );
}
```

### Множественный выбор

selectionMode=multi: Checkbox на каждом узле, у родителя — indeterminate

```tsx
import { SELECTION_MODE, Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'compute',
    title: 'Compute',
    nested: [
      { id: 'vm', title: 'Virtual machines' },
      { id: 'k8s', title: 'Kubernetes' },
      { id: 'serverless', title: 'Serverless' },
    ],
  },
  {
    id: 'storage',
    title: 'Storage',
    nested: [
      { id: 's3', title: 'Object storage' },
      { id: 'block', title: 'Block storage' },
    ],
  },
];

export function MultiSelect() {
  const [selected, setSelected] = useState<string[]>(['vm', 's3']);
  const [expanded, setExpanded] = useState<string[]>(['compute', 'storage']);

  return (
    <Tree
      data={DATA}
      selectionMode={SELECTION_MODE.Multi}
      selected={selected}
      onSelect={setSelected}
      expandedNodes={expanded}
      onExpand={setExpanded}
      showLines
    />
  );
}
```

### Кастомные иконки

icon у листа, expandedIcon/collapsedIcon у папки

```tsx
import { FileSVG, FolderOpenSVG, FolderSVG } from '@ds/icons/interface/system';
import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'src',
    title: 'src',
    expandedIcon: <FolderOpenSVG />,
    collapsedIcon: <FolderSVG />,
    nested: [
      { id: 'app.tsx', title: 'App.tsx', icon: <FileSVG /> },
      { id: 'main.tsx', title: 'main.tsx', icon: <FileSVG /> },
      {
        id: 'components',
        title: 'components',
        expandedIcon: <FolderOpenSVG />,
        collapsedIcon: <FolderSVG />,
        nested: [
          { id: 'button.tsx', title: 'Button.tsx', icon: <FileSVG /> },
          { id: 'tree.tsx', title: 'Tree.tsx', icon: <FileSVG /> },
        ],
      },
    ],
  },
];

export function WithIcons() {
  const [expanded, setExpanded] = useState<string[]>(['src', 'components']);

  return <Tree data={DATA} expandedNodes={expanded} onExpand={setExpanded} showLines />;
}
```

### Контекстные действия

nodeActions возвращает массив пунктов меню — открывается по hover/focus

```tsx
import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const DATA: TreeNodeProps[] = [
  {
    id: 'project',
    title: 'Project Alpha',
    nested: [
      { id: 'overview.md', title: 'overview.md' },
      { id: 'changelog.md', title: 'changelog.md' },
    ],
  },
  { id: 'project-beta', title: 'Project Beta', nested: [{ id: 'todo.md', title: 'todo.md' }] },
];

export function WithActions() {
  const [expanded, setExpanded] = useState<string[]>(['project']);
  const [lastItemAction, setLastItemAction] = useState<string>('');

  const nodeActions = (node: TreeNodeProps) => [
    { id: 'rename', content: { option: `Rename ${node.id}` }, onClick: () => setLastItemAction(`rename ${node.id}`) },
    { id: 'delete', content: { option: 'Delete' }, onClick: () => setLastItemAction(`delete ${node.id}`) },
  ];

  return (
    <>
      <Tree data={DATA} expandedNodes={expanded} onExpand={setExpanded} nodeActions={nodeActions} showLines />
      <small>Last clicked item action: {lastItemAction || '—'}</small>
    </>
  );
}
```

### Асинхронная подгрузка

onDataLoad подтягивает детей при первом раскрытии

```tsx
import { Tree, TreeNodeProps } from '@ds/tree';
import { useState } from 'react';

const INITIAL: TreeNodeProps[] = [
  { id: 'region-eu', title: 'EU region', nested: [] },
  { id: 'region-ru', title: 'RU region', nested: [] },
];

export function AsyncLoad() {
  const [data, setData] = useState(INITIAL);
  const [expanded, setExpanded] = useState<string[]>([]);

  const onDataLoad = async (node: TreeNodeProps) => {
    await new Promise(r => setTimeout(r, 600));
    setData(prev =>
      prev.map((item): TreeNodeProps => {
        if (item.id !== node.id) return item;
        return {
          id: item.id,
          title: item.title as string,
          nested: [
            { id: `${item.id}-vm1`, title: 'vm-prod-01' },
            { id: `${item.id}-vm2`, title: 'vm-prod-02' },
            { id: `${item.id}-vm3`, title: 'vm-staging-01' },
          ],
        };
      }),
    );
  };

  return <Tree data={data} expandedNodes={expanded} onExpand={setExpanded} onDataLoad={onDataLoad} showLines />;
}
```

## Props

**TreeProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data` | `TreeNodeProps` | — | Данные для отрисовки |
| `data-test-id` | `string` | — |  |
| `expandedNodes` | `TreeNodeId` | — | Состояние для раскрытых элементов |
| `nodeActions` | `((node: TreeNodeProps) => Item[])` | — | Дополнительные действия для элемента-потомка |
| `onDataLoad` | `((node: TreeNodeProps) => Promise<unknown>)` | — | Колбэк для асинхронной загрузки данных при раскрытии дерева |
| `onExpand` | `((expandedKeys: string[], node: TreeNodeProps) => void)` | — | Колбэк при раскрытии/закрытии элементов |
| `onNodeClick` | `OnNodeClick` | — | Обработчик клика по элементу дерева |
| `onSelect` | `((selectedKeys: string[], node: TreeNodeProps) => void) \| ((selectedKey: string, node: TreeNodeProps) => void)` | — | Колбэк при изменении выбраных элементов: <br/> <br> - При <strong>selectionMode</strong>=`Multi` - возвращает массив строк <br/> <br> - При <strong>selectionMode</strong>=`Single` - возвращает строку |
| `parentActions` | `((node: TreeNodeProps) => Item[])` | — | Дополнительные действия для элемента-родителя |
| `selected` | `string \| string[]` | — | Состояние для выбраных элементов: <br/> <br> - При <strong>selectionMode</strong>=`Multi` - принимает массив строк <br/> <br> - При <strong>selectionMode</strong>=`Single` - принимает строку |
| `selectionMode` | `"multi"` \| `"single"` | — | Режим выбора элементов: <br/> <br> - `Single` - одиночный выбор <br/> <br> - `Multi` - множественный выбор <br/> <br> - `undefined` - без выбора |
| `showIcons` | `boolean` | `true` | Флаг отвечающий за отображение иконок у элементов дерева |
| `showLines` | `boolean` | `true` | Флаг отвечающий за отображение линий вложенности |
| `showToggle` | `boolean` | — |  |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер строк дерева (Figma variant `size`). |
| `titleMaxLines` | `number` | `1` | Максимальное число строк заголовка узла до обрезки многоточием. <br/> Значение больше 1 разрешает перенос; строка растёт по высоте. |

#### Related types

- `OnNodeClick` = `(node: TreeNodeProps, e: MouseEvent) => void`

- `Size` = `"l"` \| `"m"` \| `"s"`

- `TreeNodeId` = `string`

- `TreeNodeProps` = `ChildTreeNode | ParentTreeNode`
