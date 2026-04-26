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
   - `stories/<Name>/`: минимум Playground + VisualMatrix.
   - `demos/<Name>Demo.tsx`.
   - `docs/index.mdx` + `docs/props.json`.
   - Корневой `README.md` (автоген).

3. **Проверить stories по tier'у** — минимум файлов (см. [complexity-tiers.md](../rules/complexity-tiers.md)).

4. **Проверить E2E**:
   - `tests/storybook/<name>.spec.ts` существует.
   - Блоки `describe` по tier'у есть (см. [e2e-testing-standard.md](../rules/e2e-testing-standard.md)).

5. **Проверить visual**:
   - `tests/visual/<name>.spec.ts` существует.
   - Baselines PNG в `<name>.spec.ts-snapshots/` не пустая папка.

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
   - Каждая ось из `constants.ts` покрыта в VisualMatrix.
   - Если в Figma есть фиксированные размеры — в E2E есть `Dimensions` блок.

## Вывод

Markdown-отчёт:

```markdown
# Audit: @ds/<name>

**Tier:** M (определён по: есть `as` polymorphism, 4 оси, loading/disabled)

## ✅ Соответствует
- src/ структура ок
- Playground + 8 use-case stories
- E2E rendering + states + accessibility

## ⚠️ Частично
- VisualMatrix покрывает 3 из 4 осей — нет блока `Composition × Size`
- docs/index.mdx: отсутствует секция `## Do / Don't` (обязательна)

## ❌ Отсутствует
- `tests/visual/<name>.spec.ts` — нет visual regression
- `FIGMA_<NAME>` в `apps/docs/src/lib/figma.ts`
- ClickTest.stories.tsx (обязателен для tier M)

## Рекомендации
1. Добавить VisualMatrix-блок Composition × Size — см. Button.VisualMatrix.
2. Добавить Do/Don't секцию в index.mdx (минимум 4 пары).
3. Завести `FIGMA_<NAME>` — запустить skill figma-component-import.
4. Сгенерить visual-тесты — запустить skill component-visual-regression.
5. Добавить ClickTest с onClick: fn() + keyboard tests.
```

## Что **не** делает

- Не вносит изменения — только отчёт.
- Не запускает tests — только проверяет наличие файлов и структуру.

## Связанное

- [reference-package-anatomy.md](../rules/reference-package-anatomy.md)
- [complexity-tiers.md](../rules/complexity-tiers.md)
- Все остальные skills — ссылается на них в рекомендациях.
