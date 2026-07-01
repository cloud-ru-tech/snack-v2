# Адаптивные компоненты — стандарт

**Область действия:** компоненты `@ds/*`, которые на mobile меняют поверхность или дефолты, и их потребители (`uikit-product-*`, прикладные). Механика — пакет `@ds/adaptive`.

## Принцип

Адаптивность управляется **одним контекстом** (`AdaptiveProvider`), а не парными пакетами (`@snack-uikit/*` + `@cloud-ru/uikit-product-mobile-*`) и не пропом, прокинутым через дерево. Потребитель верстает под desktop, ставит **один `<AdaptiveProvider>` в корне** — mobile работает автоматически (desktop-first, см. ниже).

Публичный API адаптивного компонента **не различается** mobile/desktop: один компонент `X`, один тип `XProps`. Класс реализации (surface-swap / preset-defaults) — деталь внутреннего рендера, не часть контракта.

## Источник раскладки — только контекст

- Компонент читает раскладку через `useAdaptiveLayout()` (из `@ds/adaptive`) и ветвит по `isMobileLayout(layoutType)` (mobile-путь строго на тире `mobile`).
- **Пропа `layoutType` у компонентов нет.** Node-only проп не каскадит на потомков (десктоп-модалка с мобильным дроплистом внутри) — это была боль легаси. Источник один — контекст.
- **Форс платформы — только контекстом:**
  - поддерево: `<AdaptiveProvider layoutType='desktop'>…</AdaptiveProvider>`;
  - компонент/секция/generic: `withLayoutType(X, 'desktop')` (сахар над провайдером; module-scope, не в рендере; для дженериков — инлайновый `AdaptiveProvider`).
- В приложении/демо — один `AdaptiveProvider` в корне (статичный `layoutType` или реактивный `store`). `useAdaptiveBootstrap()` (UA + matchMedia) зовётся в корне приложения, не внутри компонентов.

## Принцип desktop-first

Figma в большинстве случаев даёт только desktop. Mobile — **автоматический**: mobile-поверхности и mobile-дефолты компонентов из коробки = де-факто «дизайн мобилки». Источник mobile-значений (раз Figma-mobile нет) — легаси `@cloud-ru/uikit-product-mobile-*`, иначе решение DS. Планка качества DS-дефолтов высокая: их не страхует per-app дизайн-ревью. Override — escape-hatch, не основной путь.

## Инвариант: единый `XProps` + JSDoc-пометки платформы

- `XProps` = общий контракт + платформенные пропы. `BaseXProps`/`DesktopXProps`/`MobileXProps` — internal-строительные блоки, **наружу не реэкспортятся**. Единственный публичный тип — `XProps`.
- Реально-платформенный проп (работает только на одной поверхности) **разрешён**, но **обязан** нести грепабельную JSDoc-пометку, начинающуюся с **`Только mobile:`** / **`Только desktop:`**; на другой поверхности молча игнорируется.
- Для пропов, пришедших через `Pick<…>` из чужого типа (нельзя повесить JSDoc по-пропно) — **санкционированный fallback**: пометка платформы в **type-level JSDoc** самого `XProps` (перечислить desktop-only / mobile-only пропы).
- `DesktopX`/`MobileX` — внутренние модули, которыми рендерит адаптивный `X`. Лежат в `packages/<pkg>/src/helperComponents/<Name>/<Name>.tsx` (nested-папка + `index.ts`, как остальные helper-слоты пакета), **наружу из публичного `src/index.ts` не реэкспортятся**.

## Класс 1 — surface-swap

`X` читает контекст и ветвит рендер между внутренними desktop/mobile поверхностями (`helperComponents/`) под единым API:

```tsx
// X.tsx (публичный)
export function X(props: XProps) {
  const { layoutType } = useAdaptiveLayout();
  return isMobileLayout(layoutType) ? <MobileX {...props} /> : <DesktopX {...props} />;
}
```

- Общее тело (контент/состояния) выносится в отдельный helper-компонент и переиспользуется обеими поверхностями (`helperComponents/XBody/XBody.tsx`).
- Mobile-поверхность портальных компонентов = `@ds/bottom-sheet` (`BottomSheet`/`BottomSheetCustom`). Слоты компонента маппятся на API sheet'а (заголовок → `title`, подсказка → `slotAfterHeadline`, контент → `content`, футер → `footer`, разделители → `withDividers` и т.п.). Триггер (`children`) клонируется для открытия; controlled `open`/`onOpenChange` поддерживаются через `useValueControl`.
- Для композитов база экспортирует **точку потребления** — адаптивный компонент целиком либо резолвер-хук поверхности (`useAdaptive<X>Custom`-style, возвращает `XCustom | BottomSheetCustom`).

## Класс 2 — preset-defaults

DOM один, по раскладке меняются дефолты пропов:

```tsx
// X.tsx
type XLayoutDefaults = Pick<XProps, 'collapsible'>; // только пресет-участвующие пропы

export const X_LAYOUT_PRESETS: LayoutPresets<XLayoutDefaults> = { mobile: { collapsible: true } };

export function X({ collapsible, layoutPresets, ...props }: XProps) {
  const { collapsible: resolved } = useLayoutDefaults<XLayoutDefaults>(
    { collapsible: false },                          // база (desktop)
    mergePresets(X_LAYOUT_PRESETS, layoutPresets),   // DS-пресет ⊕ instance-override
    { collapsible },                                 // явный проп (может быть undefined)
  );
  return <XBase {...props} collapsible={resolved} />;
}
```

- **Preset-участвующие пропы — без destructure-дефолта** (иначе дефолт перебьёт пресет; дефолт держим в `base`-аргументе `useLayoutDefaults`).
- Константа `X_LAYOUT_PRESETS: LayoutPresets<...>` **экспортируется** (документируема, форкабельна), типизируется участвующими пропами (`Pick<…>`), а не всем `XProps` — чтобы override не давал silent no-op на непартисипирующих ключах.
- Императивный (нереактовый) путь: раскладку берёт `getGlobalAdaptiveStore()`, дефолты — чистой `resolveByLayout(...)`.

## Слоёный резолв пресетов (как «рулить») — desktop-first

**Главное:** перенос пропа из desktop-макета не должен ломать mobile. Поэтому пресет раскладки **выше** явного пропа — проп задаёт desktop-значение, mobile-дефолт сохраняется и переопределяется только явно.

Приоритет ключа: **`layoutPresets[layout]` (instance) > `X_LAYOUT_PRESETS[layout]` (DS-пресет) > явный проп (= desktop-значение) > базовый дефолт**.

```tsx
<X />                                                    // desktop: база · mobile: пресет (DS-дефолт)
<X collapsible={false} />                               // desktop: false · mobile: ОСТАЁТСЯ пресет (проп = desktop)
<X layoutPresets={{ mobile: { collapsible: false } }}/> // mobile: false (явное переопределение mobile)
<X layoutPresets={{ desktop: { collapsible: true } }}/> // desktop: true · mobile: дефолт (меняем только desktop)
```

- **Адаптивные (preset-участвующие) пропы** ведут себя так: бэйр-проп = desktop, mobile берёт DS-пресет. Они перечислены в секции `## Адаптивность` компонента.
- **Остальные пропы** не проходят через `useLayoutDefaults` — бэйр-проп применяется на всех раскладках (у них нет per-layout различий).
- Ключа «все раскладки разом» (`all`) нет — нужно изменить mobile, пиши `layoutPresets.mobile`. (Добавим `all`, если появится реальный кейс «одним махом везде».)
- При добавлении пропа в `X_LAYOUT_PRESETS` (делаем его адаптивным) смысл существующего бэйр-пропа меняется с «все раскладки» на «только desktop» — учитывать при эволюции пресетов.
- Provider-level override пресетов (Уровень 2) — отложен (YAGNI), точка расширения зарезервирована.

## Примитивы `@ds/adaptive`

| Символ | Назначение |
|--------|------------|
| `AdaptiveProvider` | единый источник раскладки (статичный `layoutType` или реактивный `store`) |
| `useAdaptiveLayout()` | чтение раскладки компонентом |
| `isMobileLayout(layoutType)` | канон ветвления (mobile строго на `mobile`) |
| `withLayoutType(X, t)` | HOC-форс (сахар над провайдером) |
| `LayoutPresets<P>` | тип карты пресетов `{ mobile?: Partial<P>, … }` |
| `resolveByLayout({ layoutType, base, presets, explicit })` | чистый резолв (императив) |
| `mergePresets(...presets)` | deep-merge пресетов (Уровень 0 ⊕ Уровень 1) |
| `useLayoutDefaults(base, presets, explicit)` | React-резолв (читает контекст) |
| `@ds/adaptive` в `dependencies` | обычная зависимость; singleton-ность раскладки даёт `Symbol.for`-контекст/стор (`@ds/context-kit`, см. `keys.ts`), а не физическая дедупликация пакета — поэтому `peerDependencies` **не нужны** (несколько копий пакета делят один контекст) |

## SSR

`@ds/adaptive` отдаёт `desktop` на сервере (desktop-first, клиент дорезолвит). Чтобы убрать flip в SSR-приложении — вычислить раскладку из request-UA на сервере через `@ds/adaptive/ssr` (`getAdaptive(INITIAL_ADAPTIVE_QUERIES_VALUE, ua)`) и передать статикой в `<AdaptiveProvider layoutType={…}>`.

## Слои base → composite

| Слой | swap реализует |
|------|----------------|
| **База** (`@ds/*`) | сам компонент (ветвит по контексту) + экспорт точки потребления для композитов |
| **Композит** (`uikit-product-*`, прикладные) | **НЕ реимплементит swap** — рендерит базовый адаптивный компонент / его резолвер-хук |

**Анти-паттерн (ревью возвращает):** ручная ветка `isMobileLayout ? <BottomSheet> : <Popover>` в композите при том, что база уже это даёт. Раскладку композит читает только для собственной вёрстки, не для свапа поверхности базы.

## Стори / e2e / доки

- **`layoutType` — Storybook toolbar-global, не story-prop и не проп компонента:** один глобальный `<AdaptiveProvider layoutType={globals.layoutType}>` в `apps/storybook/.storybook/preview.tsx` оборачивает все стори (тулбар-переключатель desktop/mobile). Адаптивные Playground'и **не** заводят ни per-story обёртку, ни arg/контрол `layoutType`. Desktop-only контролы гейтятся `if: { global: 'layoutType', eq: 'desktop' }`. Форс конкретной стори — `withLayoutType(...)`; VisualMatrix, рендерящие обе раскладки осью, ставят свои внутренние `<AdaptiveProvider>` (переопределяют глобальный для своего поддерева).
- **VisualMatrix:**
  - inline-renderable компонент (preset-класс): `layoutType` — **ось `StoryTable`** (desktop+mobile секции рядом, каждая в своём `AdaptiveProvider`) → один `visual-matrix.png` показывает разницу.
  - portal/overlay компонент (surface-swap): VM — desktop-ось; mobile-поверхность снимается отдельно в `visual.spec`.
- **Visual baselines:** mobile-снимок требует (1) переключить toolbar-global `layoutType='mobile'` (в e2e — через URL-globals) + (2) `page.setViewportSize(MOBILE_VIEWPORT)` (`#playwright-tooling/constants/common`). Имена: portal → `open-desktop.png` + `open-mobile.png`; inline → общий `visual-matrix.png` с осью `layoutType`. Mobile-baseline = ground truth DS (Figma-parity тут не применим).
- **Доки — секция `## Адаптивность`** (id `adaptive`): плашка-месседж (desktop-first), как форсить, таблица пресетов (preset-класс) либо таблица «проп → игнорируется на mobile/desktop» (surface-swap, синхронно с JSDoc-тегами), линк на центральную модель, `<StorybookEmbed>` адаптивной стори.

## Запреты

- Проп `layoutType` у адаптивного компонента; форс пропом вместо контекста.
- Парные `mobile-*` пакеты; реимплементация surface-swap в композите.
- `DesktopX`/`MobileX`/`*Props`/`BaseXProps` в публичном барреле.
- Платформенный проп без JSDoc-пометки `Только mobile:`/`Только desktop:`.
- destructure-дефолт у preset-участвующего пропа — дефолт держи в `base`-аргументе `useLayoutDefaults` (single source), не в деструктуризации.
- `X_LAYOUT_PRESETS`, типизированный всем `XProps` (silent no-op на непартисипирующих ключах) — типизируй участвующими (`Pick`).
- `layoutType` как проп компонента или story-arg в stories (раскладка — через toolbar-global `AdaptiveProvider` в `preview.tsx`; форс — `withLayoutType`).

## Связанные правила

- [stories-standard.md](./stories-standard.md), [trigger-based-stories.md](./trigger-based-stories.md) — каркас стори (surface-swap-компоненты обычно trigger-based).
- [visual-regression-standard.md](./visual-regression-standard.md), [e2e-testing-standard.md](./e2e-testing-standard.md) — снимки/специ.
- [docs-structure.md](./docs-structure.md) — секция `## Адаптивность`.
- [packages-deps.md](./packages-deps.md) — `@ds/adaptive` подключается обычной `dependencies` (singleton через `Symbol.for`-контекст, не peer).
- [component-api-surface.md](./component-api-surface.md) — `constants.ts`/`types.ts`/`TEST_IDS`.
