# Skill: component-story-set

**Триггеры:** «написать stories», «покрыть состояния сторями», «создать VisualMatrix», «обновить Playground».

Скилл генерирует минимально достаточный набор stories для пакета с учётом его tier'а.

## Ввод

- Путь к пакету `packages/<name>`.
- Явно `tier` или вывод по структуре `constants.ts` + `types.ts`.

## Шаги

1. **Прочитать API**
   - `packages/<name>/src/<Name>/constants.ts` — оси.
   - `packages/<name>/src/<Name>/types.ts` — полиморфизм, слоты.

2. **Определить tier** — по [complexity-tiers.md](../rules/complexity-tiers.md).

3. **Создать `stories/<Name>/` файлы:**
   - `<Name>.Playground.stories.tsx` — полный `meta` + `argTypes` для всех публичных пропсов + `['dev','test']` тег + `play: toBeVisible/toBeEnabled`.
   - `<Name>.Primary.stories.tsx` — happy-path, `['dev','test']`.
   - По одному файлу на каждую ось: `<Axis>s.stories.tsx` (`Sizes`, `Appearances`, `Views`) — `['dev']`, `render` с flex-рядом.
   - По одной story на состояние: `<State>State.stories.tsx` (`LoadingState`, `DisabledState`, `EmptyState`) — `['dev','test']`, play-assertions.
   - Для компонентов-slots: `WithIcon`, `WithCounter`, `WithLabel` — `['dev']`.
   - Для полиморфизма: `AsLink.stories.tsx` с 2 exports (`AsLink`, `AsLinkDisabled`) — `['dev','test']`.
   - Test-stories: `ClickTest.stories.tsx` с `fn()` + `ClickTest` + `KeyboardTest` — `['test','dev']`.
   - `<Name>.VisualMatrix.stories.tsx` — 3–4 `StoryTable`-блока (Appearance×Size, View×Appearance, Composition×Size, State×Composition), `['test','dev']`.

4. **Количество по tier:**
   - XS: Playground + 1-2 use-case + VisualMatrix (3–5 файлов).
   - S: + states (5–8 файлов).
   - M: + polymorphism + slots + ClickTest (8–13 файлов).
   - L: + субкомпоненты в отдельных папках `stories/<SubName>/` (12–20 файлов).
   - XL: scenario-driven, отдельный файл на use-case (20+ файлов).

5. **Правила оформления** — см. [stories-standard.md](../rules/stories-standard.md):
   - CSF3, `StoryObj<typeof Component>`.
   - Импорты: `Meta`, `StoryObj` из `@storybook/react`; `expect`, `userEvent`, `within`, `fn` из `storybook/test` (subpath ядра `storybook@10`).
   - `title: 'Components/<Name>'` один и тот же во всех файлах.
   - Полный `meta` + `argTypes` **только** в Playground.
   - VisualMatrix **только** через `StoryTable` из `#storybook/components`.

6. **Верификация**
   ```bash
   pnpm dev:storybook
   # Проверить, что все файлы видны, controls работают, play-функции зелёные
   pnpm test:stories
   ```

## Шаблон story-файла

```tsx
import { <Name>, <CONST> } from '@ds/<pkg>'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof <Name>> = {
  title: 'Components/<Name>',
  component: <Name>,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof <Name>>

export const <StoryName>: Story = {
  tags: ['dev', 'test'],
  args: { /* ... */ },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement).get<Role>('<name>')
    await expect(el).toBeVisible()
  },
}
```

## Что **не** делает

- Не правит `src/`. Если API неполный — возвращает список проблем.
- Не запускает tests — только проверяет, что `dev:storybook` не падает.

## Связанное

- [stories-standard.md](../rules/stories-standard.md)
- [complexity-tiers.md](../rules/complexity-tiers.md)
- [component-api-surface.md](../rules/component-api-surface.md)
