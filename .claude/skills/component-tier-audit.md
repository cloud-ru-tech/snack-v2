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
   - `src/`: `Name.tsx`, `constants.ts`, `index.ts`, `styles.module.scss`, `types.ts`, опционально `utils.ts`.
   - `stories/<Name>/`: минимум `Playground.stories.tsx` + `VisualMatrix.stories.tsx`.
   - `demos/<Name>Demo.tsx`.
   - `docs/index.mdx` + `docs/props.json`.
   - Корневой `README.md` (автоген).

3. **Проверить stories** — по [stories-standard.md](../rules/stories-standard.md):
   - Есть `Playground` (все пропсы в `argTypes`) и `VisualMatrix` (все оси в `StoryTable`).
   - Нет **запрещённых** файлов (`<Name>.Sizes`, `<Name>.Appearances`, `<Name>.Views`, `<Name>.LoadingState`, `<Name>.DisabledState`, `<Name>.WithIcon`, `<Name>.IconOnly`, `<Name>.WithCounter`) — если есть, пометить как дубликаты VisualMatrix.
   - Доп. файлы оправданы правилом «Когда заводить дополнительный файл».
   - Нет inline-стилей `style={{ ... }}`, нет `React.*`-типов, нет `import type`.

4. **Проверить E2E** — по [e2e-testing-standard.md](../rules/e2e-testing-standard.md):
   - Структура: `packages/<pkg>/__test__/<ComponentName>/` — группировка по компоненту (зеркалит `stories/<ComponentName>/`). Тесты плоско в корне `__test__/` — признак устаревшей раскладки, пометить для переноса.
   - Файлы внутри папки компонента: `rendering.spec.ts` + по tier'у `interaction.spec.ts`, `keyboard.spec.ts`, `polymorphism.spec.ts` (если `as`). Без префикса имени пакета/компонента.
   - **Нет** файлов `url-args.spec.ts`, `states.spec.ts`, `dimensions.spec.ts` — если есть, пометить для удаления (их роль отдана `rendering.spec.ts` и visual regression).
   - В `rendering.spec.ts` есть describe-блоки `render`, `states`, `props propagation` (для M+).

5. **Проверить visual**:
   - `packages/<pkg>/__test__/<ComponentName>/visual.spec.ts` существует.
   - Baselines PNG в `packages/<pkg>/__test__/<ComponentName>/__snapshots__/` не пустая папка. Старые baseline'ы в `packages/<pkg>/__snapshots__/` (flat) — признак устаревшей раскладки.
   - Имена PNG без префикса компонента: `visual-matrix.png`, а не `<pkg>-visual-matrix.png`.
   - Набор снимков соответствует [visual-regression-standard.md](../rules/visual-regression-standard.md): matrix + responsive + (по tier'у) hover/focus/pressed/placement. Нет static-снимков per-use-case, дублирующих VisualMatrix.

6. **Проверить docs**:
   - Все обязательные секции в `index.mdx` (см. [docs-structure.md](../rules/docs-structure.md)).
   - `<StorybookEmbed>` и `<FigmaEmbed>` (если tier > XS) присутствуют.
   - `FIGMA_<NAME>` в `apps/docs/src/lib/figma.ts` (если применимо).

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
- `FIGMA_<NAME>` в `apps/docs/src/lib/figma.ts`

## Рекомендации
1. Расширить VisualMatrix секцией Composition × Size, удалить Sizes.stories.tsx.
2. Сложить states в describe-блок в rendering.spec.ts, удалить url-args/dimensions specs.
3. Перегенерить baselines: `pnpm test:e2e:update-snapshots`.
4. Добавить Do/Don't секцию в index.mdx (минимум 4 пары).
5. Завести `FIGMA_<NAME>` — запустить skill figma-component-import.
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
