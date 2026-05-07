# Tag

`@ds/tag` — Пакет компактных меток — компонент Tag (опционально удаляемый или ссылочный) и контейнер TagRow для групп меток с обрезанием по строкам.

Пакет `@ds/tag` содержит компоненты для отображения коротких меток, категорий и статусов:

- ****Tag**** — одиночная метка. Рендерится как `<span>` по умолчанию, как `<a>` при передаче `href`, и опционально отображает кнопку удаления через `onDelete`.
- ****TagRow**** — контейнер группы меток. Поддерживает ограничение по количеству видимых строк с кнопкой «+N ещё».

## Установка

```bash
pnpm add @ds/tag
```

```ts
import { Tag, TagRow } from '@ds/tag'
```

## Tag

Одиночная метка — девять семантических appearance, три размера, опциональная кнопка удаления и ссылочный режим через href.

Компактная метка. По умолчанию `<span>`; становится `<a>` при `href`; показывает кнопку удаления при `onDelete`.

### Когда использовать
- Для категорий и тегов записи (Frontend, Backend, Design).
- Для статусов (Активный, Ошибка, Ожидание).
- Для выбранных фильтров в search/filter UI — со свойством `onDelete`.

Когда **не** нужен: для interactive chip с чекбокс-семантикой — используйте отдельный компонент ChipGroup, если он есть в вашем наборе.

### Анатомия

#### Size
`xs` — для плотных списков и инлайн-меток, `s` — дефолт, `m` — для заголовков и акцентных блоков.

#### Appearance
Семантический/декоративный цвет: `neutral` — нейтральный, `primary` — акцент, `red` — ошибка/критично, `orange`/`yellow` — предупреждение, `green` — успех, `blue` — инфо, `violet`/`pink` — декоративные.

### Примеры использования
#### 1. Базовый тег

Простая метка с appearance

```tsx
import { Tag } from '@ds/tag';

export function Basic() {
  return <Tag label='Frontend' appearance='blue' />;
}
```

#### 2. Удаляемый тег

onDelete показывает кнопку ✕

```tsx
import { Tag } from '@ds/tag';

export function Removable() {
  return <Tag label='React' appearance='blue' onDelete={() => alert('remove')} />;
}
```

### Props
**TagProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"` | — |  |
| `as` | `"a"` | — | Элемент или компонент для рендера: 'a' \| ComponentType (например Link из react-router-dom) |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `label` | `string` | — |  |
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — | Обработчик удаления тега. Если задан — отображается крестик-remove |
| `size` | `"m"` \| `"s"` \| `"xs"` | — |  |
| `tabIndex` | `number` | — |  |

##### Related types

- `Appearance` = `"blue"` \| `"green"` \| `"neutral"` \| `"orange"` \| `"pink"` \| `"primary"` \| `"red"` \| `"violet"` \| `"yellow"`

- `Size` = `"m"` \| `"s"` \| `"xs"`

## TagRow

Контейнер группы меток с ограничением по строкам и кнопкой «+N ещё» для скрытых тегов.

Обёртка для нескольких `Tag` подряд. Принимает массив `items` и опционально ограничивает видимые метки по количеству строк с кнопкой «+N ещё» для раскрытия.

### Когда использовать

- Для группы тегов записи в карточке списка (обычно 3–8 штук).
- Для выбранных фильтров, которые занимают больше одной строки.
- Везде, где количество меток может превышать доступную ширину.

### Анатомия

#### Size
Применяется ко всем тегам в ряду: `xs`, `s`, `m`. Наследуется вложенными `Tag`.

#### Appearance
Цветовая тема всех тегов в ряду: `neutral`, `primary`, `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `pink`.

### Примеры использования

#### Ограничение по строкам

rowLimit=1 прячет метки в кнопку +N ещё

```tsx
import { TagRow } from '@ds/tag';

export function RowTruncated() {
  return (
    <TagRow
      rowLimit={1}
      items={[
        { id: '1', label: 'Frontend', appearance: 'blue' },
        { id: '2', label: 'Backend', appearance: 'green' },
        { id: '3', label: 'Design', appearance: 'violet' },
        { id: '4', label: 'DevOps', appearance: 'orange' },
        { id: '5', label: 'Data', appearance: 'yellow' },
      ]}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `items` | `TagRowItem[]` | — |  |
| `moreButtonLabel` | `string` | — |  |
| `onItemRemove` | `((item: string) => void)` | — |  |
| `rowLimit` | `number` | — |  |
| `size` | `"m"` \| `"s"` \| `"xs"` | — |  |
