# Accordion

`@ds/accordion` — Аккордеон дизайн-системы — контейнер Accordion и три уровня раскрываемых блоков CollapseBlock с общими токенами view, appearance и chevron.

Пакет `@ds/accordion` даёт контейнер `Accordion` и три уровня раскрываемых блоков `CollapseBlockPrimary` / `CollapseBlockSecondary` / `CollapseBlockTertiary`. Контейнер отвечает за режим выбора (`single` / `multiple`) и controlled/uncontrolled состояние, блоки — за внешний вид и иерархию на странице.

- ****Accordion**** — контейнер раскрываемых блоков с режимами `single` / `multiple` и controlled/uncontrolled API.
- ****CollapseBlock**** — раскрываемые блоки трёх уровней: `Primary`, `Secondary`, `Tertiary` — для иерархии разделов на странице.

## Установка

```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
```

## Когда использовать

| Задача | Как решить |
|--------|------------|
| Длинная форма / настройки с логическими секциями | `Accordion` + `CollapseBlockPrimary` на каждый раздел |
| Двух- / трёхуровневая иерархия (раздел → подраздел → деталь) | Вложенные `Accordion` с `Primary` → `Secondary` → `Tertiary` |
| Разрешить открыть один блок за раз (FAQ) | `selectionMode='single'` |
| Разрешить одновременно несколько открытых блоков | `selectionMode='multiple'` |

Когда **не** нужен аккордеон: короткие списки (≤ 3 пунктов), критичный контент, который пользователь не должен пропустить, и навигация — для неё используйте `Tabs`.

## Figma

Оба компонента следуют одному мастер-файлу Figma. Ссылки на конкретные узлы — на страницах компонентов.

## Accordion

Контейнер-группа раскрываемых блоков. Управляет режимом выбора (single / multiple) и controlled/uncontrolled состоянием.

Контейнер, который группирует `CollapseBlock*` в одну логическую группу и управляет их раскрытием. Под капотом — `ToggleGroup` из `@ds/toggles`, поэтому семантика раскрытия идентична группе переключателей.

## Когда использовать
- Для группы раскрываемых блоков, где открытие/закрытие должно быть согласовано (один из, несколько из).
- Для двух- и трёхуровневой иерархии — вкладывайте `Accordion` внутрь блока, меняя уровень `CollapseBlock*`.

Когда **не** нужен: один изолированный раскрывающийся блок без группы — в этом случае достаточно самого `CollapseBlock*` без обёртки.

## Figma
<FigmaEmbed node={FIGMA_ACCORDION} height={480} title='Accordion в Figma (Snack UI Kit)' />

## Анатомия

### Selection mode
Режим раскрытия дочерних блоков: `single` — одновременно открыт максимум один блок (как radio-группа), `multiple` — можно открыть любое количество независимо.

## Установка
```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
```

## Примеры использования
<Example
  title='1. Uncontrolled с начальным состоянием'
  description="expandedDefault задаёт первоначально открытый блок; дальше компонент управляет раскрытием сам."
  code={BasicAccordionSrc}
>
  <BasicAccordion client:visible />
</Example>

<Example
  title='2. Controlled + multiple'
  description='expanded + onExpandedChange в режиме multiple — значение массив id.'
  code={MultipleModeSrc}
>
  <MultipleMode client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expandedDefault` | `string | string[]` | — | Начальное состояние |
| `expanded` | `string | string[]` | — | Controlled состояние |
| `onExpandedChange` | `((value: string) => void) | ((value: string[]) => void) | undefined` | — | Controlled обработчик измения состояния |
| `selectionMode` | `"single"` \| `"multiple"` | — | Режим работы аккордиона |

## Storybook
<StorybookEmbed storyId='components-accordion-accordion--playground' height={480} />

## CollapseBlock

Семейство раскрываемых блоков аккордеона — Primary (l), Secondary (m), Tertiary (s). Общие пропсы title / subTitle / afterTitle / view / appearance / chevron.

Три семантических уровня раскрываемого блока: `CollapseBlockPrimary`, `CollapseBlockSecondary`, `CollapseBlockTertiary`. Уровень задаёт размер типографики заголовка и плотность отступов; все три компонента используют одно и то же API — меняется только роль в иерархии.

## Когда использовать
- **`Primary`** (title size `l`) — верхнеуровневые разделы страницы или секции формы.
- **`Secondary`** (title size `m`) — подразделы внутри `Primary`. Типовой `view='outline'`.
- **`Tertiary`** (title size `s`) — плоские детали без дальнейшей вложенности. Без `view` / `appearance` — только заголовок и контент.

## Figma
<FigmaEmbed node={FIGMA_ACCORDION} height={480} title='CollapseBlock в Figma (Snack UI Kit)' />

## Анатомия

### View
Визуальная подача блока: `simple` — плоский фон без рамки, `outline` — с границей, `elevated` — с тенью для поверхностей поверх страницы.

### Appearance
Акцентный цвет заголовка/маркера: `neutral` (по умолчанию) и `primary`, плюс семантические `red`, `yellow`, `green`, `blue` для выделения статуса секции.

### Chevron
Положение шеврона-раскрытия: `before` — слева от заголовка, `after` — справа.

## Установка
```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'

// Каждый уровень доступен статическим полем контейнера:
Accordion.CollapseBlockPrimary
Accordion.CollapseBlockSecondary
Accordion.CollapseBlockTertiary
```

## Примеры использования

<Example
  title='Цветовые схемы'
  description='Neutral — дефолт. Primary — акцент. Цветные варианты — для статусных разделов.'
  code={AppearancesSrc}
>
  <Appearances client:visible />
</Example>

<Example
  title='Левый шеврон + afterTitle справа'
  description='Читается как «строка итогов»: название слева, значение справа, шеврон возле названия.'
  code={ChevronBeforeSrc}
>
  <ChevronBefore client:visible />
</Example>

<Example
  title='afterTitle — счётчик'
  description='Counter в правом слоте заголовка. Не кликабельный — клик по строке раскрывает блок.'
  code={AfterTitleSrc}
>
  <AfterTitle client:visible />
</Example>

<Example
  title='Primary → Secondary → Tertiary'
  description='Каждый уровень — собственный Accordion. Вложенный не наследует состояние родителя.'
  code={NestedLevelsSrc}
>
  <NestedLevels client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `view` | `"simple"` \| `"outline"` \| `"elevated"` | `simple` | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |
| `chevron` | `"before"` \| `"after"` | `after` | Расположение шеврона относительно текста (`before` | `after`) |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"yellow"` \| `"green"` \| `"blue"` | `neutral` | Цветовая схема акрила |
| `component` | `"accordionPrimary"` \| `"accordionSecondary"` \| `"accordionTertiary"` | — | Уровень аккордеона: размер типографики и отступы |
| `keepMounted` | `boolean` | `false` | Оставлять ли контент в DOM при сворачивании |

## Storybook
<StorybookEmbed storyId='components-accordion-collapseblockprimary--playground' height={480} />

## CollapseBlockPrimary

```tsx
import { CollapseBlockPrimary } from '@ds/accordion'

export function Example() {
  return <CollapseBlockPrimary>Click me</CollapseBlockPrimary>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `view` | `"simple"` \| `"outline"` \| `"elevated"` | — | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |
| `chevron` | `"before"` \| `"after"` | — | Расположение шеврона относительно текста (`before` | `after`) |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"yellow"` \| `"green"` \| `"blue"` | — | Цветовая схема акрила |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |

## CollapseBlockSecondary

```tsx
import { CollapseBlockSecondary } from '@ds/accordion'

export function Example() {
  return <CollapseBlockSecondary>Click me</CollapseBlockSecondary>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `view` | `"simple"` \| `"outline"` \| `"elevated"` | — | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |
| `chevron` | `"before"` \| `"after"` | — | Расположение шеврона относительно текста (`before` | `after`) |
| `appearance` | `"neutral"` \| `"primary"` \| `"red"` \| `"yellow"` \| `"green"` \| `"blue"` | — | Цветовая схема акрила |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |

## CollapseBlockTertiary

```tsx
import { CollapseBlockTertiary } from '@ds/accordion'

export function Example() {
  return <CollapseBlockTertiary>Click me</CollapseBlockTertiary>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `chevron` | `"before"` \| `"after"` | — | Расположение шеврона относительно текста (`before` | `after`) |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |
