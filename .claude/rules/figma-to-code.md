# Перенос компонентов из Figma в код

Этот файл — короткая выжимка. **Полная инструкция**: `docs/figma-to-code.md` (читайте при любой задаче по переносу из Figma).

## Ключевой тезис

DOM-структура компонента практически повторяет структуру мастера в Figma. Единственное регулярное исключение — `focusedFrame/...`: это **не** DOM, а `:focus-visible { outline: ... }` на интерактивном корне.

## Обязательный workflow при работе с Figma MCP

1. Парсинг URL: `node-id=A-B` → `"A:B"`, `fileKey` — между `/design/` и `/<name>`.
2. `get_code_connect_map` (если есть готовый маппинг — использовать его).
3. `get_metadata` — структура слоёв, имена variants и инстансов.
4. `get_variable_defs` — имена токенов (маппить на `@sbercloud/figma-variables` через `base.simple-var` / `base.composite-var`).
5. `get_design_context` — код-референс (React+Tailwind) **перепроектировать** на SCSS Modules + миксины `@design-system/materials`.
6. `get_screenshot` — визуальная сверка.

## Декодинг имён (краткая таблица)

| Имя в Figma                                | Код                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `stateLayer/<group>/<role>`                | `<span class={styles.stateLayer} data-state="<group><Role>" aria-hidden />` + `m.has-state-layer-as-child(#{stateLayer})` |
| `focusedFrame/...` (`hidden="true"`)       | **не DOM**; `&:focus-visible { outline: ...; outline-offset: ...; }`                                            |
| `material/<appearance><Level>`             | `<span class={styles.acrylic} aria-hidden />` + `data-acrylic-appearance`/`data-acrylic-level` + `m.with-material('acrylic', #{acrylic})` |
| Variants `size=`, `disabled=`, `load=` и т.д. | `data-size`, `data-disabled`, `data-loading` на корне                                                         |

Значения `data-state`: `regularBackground`, `regularBorder`, `activatedBackground`, `activatedBorder`, `onColorBackground`, `onAccentBackground` — только из этого списка (camelCase).

## `@design-system/materials` — что помнить

- Пакет SCSS-only. **Не импортировать в `.tsx`.**
- `@use '@design-system/materials' as m;`
- Миксины **не задают** `position: relative` на корне и **не задают** `position: absolute`/`inset: 0`/`pointer-events: none`/`border-radius: inherit` на классах дочерних слоёв — это обязанность потребителя.

## Минимальный чеклист перед коммитом

- [ ] Hex/rgba переведены в токены через `base.simple-var(...)` / `base.composite-var(...)`
- [ ] Focus frame → `:focus-visible`, а не DOM-нода
- [ ] На интерактивном корне с миксинами есть `position: relative`
- [ ] `data-state` — только из допустимого списка, camelCase
- [ ] `.stateLayer` / `.acrylic` / `.acrylicEffect` имеют `position: absolute; inset: 0; pointer-events: none; border-radius: inherit`
- [ ] Нет `React.FC`/`React.ReactNode`/`any`/`@ts-ignore`
- [ ] В `packages/<pkg>/package.json` нет `react`/`react-dom`, версии точные
- [ ] В meta story указан `parameters.design.url` на Figma-ноду

Worked example (Button), мини-примеры (Acrylic `5004:102`, Switch `2834:25184`), список gotchas и подробности по миксинам — в `docs/figma-to-code.md`.
