---
description: Stories пакета packages/<pkg> (Playground + VisualMatrix + оправданные доп.) — когда просят написать/покрыть состояния сторями, создать VisualMatrix, обновить Playground, снять baselines. Обёртка над component-story-set.
argument-hint: <pkg-name-or-path>
---

Сгенерировать набор stories для компонентного пакета `@ds/*`. Тонкая обёртка над skill'ом [component-story-set](../skills/component-story-set.md).

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
2. Доп. story — только если проходит «Критерий обоснованности артефакта» из [complexity-tiers.md](../rules/complexity-tiers.md). Раскладка определяется механическим критерием:
   - **`examples/<Name>.<Scenario>.stories.tsx`** — если фрагмент копируется потребителем в продакшн-код как самостоятельный (composition, polymorphism, controlled-режим, slot-пресет с реальным DOM). Title — `Components/<…>/<Name>/Examples/<Scenario>`.
   - **`tests/<Name>.<Scenario>.stories.tsx`** — если фрагмент содержит `fn()`-моки, stub-state, edge-state, важные только для assertion'а; вне теста смысла не имеет. Title — `Components/<…>/<Name>/Tests/<Scenario>`. Тег `fixture` **не использовать**.
   
   Один интеракционный сценарий — один экспорт `InteractionTest` в `tests/<Name>.InteractionTest.stories.tsx` (клик + клавиатура + фокус через `step('click: …')` / `step('keyboard: …')`); файлы `ClickTest`/`KeyboardTest` не создавать. Подробности раскладки — [stories-standard.md](../rules/stories-standard.md) §§ «Подпапки `examples/` и `tests/`», «Examples — формат», «Tests — формат».
3. Запрещённые имена (`Sizes`, `Appearances`, `Views`, `Variants`, `LoadingState`, `DisabledState`, `EmptyState`, `WithIcon`/`IconOnly`/`WithCounter` если это просто включение слота, `ClickTest`, `KeyboardTest`) — не создавать никогда. Также запрещено: дубль одной story между `examples/` и `tests/`; title с висящим `/Tests` или `/Examples` без имени сценария.
4. `title`:
   - Single-component пакет → `Components/<ComponentName>` (Playground/VisualMatrix).
   - Multi-component пакет → `Components/<PackageDisplayName>/<ComponentName>`.
   - Story из подпапки добавляет сегмент `/Examples/<Scenario>` либо `/Tests/<Scenario>`.
5. При переезде story между корнем и подпапкой обязательно обновить story IDs в `packages/<pkg>/__test__/<Name>/helpers.ts` — иначе e2e получит 404.
6. Повторяющиеся `data-test-id` (2+ файла) — вынести в `stories/testIds.ts` (multi-component) или `stories/<Name>/testIds.ts` (single-component), единым объектом `TEST_IDS`. Не плодить отдельные `<NAME>_TEST_ID` const'ы.
7. В play-функциях — только `getByTestId`. Никаких `getByRole`/`getByText`/`getByLabelText`/`getByPlaceholderText`.
8. Никаких `style={{ ... }}` в разметке stories. Wrapper-классы — из `styles.module.scss` рядом со story.
9. Для trigger-based компонентов (modal, drawer, popover, dropdown, tooltip, toaster) дополнительно — [trigger-based-stories.md](../rules/trigger-based-stories.md): `open` не в args, триггер — `Button` из `@ds/button` с `data-test-id={TEST_IDS.triggerOpen}`, `layout: 'fullscreen'`, конфликты args — runtime + `<DemoWarning>`, не `if:`.

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
