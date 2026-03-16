# Tabs

Компонент вкладок дизайн-системы. Строится по макету Figma (токены из `@sbercloud/figma-variables`). Поддерживает горизонтальное и вертикальное расположение, тип Primary/Secondery, маркер выбранной вкладки (before/after), счётчики на вкладках и кнопки прокрутки при переполнении.

## Installation

```bash
npm install @design-system/tabs
# or
yarn add @design-system/tabs
# or
pnpm add @design-system/tabs
```

## Exports



## Live examples

### Basic usage (horizontal)

```tsx
import { TabsBasicExample } from '@design-system/tabs';

Горизонтальные табы с контентом под панелью:
<TabsBasicExample client:load />
```

### Vertical tabs

```tsx
import { TabsVerticalExample } from '@design-system/tabs';

Вертикальные табы: панель слева, контент справа. При переполнении по высоте появляются кнопки прокрутки.
<TabsVerticalExample client:load />
```

### Tabs with counter

```tsx
import { TabsWithCounterExample } from '@design-system/tabs';

Вкладки со счётчиками (например, количество уведомлений):
<TabsWithCounterExample client:load />
```


## Usage

### Basic example (horizontal)

```tsx
import { Tabs } from '@design-system/tabs';

export function Example() {
  return (
    <Tabs defaultValue="tab1">
      <Tabs.TabBar>
        <Tabs.Tab label="Вкладка 1" value="tab1" />
        <Tabs.Tab label="Вкладка 2" value="tab2" />
        <Tabs.Tab label="Вкладка 3" value="tab3" />
      </Tabs.TabBar>
      <Tabs.TabContent value="tab1">Контент 1</Tabs.TabContent>
      <Tabs.TabContent value="tab2">Контент 2</Tabs.TabContent>
      <Tabs.TabContent value="tab3">Контент 3</Tabs.TabContent>
    </Tabs>
  );
}
```

### Vertical tabs

```tsx
import { Tabs, ORIENTATION } from '@design-system/tabs';

export function Example() {
  return (
    <Tabs defaultValue="tab1">
      <Tabs.TabBar orientation={ORIENTATION.Vertical}>
        <Tabs.Tab label="Вкладка 1" value="tab1" />
        <Tabs.Tab label="Вкладка 2" value="tab2" />
      </Tabs.TabBar>
      <Tabs.TabContent value="tab1">Контент 1</Tabs.TabContent>
      <Tabs.TabContent value="tab2">Контент 2</Tabs.TabContent>
    </Tabs>
  );
}
```

### Size M and marker position

```tsx
import { Tabs, SIZE, MARKER_POSITION } from '@design-system/tabs';

export function Example() {
  return (
    <Tabs defaultValue="tab1">
      <Tabs.TabBar size={SIZE.M} markerPosition={MARKER_POSITION.Before}>
        <Tabs.Tab label="Вкладка 1" value="tab1" />
        <Tabs.Tab label="Вкладка 2" value="tab2" />
      </Tabs.TabBar>
      <Tabs.TabContent value="tab1">Контент 1</Tabs.TabContent>
      <Tabs.TabContent value="tab2">Контент 2</Tabs.TabContent>
    </Tabs>
  );
}
```

## Props



## Best Practices

1. **Структура** — всегда используйте состав: `Tabs` → `Tabs.TabBar` с `Tabs.Tab` внутри и один или несколько `Tabs.TabContent` с тем же `value`, что и у вкладок.
2. **Ориентация** — горизонтальные табы для основного переключения разделов; вертикальные — для боковой навигации или когда заголовков много.
3. **Счётчики** — используйте `counter` для числа элементов (уведомления, заявки). Не перегружайте панель большим количеством вкладок; при переполнении появятся кнопки скролла.
4. **Контроль** — для синхронизации с URL или состоянием страницы используйте контролируемый режим (`value` + `onChange`).

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
