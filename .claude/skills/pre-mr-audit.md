# Skill: pre-mr-audit

**Триггеры:** «проверь пакет перед MR», «прогони pre-mr аудит», «сканируй <pkg> на ревью-ниты», «что зацепит ревьюер», финал миграции/имплементации `packages/<pkg>` перед открытием MR.

Скилл — **механический греп-скан** пакета `packages/<pkg>` на повторяющиеся замечания код-ревью, которые исторически ловят руками (миграция `@snack-uikit/*` → `@ds/*` приносит легаси-паттерны). Не переписывает артефакты — выдаёт **список находок** с файлами/строками, чтобы агент починил их до того, как ревьюер оставит коммент. Каждая находка маппится на нарушенный рул.

## Когда использовать

- Перед открытием/обновлением MR на новый или мигрированный компонентный пакет.
- После прохода `component-validation-loop` — как финальный «взгляд ревьюера».
- Когда просят «проверь, не осталось ли нитов» по конкретному пакету.

Не используй для генерации stories/tests/docs (для этого профильные скиллы) и для функциональной проверки (это live-прогон Storybook/Playwright).

## Как запускать

Подставь `PKG=<pkg>` (имя папки в `packages/`). Прогоняй блоки по очереди, для каждой находки — чини по соответствующему рулу, затем повторяй скан до пустого вывода.

### A. Инлайн JSX-обработчики с логикой ([component-internals.md](../rules/component-internals.md) §1)

```bash
PKG=<pkg>
# обработчики с инлайн-замыканием в JSX (кандидаты на вынос)
grep -rnE "on[A-Z][a-zA-Z]*=\{\([a-zA-Z]*\) =>|on[A-Z][a-zA-Z]*=\{\(\) =>" packages/$PKG/src --include="*.tsx"
```

Тривиальный проброс одного аргумента без логики (`onChange={e => onChange?.(e.target.value)}`) — оставляй. Всё с условием/несколькими выражениями/повтором — выноси в `const handle*`. Проверь единообразие: если в файле часть уже вынесена, остальные тоже выноси.

### B. Чистые функции в `.tsx` ([component-internals.md](../rules/component-internals.md) §2)

```bash
# стрелки/функции, объявленные в .tsx — глазами отбери те, что не используют хуки/пропсы/state
grep -rnE "const [a-zA-Z]+ = \(.*\) =>|function [a-zA-Z]+\(" packages/$PKG/src --include="*.tsx" | grep -v "use[A-Z]\|handle\|=> \(<\|return <\)"
```

Кандидат в `utils.ts` — если функцию можно объявить вне компонента без потери смысла (`clamp`, `parseMask`, `extractLabel`). Завязанные на render-scope — оставляй (`useCallback`).

### C. Импорт внутренностей из соседнего компонента-пира ([component-internals.md](../rules/component-internals.md) §3)

```bash
# импорты из ../<OtherComponent> (PascalCase-сосед), кроме ../shared
grep -rnE "from '\.\./[A-Z][a-zA-Z]+'" packages/$PKG/src/components --include="*.ts" --include="*.tsx" | grep -v "/shared'"
```

Если `B` тянет утилиты/стили/типы/хелперы из пира `A` — выноси общее в `src/components/shared/` (или `src/shared/`), импортят оба.

### D. `helpers.ts` на `src`-уровне ([component-internals.md](../rules/component-internals.md) §4)

```bash
find packages/$PKG/src -name "helpers.ts"   # ожидаемо пусто; helpers.ts допустим только в __test__/
```

`src`-уровневый `helpers.ts` сливаем в `utils.ts` (или разворачиваем в `utils/`).

### E. Инлайн string-union осей вместо `constants.ts` ([component-api-surface.md](../rules/component-api-surface.md))

```bash
# литералы размеров/режимов прямо в типах — кандидаты на вынос в SIZE/MODE/... + ValueOf
grep -rnE "'(s|m|l|xs)'( ?\| ?'(s|m|l|xs)')+|'(none|single|multiple)'( ?\| ?'(none|single|multiple)')+" packages/$PKG/src --include="*.ts"
```

Перечисление-ось → `export const SIZE = {...} as const` в `constants.ts` + `type Size = ValueOf<typeof SIZE>` в `types.ts`, и использование типа.

### F. Хардкод массивов значений в сторях ([storybook-args-conventions.md](../rules/storybook-args-conventions.md))

```bash
grep -rnE "\['s', ?'m', ?'l'\]|options: \['" packages/$PKG/stories --include="*.tsx"
```

Массив значений оси в `argTypes.options`/`render` — через `Object.values(CONST)` из той же const'ы пакета, не хардкод.

### G. Playground-гигиена ([storybook-args-conventions.md](../rules/storybook-args-conventions.md), [trigger-based-stories.md](../rules/trigger-based-stories.md))

Открой `*.Playground.stories.tsx` и проверь по списку:
- Каждый **технический** проп (refs, `*Render`, `on*` низкоуровневые колбэки, `*Ref`, `scrollContainer*`) скрыт через `argTypes.<prop>.table.disable`.
- Каждый **видимый** контрол имеет осмысленный дефолт в `args` (иначе контрол «пустой»).
- Для **stateful-фич и слотов** (selection / virtualized / noData / errorState / loading) есть `[Story]: show*`-контролы и демо-контент, чтобы переключение **визуально влияло** на рендер.

```bash
# быстрый сигнал «контрол ни на что не влияет»: пропсы в типе, но без args и без table.disable
grep -nE "table: \{ disable|args:" packages/$PKG/stories/**/*.Playground.stories.tsx | head
```

### H. Легаси-TODO ([dont-do-that.md](../rules/dont-do-that.md), [component-internals.md](../rules/component-internals.md) §6)

```bash
grep -rnE "TODO|FIXME|TO DO" packages/$PKG/src
```

Голый `// TODO` без тикета — разрешить или заменить осмысленным комментом. Задокументированный cross-package блокер с маркером фазы (`// TODO Phase 5 token missing: …`) — оставить.

### I. Дублирование типа вместо переиспользования ([component-internals.md](../rules/component-internals.md) §5)

Глазами по `*/types.ts`: продублированные `Size`/`value`-типы, которые уже есть в `FieldDecorator`/соседнем `types.ts` — заменить на импорт существующего типа.

### J. Опечатки в JSDoc → расходятся в README/props.json ([writing-style.md](../rules/writing-style.md))

```bash
# словарь известных опечаток (расширяй по мере находок)
grep -rniE "пекреход|преставление|отбражени|колбэка?к|занчени|дефолтн ое" packages/$PKG/src --include="*.ts" --include="*.tsx"
```

JSDoc читается react-docgen'ом в Storybook-контролах и попадает в `props.json`/`README.md` → опечатка расползается по всем пакетам-потребителям. Чини в **исходном** JSDoc, затем `pnpm gen:props && pnpm gen:readme`.

### K. Колбэк-проп стрелкой вместо method-signature ([component-api-surface.md](../rules/component-api-surface.md))

```bash
# onX?: (...) => ... в типах пропсов — должно быть onX?(...): ...
grep -rnE "on[A-Z][A-Za-z]*\??:\s*\(.*\)\s*=>" packages/$PKG/src --include="*.ts" --include="*.tsx"
```

Разворачивай в method-signature: `onChange?(v: string): void`. Готовый тип-алиас (`onClick?: MouseEventHandler<…>`) — оставляй, это исключение.

### L. Стейл-рефы после rename/remove публичного API ([docs-structure.md](../rules/docs-structure.md), [figma-integration.md](../rules/figma-integration.md))

Переименование/удаление публичного компонента или пропа оставляет хвосты в нескольких слоях сразу. Подставь `OLD=<старое имя>` (компонент / проп / TEST_ID / figma-ключ) и прогони по всем местам:

```bash
OLD='<OldNameOrProp>'
grep -rn "$OLD" packages/$PKG/{src,stories,demos,docs,__test__} apps/docs/src/lib/figma.ts
```

Чек-лист мест, где обычно остаётся ссылка (проверь каждое):

- `demos/examples/*.tsx` — удалённый проп в примере (`error={...}` после удаления `error`).
- `docs/*.mdx` — текст Анатомии, `### <Component>` + `<PropsTable data={…Doc.<Component>}>` (краш билда, см. [docs-structure.md](../rules/docs-structure.md)), `figmaNode(pkg, '<sub>')` (молча пустой эмбед при рассинхроне ключа), `storyId='…'` в `<StorybookEmbed>`.
- `README.md` — перегенерить `pnpm gen:readme` (не править руками).
- `apps/docs/src/lib/figma.ts` — sub-ключ должен совпадать со строкой в `figmaNode(...)` MDX.
- `stories/testIds.ts` — стейл-строки test-id (`…-drawer__trigger` после rename в popover).
- `src/constants.ts` — мёртвые ключи в `TEST_IDS` для удалённых слотов.
- `__test__/**/rendering.spec.ts` — тест на удалённый проп/слот или селектор по съехавшему `data-test-id`/`aria-*`.

После правок: `pnpm gen:props && pnpm gen:readme`, затем `pnpm build:docs:fast` (ловит MDX-краши, которые `build:storybook` пропускает) и `pnpm test:e2e:chrome packages/$PKG`.

## Финальные чек-листы (по доменам)

Перенесены сюда из `.claude/rules/*` (раньше дублировали тело каждого правила, грузились в контекст каждую сессию). Это **gate перед MR**; при расхождении формулировок источник истины — соответствующий рул. Прогоняй только блоки, релевантные тому, что менял.

### Сборка / гейты (любой пакет) — reference-package-anatomy, coverage, e2e
- [ ] `pnpm typecheck` зелёный
- [ ] `pnpm exec eslint packages/<pkg>` / `pnpm exec stylelint "packages/<pkg>/**/*.scss"` чистые (полные `lint`/`stylelint` — перед PR)
- [ ] `pnpm build:pkg <pkg>` зелёный (полный `build:packages` — только при правках shared/wire-точек)
- [ ] `docs/props.json` непустой (`pnpm gen:props`); `README.md` актуален (`pnpm gen:readme`, не руками)
- [ ] Storybook рендерит все новые stories без ошибок в консоли
- [ ] `pnpm test:stories` зелёный (play-функции)
- [ ] `pnpm test:e2e:chrome packages/<pkg>` зелёный (полный `test:e2e` — финальная сверка перед PR); visual baselines осмысленны (ручной review diff)

### Coverage — coverage-standard
- [ ] `pnpm test:coverage:pkg <pkg>` зелёный; gate 80/80/75/70 пройден (`scripts/coverage-gate.mts <pkg>`)
- [ ] Есть `__tests__/*.test.ts` → прогнан `vitest run packages/<pkg> --coverage` + `coverage:merge`
- [ ] Чистые утилиты (`src/utils.ts`, не вызываемые из JSX) покрыты unit-тестом, не через play
- [ ] Один файл — один источник coverage (не unit + play на одну функцию; vitest приоритетен)
- [ ] story в `tests/` имеет тег `['test','dev']`; новые stories попали в `playwright/coverage/.stories.json`
- [ ] fixture-стори имеет JSDoc со ссылкой на coverage-standard.md
- [ ] `isCoverableSource` не расширялся под пакет ради `index.ts`/`types.ts`

### Stories + Args (Playground/VisualMatrix/examples/tests) — stories-standard, storybook-args-conventions
- [ ] Есть `Playground` (все публичные пропсы в Controls через docgen) и `VisualMatrix` (все оси в `StoryTable` из `#storybook/components`)
- [ ] CSF3, `StoryObj<typeof Component>`; в каждом файле свой `export default meta`
- [ ] Каждая story в `examples/`/`tests/` обоснована (нельзя выразить через `args` Playground или строку/колонку StoryTable); дубли между `examples/` и `tests/` отсутствуют; раскладка и `/Examples/`-`/Tests/`-сегмент title корректны; тег `fixture` не используется
- [ ] `data-test-id` есть в `args` Playground и use-case stories (kebab-case; слоты — `<component>-<slot>`); внутренние слоты — через `src/constants.ts::TEST_IDS`; повторяющиеся id — в `testIds.ts` единым объектом; инлайн-строк `data-test-id='…'` в `.tsx` нет
- [ ] Play-функции — только `getByTestId` (нет `getByRole`/`getByText`/`getByLabelText`)
- [ ] У `VisualMatrix` и `InteractionTest` — `parameters: { controls: { disable: true } }`; Tests-story обёрнута в `<DemoPage>/<DemoPanel>` (`layout: 'fullscreen'`, не `'centered'`)
- [ ] Интеракция — один `InteractionTest` со step'ами (не `ClickTest`+`KeyboardTest`)
- [ ] Playground без custom `render`; controlled/uncontrolled пары (`value`/`defaultValue`, `checked`/`defaultChecked`) скрыты через `argTypes.<prop>.table.disable`
- [ ] Каждый публичный проп имеет JSDoc; в meta нет ручных `argTypes.<prop>.description`; ручные `argTypes` — только `mapping`/`table.disable`/`if:`/override контрола/`options` для нерасрезолвенных union'ов
- [ ] `options` руками: `radio` для ≤4 без `undefined`, иначе `select`; нет `undefined`/`null`/сентинелов (`none`/`empty`) в `options`; значения через `Object.values(CONST)` (включая `examples/`)
- [ ] `mapping` — только slot/ReactNode-пресеты; зависимые пропсы — `if: { arg, eq|neq }`, не «мёртвые»; внутренние пропсы скрыты `table.disable`, не `control: false`
- [ ] Смежные/парные пропсы заполнены оба разными дефолтами; VisualMatrix-ячейки с контейнер-зависимым поведением обёрнуты в контейнер фикс-размера из `styles.module.scss`
- [ ] Нет `autodocs`/`parameters.docs.description.*`; нет inline-`style={{}}`; нет `React.*`/`import type`; имена английские PascalCase без `Basic`/`Default`
- [ ] При переезде stories обновлены story IDs в `__test__/<Component>/helpers.ts`

### Trigger-based stories (modal/drawer/popover/…) — trigger-based-stories
- [ ] `open` нет в `args`; `argTypes.open/onClose/onOpenChange` — `table.disable`; open в `useState` внутри render
- [ ] Скелет `<DemoPage><DemoPanel><DemoTitle>+<DemoHint>+(<DemoWarning>)+<DemoActions></DemoPanel></DemoPage>`; `layout: 'fullscreen'`
- [ ] Триггер — `Button` из `@ds/button` с `data-test-id={TEST_IDS.triggerOpen}`
- [ ] Кросс-args конфликты — рантайм-резолв + `<DemoWarning>`, не `if:`; `if:` только для технических односторонних зависимостей; slot-toggle'ы — `[Stories]: show*`
- [ ] `play` — `toBeVisible` на `TEST_IDS.triggerOpen`; поведение — в `tests/InteractionTest`

### Tests / E2E (Playwright) — e2e-testing-standard
- [ ] Поведенческие assertion'ы — в `tests/<Name>.InteractionTest.stories.tsx::play`, не в Playwright
- [ ] `rendering.spec.ts` без axis-per-test loop (каждый тест — уникальное свойство API)
- [ ] `interaction.spec.ts`/`keyboard.spec.ts` — только при browser-specific assertion'ах, не покрываемых play
- [ ] Папка `__test__/<Parent>/` одна на parent; варианты сабкомпонентов — через args
- [ ] `helpers.ts` — StoryRef-объекты для всех story IDs (нет хардкод-строк); импорты только через `#playwright-tooling/*`
- [ ] `visual.spec.ts` без per-view × per-state cartesian (каждый снимок — уникальный сигнал)

### SCSS — scss-styles-standard
- [ ] Нет пиксельных литералов strok'и (`1px`/`2px`/`0.5px`/…) → `base.$sn-primitive-strokeWeight-stroke*`
- [ ] Нет `rem`/`em` в размерах/отступах/радиусах/gap'ах → `base.$sn-primitive-dimension-*`/`simple-var`/`$sn-brand-anatomy-*`
- [ ] Нет hex/rgba → `base.$sn-theme-color-*`; нет литеральных `border-radius`/`padding`/`gap` → `simple-var`/`$sn-brand-anatomy-*`; нет литерального `opacity` disabled → `base.$sn-theme-effect-opacity-disabled`
- [ ] Нет 2+ одинаковых по форме `&[data-axis='…']` → свёрнуты в `@each` по карте; карта оси соответствует `constants.ts` (включая алиасы вроде `xs`→`s`)
- [ ] `composite-var`/`simple-var` пути совпадают со структурой токенов в `@sbercloud/figma-variables`

### Тело компонента / API — component-internals, component-api-surface
Покрыто греп-блоками **A–E, I** выше (инлайн-обработчики, чистые функции, импорт из пира, `helpers.ts`, инлайн-union осей, дубли типов). Дополнительно глазами:
- [ ] Нет голых легаси-TODO без тикета/маркера фазы (блок **H**)
- [ ] Колбэк-пропы — method-signature, не arrow-property (блок **K**; алиас `MouseEventHandler` — исключение)

### Figma → код — figma-to-code
- [ ] Hex/rgba → токены (`simple-var`/`composite-var`); focus frame → `:focus-visible`, не DOM-нода
- [ ] На интерактивном корне с миксинами есть `position: relative`; `data-state` — из допустимого списка, camelCase
- [ ] `.stateLayer`/`.acrylic`/`.acrylicEffect` имеют `position: absolute; inset: 0; pointer-events: none; border-radius: inherit`
- [ ] Нет `React.FC`/`React.ReactNode`/`any`/`@ts-ignore`; в `package.json` нет `react`/`react-dom`, версии точные; в meta story указан `parameters.design.url`

### Текст / JSDoc — writing-style
- [ ] Нет жаргона/разговорных глаголов, уменьшительно-ласкательных, авторских «мы»/«я», маркетинговых эпитетов («просто»/«легко»/«удобно»), слов-наполнителей («очевидно»/«в данный момент»)
- [ ] Транслитерация англ. терминов — только при отсутствии оригинала (в дефолте латиница); длинные предложения разбиты

## После аудита

1. Почини находки по соответствующим рулам.
2. Повтори скан до пустого вывода по A–L.
3. Если правил JSDoc/пропсы — `pnpm gen:props && pnpm gen:readme`.
4. Селективная сверка: `pnpm exec eslint --fix packages/$PKG`, `pnpm build:pkg $PKG`, `pnpm typecheck`.

## Anti-patterns скилла

- ❌ Чинить «вслепую» по греп-сигналу без проверки контекста (тривиальный проброс — не нит; cross-package TODO с маркером — легитимен).
- ❌ Выносить функцию в `utils.ts`, если она реально завязана на render-scope (хуки/пропсы) — это сломает замыкание.
- ❌ Менять рантайм-логику при «приведении формы» обработчиков — только форма.

## Связанное

- [component-internals.md](../rules/component-internals.md) — тело компонента (источник §A–E, I).
- [component-api-surface.md](../rules/component-api-surface.md) — оси через constants/types.
- [storybook-args-conventions.md](../rules/storybook-args-conventions.md) — args/argTypes/Playground.
- [writing-style.md](../rules/writing-style.md) — JSDoc и текст.
- [component-validation-loop.md](./component-validation-loop.md) — общий цикл сверки готовности.
