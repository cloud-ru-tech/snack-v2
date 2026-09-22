# Figma integration

**Область действия:** работа с Figma-узлами компонентов — как источник дизайна и как база для генерации stories/tests/docs.

## Источники файлов

- **Snack Ui Kit variables** — основная DS. `fileKey: 'aNPU3MHwRJiEwbk5F82zux'`, `fileName: 'Snack-Ui-Kit-variables'`. Доступен через константу `SNACK` в `apps/docs/src/lib/figma.ts`.
- **Product UI Kit (variables)** — продуктовые компоненты `@ds/uikit-product-*`. `fileKey: 'VWNiBRIUmVXIWYlLzMxcs6'`, `fileName: 'Product-UI-Kit--variables-'`. Константа `PRODUCT`.
- **Interfaces icons (variables)** — иконочный набор. `fileKey: 'WGeuaJKutP2gAFPThLAexW'`, `fileName: 'Interfaces-icons--variables-'`. Константа `INTERFACES_ICONS`.

## Карта `FIGMA_NODES`

Все узлы централизованы в одной map'е в `apps/docs/src/lib/figma.ts`, ключевание по имени пакета (`packages/<pkg>`):

```ts
export const FIGMA_NODES = {
  // single-component package: leaf-узел
  '<pkg>': { ...SNACK, nodeId: '<root-node-id>' },

  // multi-component package: root + sub-узлы по публичным компонентам
  '<multi-pkg>': {
    _: { ...SNACK, nodeId: '<root-node-id>' },        // страница пакета
    '<sub-component>': { ...SNACK, nodeId: '<id>' },  // отдельный субкомпонент
    // ...
  },
} as const satisfies Record<string, NodeOrSub>
```

Значение — либо `FigmaNodeRef` (один узел на пакет), либо объект `{ _: <root>, '<sub>': <ref>, ... }` для пакетов с несколькими публичными компонентами. Ключ `_` — узел по умолчанию, когда story title содержит только имя пакета.

Sub-ключ — kebab-case имени публичного субкомпонента (тот же сегмент, что в story title после имени пакета).

**Что класть в `nodeId`** — любой узел Figma:

- **canvas/page** (`<canvas name="stepper">`) — целая страница компонента, удобна для root `_` пакета.
- **frame / component_set** — конкретный вариант или субкомпонент. Удобно для sub-ключей.
- **отдельный component / instance** — точечный показ одного варианта.

Получить nodeId: ПКМ по узлу в Figma → Copy/Paste as → Copy link → из URL берётся `?node-id=A-B`. В `nodeId` пишется как `A-B` (или `A:B` — оба работают).

Range/несколько узлов сразу URL не поддерживает — либо положи общий родительский фрейм, либо разнеси на sub-ключи.

## Хелпер `figmaNode(pkg, sub?)`

Безопасный лукап с автоматическим fallback на `_`:

```ts
import { figmaNode } from '#docs/lib/figma'

figmaNode('<pkg>')                  // leaf-узел single-component пакета
figmaNode('<multi-pkg>')            // root `_` multi-component пакета
figmaNode('<multi-pkg>', '<sub>')   // sub-узел субкомпонента
```

Возвращает `FigmaNodeRef | undefined`. `<FigmaEmbed>` корректно обрабатывает `undefined` — рендерит `null`.

Новый компонент → новый ключ в `FIGMA_NODES`. Никаких отдельно объявленных `FIGMA_<NAME>` констант — всё в одной map'е.

## Figma MCP

Поддерживаются два сервера с одинаковым набором инструментов. В скиллах инструменты называются без префикса сервера (`get_metadata`, `get_variable_defs`) — вызывай через любой доступный. По умолчанию — remote: он не зависит от того, что открыто в Figma Desktop, и ре-чек идёт без участия человека. Local — запасной путь, когда remote упёрся в лимит или отвалилась авторизация.

| | remote (`figma-remote-mcp`, в `.mcp.json`) | local (Figma Desktop, Dev Mode MCP) |
|---|---|---|
| Подключение | общее для репо | каждый сам; имя сервера задаёт пользователь, поэтому префикс `mcp__<name>__` не хардкодим |
| Адресация | `fileKey` + `nodeId` из ссылки; выделение не видно и не нужно | активная вкладка Desktop; `nodeId` или текущее выделение |
| Нужно открыть файл | нет | да, нужная вкладка должна быть активной |
| Лимит | 600 вызовов в день / 20 в минуту (считаются чтения) | без квоты |
| Ветка (`/design/<mainKey>/branch/<branchKey>/…`) | в `fileKey` передаётся `branchKey` | открыть ветку в Desktop |
| Нода не находится | проверить `fileKey` / `nodeId`; 403 на все вызовы — переподключить коннектор через `/mcp` | открыта другая вкладка — попросить пользователя открыть нужный файл |

| Tool | Даёт |
|------|------|
| `get_metadata` | Структура Frame/Component/Variant, x/y/width/height — ключевые axes |
| `get_design_context` | React+Tailwind-референс, token refs, padding/gap |
| `get_variable_defs` | Design tokens в terms `sn/*`; значения только в активном режиме переменных; принимает фрейм/компонент, не страницу |
| `get_screenshot` | PNG узла |
| `get_code_connect_map` / `add_code_connect_map` | Маппинг Figma ↔ код для Dev Mode — сейчас не настроен, `get_code_connect_map` возвращает `{}` |

### Лимиты и грабли чтения

- **Лимит remote:** 600 вызовов в день и 20 в минуту на пользователя (Organization, Dev/Full seat). Считаются только чтения; свой тариф — `whoami`.
- **Ответ `use_figma` обрезается примерно на 20 КБ без ошибки** — обрезку видно только по оборванному JSON. Возвращать компактные структуры (id, имена), большие выборки дробить.
- **`get_metadata` без `nodeId` отдаёт не все страницы** (2 из 60). Список страниц — read-only `use_figma`: `figma.root.children.map(p => ({ id: p.id, name: p.name }))`. На тяжёлых страницах `get_metadata` падает по таймауту — целиться в секцию или сет.
- **`children` узла с неактивной страницы неполные** — слои, которые в узле есть, читаются как отсутствующие; `page.loadAsync()` не помогает, нужен `await figma.setCurrentPageAsync(<страница узла>)`. Скалярные свойства (имена, размеры, `componentPropertyDefinitions`) читаются верно и без переключения. При расхождении чтений источник правды — рендер (`get_screenshot`).
- **Скрытые узлы внутри вложенных инстансов плагин не отдаёт** — сплошной обход такого поддерева делается REST-дампом.

### REST — без квоты MCP

`FIGMA_TOKEN` лежит в корневом `.env`. REST не расходует лимит MCP и не зависит от открытого файла:

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/<fileKey>/nodes?ids=<id1>,<id2>&depth=7" -o nodes.json
```

- Паддинги, `itemSpacing`, sizing, min/max, `clipsContent`, `boundVariables` — по каждой ноде. `depth` меньше 6 не доходит до вложенных обёрток, и вывод «обёрток нет» будет ложным.
- Значения приходят в дефолтном режиме файла.
- `devStatus` («Ready for dev») Plugin API не отдаёт — только REST `GET /v1/files/<key>?depth=4`.
- Комментарии макета MCP не отдаёт — только REST `GET /v1/files/<key>/comments`.
- Потребители переменной: дамп страниц `GET /v1/files/<key>/nodes?ids=<pageId>` + `grep` по `VariableID:<id>`.
- `/variables/local` требует скоупа, которого у токена нет (403).

**Значения токенов без Figma** — выгрузка переменных лежит в репо: `packages/figma-variables/tokens/` (коллекции `01_primitive` … `07_acrylic-suspended`, по файлу на режим). Для сверки значения токена по режимам читать её, а не тратить вызовы MCP.

**`search_design_system`** без скоупа возвращает пустой ответ. Ключ библиотеки Snack Ui Kit variables:
`includeLibraryKeys: ["lk-b63d451ff263ab2cee406b50cc14a7dcf27434534340dbe0bea73f4e0cbda5b5466e51213c627350cdf26db6c680fe3d98730103fbc176b4248d36befb8d8124"]`; ключи других библиотек — `get_libraries`.

## Чтение metadata → карта variants

Каждая variant-ось Figma-компонента → проп React API. Правило простое:

- Frame name `<prefix><View><Appearance>` (если используется) → пара пропов вида `view` × `appearance`.
- Variant-ось со значениями-перечислением (`size`, `placement`, `orientation`, …) → enum-проп с тем же набором.
- Variant-ось boolean (`disabled`, `load`, `selected`, `expanded`, …) → boolean-проп.
- Variant-ось «слот-композиция» (`labelOnly`/`iconBefore`/`iconOnly`/…) → разворачивается в slot-пропы (`icon`, `iconPosition`, наличие `label`).

**Дефолт пропа не выводится из Figma.** Дефолтный вариант сета — просто верхний левый в сетке (не порядок слоёв и не порядок значений в селекторе), дизайнер его специально не выбирает. Дефолт берётся из легаси или решения по API; если он расходится с Figma — строка в «Зафиксированных решениях» плана.

### Оси Figma без пропа

Не каждая variant-ось становится пропом. Эти оси в API **не** переносятся:

- `state` (`default`/`hovered`/`pressed`) и `focused` — клиентские состояния: hover/press через `stateLayer` (миксин `has-state-layer-as-child` из `@design-system/materials`), фокус через `:focus-visible` (см. [figma-to-code.md](./figma-to-code.md)). В VisualMatrix не попадают — их снимает `interaction-states.png` (см. [visual-regression-standard.md](./visual-regression-standard.md)).
- `mobile` (boolean) — отдельная поверхность или mobile-дефолты, реализуется через `@ds/adaptive` (surface-swap / preset-defaults, см. [adaptive-components.md](./adaptive-components.md)). Раскладку компонент читает из контекста, пропа нет.
- Ось из одного значения (`disabled=[false]`, `state=[default]`) — пропа нет, это остаток сборки мастера.
- Сеты, распиленные по размеру (`tabsHorizontalM` / `tabsHorizontalL`, `counterXs` / `counterS`), — одна ось `size`, значения берутся из суффикса имени сета.

**Каждая остальная ось Figma-компонента должна отражаться в VisualMatrix** (см. [stories-standard.md](./stories-standard.md)).

## Figma-typo-мост

В Figma встречаются опечатки в именах variant'ов. Правило:

- В React API используем **корректное** имя.
- В `constants.ts` рядом со значением оставляем комментарий вида `// Figma variant: <axis>=<typo> (typo, корректное — <fixed>)`.
- В Code Connect mapping (когда подключим) — явно мапим опечатку в корректное значение.

## Размеры

Фиксированные размеры контейнера из Figma (например, height по `size`) проверяются визуально — baseline'ом VisualMatrix. Отдельный `Dimensions`-блок / `dimensions.spec.ts` не заводится (см. [e2e-testing-standard.md](./e2e-testing-standard.md)).

## Embed URLs

- Design URL (редактирование): `https://www.figma.com/design/<fileKey>/<fileName>?node-id=<id>&m=dev`
- Embed URL (iframe): `https://embed.figma.com/design/<fileKey>/<fileName>?node-id=<id>&embed-host=ds-docs`

Оба строит `figmaDesignUrl` / `figmaEmbedUrl` из `apps/docs/src/lib/figma.ts`.

## Workflow «Figma → пакет»

1. Взять ссылку на Frame/page компонента.
2. Получить `fileKey` и `nodeId` из URL (параметр `?node-id=<id>`).
3. Добавить ключ в `FIGMA_NODES` в `apps/docs/src/lib/figma.ts`. Для multi-component пакета — объект с `_` (root) и sub-ключами.
4. Вызвать `get_metadata` для узла → построить карту axes.
5. Если нужны padding/gap/цвета — вызвать `get_variable_defs` и `get_design_context` по тому же `nodeId`.
6. Обновить `styles.module.scss` компонента, если токены расходятся.
7. Добавить `<FigmaEmbed node={figmaNode(...)} />` в `docs/<file>.mdx`.

## Storybook Figma-аддон

Панель «Figma» в Storybook автоматически загружает узел из `FIGMA_NODES` по имени пакета из story `title`. Логика резолвера — общая с docs (`figmaNode`).

Скрыть панель на конкретной story/meta (например, для приватных пакетов или story без визуального дизайна):

```ts
const meta: Meta<typeof Component> = {
  // ...
  parameters: {
    figma: { disable: true },  // прячет таб «Figma» из bottom-panel
  },
}
```

То же самое работает для `parameters.readme.disable = true` — скрывает Readme-панель. Параметры наследуются: ставь на `meta` (для всех story файла) или per-story.

Override содержимого: `parameters.readme = { content: '<md>' }` подменяет README; `parameters.design` (`{ url } | { fileKey, fileName, nodeId } | string`) подменяет Figma-узел. `disable` приоритетнее любого override.

Когда уместно скрывать:

- **Figma** — приватные пакеты (`*-private`, utility без визуального дизайна) и пакеты без узла в `FIGMA_NODES`. Явный `disable` лучше empty-state.
- **Readme** — мета-демо и песочницы, не привязанные к публичному компоненту пакета.

## Запреты

- Не хардкодить `fileKey` / `nodeId` в MDX — только через `figmaNode(...)`.
- Не объявлять отдельные `FIGMA_<NAME>` константы — все узлы живут в `FIGMA_NODES` map'е.
- Не пробрасывать Figma-typos в React API.
- Не блокировать сборку при отсутствии узла — `figmaNode` возвращает `undefined`, `<FigmaEmbed>` рендерит `null`. Storybook-панель покажет empty-state. Если узла принципиально не будет (приватный пакет) — поставь `parameters.figma.disable = true`.

## Связанное

- [docs-structure.md](./docs-structure.md) — секция `## Figma` в MDX.
- [stories-standard.md](./stories-standard.md) — VisualMatrix отражает Figma-axes.
- [e2e-testing-standard.md](./e2e-testing-standard.md) — `Dimensions` блок.
