# Перенос компонентов из Figma в код

## Ключевой тезис

DOM-структура компонента практически повторяет структуру мастера в Figma. Единственное регулярное исключение — `focusedFrame/...`: это **не** DOM-нода, а `:focus-visible { outline: ...; outline-offset: ...; }` на интерактивном корне.

## Обязательный workflow при работе с Figma MCP

1. Возьми узел из ссылки задачи или актуальной карты `FIGMA_NODES` в `apps/docs/src/lib/figma.ts`. В URL `node-id=A-B` соответствует `A:B`, а `fileKey` берётся из `/design/<fileKey>/…`.
2. `get_metadata` — структура слоёв, имена variants и инстансов (декодируются по правилам ниже).
3. `get_variable_defs` — имена токенов; маппить на `@ds/figma-variables` через `base.simple-var(...)` / `base.composite-var(...)`.
4. `get_design_context` — код-референс (React+Tailwind) **перепроектировать** на SCSS Modules + миксины `@ds/materials`. Не копировать дословно.
5. `get_screenshot` — визуальная сверка, особенно hover/pressed/disabled.

Если узел недоступен, используй приложенный Inspect/CSS или скриншот в пределах того, что они подтверждают. Продолжай независимые от Figma правки и перечисли непроверенные токены, состояния или геометрию. Если без макета нельзя принять решение, запроси доступ или экспорт нужного слоя.

## Декодинг имён Figma-слоёв

| Имя в Figma                                | Код                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `stateLayer/<group>/<role>`                | `<span className={styles.stateLayer} data-state="<group><Role>" aria-hidden />` + `@include m.has-state-layer-as-child(#{stateLayer});` на корне |
| `focusedFrame/...` (обычно `hidden="true"`) | **не DOM**; `&:focus-visible { outline: ...; outline-offset: ...; }`                                           |
| `material/<appearance><Level>`             | `<span className={styles.acrylic} aria-hidden />` + `data-acrylic-appearance` / `data-acrylic-level` на корне + `@include m.with-material('acrylic', #{acrylic});` |
| Variants `size=`, `disabled=`, `load=`, `checked=` | `data-size`, `data-disabled`, `data-loading`, `data-checked` на корне |
| Мод, приколотый к вложенному фрейму/инстансу (`explicitVariableModes`: тема, бренд, платформа, плотность) | не пропс: поддерево в `ChildThemeProvider value={{ … }}` из `@ds/theme`; раскладка — `AdaptiveProvider` / `withLayoutType` из `@ds/adaptive` |
| Variant `composition=` (`labelOnly`/`iconBefore`/`iconOnly`/…) | не ось: разворачивается в slot-пропсы `icon` / `iconPosition` / наличие `label` |

Приколотый мод на вложенном элементе — редкое исключение (светлый блок в тёмной теме): в Figma он наследование ломает и в коде без подсказки не виден. Если дизайн его не подсветил в описании макета — уточнить, намеренный ли он.

Допустимые значения `data-state` (camelCase, только из этого списка): `emptyNeutralOnBackground`, `borderOnBackground`, `activatedOnBackground`, `versionOnColor`, `emptyVersionOnColor`, `inversionOnColor`, `emptyInversionOnColor`, `emptyDarkOnAccent`.

## `@ds/materials` — что помнить

- Пакет **SCSS-only**. Никогда не импортировать в `.tsx`/`.ts`.
- Подключение: `@use '@ds/materials' as m;`
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
- [ ] Варианты Figma (`size`, `disabled`, `load`, `checked`) переданы как `data-*` атрибуты на корне; `composition` развёрнут в slot-пропсы
- [ ] Нет `React.FC` / `React.ReactNode` / `any` / `@ts-ignore`; типы импортируются напрямую из `'react'`
- [ ] В `packages/<pkg>/package.json` нет `react`/`react-dom`, версии по [packages-deps.md](../../new-component-package/references/packages-deps.md)
- [ ] Узел компонента добавлен в `FIGMA_NODES` (`apps/docs/src/lib/figma.ts`) — Figma-панель Storybook берёт его оттуда, `parameters.design` в story не нужен
- [ ] `pnpm exec eslint packages/<pkg>` и `pnpm exec stylelint "packages/<pkg>/**/*.scss"` проходят (селективные команды — см. [fast-build-commands.md](../../component-validation/references/fast-build-commands.md))

Реализации миксинов — `packages/materials/src/`.
