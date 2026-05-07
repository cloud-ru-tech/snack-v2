# Skill: new-component-package

**Триггеры:** «добавить компонент», «новый пакет», «portировать из storybook/», «создать пакет `@ds/...`».

Скилл создаёт новый компонентный пакет в монорепо.

## Ввод

- `name` — kebab-case имя пакета (`my-card`).
- `componentName` — PascalCase имя компонента (`MyCard`).
- `tier` — XS / S / M / L / XL (см. [complexity-tiers.md](../rules/complexity-tiers.md)).
- (опционально) `figmaNodeId` — если есть Figma-узел.

## Шаги

1. **Scaffold**
   ```bash
   pnpm add-package
   ```
   Ответить на prompts (name, componentName). Скрипт создаёт `packages/<name>/src/<Name>/*`, обновляет wire-точки (`tsconfig`, `storybook/main.ts`; для docs — `astro.config.mjs`, алиасы `@ds/*` из `packages/`).

2. **Подгонка `src/`** — если tier M+, заменить flat-структуру на nested `components/<Name>/`. См. [package-src-structure.md](../rules/package-src-structure.md).

3. **Figma**
   - Если `figmaNodeId` дан — запустить skill [figma-component-import](./figma-component-import.md) → карта axes → `constants.ts`/`types.ts`.
   - Добавить ключ пакета в `FIGMA_NODES` в `apps/docs/src/lib/figma.ts` (см. [figma-integration.md](../rules/figma-integration.md)).
   - Если узла нет / приватный пакет — на meta stories поставить `parameters: { figma: { disable: true } }`, чтобы скрыть Figma-таб в Storybook bottom-panel.

4. **Stories + baselines** — skill [component-story-set](./component-story-set.md). Финальным шагом генерит visual baselines (`pnpm test:e2e:update-snapshots`) — отдельно скилл visual-regression не запускается.

5. **E2E** — skill [component-e2e-tests](./component-e2e-tests.md). Набор spec-файлов: `rendering.spec.ts` + по tier'у `interaction`, `keyboard`, `polymorphism`.

6. **Docs** — skill [component-docs](./component-docs.md).

7. **Генерация артефактов** (селективно — см. [fast-build-commands.md](../rules/fast-build-commands.md))
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
   - [component-tier-audit](./component-tier-audit.md) — проверить соответствие эталону (нет запрещённых stories/specs).
   - [component-validation-loop](./component-validation-loop.md) — Figma parity + runtime сверка + wire-up.

## Что **не** делает скилл

- Не генерирует сам компонент. Компонент пишется вручную после scaffold.
- Не пушит в git. Только scaffold + артефакты.

## Связанное

- [reference-package-anatomy.md](../rules/reference-package-anatomy.md)
- [complexity-tiers.md](../rules/complexity-tiers.md)
