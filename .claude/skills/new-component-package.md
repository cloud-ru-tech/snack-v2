# Skill: new-component-package

**Триггеры:** «добавить компонент», «новый пакет», «portировать из storybook/», «создать пакет `@ds/...`».

Скилл создаёт новый компонентный пакет в монорепо, совместимый с эталоном `@ds/button`.

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
   Ответить на prompts (name, componentName). Скрипт создаёт `packages/<name>/src/<Name>/*`, обновляет wire-точки (`tsconfig`, `storybook/main.ts`, `astro.config.mjs`).

2. **Подгонка `src/`** — если tier M+, заменить flat-структуру на nested `components/<Name>/`. См. [package-src-structure.md](../rules/package-src-structure.md).

3. **Figma**
   - Если `figmaNodeId` дан — запустить skill [figma-component-import](./figma-component-import.md) → карта axes → `constants.ts`/`types.ts`.
   - Добавить `FIGMA_<NAME>` в `apps/docs/src/lib/figma.ts`.

4. **Stories** — skill [component-story-set](./component-story-set.md) по tier'у.

5. **E2E** — skill [component-e2e-tests](./component-e2e-tests.md).

6. **Visual regression** — skill [component-visual-regression](./component-visual-regression.md).

7. **Docs** — skill [component-docs](./component-docs.md).

8. **Генерация артефактов**
   ```bash
   pnpm gen        # props + README
   pnpm typecheck
   pnpm lint
   pnpm stylelint
   ```

9. **Верификация**
   - Открыть `pnpm dev:storybook`, пройти все новые stories.
   - Открыть `pnpm dev:docs`, убедиться, что страница пакета рендерится и Storybook/Figma embed работает.
   - Запустить `pnpm test:stories` и `pnpm test:e2e` для нового пакета.

10. **Аудит** — skill [component-tier-audit](./component-tier-audit.md) для проверки соответствия эталону.

## Что **не** делает скилл

- Не генерирует сам компонент. Компонент пишется вручную после scaffold.
- Не пушит в git. Только scaffold + артефакты.

## Связанное

- [reference-package-anatomy.md](../rules/reference-package-anatomy.md)
- [complexity-tiers.md](../rules/complexity-tiers.md)
