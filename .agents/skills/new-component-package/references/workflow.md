# Skill: new-component-package

Скилл создаёт новый компонентный пакет в монорепо.

## Ввод

- `name` — kebab-case имя пакета (`my-card`).
- `componentName` — PascalCase имя компонента (`MyCard`).
- `tier` — XS / S / M / L / XL (см. [complexity-tiers.md](complexity-tiers.md)).
- (опционально) `figmaNodeId` — если есть Figma-узел.

## Шаги

1. **Scaffold**
   ```bash
   pnpm add-package
   ```
   Запусти команду через PTY и передай имя пакета и параметры в интерактивных запросах. Если PTY недоступен, создай файлы вручную по [анатомии пакета](reference-package-anatomy.md#обязательные-файлы-и-папки) и обнови [точки подключения](reference-package-anatomy.md#wire-точки-обновляются-pnpm-add-package). После обоих вариантов проверь конфигурации TypeScript и манифест Storybook.

2. **Структура src.** Выбери раскладку по составу публичных компонентов и [правилам структуры](../../component-development/references/package-src-structure.md).

3. **Figma**
   - Если `figmaNodeId` дан — запустить skill [Оси и варианты Figma](../../figma-inspection/references/component-axes.md) → карта axes → `constants.ts`/`types.ts`.
   - Добавить ключ пакета в `FIGMA_NODES` в `apps/docs/src/lib/figma.ts` (см. [figma-integration.md](../../figma-inspection/references/figma-integration.md)).
   - Если узла нет / приватный пакет — на meta stories поставить `parameters: { figma: { disable: true } }`, чтобы скрыть Figma-таб в Storybook bottom-panel.

4. **Stories.** Подготовь Playground и VisualMatrix по [component-story-set](../../component-story-set/SKILL.md).

5. **E2E.** Подготовь применимые specs по [component-e2e-tests](../../component-e2e-tests/SKILL.md). Затем обнови снимки пакета по [стандарту](../../component-e2e-tests/references/visual-regression-standard.md), если визуальные specs готовы.

6. **Docs** — skill [component-docs](../../component-docs/SKILL.md).

7. **Генерация артефактов** (селективно — см. [fast-build-commands.md](../../component-validation/references/fast-build-commands.md))
   ```bash
   pnpm gen                                             # props + README
   pnpm build:pkg <pkg>                                  # быстрый incremental build одного пакета
   pnpm typecheck
   pnpm exec eslint --fix packages/<pkg>
   pnpm exec stylelint --fix "packages/<pkg>/**/*.scss"
   ```

8. **Верификация**
   - Открыть `pnpm dev:storybook`, пройти все новые stories.
   - Открыть `pnpm dev:docs`, убедиться, что страница пакета рендерится и Storybook/Figma embed работает.
   - Запустить `pnpm test:stories` и `pnpm test:e2e:chrome packages/<pkg>` для нового пакета.

9. **Аудит и валидация**
   - [проверка структуры](../../component-validation/references/tier-audit.md) — проверить соответствие эталону (нет запрещённых stories/specs).
   - [проверка готовности](../../component-validation/references/readiness.md) — Figma parity + runtime сверка + wire-up.

## Что **не** делает скилл

- Не генерирует сам компонент. Компонент пишется вручную после scaffold.
- Не пушит в git. Только scaffold + артефакты.

## Подводные камни

Детали — в правилах:

- не уплощай `src/` при портировании из `storybook/` (1:1, без dot-prefix) — [package-src-structure.md](../../component-development/references/package-src-structure.md)
- обнови все wire-точки (tsconfig references ×3 + dep в `apps/storybook`), иначе alias `@ds/<pkg>` не резолвится; `pnpm add-package` делает это сам — [reference-package-anatomy.md](reference-package-anatomy.md)
- нет `react`/`react-dom`/`@types/react*` в `package.json`, версии по [packages-deps.md](packages-deps.md)
- группа (домен) в сайдбаре docs/Storybook выводится из префикса имени пакета — отдельных действий не нужно
- категория **внутри** домена — ручной шаг: впиши пакет в `apps/docs/src/config/categories.ts` (`CATEGORIES_BY_DOMAIN`), иначе он упадёт в «Other» (build-warn) — [docs-structure.md](../../component-docs/references/docs-structure.md) §«Категории внутри домена»

## Связанное

- [reference-package-anatomy.md](reference-package-anatomy.md)
- [complexity-tiers.md](complexity-tiers.md)
