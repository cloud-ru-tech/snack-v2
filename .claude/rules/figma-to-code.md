# Перенос компонентов из Figma в код

## Ключевой тезис

DOM-структура компонента практически повторяет структуру мастера в Figma. Единственное регулярное исключение — `focusedFrame/...`: это **не** DOM, а `:focus-visible { outline: ... }` на интерактивном корне.

## Обязательный workflow при работе с Figma MCP

1. Парсинг URL: `node-id=A-B` → `"A:B"`, `fileKey` — между `/design/` и `/<name>`.
2. `get_metadata` — структура слоёв, имена variants и инстансов.
3. `get_variable_defs` — имена токенов (маппить на `@ds/figma-variables` через `base.simple-var` / `base.composite-var`).
4. `get_design_context` — код-референс (React+Tailwind) **перепроектировать** на SCSS Modules + миксины `@design-system/materials`.
5. `get_screenshot` — визуальная сверка.

## Декодинг имён (краткая таблица)

| Имя в Figma                                | Код                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `stateLayer/<group>/<role>`                | `<span class={styles.stateLayer} data-state="<group><Role>" aria-hidden />` + `m.has-state-layer-as-child(#{stateLayer})` |
| `focusedFrame/...` (`hidden="true"`)       | **не DOM**; `&:focus-visible { outline: ...; outline-offset: ...; }`                                            |
| `material/<appearance><Level>`             | `<span class={styles.acrylic} aria-hidden />` + `data-acrylic-appearance`/`data-acrylic-level` + `m.with-material('acrylic', #{acrylic})` |
| Variants `size=`, `disabled=`, `load=` и т.д. | `data-size`, `data-disabled`, `data-loading` на корне                                                         |
| Мод, приколотый к вложенному фрейму/инстансу (`explicitVariableModes`: тема, бренд, платформа, плотность) | не проп: поддерево в `ChildThemeProvider value={{ … }}` из `@ds/theme`; раскладка — `AdaptiveProvider` / `withLayoutType` из `@ds/adaptive` |

Значения `data-state`: `emptyNeutralOnBackground`, `borderOnBackground`, `activatedOnBackground`, `versionOnColor`, `emptyVersionOnColor`, `inversionOnColor`, `emptyInversionOnColor`, `emptyDarkOnAccent` — только из этого списка (camelCase).

## `@design-system/materials` — что помнить

- Пакет SCSS-only. **Не импортировать в `.tsx`.**
- `@use '@design-system/materials' as m;`
- Миксины **не задают** `position: relative` на корне и **не задают** `position: absolute`/`inset: 0`/`pointer-events: none`/`border-radius: inherit` на классах дочерних слоёв — это обязанность потребителя.

## Минимальный чеклист перед коммитом

Финальный чек-лист (по доменам) — в скилле [`pre-mr-audit`](../skills/pre-mr-audit.md) §«Финальные чек-листы». Источник истины по правилам — этот файл; gate перед MR — скилл.

Эталонные ноды (Button, Acrylic `5004:102`, Switch `2834:25184`) и подробности по миксинам — в скилле [`figma-to-code`](../skills/figma-to-code.md).
