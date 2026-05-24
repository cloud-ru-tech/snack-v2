---
name: figma-selected-block
description: Получить SCSS стили выделенного слоя из Figma-ноды через CLI @sbercloud/figma-selected-block + Figma MCP. Вызывать, когда пользователь дал Figma URL и нужно сгенерировать стили одного слоя с токенами `base.$sn-*` / миксинами `composite-var`, не запуская сам плагин в Figma.
---

# figma-selected-block — workflow для агента

CLI-пакет `@sbercloud/figma-selected-block` по CSS выделенного слоя выдаёт SCSS с `base.$sn-*`-ссылками и, где нужно, вызовами `@include base.composite-var(...)`. 

## Когда вызывать

- Пользователь дал ссылку `figma.com/design/<fileKey>/...?node-id=<id>`.
- Нужно получить SCSS одного (или нескольких) слоёв, совместимый с `@sbercloud/figma-variables` / `@design-system/materials`.
- **Не** подходит для: поиска всех вариантов size/appearance на странице, генерации цикла `@each`, сбора импортов `@use`.

## Два рабочих режима

| Режим | Требует | Что умеет |
|-------|---------|-----------|
| **CSS-in** (основной в этом репо) | Figma MCP (`get_variable_defs` / `get_design_context`) | Точный SCSS по фактическим `var(--sn-*)` выделенного слоя. Типографика схлопывается в один `composite-var`. |
| **REST-in** (`--url`) | `FIGMA_TOKEN` env (лежит в `.env` репо) | Сам ходит в Figma REST, синтезирует CSS из paddings/gap/radius/border + ДЕТЕЙ. **Схлопывает anatomy в `composite-var` автоматически** (обходит все leaf'ы). Для `fills` / theme-цветов эвристика молчит — добирать через MCP. |

Порядок выбора:
1. Токен из `.env` есть → **REST-in первым** (`set -a && source .env && set +a && npx figma-selected-block --url ... --component <name> --variant size=<...>`). Получишь composite-var-мистеры одним вызовом.
2. Нужны конкретные цвета/state-layer/типографика выделенного слоя → дополнить через **CSS-in** на узкой ноде.

## Алгоритм (CSS-in)

1. **Распарсить URL**: `node-id=2782-111252` → `2782:111252`, `fileKey` — из `/design/<key>/...`.
2. **Получить токены ноды** через MCP:
   - `mcp__figma-remote-mcp__get_variable_defs({ nodeId, fileKey })` — вернёт карту `{ "sn/button/anatomy/size/s/container/paddingHorizontal": "4", ... }` только для этой ноды (не детей).
   - Если нужна структура поддерева — `mcp__figma-remote-mcp__get_metadata`, затем отдельные `get_variable_defs` / `get_design_context` по вложенным nodeId. MCP возвращает CSS для дочерних слоёв в виде Tailwind-классов с `var(--sn\/...)` — их нужно транслировать в чистый CSS.
3. **Собрать CSS** для каждого интересующего слоя в `.css`-файл **как есть из Figma** — camelCase сохраняется, значения fallback (`, #FBFFFC`, `, 12px`) CLI игнорирует. Единственное преобразование — заменить разделитель пути со `/` на `-` (`sn/button/anatomy/...` из `get_variable_defs` → `--sn-button-anatomy-...`). Регистр leaf'ов не трогать: `paddingHorizontal`, `fontSizeM`, `onAccent` должны остаться в своём виде. **Не** переписывай CSS «под себя» — бери сырой output из Figma Inspect / MCP.
4. **Запустить CLI**:
   ```bash
   npx figma-selected-block --css-file /tmp/node.css --component <hint> --format scss
   ```
   - `--component` — хинт (`button`, `alert`, `counter`, `tag`, …). Если не задать, CLI попробует вывести из имён переменных.
   - `--format json` добавит счётчики `mixinsCount` / `stylesCount` и массив `warnings`.
   - Stdin-режим: `echo '{"css":"…","componentHint":"alert"}' | npx figma-selected-block --format json`.
5. **Разложить результат по SCSS-модулям пакета** (см. `.claude/rules/figma-to-code.md`). CLI выдаёт только тело блока стилей — обёртку и `@use 'base'` добавляет агент.

## Что именно делает CLI (проверено)

Входной CSS:

```css
font-family: var(--sn-brand-font-fontfamily-regular);
font-size: var(--sn-density-typography-rolelabel-fontsizem);
font-weight: var(--sn-theme-typography-fontweight-regular-label-m);
line-height: var(--sn-density-typography-rolelabel-lineheightm);
letter-spacing: var(--sn-primitive-font-letterspacing-s);
color: var(--sn-theme-color-primary-onaccent);
```

Выход:

```scss
@include base.composite-var(base.$base-styles, 'sn', 'regular', 'label', 'm');
color: base.$sn-theme-color-primary-onaccent;
```

- `var(--sn-*)` → `base.$sn-*` (через `CSS_VAR_TO_JS_PATH` и эвристику имени).
- **Типографика** (`font-family`/`font-size`/`font-weight`/`line-height`/`letter-spacing`/`paragraph-spacing`) — схлопывается в **один** `@include base.composite-var(base.$base-styles, 'sn', <weight>, <variant>, <size>)`.
- **Anatomy-group** (padding/gap/radius внутри одного `container`) — схлопывается в `@include base.composite-var(<component>.$map, 'anatomy', 'size', $size, …)`, **только если в CSS присутствуют ВСЕ листья пути** (`ANATOMY_FULL_LEAF_KEYS_BY_PATH[pathKey]`). Если хоть один leaf отсутствует — CLI оставит свойства отдельными `base.$...` строками. Это не баг — чинится добавлением всех листьев в CSS.
- `background`, `color`, `border-color` из `sn-theme-*` — подставляются как `base.$sn-theme-*`.
- Не-`sn` переменные игнорируются с предупреждением в `warnings`.

## Проверенный пример — Button size=s `node-id=2782:111252`

**REST-in** (`--url --component button --variant size=s`) вернул:

```scss
/* composite-var (токены) */
@include base.composite-var(button.$button, 'anatomy', 'size', $size, 'container'); 
@include base.composite-var(button.$button, 'anatomy', 'size', $size, 'container', 'textWrapper'); 

/* стили */
display: flex;
flex-direction: row;
```

`warnings` содержали 5 записей `could not reconstruct sn-* name for .../fills` — цвета fills эвристика не собрала (scope `file_variables:read` отсутствует, API отдал 403; CLI упал в эвристику по anatomy-картам и прошёл).

**CSS-in** для label-слоя схлопнул 5 typography-переменных в один `@include base.composite-var(base.$base-styles, 'sn', 'regular', 'label', 'm')` + оставил `color: base.$sn-theme-color-primary-onaccent`.

Практика: REST даёт скелет с anatomy, CSS-in добирает цвета/state-layer/типографику с конкретной ноды через MCP.

## Частые ошибки

- **Не переписывай CSS**: бери сырой вывод Figma Inspect / MCP как есть. Регистр leaf'ов (`onAccent`, `fontFamily`, `paddingHorizontal`) должен сохраняться — CLI выводит ссылки с тем же регистром (`base.$sn-theme-color-primary-onAccent`). Принудительный lowercase ломает соответствие именам в `@sbercloud/figma-variables`.
- **Tailwind-экранирование** (`var(--sn\/button\/...)`) появляется только в className из `get_design_context`. В чистом CSS Inspect такого нет. Если всё же работаешь с className — замени `\/` на `-`, регистр leaf'ов не трогай.
- **Fallback-значения** (`var(--sn-..., #FBFFFC)`, `, 12px`) — оставляй; CLI их корректно игнорирует.
- **Пустой mixinsCount**: не ошибка — значит леаф на пути не полный. Если хочешь composite-var — добери в CSS все leaf'ы (см. `tokens/<component>.scss` пакета `@sbercloud/figma-variables`) или переключись в REST-in.
- **Без FIGMA_TOKEN не пытайся `--url`** — CLI упадёт с `error: Figma token not provided`.

## Связанные правила

- `.claude/rules/figma-integration.md` — формат `FIGMA_NODES` и MCP workflow.
- `.claude/rules/figma-to-code.md` — как итоговый SCSS раскладывается по модулям.
