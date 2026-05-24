# Tier'ы сложности компонентов

**Область действия:** все компонентные пакеты в `packages/*`. Правило определяет минимальный набор артефактов по сложности компонента.

## Классификация

| Tier | Критерии | Примеры | Stories | Playwright specs | Visual snaps | Docs |
|------|----------|---------|---------|------------------|--------------|------|
| **XS** | 0–1 интерактивных состояния, 1–2 props axes, без композиции | `avatar`, `counter`, `loader/Sun` | Playground + VisualMatrix (2 файла) | `rendering` (1 test) | 1 (VM) | 1 `index.mdx` |
| **S**  | до 3 props axes, 1 интеракция, без полиморфизма | `badge`, `chip`, `tag` | Playground + VisualMatrix (+ 0–1 в `examples/`) + `tests/InteractionTest` | `rendering` (2–3 tests) | 3 (+ hover, focus) | 1 `index.mdx` |
| **M**  | полиморфизм (`as`), 3–5 осей, loading/disabled, иконки, слоты | `button` | Playground + VisualMatrix + `tests/InteractionTest` (+ `examples/Polymorphic` если `as`) | `rendering` (3–5) + `polymorphism` (если `as`) | 4 (+ pressed) | 1 `index.mdx` |
| **L**  | составной (субкомпоненты), shared context, keyboard nav, portal | `tabs`, `tooltip`, `popover`, `dropdown` | Playground + VisualMatrix на parent + subcomp scenarios в `examples/`; `tests/InteractionTest` + `tests/Controlled` | `rendering` (5–8) + `interaction` (focus trap / scroll lock — 2–4 теста, при наличии) + `keyboard` (при roving tabindex или focus-trap, см. e2e §«keyboard.spec»)  | 4–5 (+ portal `open.png`) | `index.mdx` + `<sub>.mdx` |
| **XL** | stateful (sort/filter/select/paginate), виртуализация, drag-drop, file upload | `table`, `modal`, `drawer`, `toaster`, `dropzone` | Playground + VisualMatrix + scenario-файлы в `examples/`; `tests/InteractionTest` + `tests/Controlled` | `rendering` (8–12) + `interaction` (file upload / DnD / viewport resize — до 6) + `keyboard` (любой пункт из закрытого списка e2e §«keyboard.spec» — обычно Escape + multi-step focus management) | 5–8 (+ before/after на ключевую интеракцию) | `index.mdx` + `<sub>.mdx` + patterns |

Все числа в таблице — **ориентир минимума**, а не cap. Реальный объём stories / тестов / снимков диктуется поверхностью публичного API компонента: каждый публично значимый prop / state / scenario получает покрытие. Превышение ориентира допустимо, если каждый дополнительный артефакт проходит критерий обоснованности (ниже).

## Критерий обоснованности артефакта

Это единый чек-вопросник для решения «нужна ли эта story / этот test / этот snapshot». Применяется одинаково к stories ([stories-standard.md](./stories-standard.md)), Playwright-тестам ([e2e-testing-standard.md](./e2e-testing-standard.md)) и visual baselines ([visual-regression-standard.md](./visual-regression-standard.md)).

Артефакт обоснован тогда и только тогда, когда выполнены **все три** условия:

1. **Проверяет что-то новое из публичной поверхности.** Покрывает либо публичный prop / state / scenario, либо browser-specific поведение, либо уникальный визуальный кадр. Перепроверка одного и того же значения одной оси — не новое.
2. **Не получается тем же эффектом из уже существующего артефакта.** Если эффект достижим выставлением `args` у Playground (включая URL-args в `gotoStory`), добавлением строки/колонки в `StoryTable` VisualMatrix, либо ассертом в существующей play-функции — артефакт лишний.
3. **Не дублирует другой слой.** Behavioral (click/keyboard/focus/callback) живёт в play, статика осей — в VisualMatrix, props propagation — в `rendering.spec.ts` параметризованным тестом. Один и тот же факт не проверяется в двух местах.

Если хотя бы одно условие нарушено — артефакт не заводится. Запрещённые паттерны, попадающие под нарушения (axis-per-file stories, axis-per-test loops, per-view × per-state cartesian в visual, дубли play в interaction.spec), перечислены в соответствующих rules-файлах.

`interaction.spec.ts` / `keyboard.spec.ts` заводятся **только** если есть browser-specific assertion'ы, которые нельзя сделать в Storybook play (см. [e2e-testing-standard.md](./e2e-testing-standard.md)). Behavioral assertions (click, keyboard, focus, callback) живут в `tests/<Name>.InteractionTest.stories.tsx::play` и валидируются через `pnpm test:stories` (Storybook Test Runner).

## Как определить tier

1. **Сколько публичных компонентов?** 1 → XS/S/M. 2+ → L/XL.
2. **Есть ли внутреннее состояние (sort/filter/select)?** Нет → XS/S/M. Да → XL.
3. **Есть ли полиморфизм (`as`) или несколько слотов (`icon`, `counter`, …)?** Нет → XS/S. Да → M+.
4. **Keyboard navigation / focus trap / ARIA роли?** Да → L+.
5. **Асинхронные данные (network / MSW)?** Да → XL.

## Tier → что создавать (короткий чек-лист)

### XS (Avatar-like)
- stories: **Playground + VisualMatrix** (2 файла).
- Playwright: `rendering.spec.ts` (1 test — smoke render).
- visual: 1 (VM).
- docs: 1 MDX + demo + Storybook/Figma embed.

### S (Badge-like)
- stories: **Playground + VisualMatrix + `tests/InteractionTest`** (если есть click/keyboard поведение).
- Playwright: `rendering.spec.ts` (2–3 теста — render + props propagation для 1–2 ключевых значений). `interaction`/`keyboard` НЕ заводим — всё в play.
- visual: 3 (VM + hover + focus).
- docs: 1 MDX + demo + Storybook/Figma embed.

### M (Button-like)
- stories: **Playground + VisualMatrix + `tests/InteractionTest`** (+ `examples/Polymorphic` если `as`). Клик и клавиатура объединены в один экспорт `InteractionTest` со step'ами.
- Playwright: `rendering.spec.ts` (3–5), `polymorphism.spec.ts` (если `as`). `interaction`/`keyboard` — только если есть browser-specific (rel-injection, focus-visible vs focus).
- visual: 4 (VM + hover + focus + pressed). **Один** hover-snapshot, не per-view.
- docs: Do/Don't table обязательна.

### L (Tabs-like)
- stories: `Playground` + `VisualMatrix` parent + scenario-композиции в `examples/`; `tests/InteractionTest` + опц. `tests/Controlled`.
- Playwright: `rendering.spec.ts` (5–8 — render + ARIA роли + параметризация subcomponent-вариантов через args), `interaction.spec.ts` (focus-trap / scroll-lock — 2–4 теста, при наличии), `keyboard.spec.ts` (при roving tabindex или focus-trap — пункты 1–2 закрытого списка из e2e §«keyboard.spec»).
- visual: 4–5 (VM + 1–2 portal-snapshot типа `open.png`).
- docs: корневой `index.mdx` + `docs/<sub>.mdx` для каждого публичного субкомпонента.

### XL (Table-like)
- stories: scenario-driven в `examples/` (`SortableByName`, `FilteredByCategory`, `PaginatedPage2`) + Playground + VisualMatrix; интеракционные сценарии — в `tests/`.
- Playwright: `rendering.spec.ts` (8–12, scenario-driven render), `interaction.spec.ts` (file upload / DnD / viewport resize — до 6), `keyboard.spec.ts` (любой пункт 1–4 из e2e §«keyboard.spec»; обычно Escape closes layered portals + multi-step focus management).
- visual: 5–8 (VM + before/after на ключевую интеракцию).
- docs: корневой + субкомпоненты + `patterns/<name>-patterns.mdx`.

## Анти-правила

- **Не** генерируй декартовы матрицы ради полноты. VisualMatrix покрывает оси компонента осмысленно — ключевые комбинации, а не каждое значение каждой оси с каждым значением каждой другой. Объём диктуется тем, какие комбинации действительно различимы визуально / актуальны.
- **Не** добавляй story-per-axis / story-per-state (`Sizes`, `Appearances`, `LoadingState`) — это прямой путь к сотням stories. Используй `argTypes` Playground-а + строки/колонки `StoryTable` в VisualMatrix.
- **Не** опускай play-функции у Playground и test-stories — даже однострочный `toBeVisible()` лучше, чем пустая story.
- **Не** понижай tier ради упрощения. Если компонент реально сложный — весь чек-лист обязателен.
- **Не** заводи отдельные spec'и `url-args.spec.ts` / `states.spec.ts` / `dimensions.spec.ts` — их роль отдана `rendering.spec.ts` и visual regression.

## Coverage gate

Независимо от tier'а каждый компонентный пакет обязан проходить per-package coverage gate **lines/stmts ≥ 80%, funcs ≥ 75%, branches ≥ 70%**. Команды и исключения — в [coverage-standard.md](./coverage-standard.md). Если тестов набора для tier'а не хватает до порога — добавляй play-step'ы в существующий `InteractionTest` либо новый сценарий в `examples/`/`tests/`, а не понижай порог.

## Связанные правила

- [reference-package-anatomy.md](./reference-package-anatomy.md) — общая структура пакета.
- [stories-standard.md](./stories-standard.md) — формат stories.
- [e2e-testing-standard.md](./e2e-testing-standard.md) — блоки E2E по tier.
- [visual-regression-standard.md](./visual-regression-standard.md) — набор visual snapshots по tier.
- [docs-structure.md](./docs-structure.md) — структура MDX по tier.
- [coverage-standard.md](./coverage-standard.md) — пороги coverage и команды.
