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

Используется сервер `figma-remote-mcp` (tools `mcp__figma-remote-mcp__*`):

| Tool | Требует | Даёт |
|------|---------|------|
| `get_metadata` | `nodeId` | Полная структура Frame/Component/Variant — ключевые axes |
| `get_design_context` | Выделение в Figma Desktop | React+Tailwind-референс, token refs, padding/gap |
| `get_variable_defs` | Выделение в Figma Desktop | Design tokens (цвета, spacing, shadow) в terms `sn.*` |
| `get_screenshot` | `nodeId` | PNG узла |
| `add_code_connect_map` | `nodeId` + путь к реализации | Маппинг Figma ↔ код для Dev Mode |

**Важно:** `get_design_context` и `get_variable_defs` требуют, чтобы пользователь открыл Figma Desktop и выделил конкретный узел. Без выделения они возвращают ошибку. Используй `get_metadata` как fallback — он работает без выделения.

## Чтение metadata → карта variants

Каждая variant-ось Figma-компонента → проп React API. Правило простое:

- Frame name `<prefix><View><Appearance>` (если используется) → пара пропов вида `view` × `appearance`.
- Variant-ось со значениями-перечислением (`size`, `placement`, `orientation`, …) → enum-проп с тем же набором.
- Variant-ось boolean (`disabled`, `load`, `selected`, `expanded`, …) → boolean-проп.
- Variant-ось «слот-композиция» (`labelOnly`/`iconBefore`/`iconOnly`/…) → разворачивается в slot-пропы (`icon`, `iconPosition`, наличие `label`).

**Каждая ось Figma-компонента должна отражаться в VisualMatrix** (см. [stories-standard.md](./stories-standard.md)).

## Figma-typo-мост

В Figma встречаются опечатки в именах variant'ов. Правило:

- В React API используем **корректное** имя.
- В `constants.ts` рядом со значением оставляем комментарий вида `// Figma variant: <axis>=<typo> (typo, корректное — <fixed>)`.
- В Code Connect mapping (когда подключим) — явно мапим опечатку в корректное значение.

## Размеры → E2E assertion

Если Figma фиксирует размеры контейнера по оси (например, height по `size`) — **добавляй тест** в E2E `Dimensions` блок (см. [e2e-testing-standard.md](./e2e-testing-standard.md)).

## Embed URLs

- Design URL (редактирование): `https://www.figma.com/design/<fileKey>/<fileName>?node-id=<id>&m=dev`
- Embed URL (iframe): `https://embed.figma.com/design/<fileKey>/<fileName>?node-id=<id>&embed-host=ds-docs`

Оба строит `figmaDesignUrl` / `figmaEmbedUrl` из `apps/docs/src/lib/figma.ts`.

## Workflow «Figma → пакет»

1. Открыть Figma Desktop, выделить Frame/page компонента.
2. Получить `nodeId` из URL (параметр `?node-id=<id>`).
3. Добавить ключ в `FIGMA_NODES` в `apps/docs/src/lib/figma.ts`. Для multi-component пакета — объект с `_` (root) и sub-ключами.
4. Вызвать `mcp__figma-remote-mcp__get_metadata` для узла → построить карту axes.
5. Если нужны padding/gap/цвета — вызвать `get_variable_defs` и `get_design_context` (требуют выделения).
6. Обновить `styles.module.scss` компонента, если токены расходятся.
7. Добавить `<FigmaEmbed node={figmaNode(...)} />` в `docs/<file>.mdx`.

## Storybook Figma-аддон

Панель «Figma» в Storybook автоматически подтягивает узел из `FIGMA_NODES` по имени пакета из story `title`. Логика резолвера — общая с docs (`figmaNode`).

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

## Запреты

- Не хардкодить `fileKey` / `nodeId` в MDX — только через `figmaNode(...)`.
- Не объявлять отдельные `FIGMA_<NAME>` константы — все узлы живут в `FIGMA_NODES` map'е.
- Не пробрасывать Figma-typos в React API.
- Не блокировать сборку при отсутствии узла — `figmaNode` возвращает `undefined`, `<FigmaEmbed>` рендерит `null`. Storybook-панель покажет empty-state. Если узла принципиально не будет (приватный пакет) — поставь `parameters.figma.disable = true`.

## Связанное

- [docs-structure.md](./docs-structure.md) — секция `## Figma` в MDX.
- [stories-standard.md](./stories-standard.md) — VisualMatrix отражает Figma-axes.
- [e2e-testing-standard.md](./e2e-testing-standard.md) — `Dimensions` блок.
