# Проверка готовности пакета

Сквозной итеративный цикл сверки готовности компонентного пакета. Не переписывает артефакты — **делегирует** в профильные skill'ы и правила, сам отвечает только за **порядок проходов, чек-листы соответствия, реестр расхождений и остановки**.

## Границы скилла

Скилл **не генерирует** stories/tests/docs/scss с нуля. Для этого есть:
- [new-component-package](../../new-component-package/SKILL.md) — создать пакет.
- [Оси и варианты Figma](../../figma-inspection/references/component-axes.md) — карта Figma axes → `constants.ts`/`types.ts`.
- [figma-to-code](../../figma-to-code/SKILL.md) — декодинг слоёв (`stateLayer/`, `focusedFrame/`, `material/`) в DOM+SCSS.
- [SCSS слоя Figma](../../figma-inspection/references/layer-scss.md) — SCSS выделенного слоя с токенами (CSS-in / REST-in).
- [component-story-set](../../component-story-set/SKILL.md) — создание и проверка Playground и VisualMatrix.
- [component-e2e-tests](../../component-e2e-tests/SKILL.md) — Playwright specs по tier'у.
- [component-docs](../../component-docs/SKILL.md) — `docs/index.mdx` + `demos/`.
- [Проверка структуры](tier-audit.md) — сверка с эталоном по tier'у.

Если на любой стадии находится пробел — **вызывать соответствующий скилл**, а не фиксить руками прямо здесь.

## Ввод

- Путь к пакету `packages/<pkg>` и его tier (XS/S/M/L/XL — см. [complexity-tiers.md](../../new-component-package/references/complexity-tiers.md)).
- Локальный план из [component-planning](../../component-planning/SKILL.md), если он есть. Для ревью MR используй согласованные решения из описания MR.
- Figma nodeId'ы (master + ключевые variants + mobile, если есть) и ключ `'<pkg>'` в map'е `FIGMA_NODES` в `apps/docs/src/lib/figma.ts` (отдельных констант `FIGMA_<PKG>` нет).
- При миграции используй указанный в плане источник прежней реализации, если он доступен.

## 5 стадий

### Стадия 1 — Scope & decisions validation

**Цель:** убедиться, что реализация не разошлась с «Зафиксированными решениями» плана и с текущим состоянием Figma.

1. Сверить согласованные решения, границы публичного API и соответствие зависимостей по доступным исходным данным из раздела «Ввод».
2. Прочитать `packages/<pkg>/src/index.ts` + `constants.ts` + `types.ts` — сверить с планом (оси, публичные компоненты/хуки/типы).
3. `get_metadata` по мастер-ноде → сверить variant-оси с `constants.ts`.
4. **Миграция — сверка со слепком легаси.** Если в плане есть раздел «Слепок легаси» (см. `component-planning`), разложить каждый его пункт в один из трёх списков: «перенесено», «изменено осознанно» (есть строка в «Зафиксированных решениях»), «потеряно». Список «потеряно» обязан быть пустым; непустой — блокирующий вопрос пользователю.
5. **Любое расхождение scope ↔ код ↔ Figma — блокирующий вопрос пользователю**, а не авто-решение (та же норма, что в `component-planning` в разделе сверки макета с прежним API). Если план молчит о нужной оси — остановиться, обновить план, дождаться подтверждения.

**Выход:** подтверждённый актуальный scope. Если плана нет — вынуть API-skeleton прямо из кода и пометить, что валидация идёт без плана.

### Стадия 2 — Figma parity (слои, токены, состояния)

Применяется для каждого ключевого Figma nodeId (master + state-master + mobile + ключевые variants).

Источники правил:
- [figma-to-code](../../figma-to-code/SKILL.md) — словарь «слой → DOM → SCSS».
- [figma-integration.md](../../figma-inspection/references/figma-integration.md) — карта `Figma variant → React prop`, формат `FIGMA_NODES`.
- [figma-to-code.md (rule)](../../figma-to-code/references/figma-to-code.md) — чеклист перед коммитом.
- `packages/materials/docs/index.mdx` — миксины `has-state-layer-as-child`, `with-material`.

**Чек-лист соответствия Figma ↔ код:**

- [ ] `stateLayer/<group>/<role>` → `<span className={styles.stateLayer} data-state='<group><Role>' aria-hidden />` + `@use '@ds/materials' as m; @include m.has-state-layer-as-child(stateLayer);` на SCSS-корне.
      Допустимые `data-state` (camelCase, строго из списка): `emptyNeutralOnBackground`, `borderOnBackground`, `activatedOnBackground`, `versionOnColor`, `emptyVersionOnColor`, `inversionOnColor`, `emptyInversionOnColor`, `emptyDarkOnAccent`.
- [ ] `focusedFrame/...` (hidden=true в Figma) → **не** DOM, только `&:focus-visible { outline: ...; outline-offset: ...; }` на интерактивном корне.
- [ ] Атрибуты `data-acrylic-appearance` и `data-acrylic-level` находятся на корне. Дочерний слой получает класс для селектора миксина.
- [ ] Интерактивный корень, использующий `has-state-layer-as-child` / `with-material`, имеет `position: relative`; дочерние `.stateLayer` / `.acrylic` — `position: absolute; inset: 0; pointer-events: none; border-radius: inherit`.
- [ ] Все цвета/spacing/radius/typography из SCSS — через `base.$sn-*` либо `@include base.composite-var(...)`. Захардкоженных `px`/`rem`/`#hex`/`rgba()` нет (или каждая — с пояснением в комментарии). При сомнении по конкретному слою — прогнать [SCSS слоя Figma](../../figma-inspection/references/layer-scss.md).
- [ ] Все variant-оси узла → есть в `constants.ts` (`as const`) + тип в `types.ts` (`ValueOf<typeof …>`). См. [component-api-surface.md](../../component-development/references/component-api-surface.md).
- [ ] Все оси покрыты в `VisualMatrix.stories.tsx` как строки/колонки `StoryTable`. См. [stories-standard.md](../../component-story-set/references/stories-standard.md).
- [ ] Figma-typos (`iconAfrer`, …) → каноническое имя в `constants.ts` + сноска `// Figma variant: <typo>`.
- [ ] Ключ `'<pkg>'` добавлен в map `FIGMA_NODES` в `apps/docs/src/lib/figma.ts` (для нескольких публичных компонентов — объект `{ _: <root>, '<sub>': <ref> }`); достаётся хелпером `figmaNode('<pkg>', sub?)`. Отдельных `FIGMA_<PKG>` констант не заводим (см. [figma-integration.md](../../figma-inspection/references/figma-integration.md)).

Если критических расхождений >3 — остановиться, отправить в [Оси и варианты Figma](../../figma-inspection/references/component-axes.md) или [figma-to-code](../../figma-to-code/SKILL.md), повторить стадию.

### Стадия 3 — Runtime screenshot сверка

Ловит то, что не видно статическим анализом: инверсию цветов, сдвиги, mobile/desktop scale.

Для каждого ключевого состояния (Playground + VisualMatrix + сценарные stories + mobile):

1. `get_screenshot` на nodeId → референс PNG.
2. Снять скриншот story (Playwright fixture `page.locator('#storybook-root').screenshot()` или MCP playwright).
3. Сверка по 4 классам расхождений:

| Класс | Типичный кейс | Фикс |
|-------|---------------|------|
| Цветовая роль инвертирована | «current» светлый, «completed» тёмный, хотя должно быть наоборот | Swap `primary-accent` ↔ `primary-decor`; текст на accent → `neutral-onAccent`. |
| Позиционирование индикатора | `.status` прилип к левому краю | `top: 50%; left: 50%; transform: translate(-50%, -50%)`. |
| Размер/радиус | Bar 2px вместо 4px | Перемерить в Figma, зафиксировать через токен (`figma-selected-block`). |
| Mobile-scale | Mobile-компонент рендерится desktop-токенами | На корне mobile-поверхности `useThemeClassnames({ platform: PLATFORM.WebMobile })` из `@ds/theme` (как `BottomSheetCustom`); плотность не форсить. |

Все расхождения → реестр с severity (critical / medium / low). **Critical блокирует Стадию 5.** Итерация с правками SCSS, пока screenshot не совпадёт (±low расхождения допустимы).

При изменении визуальных сценариев сверяй [стандарт снимков](../../component-e2e-tests/references/visual-regression-standard.md). Если изменение эталонов ожидаемо, обнови разошедшиеся снимки пакета. На Linux используй `pnpm test:e2e:update-snapshots:changed packages/<pkg>`, на macOS — `pnpm test:e2e:docker:visual:update:changed packages/<pkg>`.

### Стадия 4 — Stories / Tests / Docs runtime

Полнота артефактов — через [проверке структуры](tier-audit.md). Справка помогает определить недостающие артефакты. Если правки входят в задачу, используй подходящую инструкцию:

- [component-story-set](../../component-story-set/SKILL.md) — создание и проверка Playground и VisualMatrix.
- E2E diff → [component-e2e-tests](../../component-e2e-tests/SKILL.md).
- MDX/demos diff → [component-docs](../../component-docs/SKILL.md).

**Runtime-проверки docs** (частые ошибки, которые tier-audit не ловит):

- [ ] `<PropsTable data={pkgDoc.<ComponentName>} />` — prop называется `data`, не `componentDoc`.
- [ ] `<StorybookEmbed storyId='components-<pkg>--<story>' />` — prop `storyId`, не `id`; story id совпадает с актуальным `title` stories ([stories-standard.md](../../component-story-set/references/stories-standard.md) раздел «Title — nesting»).
- [ ] `<FigmaEmbed node={figmaNode('<pkg>')} />` — узел достаётся хелпером `figmaNode(pkg, sub?)` из `#docs/lib/figma`, **не** отдельной константой `FIGMA_<PKG>` (таких нет — всё в map'е `FIGMA_NODES`, см. [figma-integration.md](../../figma-inspection/references/figma-integration.md)). Для субкомпонента — `figmaNode('<pkg>', '<sub>')`. Если узла нет — `figmaNode` вернёт `undefined`, `<FigmaEmbed>` отрендерит `null`.
- [ ] Каждый `<Example>` с React-пропсами, содержащими JSX (иконки, children-как-элементы), вынесен в `demos/examples/<Name>.tsx` и подключён через `import <Name>Src from '../demos/examples/<Name>.tsx?raw'` — иначе Astro MDX скомпилит JSX-пропс в `astro:jsx` и React-компонент упадёт (см. [docs-structure.md](../../component-docs/references/docs-structure.md)).
- [ ] Для render-prop компонентов demo не использует `<Canvas component={...} />` — обёртывает живой сценарий (`return <BasicFlow />`).
- [ ] `docs/props.json` свежий: `pnpm gen:props`.
- [ ] Открыть `http://localhost:4321/components/<pkg>` → чисто в консоли браузера и stderr Astro. Ошибка `Cannot read properties of undefined (reading 'props')` = неверный prop name в MDX.

**Runtime-проверки stories/tests:**

- [ ] `pnpm test:stories` — завершился успешно (play-функции; поднимает Storybook, запускать в конце фазы).
- [ ] `pnpm test:e2e:chrome packages/<pkg>` — завершился успешно (только нужный пакет).
- [ ] Visual baselines отсмотрены глазами (не blank, не с артефактами) — см. [visual-regression-standard.md](../../component-e2e-tests/references/visual-regression-standard.md).

### Стадия 5 — Wire-up & build

Финальная сверка wire-точек и сборки. Точки перечислены в [reference-package-anatomy.md](../../new-component-package/references/reference-package-anatomy.md):

- [ ] `packages/tsconfig.esm.json` + `packages/tsconfig.cjs.json` — `references` на пакет.
- [ ] `apps/storybook/.storybook/main.ts` — alias `@ds/<pkg>` подхватывается автоматически (`collectDsAliases()` сканирует `packages/*/src/index.ts`). Ручной правки не требуется.
- [ ] `apps/storybook/package.json` — dep `"@ds/<pkg>": "workspace:*"`.
- [ ] `apps/docs/src/lib/figma.ts` — ключ `'<pkg>'` в map'е `FIGMA_NODES` (для субкомпонентов — объект `{ _: <root>, '<sub>': <ref> }`), не отдельные `FIGMA_<PKG>` константы.
- [ ] `packages/<pkg>/package.json` — версии по [packages-deps.md](../../new-component-package/references/packages-deps.md) (consumer-facing — `^`, dev — пин), без `react` / `react-dom` / `@types/react*`, повторяемые deps — через `catalog:` (см. [packages-deps.md](../../new-component-package/references/packages-deps.md)). `@ds/materials` — добавлена, если используется state-layer / material / focused.
- [ ] Корневой `tsconfig.json` — noEmit-профиль, пакеты не перечисляет; typecheck идёт через `include`.

Команды (селективные по умолчанию — см. [fast-build-commands.md](fast-build-commands.md)):

```bash
pnpm deps
pnpm exec eslint --fix packages/<pkg>
pnpm exec stylelint --fix "packages/<pkg>/**/*.scss"
pnpm gen:props
pnpm gen:readme
pnpm build:pkg <pkg>   # быстрый incremental build одного пакета
pnpm typecheck   # инкрементальный по .tsbuildinfo
pnpm test:e2e:chrome packages/<pkg>
```

`pnpm test:stories` запускай в конце фазы stories, не на каждой итерации (поднимает Storybook).
Полный `pnpm build:packages` — только если правки задели shared-пакет (`@ds/utils`, `@ds/materials` и т.п.) или wire-точки.

## Success criteria

Все пункты должны быть ✅:

- [ ] Реализация соответствует согласованным границам публичного API и зафиксированным решениям.
- [ ] Каждый Figma-слой `stateLayer/` / `material/` реализован через миксин `@ds/materials`; `focusedFrame/` — через `:focus-visible`, не DOM.
- [ ] Все значения spacing/color/typography/radius в `*.module.scss` — через `base.$sn-*` или `@include base.composite-var(...)` (исключения задокументированы комментариями).
- [ ] Оси React API ↔ Figma variant metadata взаимно-однозначны (кроме осей из [figma-integration](../../figma-inspection/references/figma-integration.md) §«Оси Figma без пропса»).
- [ ] Screenshot story ≈ screenshot Figma (0 critical, ≤2 medium).
- [ ] Mobile-поверхность (если есть) получает mobile-токены через `useThemeClassnames({ platform: PLATFORM.WebMobile })`, плотность не форсится.
- [ ] Результаты проверки структуры и оставшиеся замечания задокументированы.
- [ ] `/components/<pkg>` открывается в docs без ошибок; Storybook embed и Figma embed работают.
- [ ] Селективные проверки из [справки](fast-build-commands.md) прошли для затронутых областей. Отдельно укажи проверки, которые не удалось запустить.
- [ ] Для новых пакетов проверены записи в TypeScript-конфигах и манифесте Storybook. Карта Figma обновлена, если есть подтверждённый узел.

## Реестр типовых ошибок

| # | Симптом | Стадия | Как проверить | Фикс |
|---|---------|--------|---------------|------|
| 1 | Scope plan ↔ код разошлись (новая ось в Figma, legacy prop выкинут молча) | 1 | Список «потеряно» по слепку легаси (Стадия 1, п.4) непуст | Вернуться к [сверке макета с прежним API](../../component-planning/references/migration.md), обновить план, спросить пользователя. |
| 2 | Пропущен `stateLayer` на интерактивном корне | 2 | В Figma есть слой `stateLayer/…`, а `grep -rn "stateLayer" packages/<pkg>/src` пуст | `<span .stateLayer data-state='…' aria-hidden />` + `m.has-state-layer-as-child(stateLayer)`. |
| 3 | `focusedFrame/` отрисован как `<div className={styles.focusFrame}>` | 2 | `grep -rniE "focus(ed)?Frame" packages/<pkg>/src --include="*.tsx"` непуст | Удалить DOM, `&:focus-visible { outline: … }` в SCSS. |
| 4 | Захардкоженные `#hex` / `12px` в SCSS | 2 | Статический скан [scss-styles-audit](../../scss-styles-audit/SKILL.md) | `base.$sn-…` / `composite-var(...)` через [SCSS слоя Figma](../../figma-inspection/references/layer-scss.md). |
| 5 | Цветовые роли инвертированы (current светлый, completed тёмный) | 3 | Скриншот story рядом с `get_screenshot` того же варианта | current = solid accent, completed = decor + indicator icon. |
| 8 | `<PropsTable componentDoc={...} />` | 4 | `grep -rn "componentDoc=" packages/<pkg>/docs` | `data={pkgDoc.<Name>}`. |
| 9 | `<StorybookEmbed id='...' />` | 4 | `grep -rnE "<StorybookEmbed[^>]* id=" packages/<pkg>/docs` | `storyId='...'`. |
| 10 | `<Canvas component={RenderPropComponent} />` крашится | 4 | `grep -rn "<Canvas component=" packages/<pkg>/docs` | Обернуть живой пример: `return <BasicFlow />`. |
| 11 | Пропущен `@ds/materials` в deps после добавления state-layer | 5 | `grep -rlE "has-state-layer-as-child|with-material" packages/<pkg>/src` непуст, а в `package.json` пакета materials нет | Добавить `"@ds/materials": "workspace:^"`. |
| 12 | Запрещённые axis-per-file stories (`Sizes`, `Appearances`, …) | 4 | `find packages/<pkg>/stories -name "*.stories.tsx" \| grep -E "\.(Sizes\|Appearances\|Views\|Variants\|LoadingState\|DisabledState\|EmptyState)\."` | Удалить, оси живут в `StoryTable` VisualMatrix ([stories-standard.md](../../component-story-set/references/stories-standard.md)). |
| 13 | Отдельный `<pkg>.url-args.spec.ts` / `.states.spec.ts` / `.dimensions.spec.ts` | 4 | `find packages/<pkg>/__test__ -name "*.spec.ts" \| grep -E "url-args\|states\|dimensions"` | Объединить в describe-блоки `rendering.spec.ts` ([e2e-testing-standard.md](../../component-e2e-tests/references/e2e-testing-standard.md)). |
| 14 | Story id в `__test__/<Name>/helpers.ts` не соответствует nesting'у title'а multi-component пакета | 4 | Сверить `STORIES` с `http://localhost:6006/index.json` | Обновить ids на `components-<pkg>-<component>--<story>`. |

**Когда дописывать строку** — в том же ходе, не «потом»:
- пользователь указал на ошибку, которую цикл пропустил;
- проверка нашла лишнее (ложная тревога) — строка про то, как её не повторить;
- правку пришлось откатывать.

Строка без колонки «Как проверить» не добавляется: если проверку нельзя сформулировать командой или конкретным действием, это пожелание, а не правило. Больше ~25 строк — сначала слить повторы.

## Итеративный характер

Цикл нелинейный. При расхождении — **возврат** к предыдущей стадии:

- Stage 3 screenshot ≠ Figma → возвращаемся к Stage 2 (слои/токены) или SCSS-правкам.
- Stage 4 docs crash → фикс MDX, повторяем Stage 4.
- Stage 5 build fail → чиним, повторяем Stage 5 и затронутые.

**Сигнал отката.** Три-четыре правки подряд, каждая из которых чинит последствия предыдущей, — остановиться и вернуться к последней развилке (решению, после которого пошли заплатки), а не латать дальше. Развилку и откат записать в реестр.

Максимум 3 полных прохода. Если после 3 компонент не сходится — эскалировать пользователю со списком оставшихся расхождений из реестра.

## Выход

Отчёт начинается с того, что **не сделано или под сомнением**: непройденные пункты, расхождения из реестра, что не проверялось и почему. Затем числа проверок (сколько вариантов Figma сверено, сколько stories/specs прогнано). Одобрение формулируется как «нарушений по проверенным пунктам нет» вместе со списками «Проверено» и «Не проверено» — не голое «соответствует». Строки «дальше нужно…» по тому, что входило в задачу, не пишутся: это либо сделать, либо вынести в «не сделано».

- Зелёный typecheck + build + тесты.
- Расхождения с доступным макетом проверены. Если доступа нет, в отчёте указаны непроверенные состояния.
- Рабочая docs-страница.
- Если пользователь просит коммит, используй [make-commit](../../make-commit/SKILL.md).

## Связанные правила и skill'ы

- [complexity-tiers.md](../../new-component-package/references/complexity-tiers.md)
- [reference-package-anatomy.md](../../new-component-package/references/reference-package-anatomy.md)
- [package-src-structure.md](../../component-development/references/package-src-structure.md)
- [component-api-surface.md](../../component-development/references/component-api-surface.md)
- [stories-standard.md](../../component-story-set/references/stories-standard.md)
- [e2e-testing-standard.md](../../component-e2e-tests/references/e2e-testing-standard.md)
- [visual-regression-standard.md](../../component-e2e-tests/references/visual-regression-standard.md)
- [docs-structure.md](../../component-docs/references/docs-structure.md)
- [figma-integration.md](../../figma-inspection/references/figma-integration.md)
- [figma-to-code.md](../../figma-to-code/references/figma-to-code.md)
- [packages-deps.md](../../new-component-package/references/packages-deps.md)
- [imports-exports.md](../../component-development/references/imports-exports.md)
- [react-types.md](../../component-development/references/react-types.md)
- [dont-do-that.md](../../../../AGENTS.md)
- [component-story-set](../../component-story-set/SKILL.md) — создание и проверка Playground и VisualMatrix.
- Связанные навыки: `component-planning`, `component-story-set`, `component-e2e-tests`, `component-docs`, `make-commit`
