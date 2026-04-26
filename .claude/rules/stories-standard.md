# Stories — стандарт

**Область действия:** `packages/*/stories/**/*.stories.@(ts|tsx)`. Правило действует всегда.

## Формат

- **CSF3**: каждая story — объект `StoryObj<typeof Component>`. Никаких функциональных сторис CSF2.
- Импорты: `Meta`, `StoryObj` из `@storybook/react`; `expect`, `userEvent`, `within`, `waitFor`, `fn` из `storybook/test` (subpath ядра `storybook@10`).
- Типы не через префикс `React.*` (см. [react-types.md](./react-types.md)), импорты/экспорты без `type` (см. [imports-exports.md](./imports-exports.md)).
- **Не** используй блоки `parameters.docs.description.component` / `parameters.docs.description.story`. Описания компонента живут в `docs/*.mdx` и `README.md`, а не внутри story.

## Структура папок

Каждый компонент — подпапка внутри `stories/`:

```
packages/<pkg>/stories/
└── <ComponentName>/
    ├── <ComponentName>.Playground.stories.tsx    # Полная meta: args, argTypes
    ├── <ComponentName>.<UseCase>.stories.tsx     # Сценарий использования
    ├── <ComponentName>.<UseCase>.stories.tsx     # …
    └── <ComponentName>.VisualMatrix.stories.tsx  # Матрица для visual regression (скрыта)
```

Правила именования файла: `ComponentName.StoryName.stories.tsx`. PascalCase, префикс компонента обязателен. Никаких нумераций/kebab-case.

## Playground (обязательна)

- Имя экспорта: `Playground`.
- Содержит **полную** `meta` с `title`, `component`, `parameters`, `args`, `argTypes`.
- Все публичные props доступны через controls.
- Без кастомного `render`.
- Теги: `['dev', 'test']`.

```tsx
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'
import { APPEARANCE, Component, SIZE } from '@ds/<pkg>'

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: { layout: 'centered' },
  args: { size: SIZE.M, appearance: APPEARANCE.Primary },
  argTypes: {
    size: { control: 'select', options: Object.values(SIZE) },
    appearance: { control: 'radio', options: Object.values(APPEARANCE) },
  },
}
export default meta
type Story = StoryObj<typeof Component>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('...')).toBeVisible()
  },
}
```

## Use Cases

- 3–5 stories для простых компонентов, 5–8 — для средних, 8–12 — для сложных.
- Каждый файл содержит свой `export default meta` с минимальным набором (`title`, `component`).
- Теги: `['dev']`.
- Предпочтение — `args` перед кастомным `render`. Custom `render` оправдан только для композиции/нескольких вариантов рядом.

## Test Stories

- Теги: `['test', 'dev']` — обязательно скрывать из sidebar.
- Используют `play` с `step()` для группировки.
- Для мока callback — `fn()` из `storybook/test`, прокидывать через `args`.
- Проверяют интеракции, edge cases, async, keyboard nav.

```tsx
export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: { onClick: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step('Click button', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })
    await step('onClick called once', async () => {
      expect(args.onClick).toHaveBeenCalledTimes(1)
    })
  },
}
```

## VisualMatrix

- Имя экспорта: `VisualMatrix` (или `AllStates` для простого ряда).
- Теги: `['test', 'dev']`.
- Для табличных матриц — **обязательно** `StoryTable` из `#storybook/components` (design tokens, единый вид).
- Для простого ряда вариантов — flex-контейнер с классом из `styles.module.scss` рядом со story. **Inline-стили (`style={{ ... }}`) запрещены** — см. [Inline-стили запрещены](#inline-стили-запрещены).
- **Не** выводи все возможные комбинации.

```tsx
import { StoryTable } from '#storybook/components'

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const
const keyAppearances = [APPEARANCE.Primary, APPEARANCE.Neutral] as const

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle="Appearance × Size"
      firstColumnHeader="Appearance"
      columnHeaders={keySizes.map((s) => s.toUpperCase())}
      rows={keyAppearances.map((appearance) => ({
        variantLabel: appearance,
        cells: keySizes.map((size) => (
          <Component key={size} size={size} appearance={appearance} />
        )),
      }))}
    />
  ),
}
```

Для нескольких секций — несколько `StoryTable` внутри одного wrapper-`<div>` с классом из `styles.module.scss` (`display: grid; gap: 1.5rem`). Inline-стили на wrapper запрещены — см. [Inline-стили запрещены](#inline-стили-запрещены).

## Общие компоненты `#storybook/components`

| Экспорт          | Назначение                                           |
| ---------------- | ---------------------------------------------------- |
| `StoryTable`     | Таблица для Visual Matrix (дизайн-токены, единый вид) |
| `StoryWrapper`   | Общая обёртка story — подключена автоматически через `preview.tsx` decorator, вручную не импортировать |

Импорт: `import { StoryTable } from '#storybook/components'`.

Собственные локальные стили в stories допустимы, только если макет не укладывается в `StoryTable` (редко). Файл `styles.module.scss` рядом со stories, переменные — из `@cloud-ru/figma-variables`.

## Inline-стили запрещены

В stories **нельзя** использовать проп `style={{ ... }}` — ни на wrapper'ах, ни на компонентах, ни на demo-разметке. Причины:

- Inline-стили обходят дизайн-токены (`@cloud-ru/figma-variables`) и дают визуальный шум в visual regression.
- В PR-ревью теряется контроль над spacing/layout: story «подкручивается» в нотации, которую нельзя переиспользовать.
- Любой лейаут stories должен быть выразим через `StoryTable` либо через класс из `styles.module.scss` рядом со story.

```tsx
// ❌ Плохо
<div style={{ display: 'flex', gap: 16 }}>
  <Button size='s' />
  <Button size='m' />
</div>

// ❌ Плохо — inline на самом компоненте
<Button style={{ marginTop: 8 }} label='...' />

// ✅ Хорошо — класс из styles.module.scss рядом со story
import styles from './Button.Sizes.module.scss'

<div className={styles.row}>
  <Button size='s' />
  <Button size='m' />
</div>
```

Допустимые исключения — ровно те же, что и для компонентов: `style` прокидывается **только** через публичный проп компонента, если этот проп часть его API и демонстрируется в story (например, story, показывающая `style`-override на `as='a'`). Во всех остальных случаях — SCSS module.

## Tags — семантика

| Tag         | Что делает                                           |
| ----------- | ---------------------------------------------------- |
| `dev`       | Показывать в sidebar Storybook                       |
| `test`      | Включать в Test Runner / Playwright                  |

Тег `autodocs` не используем: автодокументация от него отключена, описания живут в `docs/*.mdx`.

Типовые комбинации:
- Playground: `['dev', 'test']`
- Use case: `['dev']`
- Test story / VisualMatrix: `['test', 'dev']`

## Naming

- Английский PascalCase. `Playground`, `WithIcon`, `LoadingState`, `DisabledState`, `Sizes`, `ClickTest`, `VisualMatrix`.
- Запрещены: `Basic`, `Default`, `Example`, `Story1`, русские названия.

## Чего НЕ делать

- Пустых `export const X: Story = {}`.
- Смешивать Playground с визуальными матрицами в одной story.
- Дублировать сценарии (`WithImage` + `ImageFallback` — объединить).
- Перегружать матрицы (все комбинации). Выбирать ключевые.
- Забывать `export default meta` в каждом файле.
- Добавлять `parameters.docs.description.*` и тег `autodocs`.
- Использовать inline-стили `style={{ ... }}` в разметке stories — только `styles.module.scss` или `StoryTable`.

## Чеклист перед коммитом story

- [ ] Структура папки `<ComponentName>/` с отдельными файлами
- [ ] CSF3, `StoryObj<typeof Component>`
- [ ] Playground содержит полную `meta` с `argTypes`
- [ ] Каждый файл имеет собственный `export default meta`
- [ ] Use cases — 3–5 для простого компонента
- [ ] VisualMatrix использует `StoryTable` из `#storybook/components`
- [ ] Нет тегов `autodocs` и блоков `parameters.docs.description.*`
- [ ] Названия на английском, PascalCase, без `Basic`/`Default`
- [ ] Нет `React.*`-типов, нет `import type`
- [ ] Нет inline-стилей `style={{ ... }}` в разметке stories
