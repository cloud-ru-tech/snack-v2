---
description: Сгенерить Playground + VisualMatrix (+ оправданные доп. stories) для пакета `packages/<pkg>`
argument-hint: <pkg-name-or-path>
---

Сгенерить набор stories для компонентного пакета `@ds/*`. Тонкая обёртка над skill'ом [component-story-set](../skills/component-story-set.md).

## Входные аргументы

Пользователь передал: `$ARGUMENTS`

- **`<pkg>`** (обязательно) — имя пакета (`button`) или путь (`packages/button` / абсолютный). Нормализуй к `packages/<pkg>`.
- Если `$ARGUMENTS` пуст — остановись и одним сообщением попроси указать пакет. Формат: `/add-stories <pkg-name>` или `/add-stories packages/<pkg-name>`. Ничего не делай, пока не ответят.
- Если `packages/<pkg>/package.json` отсутствует — сообщи об этом и предложи создать через `pnpm add-package` (сам не запускай — shared-state).

## Research перед работой

1. `packages/<pkg>/src/` — публичный API: `constants.ts` (оси APPEARANCE/SIZE/VIEW/…), `types.ts` (полиморфизм `as`, slot'ы, состояния), `data-*` на корне компонента.
2. `packages/<pkg>/stories/` — что уже есть. Не дублируй существующие Playground/VisualMatrix, обновляй при необходимости.
3. `packages/<pkg>/package.json` — узнать публичные экспорты (single-component vs multi-component → влияет на `title` nesting).
4. Tier по `.claude/rules/complexity-tiers.md`.
5. Если в запросе есть Figma URL / nodeId — сверить оси Figma-мастера с `constants.ts` через `mcp__figma-remote-mcp__get_metadata`. Если осей в Figma больше — остановись и верни список проблем.

## Делегирование skill'у

Следуй шагам [component-story-set](../skills/component-story-set.md):

1. Обязательный минимум в `packages/<pkg>/stories/<Name>/`:
   - `<Name>.Playground.stories.tsx` — полная `meta` + `argTypes` на **все** публичные пропсы, тег `['dev','test']`, `data-test-id` в `args`.
   - `<Name>.VisualMatrix.stories.tsx` — `StoryTable` из `#storybook/components` со всеми осями × состояниями, тег `['test','dev']`, обязательно `parameters: { controls: { disable: true } }`.
2. Доп. файлы (`Polymorphic`, `InteractionTest`, `Composition`, `<Scenario>`) — только по правилам [stories-standard.md](../rules/stories-standard.md), раздел «Когда заводить дополнительный файл». Клик + клавиатура — один экспорт `InteractionTest` со step'ами (`'click: …'`, `'keyboard: …'`); файлы `ClickTest`/`KeyboardTest` не создавать.
3. Запрещённые имена (`Sizes`, `Appearances`, `Views`, `LoadingState`, `DisabledState`, `WithIcon`, `IconOnly`, `WithCounter`) — не создавать никогда.
4. `title`:
   - Single-component пакет → `Components/<ComponentName>`.
   - Multi-component пакет → `Components/<PackageDisplayName>/<ComponentName>`.
5. Повторяющиеся `data-test-id` (2+ файла) — вынести в `stories/<Name>/testIds.ts`.
6. В play-функциях — только `getByTestId`. Никаких `getByRole`/`getByText`/`getByLabelText`/`getByPlaceholderText`.
7. Никаких `style={{ ... }}` в разметке stories. Wrapper-классы — из `styles.module.scss` рядом со story.

## Правила (обязательное чтение)

- [.claude/rules/stories-standard.md](../rules/stories-standard.md) — структура, title, data-test-id, запреты.
- [.claude/rules/visual-regression-standard.md](../rules/visual-regression-standard.md) — VisualMatrix как источник visual regression.
- [.claude/rules/component-api-surface.md](../rules/component-api-surface.md) — связь API ↔ VisualMatrix.
- [.claude/rules/complexity-tiers.md](../rules/complexity-tiers.md) — чек-лист по tier'у.
- [.claude/rules/react-types.md](../rules/react-types.md), [.claude/rules/imports-exports.md](../rules/imports-exports.md).

## Границы

- Не трогай `src/` компонента. Если API неполный (ось есть в Figma, но нет в `constants.ts`; компонент не проксирует `data-test-id`; `title` требует nesting, но в пакете нет согласованных story IDs в `__test__/`) — верни список проблем и остановись.
- Не запускай `pnpm test:e2e:update-snapshots` автоматически. В конце предложи пользователю запустить вручную после review stories в Storybook.
- Ничего не коммить.

## Итог

Короткое summary (3–5 строк): tier, список созданных/обновлённых файлов, есть ли доп. stories и почему, предложение снять baselines (`pnpm dev:storybook` + `pnpm test:e2e:update-snapshots`).
