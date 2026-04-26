# Skill: component-story-set

**Триггеры:** «написать stories», «покрыть состояния сторями», «создать VisualMatrix», «обновить Playground», «сгенерить baselines».

Скилл собирает минимально достаточный набор stories для пакета. Отправная точка — **публичный API** (`constants.ts` + `types.ts`) и **оси Figma-мастера**. Исходная аксиома: набор stories не зависит от tier'а напрямую — tier лишь подсказывает, какие доп. сценарии ожидаются. См. [stories-standard.md](../rules/stories-standard.md) и [complexity-tiers.md](../rules/complexity-tiers.md).

## Вход

- Путь к пакету `packages/<name>`.
- (опционально) Figma nodeId мастера + состояний — чтобы сверить оси.

## Шаги

1. **Прочитать API**
   - `packages/<name>/src/<Name>/constants.ts` — все оси (APPEARANCE, SIZE, VIEW, …).
   - `packages/<name>/src/<Name>/types.ts` — полиморфизм (`as`), slot'ы (`icon`, `counter`), состояния (`disabled`, `loading`).
   - Определить: есть ли `as` prop? какие `data-*` проставляются? какие публичные интеракции (`onClick`, `onChange`)?

2. **Сверить оси с Figma (если есть nodeId)**
   - `mcp__figma-remote-mcp__get_metadata` — каждая ось Figma-мастера должна быть в `constants.ts`.
   - Если в Figma больше осей, чем в API — сигнал, что API неполный; возвращать список и останавливаться.

3. **Создать обязательные stories** в `stories/<Name>/`:

   **`<Name>.Playground.stories.tsx`** — полная `meta` с `title`, `component`, `parameters`, `args`, `argTypes` на **все публичные пропсы**. Тег `['dev','test']`. `play` минимальный (`toBeVisible`).

   **`<Name>.VisualMatrix.stories.tsx`** — `StoryTable` из `#storybook/components` со **всеми** осями × состояниями. Каждая ось `constants.ts` — строка либо колонка минимум в одной секции. Если секций несколько — wrapper `<div>` с классом из `styles.module.scss` (без inline-стилей). Тег `['test','dev']`.

4. **Оценить, нужны ли доп. файлы** — по правилам [stories-standard.md](../rules/stories-standard.md), раздел «Когда заводить дополнительный файл». Доп. файл оправдан, если сценарий:
   - нельзя выразить `args` Playground-а (без custom `render`), **и**
   - нельзя уложить в строку/колонку существующего `StoryTable`.

   Типовые оправданные доп. файлы:

   | Файл | Когда заводить |
   |------|----------------|
   | `<Name>.Polymorphic.stories.tsx` | Есть `as` prop — тесты `as='a'`, `as={Link}` |
   | `<Name>.ClickTest.stories.tsx` | Нужен `onClick: fn()` + assertion в `play` |
   | `<Name>.KeyboardTest.stories.tsx` | Клавиатурный сценарий (Tab → Enter, Arrow-нав) |
   | `<Name>.Composition.stories.tsx` | Несколько компонентов рядом демонстрируют совместное поведение |
   | `<Name>.<Scenario>.stories.tsx` (L/XL) | Stateful-сценарий (`SortableByName`, `PaginatedPage2`) |

5. **Запрещённые файлы** — не создавать никогда:

   ```
   ❌ <Name>.Sizes.stories.tsx
   ❌ <Name>.Appearances.stories.tsx
   ❌ <Name>.Views.stories.tsx
   ❌ <Name>.LoadingState.stories.tsx
   ❌ <Name>.DisabledState.stories.tsx
   ❌ <Name>.WithIcon.stories.tsx / IconOnly / WithCounter
   ```

   Их роль — строки/колонки в VisualMatrix. Если появляется желание завести — расширить соответствующий `StoryTable`.

6. **Правила оформления** (см. [stories-standard.md](../rules/stories-standard.md)):
   - CSF3, `StoryObj<typeof Component>`.
   - Импорты: `Meta`, `StoryObj` из `@storybook/react`; `expect`, `userEvent`, `within`, `fn` из `storybook/test`.
   - `title: 'Components/<Name>'` один и тот же во всех файлах.
   - Полный `meta` + `argTypes` **только** в Playground.
   - VisualMatrix **только** через `StoryTable` из `#storybook/components`.
   - Никаких `style={{ ... }}` — только SCSS-modules рядом со story.

7. **Финальный шаг — baselines visual regression**

   VisualMatrix story + (опц.) responsive/hover/focus/pressed снимки — это и есть наш визуальный регресс. После того как stories стабилизировались:

   ```bash
   pnpm dev:storybook   # или убедиться, что server поднимется автоматом
   pnpm test:e2e:update-snapshots
   ```

   Затем ручной review PNG в `packages/<pkg>/__snapshots__/` (не blank, без артефактов). Коммитить baselines отдельным коммитом: `test(visual): baselines for <pkg>`.

   Требования к набору снимков — см. [visual-regression-standard.md](../rules/visual-regression-standard.md).

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
- Не пишет E2E — это [component-e2e-tests](./component-e2e-tests.md).
- Не трогает docs — это `component-docs`.

## Связанное

- [stories-standard.md](../rules/stories-standard.md)
- [visual-regression-standard.md](../rules/visual-regression-standard.md)
- [complexity-tiers.md](../rules/complexity-tiers.md)
- [component-api-surface.md](../rules/component-api-surface.md)
