---
name: figma-to-code
description: Используйте, когда пользователь даёт ссылку на Figma (`figma.com/design/...`), упоминает сервер `figma-remote-mcp` или просит перенести/доработать компонент из Figma в этом репо (React 19 + SCSS Modules + пакет `@design-system/materials`). Скилл содержит правила декодинга имён Figma-слоёв, словарь «слой → DOM → SCSS», порядок вызова MCP-инструментов и список анти-паттернов.
---

# Перенос компонентов из Figma в код

Этот SKILL — короткая выжимка. **Полная инструкция** (worked example Button, мини-примеры Acrylic и Switch, gotchas, чеклист): `docs/figma-to-code.md` в корне репо.

## Ключевой тезис

DOM-структура компонента практически повторяет структуру мастера в Figma. Единственное регулярное исключение — `focusedFrame/...`: это **не** DOM-нода, а `:focus-visible { outline: ...; outline-offset: ...; }` на интерактивном корне.

## Обязательный workflow при работе с Figma MCP

1. Парсинг URL: `node-id=A-B` → `"A:B"`; `fileKey` — сегмент между `/design/` и `/<fileName>`. Для `Snack-Ui-Kit-variables`: `fileKey = aNPU3MHwRJiEwbk5F82zux`.
2. `get_code_connect_map` — если есть готовый маппинг, использовать его, не переписывая компонент.
3. `get_metadata` — структура слоёв, имена variants и инстансов (декодируются по правилам ниже).
4. `get_variable_defs` — имена токенов; маппить на `@sbercloud/figma-variables` через `base.simple-var(...)` / `base.composite-var(...)`.
5. `get_design_context` — код-референс (React+Tailwind) **перепроектировать** на SCSS Modules + миксины `@design-system/materials`. Не копировать дословно.
6. `get_screenshot` — визуальная сверка, особенно hover/pressed/disabled.

## Декодинг имён Figma-слоёв

| Имя в Figma                                | Код                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `stateLayer/<group>/<role>`                | `<span class={styles.stateLayer} data-state="<group><Role>" aria-hidden />` + `@include m.has-state-layer-as-child(#{stateLayer});` на корне |
| `focusedFrame/...` (обычно `hidden="true"`) | **не DOM**; `&:focus-visible { outline: ...; outline-offset: ...; }`                                           |
| `material/<appearance><Level>`             | `<span class={styles.acrylic} aria-hidden />` + `data-acrylic-appearance` / `data-acrylic-level` на корне + `@include m.with-material('acrylic', #{acrylic});` |
| Variants `size=`, `disabled=`, `load=`, `checked=`, `composition=` | `data-size`, `data-disabled`, `data-loading`, `data-checked`, `data-variant` на корне                         |

Допустимые значения `data-state` (camelCase, только из этого списка): `regularFilled`, `regularBorder`, `activatedFilled`, `onColorFilled`, `onAccentFilled`.

## `@design-system/materials` — что помнить

- Пакет **SCSS-only**. Никогда не импортировать в `.tsx`/`.ts`.
- Подключение: `@use '@design-system/materials' as m;`
- Три публичных миксина:
  - `m.has-state-layer-as-child($stateLayerSelector)` — вешается на класс корня; внутри — `<span data-state="..." aria-hidden />`.
  - `m.has-content-with-text-opacity($contentLayerSelector)` — вешается на класс корня; внутри обёртки — элементы с `[data-text-opacity]`.
  - `m.with-material('acrylic', #{bgLayer}, #{effectLayer?})` — вешается на класс корня; на корне `data-acrylic-appearance` + `data-acrylic-level`; в разметке — `<span className={styles.acrylic} aria-hidden />` и опционально `<span className={styles.acrylicEffect} aria-hidden />`.
- Миксины **не задают** `position: relative` на корне и **не задают** `position: absolute`/`inset: 0`/`pointer-events: none`/`border-radius: inherit` на классах дочерних слоёв — это обязанность потребителя.

## Минимальный чеклист перед коммитом

- [ ] Hex/rgba из Figma переведены в токены через `base.simple-var(...)` / `base.composite-var(...)`
- [ ] Focus frame реализован через `:focus-visible`, а не DOM-нодой
- [ ] На интерактивном корне с миксинами есть `position: relative`
- [ ] `.stateLayer` / `.acrylic` / `.acrylicEffect` имеют `position: absolute; inset: 0; pointer-events: none; border-radius: inherit`
- [ ] Значения `data-state` — только из допустимого списка, camelCase
- [ ] Варианты Figma (`size`, `disabled`, `load`, `checked`, `composition`) переданы как `data-*` атрибуты на корне
- [ ] Нет `React.FC` / `React.ReactNode` / `any` / `@ts-ignore`; типы импортируются напрямую из `'react'`
- [ ] В `packages/<pkg>/package.json` нет `react`/`react-dom`, все версии точные (без `^`/`~`)
- [ ] В meta story указан `parameters.design = { type: 'figma', url: '...' }`
- [ ] `pnpm exec eslint packages/<pkg>` и `pnpm exec stylelint "packages/<pkg>/**/*.scss"` проходят (селективные команды — см. [fast-build-commands.md](../rules/fast-build-commands.md))

## Когда идти в канон

За этим скиллом стоит **`docs/figma-to-code.md`**. Читайте канон, если нужны:
- полный worked example Button с таблицей Figma → JSX → SCSS (ноды `2782:111011`, `2782:111253`, `2782:111254`, `2778:29915`);
- мини-пример Acrylic (нода `5004:102` → `material/neutralBackground1Level`);
- мини-пример Switch (нода `2834:25184` → `switchS`);
- полный список gotchas и анти-паттернов;
- ссылки на реализации миксинов (`packages/materials/src/...`).
