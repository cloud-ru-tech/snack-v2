# Skill: component-validation-loop

**Триггеры:** «сверь реализацию», «проверь готовность компонента», «запусти цикл валидации», после фазы имплементации любого пакета `packages/*`, при портировании legacy → `@ds/*`.

Итеративный цикл проверки готовности компонентного пакета: **Figma parity → runtime рендер → docs/demos → wire-up**. Агент сам проходит все стадии, фиксит расхождения и повторяет, пока не достигнет success criteria.

Скилл дополняет (не заменяет):
- [figma-component-import](./figma-component-import.md) — первичный импорт узлов
- [component-tier-audit](./component-tier-audit.md) — эталонность артефактов
- [component-story-set](./component-story-set.md) — набор stories + baselines visual regression (финальный шаг)

## Вход

- Путь к пакету `packages/<pkg>`.
- Список Figma nodeId (master + state + example + mobile).
- URL Storybook (по умолчанию `http://localhost:6006`) и docs (`http://localhost:4321/components/<pkg>`).

## Полный цикл (5 стадий)

### Стадия 1 — Research & scope validation

**Цель:** убедиться, что скоуп плана соответствует реальности Figma + legacy.

1. `mcp__figma-remote-mcp__get_metadata` по КАЖДОМУ предоставленному узлу.
2. Если узлы уточняют/меняют scope плана (напр. «два компонента» → «один с render-props»), ОСТАНОВИТЬСЯ, обновить `.claude/plan/<pkg>.md`, сообщить пользователю, ждать подтверждения.
3. Если есть legacy npm — `npm pack` + tar → прочитать `src/` + `types.ts` + `constants.ts`. Выписать публичный API.
4. Составить **API diff** legacy vs наш план — drop-in или breaking.

**Выход стадии:** подтверждённый scope + финализированный план.

### Стадия 2 — Figma parity (слои, токены, состояния)

Для каждого Figma nodeId (master + state-master + variants + example):

1. `mcp__figma-remote-mcp__get_metadata` — собрать DOM-структуру (`children frame names`), служебные слои (`stateLayer/`, `focusedFrame/`, `material/`), variants + оси, размеры.
2. При необходимости — `get_variable_defs` и `get_design_context` (требуют выделения в Figma Desktop) для токенов и референсного кода.

**Чек-лист соответствия Figma ↔ код** (покрывает бывший скилл `figma-verify-after-stories`):

- [ ] **stateLayer/\<group\>/\<role\>** → `<span className={styles.stateLayer} data-state='<group><Role>' aria-hidden />` + `@use '@ds/materials' as m; @include m.has-state-layer-as-child(stateLayer);` в SCSS корня.
  Допустимые `data-state`: `regularBackground`, `regularBorder`, `activatedBackground`, `activatedBorder`, `onColorBackground`, `onAccentBackground` (строго camelCase из этого списка).
- [ ] **focusedFrame/...** (hidden=true в Figma) → `:focus-visible { outline: 2px solid base.$sn-theme-color-primary-accent; outline-offset: 2px; }`. **НИКОГДА** не DOM-нода.
- [ ] **material/\<appearance\>\<Level\>** → `<span className={styles.acrylic} data-acrylic-appearance='...' data-acrylic-level='...' aria-hidden />` + `m.with-material('acrylic', #{acrylic})`.
- [ ] **Интерактивный корень** со state-layer / material имеет `position: relative` в SCSS; `.stateLayer` / `.acrylic` имеют `position: absolute; inset: 0; pointer-events: none; border-radius: inherit`.
- [ ] **Цвета** из узла — токены `base.$sn-theme-color-*` / `base.simple-var(...)` / `base.composite-var(...)`, не hex/rgba.
- [ ] **Размеры** из Figma (фиксированные height/width) — в SCSS. Parity ловится визуально (VisualMatrix baseline), отдельный `dimensions.spec.ts` не заводим.
- [ ] **Variants** узла → каждый присутствует в `constants.ts` (`as const`) + типы в `types.ts` (`ValueOf`).
- [ ] **Variants** покрыты в `VisualMatrix.stories.tsx` как строки/колонки `StoryTable`.
- [ ] **Figma typos** (например `iconAfrer`) — в `constants.ts` каноническое имя + комментарий `// Figma variant: <typo>`.
- [ ] **Visual сверка (screenshot vs Figma)**:
  1. `mcp__figma-remote-mcp__get_screenshot` на nodeId → PNG.
  2. Снять скриншот соответствующей story (Playwright / devtools).
  3. Классифицировать расхождения: критические (отсутствующий слой, неверный токен, неверный размер) / средние (spacing, typography) / низкие (тени, радиусы, анимации).

Если критических расхождений >3 — остановиться на этой стадии, править SCSS, повторять.

### Стадия 3 — Runtime сверка (screenshot vs Figma)

**Обязательная итерация**, часто вскрывает инверсию цветов / позиционирование.

Для каждого story ключевого состояния (`BasicFlow`, `WithValidator`, `Mobile`, `VisualMatrix`):

1. Снять скриншот Figma (`mcp__figma-remote-mcp__get_screenshot` или попросить пользователя).
2. Снять скриншот story (Playwright, Chrome DevTools, или попросить пользователя).
3. **Попиксельная сверка** — конкретно проверить:

| Чек | Типичная ошибка | Фикс |
|-----|-----------------|------|
| Цвета состояний не инвертированы | `current` — светлый, `completed` — тёмный (должно быть наоборот) | Swap `primary-accent` ↔ `primary-decor`. Current = solid dark, Completed = light + indicator icon |
| Индикатор (дот/иконка) отцентрован | `position: absolute` без координат → прилипает к краю | `top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| Round/square/pill shape совпадает | Пропущен `border-radius` | Сверить с размерами в Figma |
| Текст/иконка читается на фоне | Чёрный текст на тёмном фоне | Использовать `neutral-onAccent` / `primary-onAccent` (белый на аксенте) |
| Размеры токенов совпадают | Bar 2px вместо 4px, circle 16 вместо 24 | Измерить в Figma, зафиксировать в SCSS |
| Mobile → правильный platform токен-scale | Стили выглядят «как desktop» на mobile | Wrap контейнер: `className={cn(getThemeClassnames({ platform: 'mobile' }), styles.root, className)}` |

4. Если расхождения — править SCSS, повторять с шага 1, пока не совпадёт.

**Цветовая модель `@cloud-ru/figma-variables` (часто используется):**

```scss
// Сплошной насыщенный (bg для «active» / «completed CTA»)
base.$sn-theme-color-primary-accent         // тёмно-зелёный
base.$sn-theme-color-red-accent             // тёмно-красный

// Светлый «decor» (bg для «completed» индикаторов, мягкая подложка)
base.$sn-theme-color-primary-decor          // светло-зелёный
base.$sn-theme-color-red-decor              // светло-красный

// Текст / иконка НА accent (белый на тёмном)
base.$sn-theme-color-neutral-onAccent       // белый
base.$sn-theme-color-primary-onAccent       // off-white

// Нейтральные (waiting, disabled)
base.$sn-theme-color-neutral-decor          // серый бордер/трек
base.$sn-theme-color-neutral-accent         // серый текст
base.$sn-theme-color-neutral-text           // основной текст
base.$sn-theme-color-neutral-background1Level  // фон
```

### Стадия 4 — Docs & demos runtime

**Цель:** Astro docs-сервер должен отрисовывать страницу без ошибок.

Проверки:

- [ ] `<PropsTable data={pkgDoc.ComponentName} />` — prop `data`, НЕ `componentDoc` (типичная ошибка scaffold'а).
- [ ] `<StorybookEmbed storyId='components-<pkg>--<story>' />` — prop `storyId`, НЕ `id`.
- [ ] `<FigmaEmbed node={FIGMA_<PKG>} />` — константа добавлена в `apps/docs/src/lib/figma.ts`.
- [ ] Каждая `<Example>` имеет валидный `code={...Src}` с `?raw` импортом.
- [ ] `<ComponentDemo client:load />` рендерится. Для **render-prop** компонентов (которые не драйвятся Canvas playground) — демо-компонент должен оборачивать живой пример, а не `<Canvas component={...} />`:

    ```tsx
    // BAD — Canvas не знает, что прокинуть в render-prop
    <Canvas component={Stepper} componentName='Stepper' ... />

    // GOOD — живой сценарий
    export function StepperDemo() {
      return <BasicFlow />
    }
    ```

- [ ] Секция `## Демо` присутствует первой H2-секцией с `<ComponentDemo client:load />`.
- [ ] `docs/props.json` актуальный: запустить `pnpm gen:props`.
- [ ] Открыть `http://localhost:4321/components/<pkg>` → проверить консоль браузера и stderr Astro. Любая ошибка `Cannot read properties of undefined (reading 'props')` = неверный prop name в MDX.

### Стадия 5 — Wire-up & build

Финальная проверка.

- [ ] `tsconfig.json` (root) + `packages/tsconfig.esm.json` + `packages/tsconfig.cjs.json` — references на пакет.
- [ ] `apps/storybook/.storybook/main.ts` — alias между маркерами `<add-package:aliases>`.
- [ ] `apps/docs/astro.config.mjs` — тот же alias.
- [ ] `apps/storybook/package.json` — dep `"@ds/<pkg>": "workspace:*"`.
- [ ] `apps/docs/src/lib/figma.ts` — `FIGMA_<PKG>` + subcomponent-константы (`FIGMA_<PKG>_STEP`, `FIGMA_<PKG>_EXAMPLE` и т.п.).
- [ ] `packages/<pkg>/package.json` — deps строгие версии, без `^`/`~`, без `react`/`@types/react`, все `@ds/*` через `workspace:*`. Обязательно: `@ds/materials` если использован state-layer.

Команды:

```bash
pnpm install
pnpm typecheck 2>&1 | grep -E "<pkg>|error"
pnpm lint --fix packages/<pkg>
pnpm stylelint --fix "packages/<pkg>/**/*.scss"
pnpm gen:props
pnpm gen:readme
pnpm build:packages 2>&1 | grep -E "<pkg>|error"
pnpm test:stories --project=chromium 2>&1 | tail -20
pnpm test:e2e --project=chrome 2>&1 | tail -20
```

Все шаги должны быть зелёные. При ошибках — ремонтировать и повторять с релевантной стадии.

## Критерии успеха (все должны быть ✅)

- [ ] Scope плана подтверждён по Figma + legacy
- [ ] Все `stateLayer/` узлы из Figma имеют DOM-слой + SCSS-миксин
- [ ] `focusedFrame/` реализован через `:focus-visible`, не DOM
- [ ] Все variants покрыты в constants + VisualMatrix + stories
- [ ] Screenshot story ≈ screenshot Figma (±2 критических расхождения max)
- [ ] Цвета состояний совпадают (не инвертированы)
- [ ] Индикаторы/оверлеи отцентрованы
- [ ] Mobile-компонент использует `getThemeClassnames({ platform: 'mobile' })`
- [ ] `http://localhost:4321/components/<pkg>` открывается без ошибок
- [ ] Storybook embed показывает реальную story (не "Couldn't find story matching 'undefined'")
- [ ] PropsTable рендерит таблицу (не краш «reading 'props'»)
- [ ] Build packages green
- [ ] Typecheck green
- [ ] Wire-up во все 4 точки (tsconfig × 3, storybook, docs, figma.ts) выполнен

## Типовые ошибки — реестр (из опыта `@ds/stepper` v1)

| # | Ошибка | Где | Фикс |
|---|--------|-----|------|
| 1 | Scope mismatch: план говорит «numeric + wizard», Figma/legacy — только wizard | `.claude/plan/<pkg>.md` | Стадия 1. Обновить план, подтвердить с пользователем. |
| 2 | Пропущен `stateLayer` на интерактивном корне | `helperComponents/*/[Component].tsx` + `styles.module.scss` | Стадия 2. `<span .stateLayer data-state='regularBorder|regularBackground' aria-hidden />` + `m.has-state-layer-as-child(stateLayer)`. |
| 3 | Колоритные роли инвертированы (current светлый, completed тёмный) | `styles.module.scss` | Стадия 3. current = solid accent, completed = decor + indicator icon. |
| 4 | `.status` индикатор прилипает к левому краю | `styles.module.scss` | Стадия 3. `top: 50%; left: 50%; transform: translate(-50%, -50%)`. |
| 5 | Mobile-компонент рендерится desktop-токенами | `components/Mobile<Component>/<Component>.tsx` | Стадия 3. `className={cn(getThemeClassnames({ platform: 'mobile' }), styles.root, className)}`. |
| 6 | `<PropsTable componentDoc={...} />` | `docs/*.mdx` | Стадия 4. `data={...}`. |
| 7 | `<StorybookEmbed id='...' />` | `docs/*.mdx` | Стадия 4. `storyId='...'`. |
| 8 | `<Canvas component={RenderPropComponent} />` крашится | `demos/<Component>Demo.tsx` | Стадия 4. Обернуть рабочий пример: `return <BasicFlow />`. |
| 9 | Пропущен импорт `@ds/materials` в dependency после добавления state-layer | `packages/<pkg>/package.json` | Стадия 5. Добавить `"@ds/materials": "workspace:*"`. |
| 10 | `focusedFrame/` отрисован как `<div className={styles.focusFrame}>` | `[Component].tsx` | Стадия 2. Удалить DOM, `&:focus-visible { outline: ... }` в SCSS. |

## Итеративный характер

Скилл не линеен. При расхождении **возвращаться** к предыдущей стадии:

- Stage 3 screenshot ≠ Figma → вернуться к Stage 2 (слои) или SCSS правкам.
- Stage 4 docs crash → фикс MDX, повторить Stage 4.
- Stage 5 build fail → починить, повторить Stage 5 и затронутые.

Максимум 3 полных цикла. Если после 3 — компонент всё ещё не сходится, эскалировать пользователю со списком оставшихся расхождений.

## Выход

- Зелёный build + typecheck.
- Скриншоты story ≈ Figma.
- Рабочая docs-страница.
- Commit: `feat(<pkg>): validation loop pass — <summary>`.
- (опционально) `packages/<pkg>/docs/figma-parity.md` для сложных компонентов.

## Связанные правила

- `.claude/rules/figma-to-code.md`
- `.claude/rules/figma-integration.md`
- `.claude/rules/docs-structure.md`
- `.claude/rules/visual-regression-standard.md`
- `.claude/rules/component-api-surface.md`
- `.claude/rules/reference-package-anatomy.md`

## Эталон применения

`@ds/stepper` v1 — цикл валидации выявил:
1. Scope: план «numeric + wizard» → реально «wizard only, render-prop» (stage 1)
2. Узлы `7596:24975` и `19813:66441` имеют `stateLayer` — был пропущен (stage 2)
3. Цвета `current` / `completed` инвертированы vs Figma в MobileStep и DesktopStep (stage 3)
4. `.status` dot не отцентрован в MobileStep (stage 3)
5. MobileStepper не имел `getThemeClassnames({ platform: 'mobile' })` (stage 3)
6. `<PropsTable componentDoc={...} />` и `<StorybookEmbed id={...} />` — неверные prop names (stage 4)
7. `<Canvas component={Stepper} />` крашил — render-prop несовместим с playground (stage 4)

Все 7 пунктов зафиксированы в реестре выше.
