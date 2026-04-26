---
description: Сгенерить набор Playwright E2E specs для пакета `packages/<pkg>` по tier'у
argument-hint: <pkg-name-or-path>
---

Сгенерить E2E тесты для компонентного пакета `@ds/*`. Тонкая обёртка над skill'ом [component-e2e-tests](../skills/component-e2e-tests.md).

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
3. `packages/<pkg>/__test__/` — что уже есть. Не дублируй. Если тесты лежат плоско в корне `__test__/` без папки `<ComponentName>/` — нужно перенести.
4. Tier по `.claude/rules/complexity-tiers.md`.

## Делегирование skill'у

Следуй шагам [component-e2e-tests](../skills/component-e2e-tests.md):

1. **Раскладка** — строго `packages/<pkg>/__test__/<ComponentName>/`. Snapshot baselines — в `__test__/<ComponentName>/__snapshots__/` рядом со спеком.
2. **Файлы по tier'у** (max 5 + visual):
   - XS: `rendering.spec.ts` + `a11y.spec.ts` + `visual.spec.ts`.
   - S: + describe `states` в `rendering.spec.ts`.
   - M: + `interaction.spec.ts` + `keyboard.spec.ts` + (`polymorphism.spec.ts` если есть `as`).
   - L: + focus-trap в `interaction.spec.ts`, Arrow/Home/End в `keyboard.spec.ts`, ARIA-state в `rendering.spec.ts`.
   - XL: scenario-driven spec'и + MSW.
3. **`helpers.ts`** в папке компонента: `PKG_STORIES` (story IDs), `PKG_KEY_COMBOS` (ключевая выборка, **не** декартово произведение — по 1 представителю на каждое значение каждой оси).
4. **`rendering.spec.ts`** — 3 describe'а: `render`, `states`, `props propagation` (через `gotoStory(playground, args)` + `toHaveAttribute('data-<axis>', value)`).
5. **Импорт fixtures** — `import { expect, test } from '../../../../playwright/fixtures'` (ровно 4 уровня вверх; не `@playwright/test`).
6. **visual.spec.ts** — по правилам [visual-regression-standard.md](../rules/visual-regression-standard.md): `test.skip(project !== VISUAL_BASELINE_PROJECT)`, `waitForFonts()`, снимки `#storybook-root` с `animations: 'disabled', caret: 'hide'`.

## Запреты

- Не заводи `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts` — запрещено правилом, их роль отдана describe-блокам внутри `rendering.spec.ts` и visual regression.
- Не префиксуй файлы/PNG именем пакета-компонента (`button.rendering.spec.ts`, `button-visual-matrix.png`) — префикс в имени папки.
- Не держи тесты плоско в `__test__/`.
- В play/spec — только `getByTestId` и auto-wait; никаких `page.waitForTimeout(N)`.

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
