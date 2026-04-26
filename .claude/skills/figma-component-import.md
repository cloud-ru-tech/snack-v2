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

4. **Построить карту Figma ↔ React:**

   | Figma | API |
   |-------|-----|
   | Frame name `<prefix><View><Appearance>` | `view` × `appearance` |
   | variant `size` | `size` |
   | variant `composition=<value>` | `icon` + `iconPosition` |
   | variant `load` | `loading` |
   | variant `disabled` | `disabled` |

5. **Проверить typos** (Figma иногда содержит опечатки типа `iconAfrer`). Отметить в отчёте и приписать комментарием в `constants.ts`:
   ```ts
   // Figma variant: composition=iconAfrer (typo в Figma, корректное значение — after)
   ```

6. **Записать `FIGMA_<NAME>`** в `apps/docs/src/lib/figma.ts`:
   ```ts
   export const FIGMA_<NAME>: FigmaNodeRef = {
     fileKey: '<fileKey>',
     fileName: 'Snack-Ui-Kit-variables',
     nodeId: '<nodeId>',
   }
   ```

7. **Выдать предложения:**
   - `constants.ts` — SCREAMING_SNAKE_CASE объекты для каждой оси (`APPEARANCE`, `VIEW`, `SIZE`).
   - `types.ts` — `ValueOf<typeof X>` для каждой оси.
   - `VisualMatrix` — блоки `StoryTable` для каждой пары осей.
   - Размеры (height/width из Figma) — добавить в E2E `Dimensions` блок.

## Вывод

Markdown-отчёт:

```markdown
## Figma → <Name>

- **fileKey**: `aNPU3MHwRJiEwbk5F82zux`
- **nodeId**: `2507-25203`
- **Frames**: 18 (6 view × 3 appearance)
- **Variants per frame**: 36 (3 size × 4 composition × 3 states)
- **Всего variants**: 648

### Оси
- `size`: s, m, l
- `composition`: labelOnly, iconBefore, iconAfter (!!! Figma: iconAfrer), iconOnly
- `load`: true, false
- `disabled`: true, false

### Фиксированные размеры
- size=s: height 24, iconOnly 24×24
- size=m: height 32, iconOnly 32×32
- size=l: height 40, iconOnly 40×40

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
