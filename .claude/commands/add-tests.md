---
description: Сгенерировать набор Playwright E2E specs для пакета `packages/<pkg>` по tier'у
argument-hint: <pkg-name-or-path>
---

Сгенерировать E2E тесты для компонентного пакета `@ds/*`. Тонкая обёртка над skill'ом [component-e2e-tests](../skills/component-e2e-tests.md).

## Входные аргументы

Пользователь передал: `$ARGUMENTS`

- **`<pkg>`** (обязательно) — имя пакета (`button`) или путь (`packages/button` / абсолютный). Нормализуй к `packages/<pkg>`.
- Если `$ARGUMENTS` пуст — остановись и одним сообщением попроси указать пакет. Формат: `/add-tests <pkg-name>` или `/add-tests packages/<pkg-name>`. Ничего не делай, пока не ответят.
- Если `packages/<pkg>/package.json` отсутствует — сообщи об этом и предложи `pnpm add-package` (сам не запускай).

## Research перед работой

1. `packages/<pkg>/src/` — публичный API: оси (для `props propagation` через `data-*`), полиморфизм (`as`), состояния (`disabled`, `loading`, …), клавиатурные интеракции.
2. `packages/<pkg>/stories/<Name>/` — story IDs. Учитывай nesting title'а:
   - Single-component: `Components/<Name>` → `components-<name>--<story>`.
   - Multi-component: `Components/<Pkg>/<Name>` → `components-<pkg>-<name>--<story>`.
3. `packages/<pkg>/__test__/` — что уже есть. Не дублируй. Если тесты лежат плоско в корне `__test__/` без папки `<ParentComponent>/` — нужно перенести.
4. Tier по `.claude/rules/complexity-tiers.md`.

## Делегирование skill'у

Следуй шагам [component-e2e-tests](../skills/component-e2e-tests.md):

1. **Раскладка** — одна папка на parent-компонент: `packages/<pkg>/__test__/<ParentComponent>/`. Сабкомпоненты варианта parent'а параметризуются через args в той же папке. Отдельная папка автономного компонента — только если он импортируется самостоятельно и имеет собственный публичный API (см. e2e §«Папка тестов пакета»). Snapshot baselines — в `__test__/<ParentComponent>/__snapshots__/` рядом со спеком.

2. **Тесты живут в трёх слоях**:
   - **Storybook play** (`stories/<Name>/tests/<Name>.InteractionTest.stories.tsx::play`) — behavioral: click, keyboard, focus, callback assertions. Валидируется через `pnpm test:stories`. Не дублируется в Playwright.
   - **`rendering.spec.ts`** — всегда. Smoke render + props propagation в `data-*` для ключевых значений (1–3 на ось, не цикл по всем enum-values).
   - **`interaction.spec.ts` / `keyboard.spec.ts` / `polymorphism.spec.ts`** — **только** под пункты закрытых списков из [e2e-testing-standard.md](../rules/e2e-testing-standard.md) §§ «interaction.spec.ts — когда заводим» и «keyboard.spec.ts — когда заводим». Если ни один пункт не применим — файл не заводится, независимо от tier'а.

3. **Каждый дополнительный тест** обязан проходить «Критерий обоснованности артефакта» из [complexity-tiers.md](../rules/complexity-tiers.md) (3 условия). Ориентир по числу тестов в `rendering.spec.ts` — таблица из e2e §«rendering.spec.ts — ориентир по tier'у». Превышение допустимо при выполнении критерия; дубль play или axis-per-test loop — нет.

4. **`helpers.ts`** в папке parent-компонента:
   - `<COMPONENT>_STORIES = { playground, visualMatrix, [scenario] }` — **StoryRef-объекты** `{ name, story, group? }`, не хардкод-строки `'components-<...>--<...>'`.
   - `<COMPONENT>_KEY_COMBOS` — ключевая выборка, **не** декартово произведение.
   - `buildStoryOptions(props?, ref?)` — единая точка построения URL.
   - `*_TEST_ID` импортируются из `TEST_IDS` в `../../stories/testIds` (stories-level) либо `../../src/constants` (component-level, когда компонент сам ставит id), не литералами и не из entry `@ds/<pkg>`.

5. **`gotoStory` — единая каноническая форма** в spec'ах: `gotoStory(buildStoryOptions(args?, storyRef?))`. ID-строковая сигнатура `gotoStory('components-<...>--<...>', args)` запрещена.

6. **`rendering.spec.ts`** — describe `render`, `states` (если применимо), `props propagation` через параметризацию по `KEY_COMBOS`. Не axis-per-test loop.

7. **Импорт fixtures и констант** — через TS-алиас `#playwright-tooling/*`: `import { expect, test } from '#playwright-tooling/fixtures'`, `import { waitForFonts } from '#playwright-tooling/utils'`, `import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects'`, `import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common'`. Относительные `'../../../../playwright/...'` и прямой `@playwright/test` запрещены.

8. **Локаторы** — только `getByTestId`. `getByRole` / `getByText` / `getByLabelText` запрещены.

9. **visual.spec.ts** — по правилам [visual-regression-standard.md](../rules/visual-regression-standard.md): `test.skip(project !== VISUAL_BASELINE_PROJECT)`, `waitForFonts()` **один раз после `gotoStory`** (не перед каждым cell composite). Для VM-снимка — `page.locator(STORYBOOK_ROOT_SELECTOR).toHaveScreenshot(name, SCREENSHOT_DEFAULT_OPTS)`. Для сценарных снимков компонента — `screenshotWithPadding(page, getByTestId(ROOT), 16, SCREENSHOT_DEFAULT_OPTS)` + `expect(png).toMatchSnapshot(...)`. Для composite (interaction states / axis × state matrix) — утилита `assertInteractionStatesSnapshot` либо `composeScreenshots`. Никаких локальных `*_ROOT_SELECTOR` / `*_SCREENSHOT_OPTS` и инлайн-литералов.

## Запреты

- Не заводи `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts` — запрещено правилом, их роль отдана describe-блокам внутри `rendering.spec.ts` и visual regression.
- Не префиксуй файлы/PNG именем пакета-компонента (`button.rendering.spec.ts`, `button-visual-matrix.png`) — префикс в имени папки.
- Не держи тесты плоско в `__test__/` — одна папка на parent-компонент.
- Не дублируй behavioral assertion'ы (click/keyboard/focus/callback) из Storybook play в `interaction.spec.ts`/`keyboard.spec.ts`.
- Не используй axis-per-test loop в rendering.
- В play/spec — только `getByTestId` и auto-wait; никаких `page.waitForTimeout(N)`, никаких `getByRole`/`getByText`/`getByLabelText`.
- Не используй id-строковую сигнатуру `gotoStory('...', args)` в spec'ах — только `gotoStory(buildStoryOptions(args?, storyRef?))`.

## Правила (обязательное чтение)

- [.claude/rules/e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- [.claude/rules/visual-regression-standard.md](../rules/visual-regression-standard.md)
- [.claude/rules/complexity-tiers.md](../rules/complexity-tiers.md)
- [.claude/rules/reference-package-anatomy.md](../rules/reference-package-anatomy.md)

## Границы

- Не трогай `src/` и stories. Если нужные stories отсутствуют (`Playground` / `VisualMatrix`) — верни список проблем и предложи сначала запустить `/add-stories <pkg>`.
- Не снимай visual baselines автоматически. В конце предложи:
  ```bash
  pnpm dev:storybook
  pnpm test:e2e:update-snapshots
  ```
- Ничего не коммить.

## Итог

Короткое summary (3–5 строк): tier, список созданных spec-файлов, story IDs в `helpers.ts`, какие блоки пропущены и почему, что запустить для проверки (`pnpm test:e2e:chrome`).
