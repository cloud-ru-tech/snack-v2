# Skill: component-tier-audit

**Триггеры:** «проверь эталонность», «обнови под эталон», «аудит пакета», «сравни с Button».

Скилл проверяет соответствие пакета анатомии эталона для своего tier'а и возвращает `diff` — что добавить / удалить / исправить.

## Ввод

- Путь к пакету `packages/<name>`.
- (опционально) явный tier — иначе выводится из API.

## Шаги

1. **Определить tier** — по [complexity-tiers.md](../rules/complexity-tiers.md):
   - Посчитать оси в `constants.ts`.
   - Проверить наличие `as` prop в `types.ts`.
   - Посчитать публичные субкомпоненты в `src/*`.

2. **Проверить структуру** — по [reference-package-anatomy.md](../rules/reference-package-anatomy.md):
   - `src/`: `Name.tsx`, `constants.ts` (с `TEST_IDS` если компонент сам ставит id на внутренние слоты), `index.ts`, `styles.module.scss`, `types.ts`, опционально `utils.ts`.
   - `stories/<Name>/`: минимум `Playground.stories.tsx` + `VisualMatrix.stories.tsx`. Подпапки `examples/` и `tests/` — **только если** в них что-то есть.
   - `demos/<Name>Demo.tsx` (если Canvas-демо уместен для пакета).
   - `docs/index.mdx` + `docs/props.json`.
   - Корневой `README.md` (автоген).

3. **Проверить stories** — по [stories-standard.md](../rules/stories-standard.md):
   - Есть `Playground` (все пропсы в `argTypes`) и `VisualMatrix` (все оси в `StoryTable`).
   - Нет **запрещённых** файлов (`<Name>.Sizes`, `<Name>.Appearances`, `<Name>.Views`, `<Name>.Variants`, `<Name>.LoadingState`, `<Name>.DisabledState`, `<Name>.EmptyState`, `<Name>.WithIcon`/`IconOnly`/`WithCounter` если это просто включение слота, `<Name>.ClickTest`, `<Name>.KeyboardTest`) — если есть, пометить как дубликаты VisualMatrix или сливаемые в `InteractionTest`.
   - Доп. файлы оправданы «Критерием обоснованности артефакта» из [complexity-tiers.md](../rules/complexity-tiers.md) (3 условия) и лежат в правильной подпапке (`examples/` — копируется в продакшн-код, `tests/` — только тест-обвязка).
   - Title подпапочных story содержит сегмент `/Examples/<Scenario>` или `/Tests/<Scenario>`; нет тега `fixture`, нет дублей между `examples/` и `tests/`.
   - Story IDs в `packages/<pkg>/__test__/<Name>/helpers.ts` соответствуют актуальным title'ам (после переезда между корнем и подпапкой обязательно обновляются — иначе 404 в e2e).
   - Для trigger-based компонентов — соответствие [trigger-based-stories.md](../rules/trigger-based-stories.md).
   - Нет inline-стилей `style={{ ... }}`, нет `React.*`-типов, нет `import type`.

4. **Проверить E2E** — по [e2e-testing-standard.md](../rules/e2e-testing-standard.md):
   - Структура: одна папка `packages/<pkg>/__test__/<ParentComponent>/` на parent-компонент. Сабкомпоненты варианта parent'а — параметризацией через args. Отдельная папка автономного компонента — только если он импортируется самостоятельно и имеет собственный публичный API (см. e2e §«Папка тестов пакета»).
   - Файлы: `rendering.spec.ts` обязателен; `interaction.spec.ts` / `keyboard.spec.ts` — **только** под пункты из закрытых списков browser-specific (e2e §«interaction.spec.ts») и kbd-сценариев (§«keyboard.spec.ts»); `polymorphism.spec.ts` — если `as`. Behavioral assertion'ы (click/keyboard/focus/callback) — в `stories/<Name>/tests/<Name>.InteractionTest.stories.tsx::play`, не в Playwright.
   - **Нет** файлов `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts` — их роль отдана `rendering.spec.ts` (props propagation параметризованным тестом) и visual regression.
   - В `rendering.spec.ts` нет axis-per-test loop (`for (const v of Object.values(ENUM))`) — только параметризация по ключевой выборке `KEY_COMBOS`.
   - В helpers.ts story IDs представлены как StoryRef-объекты, не хардкод-строки. `gotoStory` вызывается только через `buildStoryOptions(...)`.

5. **Проверить visual**:
   - `packages/<pkg>/__test__/<ParentComponent>/visual.spec.ts` существует.
   - Baselines PNG в `packages/<pkg>/__test__/<ParentComponent>/__snapshots__/` не пустая папка. Старые baseline'ы в `packages/<pkg>/__snapshots__/` (flat) — признак устаревшей раскладки.
   - Имена PNG без префикса компонента: `visual-matrix.png`, а не `<pkg>-visual-matrix.png`. Дополнительно допустимы канонические имена: `interaction-states.png`, `<axis>-state-matrix.png` (где `<axis>` ∈ {`appearance`, `view`, `size`, `placement`, `orientation`, `variant`}), `placements.png` / `widths.png` / `modes.png`, `open-<scenario>.png`. Другие имена — повод для вопроса в PR.
   - Нет per-state раздельных PNG (`hover.png` + `focus.png` + `pressed.png`) — заменяется `interaction-states.png` через `assertInteractionStatesSnapshot`.
   - Нет per-view × per-state cartesian, нет per-axis snapshot (`size-s.png`, …), нет portal content без триггера/окружения в кадре.
   - Каждый дополнительный снимок проходит «Критерий обоснованности артефакта».

6. **Проверить docs**:
   - Все обязательные секции в `index.mdx` (см. [docs-structure.md](../rules/docs-structure.md)).
   - `<StorybookEmbed>` и `<FigmaEmbed>` (если tier > XS) присутствуют.
   - Ключ пакета в `FIGMA_NODES` в `apps/docs/src/lib/figma.ts` (если применимо).

7. **Проверить API**:
   - `constants.ts` — `as const` объекты без TypeScript `enum`.
   - `types.ts` — `ValueOf<typeof X>` для каждой оси.
   - JSDoc на каждом поле пропса (для docgen).
   - Нет `React.*` (см. [react-types.md](../rules/react-types.md)).
   - Нет `import type` / `export type` (см. [imports-exports.md](../rules/imports-exports.md)).

8. **Проверить Figma-соответствие**:
   - Каждая ось из `constants.ts` покрыта в VisualMatrix (строкой или колонкой).
   - Каждая ось покрыта в `rendering.spec.ts` → describe `props propagation` (assertion на `data-<axis>`).

## Вывод

Markdown-отчёт:

```markdown
# Audit: @ds/<name>

**Tier:** M (определён по: есть `as` polymorphism, 4 оси, loading/disabled)

## ✅ Соответствует
- src/ структура ок
- Playground + VisualMatrix присутствуют
- E2E rendering + interaction + keyboard

## ⚠️ Частично
- VisualMatrix покрывает 3 из 4 осей — нет секции `Composition × Size`
- docs/index.mdx: отсутствует секция `## Do / Don't` (обязательна)

## ❌ Дубликаты / устаревшее (к удалению)
- `<Name>.Sizes.stories.tsx` — дублирует VisualMatrix (строка Size)
- `<Name>.LoadingState.stories.tsx` — дублирует VisualMatrix (state × appearance)
- `<pkg>.url-args.spec.ts` — переложить в `rendering.spec.ts → describe('props propagation')`
- `<pkg>.dimensions.spec.ts` — удалить; parity по высоте ловится VisualMatrix baseline

## ❌ Отсутствует
- Ключ пакета в `FIGMA_NODES` в `apps/docs/src/lib/figma.ts`

## Рекомендации
1. Расширить VisualMatrix секцией Composition × Size, удалить Sizes.stories.tsx.
2. Сложить states в describe-блок в rendering.spec.ts, удалить url-args/dimensions specs.
3. Перегенерить baselines: `pnpm test:e2e:update-snapshots`.
4. Добавить Do/Don't секцию в index.mdx (минимум 4 пары).
5. Завести ключ в `FIGMA_NODES` — запустить skill figma-component-import.
```

## Что **не** делает

- Не вносит изменения — только отчёт.
- Не запускает tests — только проверяет наличие файлов и структуру.

## Связанное

- [reference-package-anatomy.md](../rules/reference-package-anatomy.md)
- [complexity-tiers.md](../rules/complexity-tiers.md)
- [stories-standard.md](../rules/stories-standard.md)
- [e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- [visual-regression-standard.md](../rules/visual-regression-standard.md)
