# Skill: component-story-set

**Триггеры:** «написать stories», «покрыть состояния сторями», «создать VisualMatrix», «обновить Playground», «сгенерировать baselines».

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

4. **Оценить, нужны ли доп. story** — каждая обязана пройти «Критерий обоснованности артефакта» из [complexity-tiers.md](../rules/complexity-tiers.md) (3 условия). Алгоритм решения «куда положить»:

   1. Эффект достижим через `args` Playground (включая URL-args в e2e) → story не нужна.
   2. Эффект достижим строкой/колонкой StoryTable → расширяем VisualMatrix, story не нужна.
   3. Кейс требует своего DOM / композиции / state → одна story в подпапке. **Куда именно**:

      - **`stories/<Name>/examples/<Name>.<Scenario>.stories.tsx`** — если фрагмент копируется потребителем в продакшн-код как самостоятельный (composition, slot-пресет, polymorphism с `as={Link}`, controlled/uncontrolled-режим, состояние с реальным react state). Title — `Components/<…>/<Name>/Examples/<Scenario>`.
      - **`stories/<Name>/tests/<Name>.<Scenario>.stories.tsx`** — если фрагмент содержит `fn()`-моки, контролируемый stub-state, edge-state или последовательность действий, важную только для assertion'а; вне теста смысла не имеет. Title — `Components/<…>/<Name>/Tests/<Scenario>`.

   Подробности раскладки и формата — [stories-standard.md](../rules/stories-standard.md) §§ «Подпапки `examples/` и `tests/`», «Examples — формат», «Tests — формат».

   Типовые сценарии:

   | Куда | Файл | Когда заводить |
   |------|------|----------------|
   | `examples/` | `<Name>.Polymorphic.stories.tsx` | `as` prop с реальным элементом (`as='a'`, `as={Link}`) — потребитель копирует |
   | `examples/` | `<Name>.Composition.stories.tsx` | Несколько компонентов рядом, совместное поведение |
   | `examples/` | `<Name>.Controlled.stories.tsx` | Controlled-режим с `useState` потребителя |
   | `examples/` | `<Name>.<Scenario>.stories.tsx` | L/XL stateful-сценарий (`SortableByName`, `PaginatedPage2`) |
   | `tests/` | `<Name>.InteractionTest.stories.tsx` | Один экспорт `InteractionTest`: клик + клавиатура + фокус через `step('click: …')` / `step('keyboard: …')`. `controls: { disable: true }` в meta. Не разносить на `ClickTest` + `KeyboardTest` |
   | `tests/` | `<Name>.<EdgeState>.stories.tsx` | Контролируемый stub, который нужен только для play/screenshot |

5. **Запрещённые файлы** — не создавать никогда:

   ```
   ❌ <Name>.Sizes.stories.tsx
   ❌ <Name>.Appearances.stories.tsx
   ❌ <Name>.Views.stories.tsx
   ❌ <Name>.Variants.stories.tsx
   ❌ <Name>.LoadingState.stories.tsx
   ❌ <Name>.DisabledState.stories.tsx
   ❌ <Name>.WithIcon.stories.tsx / IconOnly / WithCounter (если это просто включение слота)
   ❌ <Name>.ClickTest.stories.tsx / <Name>.KeyboardTest.stories.tsx — слиты в InteractionTest
   ```

   Их роль — строки/колонки в VisualMatrix. Если появляется желание завести — расширить соответствующий `StoryTable`.

   Также запрещено: тег `tag: 'fixture'` (test-стори отделяются раскладкой `tests/`), title с висящим `/Tests` или `/Examples` без имени сценария, дубли одной story между `examples/` и `tests/`.

6. **Правила оформления** (см. [stories-standard.md](../rules/stories-standard.md)):
   - CSF3, `StoryObj<typeof Component>`.
   - Импорты: `Meta`, `StoryObj` из `@storybook/react`; `expect`, `userEvent`, `within`, `fn` из `storybook/test`.
   - `title` у Playground/VisualMatrix — **один и тот же** (без суффикса). У story из подпапки — с сегментом `/Examples/<Scenario>` или `/Tests/<Scenario>`.
   - Полный `meta` + `argTypes` **только** в Playground.
   - VisualMatrix **только** через `StoryTable` из `#storybook/components`.
   - Никаких `style={{ ... }}` — только SCSS-modules рядом со story.
   - При переезде story между корнем и подпапкой обновить story IDs в `packages/<pkg>/__test__/<Name>/helpers.ts` — иначе e2e получит 404.

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
