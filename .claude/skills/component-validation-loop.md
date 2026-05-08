# Skill: component-validation-loop

**Триггеры:** «проверь готовность компонента», «запусти цикл валидации», «сверь реализацию», после фазы имплементации любого пакета `packages/*`, финал миграции из `/migrate-to-v2`.

Сквозной итеративный цикл сверки готовности компонентного пакета. Не переписывает артефакты — **делегирует** в профильные скилы и правила, сам отвечает только за **порядок проходов, чек-листы соответствия, реестр расхождений и остановки**.

## Границы скилла

Скилл **не генерирует** stories/tests/docs/scss с нуля. Для этого есть:
- [new-component-package](./new-component-package.md) — создать пакет.
- [figma-component-import](./figma-component-import.md) — карта Figma axes → `constants.ts`/`types.ts`.
- [figma-to-code](./figma-to-code.md) — декодинг слоёв (`stateLayer/`, `focusedFrame/`, `material/`) в DOM+SCSS.
- [figma-selected-block](./figma-selected-block.md) — SCSS выделенного слоя с токенами (CSS-in / REST-in).
- [component-story-set](./component-story-set.md) — Playground + VisualMatrix, финальным шагом снимает visual baselines.
- [component-e2e-tests](./component-e2e-tests.md) — Playwright specs по tier'у.
- [component-docs](./component-docs.md) — `docs/index.mdx` + `demos/`.
- [component-tier-audit](./component-tier-audit.md) — сверка с эталоном по tier'у.

Если на любой стадии находится пробел — **вызывать соответствующий скилл**, а не фиксить руками прямо здесь.

## Ввод

- Путь к пакету `packages/<pkg>` и его tier (XS/S/M/L/XL — см. [complexity-tiers.md](../rules/complexity-tiers.md)).
- План миграции `.claude/plan/<pkg>.md` (если пакет пришёл из `/migrate-to-v2`) — берётся как источник истины по scope и decisions.
- Figma nodeId'ы (master + ключевые variants + mobile, если есть) и константа `FIGMA_<PKG>` в `apps/docs/src/lib/figma.ts`.
- (опционально) путь к legacy-источнику из `.claude/plan/<pkg>.md` секция «Legacy источники».

## 5 стадий

### Стадия 1 — Scope & decisions validation

**Цель:** убедиться, что реализация не разошлась с «Зафиксированными решениями» плана и с текущим состоянием Figma.

1. Прочитать `.claude/plan/<pkg>.md` (если есть) — разделы «Зафиксированные решения», «Scope и публичное API», «Маппинг зависимостей».
2. Прочитать `packages/<pkg>/src/index.ts` + `constants.ts` + `types.ts` — сверить с планом (оси, публичные компоненты/хуки/типы).
3. `mcp__figma-remote-mcp__get_metadata` по мастер-ноде → сверить variant-оси с `constants.ts`.
4. **Любое расхождение scope ↔ код ↔ Figma — блокирующий вопрос пользователю**, а не авто-решение (та же норма, что в `/migrate-to-v2` п. «Reconcile Figma ↔ legacy»). Если план молчит о нужной оси — остановиться, обновить план, дождаться подтверждения.

**Выход:** подтверждённый актуальный scope. Если плана нет — вынуть API-skeleton прямо из кода и пометить, что валидация идёт без плана.

### Стадия 2 — Figma parity (слои, токены, состояния)

Применяется для каждого ключевого Figma nodeId (master + state-master + mobile + ключевые variants).

Источники правил:
- [figma-to-code](./figma-to-code.md) — словарь «слой → DOM → SCSS».
- [figma-integration.md](../rules/figma-integration.md) — карта `Figma variant → React prop`, формат `FIGMA_NODES`.
- [figma-to-code.md (rule)](../rules/figma-to-code.md) — чеклист перед коммитом.
- `packages/materials/docs/index.mdx` — миксины `has-state-layer-as-child`, `with-material`.

**Чек-лист соответствия Figma ↔ код:**

- [ ] `stateLayer/<group>/<role>` → `<span className={styles.stateLayer} data-state='<group><Role>' aria-hidden />` + `@use '@design-system/materials' as m; @include m.has-state-layer-as-child(stateLayer);` на SCSS-корне.
      Допустимые `data-state` (camelCase, строго из списка): `regularFilled`, `regularBorder`, `activatedFilled`, `activatedBorder`, `onColorFilled`, `onAccentFilled`.
- [ ] `focusedFrame/...` (hidden=true в Figma) → **не** DOM, только `&:focus-visible { outline: ...; outline-offset: ...; }` на интерактивном корне.
- [ ] `material/<appearance><Level>` → `<span className={styles.acrylic} data-acrylic-appearance='...' data-acrylic-level='...' aria-hidden />` + `@include m.with-material('acrylic', #{acrylic});`.
- [ ] Интерактивный корень, использующий `has-state-layer-as-child` / `with-material`, имеет `position: relative`; дочерние `.stateLayer` / `.acrylic` — `position: absolute; inset: 0; pointer-events: none; border-radius: inherit`.
- [ ] Все цвета/spacing/radius/typography из SCSS — через `base.$sn-*` либо `@include base.composite-var(...)`. Захардкоженных `px`/`rem`/`#hex`/`rgba()` нет (или каждая — с пояснением в комментарии). При сомнении по конкретному слою — прогнать [figma-selected-block](./figma-selected-block.md).
- [ ] Все variant-оси узла → есть в `constants.ts` (`as const`) + тип в `types.ts` (`ValueOf<typeof …>`). См. [component-api-surface.md](../rules/component-api-surface.md).
- [ ] Все оси покрыты в `VisualMatrix.stories.tsx` как строки/колонки `StoryTable`. См. [stories-standard.md](../rules/stories-standard.md).
- [ ] Figma-typos (`iconAfrer`, …) → каноническое имя в `constants.ts` + сноска `// Figma variant: <typo>`.
- [ ] `FIGMA_<PKG>` + нужные суб-константы добавлены в `apps/docs/src/lib/figma.ts`.

Если критических расхождений >3 — остановиться, отправить в [figma-component-import](./figma-component-import.md) или [figma-to-code](./figma-to-code.md), повторить стадию.

### Стадия 3 — Runtime screenshot сверка

Ловит то, что не видно статическим анализом: инверсию цветов, сдвиги, mobile/desktop scale.

Для каждого ключевого состояния (Playground + VisualMatrix + сценарные stories + mobile):

1. `mcp__figma-remote-mcp__get_screenshot` на nodeId → референс PNG.
2. Снять скриншот story (Playwright fixture `page.locator('#storybook-root').screenshot()` или MCP playwright).
3. Сверка по 4 классам расхождений:

| Класс | Типичный кейс | Фикс |
|-------|---------------|------|
| Цветовая роль инвертирована | «current» светлый, «completed» тёмный, хотя должно быть наоборот | Swap `primary-accent` ↔ `primary-decor`; текст на accent → `neutral-onAccent`. |
| Позиционирование индикатора | `.status` прилип к левому краю | `top: 50%; left: 50%; transform: translate(-50%, -50%)`. |
| Размер/радиус | Bar 2px вместо 4px | Перемерить в Figma, зафиксировать через токен (`figma-selected-block`). |
| Mobile-scale | Mobile-компонент рендерится desktop-токенами | На корне `className={cn(getThemeClassnames({ density: 'comfort' }), styles.root, className)}`. |

Все расхождения → реестр с severity (critical / medium / low). **Critical блокирует Стадию 5.** Итерация с правками SCSS, пока screenshot не совпадёт (±low расхождения допустимы).

Полный набор visual-снимков покрывается [component-story-set](./component-story-set.md) → `pnpm test:e2e:update-snapshots`; не снимать baselines вручную. Формат визуальных спеков — [visual-regression-standard.md](../rules/visual-regression-standard.md).

### Стадия 4 — Stories / Tests / Docs runtime

Полнота артефактов — через [component-tier-audit](./component-tier-audit.md). Он возвращает diff относительно tier-эталона. Всё, что скилл-аудит помечает как missing → ставим задачу соответствующему скилу:

- Stories diff → [component-story-set](./component-story-set.md).
- E2E diff → [component-e2e-tests](./component-e2e-tests.md).
- MDX/demos diff → [component-docs](./component-docs.md).

**Runtime-проверки docs** (частые ошибки, которые tier-audit не ловит):

- [ ] `<PropsTable data={pkgDoc.<ComponentName>} />` — prop называется `data`, не `componentDoc`.
- [ ] `<StorybookEmbed storyId='components-<pkg>--<story>' />` — prop `storyId`, не `id`; story id совпадает с актуальным `title` stories ([stories-standard.md](../rules/stories-standard.md) раздел «Title — nesting по пакету»).
- [ ] `<FigmaEmbed node={FIGMA_<PKG>} />` работает (константа существует, `loading='lazy'` на iframe — по умолчанию).
- [ ] Каждый `<Example>` с React-пропсами, содержащими JSX (иконки, children-как-элементы), вынесен в `demos/examples/<Name>.tsx` и подключён через `import <Name>Src from '../demos/examples/<Name>.tsx?raw'` — иначе Astro MDX скомпилит JSX-проп в `astro:jsx` и React-компонент упадёт (см. [docs-structure.md](../rules/docs-structure.md)).
- [ ] Для render-prop компонентов demo не использует `<Canvas component={...} />` — обёртывает живой сценарий (`return <BasicFlow />`).
- [ ] `docs/props.json` свежий: `pnpm gen:props`.
- [ ] Открыть `http://localhost:4321/components/<pkg>` → чисто в консоли браузера и stderr Astro. Ошибка `Cannot read properties of undefined (reading 'props')` = неверный prop name в MDX.

**Runtime-проверки stories/tests:**

- [ ] `pnpm test:stories 2>&1 | tail -20` — зелёный (play-функции; поднимает Storybook, запускать в конце фазы).
- [ ] `pnpm test:e2e:chrome packages/<pkg> 2>&1 | tail -20` — зелёный (только нужный пакет).
- [ ] Visual baselines отсмотрены глазами (не blank, не с артефактами) — см. [visual-regression-standard.md](../rules/visual-regression-standard.md).

### Стадия 5 — Wire-up & build

Финальная сверка wire-точек и сборки. Точки перечислены в [reference-package-anatomy.md](../rules/reference-package-anatomy.md):

- [ ] `packages/tsconfig.esm.json` + `packages/tsconfig.cjs.json` — `references` на пакет.
- [ ] `apps/storybook/.storybook/main.ts` — alias `@ds/<pkg>` подхватывается автоматически (`collectDsAliases()` сканирует `packages/*/src/index.ts`). Ручной правки не требуется.
- [ ] `apps/storybook/package.json` — dep `"@ds/<pkg>": "workspace:*"`.
- [ ] `apps/docs/src/lib/figma.ts` — `FIGMA_<PKG>` (+ суб-константы для субкомпонентов).
- [ ] `packages/<pkg>/package.json` — строгие версии, без `react` / `react-dom` / `@types/react*`, повторяемые deps — через `catalog:` (см. [packages-deps.md](../rules/packages-deps.md)). `@design-system/materials` — добавлена, если используется state-layer / material / focused.
- [ ] Корневой `tsconfig.json` — noEmit-профиль, пакеты не перечисляет; typecheck идёт через `include`.

Команды (селективные по умолчанию — см. [fast-build-commands.md](../rules/fast-build-commands.md)):

```bash
pnpm deps
pnpm exec eslint --fix packages/<pkg>                2>&1 | tail -20
pnpm exec stylelint --fix "packages/<pkg>/**/*.scss" 2>&1 | tail -20
pnpm gen:props
pnpm gen:readme
pnpm build:pkg <pkg>                            2>&1 | tail -20   # быстрый incremental build одного пакета
pnpm typecheck                                  2>&1 | tail -20   # инкрементальный по .tsbuildinfo
pnpm test:e2e:chrome packages/<pkg>             2>&1 | tail -20
```

`pnpm test:stories` запускай в конце фазы stories, не на каждой итерации (поднимает Storybook).
Полный `pnpm build:packages` — только если правки задели shared-пакет (`@ds/utils`, `@design-system/materials` и т.п.) или wire-точки.

## Success criteria

Все пункты должны быть ✅:

- [ ] Scope кода совпадает с `.claude/plan/<pkg>.md` → «Зафиксированные решения»; несоответствий не осталось.
- [ ] Каждый Figma-слой `stateLayer/` / `material/` реализован через миксин `@design-system/materials`; `focusedFrame/` — через `:focus-visible`, не DOM.
- [ ] Все значения spacing/color/typography/radius в `*.module.scss` — через `base.$sn-*` или `@include base.composite-var(...)` (исключения задокументированы комментариями).
- [ ] Оси React API ↔ Figma variant metadata взаимно-однозначны.
- [ ] Screenshot story ≈ screenshot Figma (0 critical, ≤2 medium).
- [ ] Mobile-компонент (если есть) использует `getThemeClassnames({ density: 'comfort' })`.
- [ ] `component-tier-audit` diff пуст (или оставшиеся пункты задокументированы).
- [ ] `/components/<pkg>` открывается в docs без ошибок; Storybook embed и Figma embed работают.
- [ ] `pnpm typecheck` / `pnpm exec eslint packages/<pkg>` / `pnpm exec stylelint "packages/<pkg>/**/*.scss"` / `pnpm build:pkg <pkg>` / `pnpm test:stories` / `pnpm test:e2e:chrome packages/<pkg>` зелёные. Полный `build:packages` — только перед коммитом, если правки задели shared-пакеты или wire-точки.
- [ ] Все 4 wire-точки (tsconfig esm/cjs, storybook main, storybook package.json, docs figma.ts) обновлены.

## Реестр типовых ошибок

| # | Симптом | Стадия | Фикс |
|---|---------|--------|------|
| 1 | Scope plan ↔ код разошлись (новая ось в Figma, legacy prop выкинут молча) | 1 | Вернуться к `/migrate-to-v2` reconcile, обновить план, спросить пользователя. |
| 2 | Пропущен `stateLayer` на интерактивном корне | 2 | `<span .stateLayer data-state='…' aria-hidden />` + `m.has-state-layer-as-child(stateLayer)`. |
| 3 | `focusedFrame/` отрисован как `<div className={styles.focusFrame}>` | 2 | Удалить DOM, `&:focus-visible { outline: … }` в SCSS. |
| 4 | Захардкоженные `#hex` / `12px` в SCSS | 2 | `base.$sn-…` / `composite-var(...)` через [figma-selected-block](./figma-selected-block.md). |
| 5 | Цветовые роли инвертированы (current светлый, completed тёмный) | 3 | current = solid accent, completed = decor + indicator icon. |
| 6 | `.status` индикатор прилип к краю | 3 | `top: 50%; left: 50%; transform: translate(-50%, -50%)`. |
| 7 | Mobile-компонент рендерится desktop-токенами | 3 | `cn(getThemeClassnames({ density: 'comfort' }), styles.root, className)` на корне. |
| 8 | `<PropsTable componentDoc={...} />` | 4 | `data={pkgDoc.<Name>}`. |
| 9 | `<StorybookEmbed id='...' />` | 4 | `storyId='...'`. |
| 10 | `<Canvas component={RenderPropComponent} />` крашится | 4 | Обернуть живой пример: `return <BasicFlow />`. |
| 11 | Пропущен `@design-system/materials` в deps после добавления state-layer | 5 | Добавить `"@design-system/materials": "workspace:*"`. |
| 12 | Запрещённые axis-per-file stories (`Sizes`, `Appearances`, …) | 4 | Удалить, оси живут в `StoryTable` VisualMatrix ([stories-standard.md](../rules/stories-standard.md)). |
| 13 | Отдельный `<pkg>.url-args.spec.ts` / `.states.spec.ts` / `.dimensions.spec.ts` | 4 | Объединить в describe-блоки `rendering.spec.ts` ([e2e-testing-standard.md](../rules/e2e-testing-standard.md)). |
| 14 | Story id в `__test__/<Name>/helpers.ts` не соответствует nesting'у title'а multi-component пакета | 4 | Обновить ids на `components-<pkg>-<component>--<story>`. |

## Итеративный характер

Цикл нелинейный. При расхождении — **возврат** к предыдущей стадии:

- Stage 3 screenshot ≠ Figma → возвращаемся к Stage 2 (слои/токены) или SCSS-правкам.
- Stage 4 docs crash → фикс MDX, повторяем Stage 4.
- Stage 5 build fail → чиним, повторяем Stage 5 и затронутые.

Максимум 3 полных прохода. Если после 3 компонент не сходится — эскалировать пользователю со списком оставшихся расхождений из реестра.

## Выход

- Зелёный typecheck + build + тесты.
- Нулевой critical-diff screenshot story vs Figma.
- Рабочая docs-страница.
- Commit через `/make-commit` (см. `.claude/commands/make-commit.md`) — сообщение из conventional-commits формата по staged diff.

## Связанные правила и скилы

- [complexity-tiers.md](../rules/complexity-tiers.md)
- [reference-package-anatomy.md](../rules/reference-package-anatomy.md)
- [package-src-structure.md](../rules/package-src-structure.md)
- [component-api-surface.md](../rules/component-api-surface.md)
- [stories-standard.md](../rules/stories-standard.md)
- [e2e-testing-standard.md](../rules/e2e-testing-standard.md)
- [visual-regression-standard.md](../rules/visual-regression-standard.md)
- [docs-structure.md](../rules/docs-structure.md)
- [figma-integration.md](../rules/figma-integration.md)
- [figma-to-code.md](../rules/figma-to-code.md)
- [packages-deps.md](../rules/packages-deps.md)
- [imports-exports.md](../rules/imports-exports.md)
- [react-types.md](../rules/react-types.md)
- [dont-do-that.md](../rules/dont-do-that.md)
- Skills: [new-component-package](./new-component-package.md), [figma-component-import](./figma-component-import.md), [figma-to-code](./figma-to-code.md), [figma-selected-block](./figma-selected-block.md), [component-tier-audit](./component-tier-audit.md), [component-story-set](./component-story-set.md), [component-e2e-tests](./component-e2e-tests.md), [component-docs](./component-docs.md)
- Команды: `/migrate-to-v2`, `/add-stories`, `/add-tests`, `/add-docs`, `/make-commit`
