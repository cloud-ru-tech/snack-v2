# Skill: figma-component-import

**Триггеры:** пользователь дал Figma URL / nodeId; «импортировать из Figma»; «подтянуть variants»; «сверить с дизайном».

Скилл читает Figma-узел компонента и возвращает структурированную карту axes + предложения по `constants.ts`/`types.ts`/`VisualMatrix`.

## Ввод

- Figma URL или пара `{ fileKey, nodeId }`.
- (если доступно) пользователь открыл Figma Desktop и выделил узел.

## Шаги

1. **Извлечь `fileKey` и `nodeId`** из URL:
   - `figma.com/design/:fileKey/:fileName?node-id=:nodeId` — конвертировать `-` → `:` в nodeId при необходимости.

2. **Metadata (без выделения)** — `mcp__figma-remote-mcp__get_metadata`:
   - Получить имена frames (обычно `<prefix><View><Appearance>`).
   - Собрать variant axes: `size`, `composition`, `load`, `disabled`, …

3. **Если есть выделение в Figma Desktop:**
   - `mcp__figma-remote-mcp__get_design_context` — padding/gap autoLayout + React-референс.
   - `mcp__figma-remote-mcp__get_variable_defs` — design tokens (`sn.theme.color.*`, `sn.boxShadow.elevation.*`).
   - Если нет — продолжить только с metadata, отметить в отчёте, что часть данных не получена.

4. **Построить карту Figma ↔ React.** Каждая variant-ось → проп API:
   - Frame name `<prefix><View><Appearance>` (если используется) → пара `view` × `appearance`.
   - Enum-ось (`size`, `placement`, `orientation`, …) → enum-проп с тем же набором значений.
   - Boolean-ось (`disabled`, `load`, `selected`, `expanded`, …) → boolean-проп.
   - Слот-композиция (`labelOnly`/`iconBefore`/`iconOnly`/…) → разворачивается в slot-пропы (`icon`, `iconPosition`, наличие `label`).

5. **Проверить typos.** В Figma встречаются опечатки в именах variant'ов. Отметить в отчёте и приписать комментарием в `constants.ts` рядом со значением: `// Figma variant: <axis>=<typo> (typo, корректное — <fixed>)`.

6. **Добавить ключ в `FIGMA_NODES`** в `apps/docs/src/lib/figma.ts`. Для single-component пакета:
   ```ts
   '<pkg>': { ...SNACK, nodeId: '<node-id>' }
   ```
   Для multi-component пакета:
   ```ts
   '<pkg>': {
     _: { ...SNACK, nodeId: '<root-node-id>' },
     '<sub>': { ...SNACK, nodeId: '<sub-node-id>' },
   }
   ```
   Sub-ключ — kebab-case имени публичного субкомпонента (тот же сегмент, что в story title). Источник файла подставляется одной из существующих констант: `SNACK`, `PRODUCT`, `INTERFACES_ICONS`.

7. **Выдать предложения:**
   - `constants.ts` — SCREAMING_SNAKE_CASE объекты для каждой оси (`APPEARANCE`, `VIEW`, `SIZE`).
   - `types.ts` — `ValueOf<typeof X>` для каждой оси.
   - `VisualMatrix` — блоки `StoryTable` для каждой пары осей.
   - Размеры (height/width из Figma) — добавить в E2E `Dimensions` блок.

## Вывод

Markdown-отчёт:

```markdown
## Figma → <Name>

- **fileKey**: `<fileKey>`
- **nodeId**: `<nodeId>`
- **Frames**: <N> (<axisA> × <axisB>)
- **Variants per frame**: <M>
- **Всего variants**: <N*M>

### Оси
- `<axis-1>`: <value>, <value>, …
- `<axis-2>`: <value>, <value>, … (отметить typos: `<value-in-figma>` → корректное `<fixed>`)
- `<bool-axis>`: true, false

### Фиксированные размеры
- <axis>=<value>: <height/width>, <slot-size>, …

### Данные, которые НЕ получены (нужно выделение в Figma Desktop)
- padding / gap autoLayout
- token refs для цветов и теней
```

## Что **не** делает

- Не меняет `src/` автоматически. Только предлагает diff.
- Не публикует Code Connect mapping без явного запроса.

## Связанное

- [figma-integration.md](../rules/figma-integration.md)
- [component-api-surface.md](../rules/component-api-surface.md)
