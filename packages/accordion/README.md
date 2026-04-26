# Accordion

`@ds/accordion` — Аккордеон дизайн-системы — контейнер Accordion и три уровня раскрываемых блоков CollapseBlock с общими токенами view, appearance и chevron.

Пакет `@ds/accordion` даёт контейнер `Accordion` и три уровня раскрываемых блоков `CollapseBlockPrimary` / `CollapseBlockSecondary` / `CollapseBlockTertiary`. Контейнер отвечает за режим выбора (`single` / `multiple`) и controlled/uncontrolled состояние, блоки — за внешний вид и иерархию на странице.

## Состав пакета

- ****Accordion**** — контейнер-группа. Управляет раскрытием (controlled `expanded` или uncontrolled `expandedDefault`) и режимом `single` / `multiple`. Не имеет собственного визуала.
- ****CollapseBlock**** — семейство раскрываемых блоков: `Primary` (l), `Secondary` (m), `Tertiary` (s). Общие пропсы `title`, `subTitle`, `afterTitle`, `view`, `appearance`, `chevron`.

## Установка

```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
import '@ds/accordion/style.css'
```

## Когда использовать

| Задача | Как решить |
|--------|------------|
| Длинная форма / настройки с логическими секциями | `Accordion` + `CollapseBlockPrimary` на каждый раздел |
| Двух- / трёхуровневая иерархия (раздел → подраздел → деталь) | Вложенные `Accordion` с `Primary` → `Secondary` → `Tertiary` |
| Разрешить открыть один блок за раз (FAQ) | `selectionMode='single'` |
| Разрешить одновременно несколько открытых блоков | `selectionMode='multiple'` |

Когда **не** нужен аккордеон: короткие списки (≤ 3 пунктов), критичный контент, который пользователь не должен пропустить, и навигация — для неё используйте `Tabs`.

## Общие принципы

- **Один уровень = одна роль.** `Primary` — верхнеуровневые разделы, `Secondary` — подразделы внутри раздела, `Tertiary` — плоские детали без вложенности. Не смешивайте уровни в пределах одной группы.
- **Контролируемость — осознанный выбор.** Для FAQ и длинных форм достаточно `expandedDefault`. Controlled режим (`expanded` + `onExpandedChange`) нужен, только если состояние синхронизируется с URL / query / внешним стором.
- **Шеврон справа — дефолт.** Левый шеврон (`chevron='before'`) уместен в плотных сетках, где справа стоит `afterTitle`.
- **Анимация фиксирована.** Длительность раскрытия — `ANIMATION_DURATION = 300ms`. Не переопределяйте её CSS-переменной снаружи без согласования.

## Figma

Оба компонента следуют одному мастер-файлу Figma. Ссылки на конкретные узлы — на страницах компонентов.

## Accordion

Контейнер-группа раскрываемых блоков. Управляет режимом выбора (single / multiple) и controlled/uncontrolled состоянием.

Контейнер, который группирует `CollapseBlock*` в одну логическую группу и управляет их раскрытием. Под капотом — `ToggleGroup` из `@ds/toggles`, поэтому семантика раскрытия идентична группе переключателей.

## Демо

## Когда использовать

- Для группы раскрываемых блоков, где открытие/закрытие должно быть согласовано (один из, несколько из).
- Для двух- и трёхуровневой иерархии — вкладывайте `Accordion` внутрь блока, меняя уровень `CollapseBlock*`.

Когда **не** нужен: один изолированный раскрывающийся блок без группы — в этом случае достаточно самого `CollapseBlock*` без обёртки.

## Для дизайнеров

### Selection mode

| Mode | Когда использовать |
|------|--------------------|
| `single` | FAQ, длинные формы с логическими секциями — одновременно открыт один блок |
| `multiple` | Настройки/фильтры — пользователь хочет видеть несколько разделов параллельно |

### Do / Don't

- ✅ `single` для FAQ — помогает фокусироваться.
- ❌ `multiple` для FAQ — пользователь забывает, что уже открыл.
- ✅ Одинаковый `selectionMode` на всех вложенных `Accordion` внутри одного раздела.
- ❌ Смешивать `single` снаружи и `multiple` внутри без причины — сбивает ожидания.
- ✅ Controlled режим, если состояние должно жить в URL или глобальном сторе.
- ❌ Controlled режим без реальной потребности — сложнее поддерживать, проще сломать.

### Figma

<FigmaEmbed node={FIGMA_ACCORDION} height={480} title='Accordion в Figma (Snack UI Kit)' client:load />

## Для разработчиков

### Установка

```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
import '@ds/accordion/style.css'
```

### Примеры использования

<Example
  title='1. Uncontrolled с начальным состоянием'
  description="expandedDefault задаёт первоначально открытый блок; дальше компонент управляет раскрытием сам."
  code={BasicAccordionSrc}
>
  <BasicAccordion client:load />
</Example>

<Example
  title='2. Controlled + multiple'
  description='expanded + onExpandedChange в режиме multiple — значение массив id.'
  code={MultipleModeSrc}
>
  <MultipleMode client:load />
</Example>

### Вложенность

Каждый уровень иерархии — собственный `Accordion` со своим `selectionMode`. Вложенный `Accordion` не наследует состояние родителя. Полный пример трёх уровней — на странице [CollapseBlock](/components/accordion/collapse-block).

### Controlled vs uncontrolled

- **Uncontrolled** *(по умолчанию)*. Передавайте `expandedDefault`. Подходит для FAQ, длинных форм, страниц настроек — большинство кейсов.
- **Controlled**. Передавайте `expanded` + `onExpandedChange`. Нужен, когда состояние должно жить в URL / query / внешнем сторе или требуется программно менять раскрытие.
- В `single` значение — `string | undefined`, в `multiple` — `string[]`. Тип `expanded` и `onExpandedChange` расходится в зависимости от `selectionMode` — TypeScript подсказывает правильную форму.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expandedDefault` | `string | string[]` | — | Начальное состояние |
| `expanded` | `string | string[]` | — | Controlled состояние |
| `onExpandedChange` | `((value: string) => void) | ((value: string[]) => void) | undefined` | — | Controlled обработчик измения состояния |
| `selectionMode` | `"single"` \| `"multiple"` | — | Режим работы аккордиона |

### Storybook

<StorybookEmbed storyId='components-accordion-accordion--playground' height={480} client:load />

## Доступность

- Клик по заголовку блока раскрывает/сворачивает контент.
- Скрытая часть контента рендерится только при первом открытии (`keepMounted=false` по умолчанию) — ассистивные технологии не читают невидимое.
- Цвет не единственный носитель смысла: состояние раскрытия сигнализируется шевроном (вверх/вниз) и `data-expanded` на корневом элементе.

## CollapseBlock

Семейство раскрываемых блоков аккордеона — Primary (l), Secondary (m), Tertiary (s). Общие пропсы title / subTitle / afterTitle / view / appearance / chevron.

Три семантических уровня раскрываемого блока: `CollapseBlockPrimary`, `CollapseBlockSecondary`, `CollapseBlockTertiary`. Уровень задаёт размер типографики заголовка и плотность отступов; все три компонента используют одно и то же API — меняется только роль в иерархии.

## Демо

## Когда использовать

- **`Primary`** (title size `l`) — верхнеуровневые разделы страницы или секции формы.
- **`Secondary`** (title size `m`) — подразделы внутри `Primary`. Типовой `view='outline'`.
- **`Tertiary`** (title size `s`) — плоские детали без дальнейшей вложенности. Без `view` / `appearance` — только заголовок и контент.

## Для дизайнеров

### Уровень — роль в иерархии

| Уровень | Title size | Где жить |
|---------|------------|----------|
| `Primary` | `l` | Верхний уровень — разделы страницы или крупные секции формы |
| `Secondary` | `m` | Подразделы внутри `Primary`; обычно `view='outline'` |
| `Tertiary` | `s` | Детали третьего уровня; без `view` / `appearance` |

### View — оформление обложки

| View | Типичный сценарий |
|------|-------------------|
| `simple` | Без границы и фона — плотная сетка, списки внутри карточек |
| `outline` | На контрастном фоне, внутри другого раздела — `Secondary` по умолчанию |
| `elevated` | Плавающая обложка с тенью — отдельно стоящий раздел |

`CollapseBlockTertiary` намеренно не принимает `view`: третий уровень всегда плоский.

### Appearance — цветовая схема акрила

`neutral` (по умолчанию), `primary`, `red`, `yellow`, `green`, `blue`. Применяется к акрилу/фону обложки. `CollapseBlockTertiary` не принимает `appearance`.

<Example
  title='Цветовые схемы'
  description='Neutral — дефолт. Primary — акцент. Цветные варианты — для статусных разделов.'
  code={AppearancesSrc}
>
  <Appearances client:load />
</Example>

### Chevron — позиция

| Chevron | Когда использовать |
|---------|---------------------|
| `after` *(по умолчанию)* | Ожидаемое положение; хорошо читается при коротком `title` |
| `before` | Плотные сетки, где справа стоит `afterTitle` (бейдж, сумма, статус) |

<Example
  title='Левый шеврон + afterTitle справа'
  description='Читается как «строка итогов»: название слева, значение справа, шеврон возле названия.'
  code={ChevronBeforeSrc}
>
  <ChevronBefore client:load />
</Example>

### Слоты заголовка

- `title` — основной заголовок, обрезается с многоточием через `TruncateString`.
- `subTitle` — строка под заголовком. Для подписей, описаний, метаданных.
- `afterTitle` — контент справа от заголовка: счётчик, бейдж, сумма, статус. Не кликабелен сам по себе — всё взаимодействие на корневом блоке.

<Example
  title='afterTitle — счётчик'
  description='Counter в правом слоте заголовка. Не кликабельный — клик по строке раскрывает блок.'
  code={AfterTitleSrc}
>
  <AfterTitle client:load />
</Example>

### Do / Don't

- ✅ `Primary` → `Secondary` → `Tertiary` внутри одной иерархии.
- ❌ `Tertiary` внутри `Tertiary` — плоский уровень не предполагает вложенности.
- ✅ `Secondary` с `view='outline'` внутри `Primary` — привычная визуальная вложенность.
- ❌ `elevated` внутри `elevated` — карточка в карточке, визуальный шум.
- ✅ `afterTitle` для бейджа/счётчика/суммы.
- ❌ Кликабельные кнопки в `afterTitle` — клик по заголовку раскрывает блок, дочерние клики конфликтуют.

### Figma

<FigmaEmbed node={FIGMA_ACCORDION} height={480} title='CollapseBlock в Figma (Snack UI Kit)' client:load />

## Для разработчиков

### Установка

```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
import '@ds/accordion/style.css'

// Каждый уровень доступен статическим полем контейнера:
Accordion.CollapseBlockPrimary
Accordion.CollapseBlockSecondary
Accordion.CollapseBlockTertiary
```

### Трёхуровневая иерархия

<Example
  title='Primary → Secondary → Tertiary'
  description='Каждый уровень — собственный Accordion. Вложенный не наследует состояние родителя.'
  code={NestedLevelsSrc}
>
  <NestedLevels client:load />
</Example>

### `keepMounted` — держать контент в DOM

Полезно, когда внутренние компоненты должны сохранять состояние при сворачивании (формы с не отправленными значениями, табы с лениво инициализированной логикой).

```tsx
<Accordion.CollapseBlockPrimary id='form' title='Форма' keepMounted>
  <LongForm />
</Accordion.CollapseBlockPrimary>
```

### Общие пропсы

Все три компонента принимают общее подмножество: `id` (обязателен — уникальный ключ в группе), `title`, `subTitle`, `afterTitle`, `chevron`, `keepMounted`, `className`, `children`. `Primary` и `Secondary` дополнительно принимают `view` и `appearance`. `Tertiary` — без `view` / `appearance`.

### Props

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

### Storybook

<StorybookEmbed storyId='components-accordion-collapseblockprimary--playground' height={480} client:load />

## Доступность

- Интерактивная область — заголовок блока; клик раскрывает/сворачивает контент.
- Скрытая часть контента не рендерится по умолчанию (`keepMounted=false`) — ассистивные технологии не читают невидимое.
- Состояние раскрытия дублируется: шеврон (вверх/вниз), `data-expanded` на корневом элементе, `aria-hidden` на контейнере контента.
- Цвет `appearance` не несёт самостоятельного смысла — используйте его как акцент, а не как единственный сигнал состояния.

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
