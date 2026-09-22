---
name: figma-to-code
---

# Перенос компонентов из Figma в код

## Ключевой тезис

DOM-структура компонента практически повторяет структуру мастера в Figma. Единственное регулярное исключение — `focusedFrame/...`: это **не** DOM-нода, а `:focus-visible { outline: ...; outline-offset: ...; }` на интерактивном корне.

## Обязательный workflow при работе с Figma MCP

1. Парсинг URL: `node-id=A-B` → `"A:B"`; `fileKey` — сегмент между `/design/` и `/<fileName>`. Для `Snack-Ui-Kit-variables`: `fileKey = aNPU3MHwRJiEwbk5F82zux`.
2. `get_metadata` — структура слоёв, имена variants и инстансов (декодируются по правилам ниже).
3. `get_variable_defs` — имена токенов; маппить на `@ds/figma-variables` через `base.simple-var(...)` / `base.composite-var(...)`.
4. `get_design_context` — код-референс (React+Tailwind) **перепроектировать** на SCSS Modules + миксины `@design-system/materials`. Не копировать дословно.
5. `get_screenshot` — визуальная сверка, особенно hover/pressed/disabled.

## Декодинг имён Figma-слоёв

| Имя в Figma                                | Код                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `stateLayer/<group>/<role>`                | `<span class={styles.stateLayer} data-state="<group><Role>" aria-hidden />` + `@include m.has-state-layer-as-child(#{stateLayer});` на корне |
| `focusedFrame/...` (обычно `hidden="true"`) | **не DOM**; `&:focus-visible { outline: ...; outline-offset: ...; }`                                           |
| `material/<appearance><Level>`             | `<span class={styles.acrylic} aria-hidden />` + `data-acrylic-appearance` / `data-acrylic-level` на корне + `@include m.with-material('acrylic', #{acrylic});` |
| Variants `size=`, `disabled=`, `load=`, `checked=` | `data-size`, `data-disabled`, `data-loading`, `data-checked` на корне |
| Мод, приколотый к вложенному фрейму/инстансу (`explicitVariableModes`: тема, бренд, платформа, плотность) | не проп: поддерево в `ChildThemeProvider value={{ … }}` из `@ds/theme`; раскладка — `AdaptiveProvider` / `withLayoutType` из `@ds/adaptive` |
| Variant `composition=` (`labelOnly`/`iconBefore`/`iconOnly`/…) | не ось: разворачивается в slot-пропы `icon` / `iconPosition` / наличие `label` |

Приколотый мод на вложенном элементе — редкое исключение (светлый блок в тёмной теме): в Figma он наследование ломает и в коде без подсказки не виден. Если дизайн его не подсветил в описании макета — уточнить, намеренный ли он.

Допустимые значения `data-state` (camelCase, только из этого списка): `emptyNeutralOnBackground`, `borderOnBackground`, `activatedOnBackground`, `versionOnColor`, `emptyVersionOnColor`, `inversionOnColor`, `emptyInversionOnColor`, `emptyDarkOnAccent`.

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
- [ ] Варианты Figma (`size`, `disabled`, `load`, `checked`) переданы как `data-*` атрибуты на корне; `composition` развёрнут в slot-пропы
- [ ] Нет `React.FC` / `React.ReactNode` / `any` / `@ts-ignore`; типы импортируются напрямую из `'react'`
- [ ] В `packages/<pkg>/package.json` нет `react`/`react-dom`, версии по [packages-deps.md](../rules/packages-deps.md)
- [ ] Узел компонента добавлен в `FIGMA_NODES` (`apps/docs/src/lib/figma.ts`) — Figma-панель Storybook берёт его оттуда, `parameters.design` в story не нужен
- [ ] `pnpm exec eslint packages/<pkg>` и `pnpm exec stylelint "packages/<pkg>/**/*.scss"` проходят (селективные команды — см. [fast-build-commands.md](../rules/fast-build-commands.md))

## Эталонные ноды (Snack Ui Kit variables)

- Button — `2782:111011`, `2782:111253`, `2782:111254`, `2778:29915`;
- Acrylic — `5004:102` → `material/neutralBackground1Level`;
- Switch — `2834:25184` → `switchS`.

Реализации миксинов — `packages/materials/src/`.
