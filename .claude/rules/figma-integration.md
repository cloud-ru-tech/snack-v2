# Figma integration

**Область действия:** работа с Figma-узлами компонентов — как источник дизайна и как база для генерации stories/tests/docs.

## Источник: `Snack Ui Kit variables`

- `fileKey`: `aNPU3MHwRJiEwbk5F82zux`
- `fileName`: `Snack-Ui-Kit-variables`
- Узлы компонентов — в `apps/docs/src/lib/figma.ts` как именованные `FigmaNodeRef`.

Пример:

```ts
export const FIGMA_BUTTON: FigmaNodeRef = {
  fileKey: 'aNPU3MHwRJiEwbk5F82zux',
  fileName: 'Snack-Ui-Kit-variables',
  nodeId: '2507-25203',
}
```

Новый компонент → новая константа `FIGMA_<NAME>`. Помещаем в один и тот же файл, не создавай отдельный модуль.

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

Пример Button: `Frame name "buttonFilledPrimary"` + variant-оси `size`, `composition`, `load`, `disabled`. Маппинг:

| Figma | Наш API |
|-------|---------|
| Frame name `<prefix><View><Appearance>` | `view` × `appearance` |
| variant `size` | `size` |
| variant `composition=labelOnly` | `icon` отсутствует |
| variant `composition=iconBefore` | `icon` + `iconPosition='before'` |
| variant `composition=iconAfter` | `icon` + `iconPosition='after'` |
| variant `composition=iconOnly` | `icon` без `label` |
| variant `load` | prop `loading` |
| variant `disabled` | prop `disabled` |

Правило: **каждая ось Figma-компонента должна иметь отражение в VisualMatrix** (см. [stories-standard.md](./stories-standard.md)).

## Figma-typo-мост

В Figma могут быть опечатки в именах variant'ов (реальный пример: `iconAfrer` вместо `iconAfter`). Правило:

- В React API используем **корректное** имя (`iconPosition: 'after'`).
- В `constants.ts` оставляем комментарий-сноску: `// Figma variant: composition=iconAfrer (typo)`.
- В Code Connect mapping (когда подключим) — явно мапим опечатку в корректное значение.

## Размеры → E2E assertion

Если Figma даёт фиксированные размеры контейнера (как `Button`: height s/m/l = 24/32/40) — **добавляй тест** в E2E `Dimensions` блок (см. [e2e-testing-standard.md](./e2e-testing-standard.md)).

## Embed URLs

- Design URL (редактирование): `https://www.figma.com/design/<fileKey>/<fileName>?node-id=<id>&m=dev`
- Embed URL (iframe): `https://embed.figma.com/design/<fileKey>/<fileName>?node-id=<id>&embed-host=ds-docs`

Оба строит `figmaDesignUrl` / `figmaEmbedUrl` из `apps/docs/src/lib/figma.ts`.

## Workflow «Figma → пакет»

1. Открыть Figma Desktop, выделить Frame компонента.
2. Получить `nodeId` из URL: `node-id=2507-25203` (через дефис, не через двоеточие).
3. Добавить `FIGMA_<NAME>` в `apps/docs/src/lib/figma.ts`.
4. Вызвать `mcp__figma-remote-mcp__get_metadata` для узла → построить карту axes.
5. Если нужны padding/gap/цвета — вызвать `get_variable_defs` и `get_design_context` (требуют выделения).
6. Обновить `styles.module.scss` компонента, если токены расходятся.
7. Добавить `<FigmaEmbed node={FIGMA_<NAME>} />` в `docs/index.mdx`.

## Запреты

- Не хардкодить `fileKey` / `nodeId` в MDX — только через `FIGMA_<NAME>`.
- Не пробрасывать Figma-typos в React API.
- Не встраивать Figma без `loading="lazy"` — это тяжёлый iframe.
- Не блокировать сборку при отсутствии `FIGMA_<NAME>` — если узла ещё нет, временно убери embed-блок.

## Связанное

- [docs-structure.md](./docs-structure.md) — секция `## Figma` в MDX.
- [stories-standard.md](./stories-standard.md) — VisualMatrix отражает Figma-axes.
- [e2e-testing-standard.md](./e2e-testing-standard.md) — `Dimensions` блок.
