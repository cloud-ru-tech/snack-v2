# Перенос компонентов из Figma в код

> Актуально на 2026-04-20. Структура Figma-файла может быть реиндексирована — сверяйтесь через `get_metadata` перед копированием конкретных node-id.

Этот документ — инструкция для ИИ-ассистентов (Claude Code, Cursor) по переносу компонентов из Figma (`Snack-Ui-Kit-variables`, fileKey `aNPU3MHwRJiEwbk5F82zux`) в этот репозиторий.

**Ключевой тезис:** DOM-структура компонента практически повторяет структуру соответствующего мастера в Figma — с единственным регулярным исключением (focus frame, см. ниже). Имена мастер-компонентов и инстансов декодируются по правилам из раздела [«Декодинг имён»](#декодинг-имён-мастер-компонентов-и-инстансов).

---

## Когда применять

Применяйте процедуру из этого документа, когда:

- пользователь даёт ссылку вида `https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/...?node-id=...` и просит перенести компонент/состояние;
- пользователь упоминает Figma MCP (сервер `figma-remote-mcp`);
- задача требует добавить/поправить визуальный слой, state layer, focus ring, акриловый фон в компоненте дизайн-системы.

Если в Figma используется **другой файл** (не `Snack-Ui-Kit-variables`) — скилл применим частично: workflow и API `@design-system/materials` актуальны, а правила декодинга имён нужно перепроверять.

---

## Workflow: Figma MCP → код

1. **Распарсить URL** — см. раздел [«Парсинг URL»](#парсинг-url).
2. **`get_code_connect_map`** первым вызовом — если для ноды уже есть Code Connect маппинг, используйте его и не переписывайте компонент.
3. **`get_metadata`** на ноду — получить структуру слоёв и имена детей (variants, states, nested symbols). По именам уже можно понять, какие слои превратятся в DOM-элементы, а какие в CSS-состояния (см. [«Декодинг имён»](#декодинг-имён-мастер-компонентов-и-инстансов)).
4. **`get_variable_defs`** на ту же ноду — вытащить имена design-токенов, которые использует дизайнер. Эти имена напрямую маппятся на SCSS-переменные из `@sbercloud/figma-variables` (например, `color/material/stateLayer/regular/default/background` → `base.$sn-theme-color-material-stateLayer-regular-default-background`).
5. **`get_design_context`** на ноду — получить код-референс (React+Tailwind) и скриншот. **Код-референс — НЕ финальный результат**, его нужно перевести на стек репо:
   - React+Tailwind → React 19 + SCSS Modules + миксины из `@design-system/materials`;
   - inline hex/rgba → токены через `base.simple-var(...)` / `base.composite-var(...)`;
   - absolute-координаты → flex/grid + токены spacing.
6. **`get_screenshot`** — визуальная сверка, особенно для hover/pressed/disabled состояний.
7. **Сверить с существующим компонентом** — посмотреть, нет ли в `packages/*` близкого компонента, чтобы не дублировать логику.

---

## Парсинг URL

Форматы:

- `https://www.figma.com/design/<fileKey>/<fileName>?node-id=<A>-<B>` → `fileKey = <fileKey>`, `nodeId = "<A>:<B>"` (дефис заменяется на двоеточие).
- `https://www.figma.com/design/<fileKey>/branch/<branchKey>/<fileName>?node-id=...` → в качестве `fileKey` использовать `<branchKey>`.

Для файла `Snack-Ui-Kit-variables`:

```
fileKey = aNPU3MHwRJiEwbk5F82zux
```

---

## Словарь: слой Figma → DOM → SCSS

Правило по умолчанию: **каждому видимому слою в Figma соответствует DOM-элемент**. Исключения и особые маппинги:

| Слой / имя мастера в Figma                                  | DOM                                                                                      | SCSS / миксин из `@design-system/materials`                                                                                   |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `stateLayer/<group>/background` (фон state layer)           | `<span class={styles.stateLayer} aria-hidden data-state="<group>Background" />`          | На классе интерактивного корня: `@include m.has-state-layer-as-child(#{stateLayer});`                                         |
| `stateLayer/<group>/border` (бордер state layer)            | `<span class={styles.stateLayer} aria-hidden data-state="<group>Border" />`              | То же, плюс `border-radius` на state layer наследуется от корня                                                               |
| `focusedFrame/...` (часто `hidden="true"` в Figma)          | **НЕ DOM-нода.** Никакого `<span data-focus-ring/>` создавать не нужно                   | На интерактивном корне: `&:focus-visible { outline: ... solid ...; outline-offset: ...; }` с токенами из `@sbercloud/figma-variables` |
| `material/<appearance><Level>` (акрил)                      | `<span class={styles.acrylic} aria-hidden />` (+ опционально `<span class={styles.acrylicEffect} aria-hidden />`); на корне атрибуты `data-acrylic-appearance` и `data-acrylic-level` | `@include m.with-material('acrylic', #{acrylic}, #{acrylicEffect});`                                                          |
| Outline/border (стандартная обводка элемента)               | `<span data-border-layer aria-hidden />` (если бордер нужен отдельным слоем, например у Button view="outline") | На классе слоя: `position: absolute; inset: 0; border-style: solid; border-radius: inherit; pointer-events: none;` + цвет из токена |
| Контентная обёртка (auto-layout с текстом/иконками)         | `<span class={styles.content}>...</span>`                                                | При необходимости: `@include m.has-content-with-text-opacity(#{content});` + `[data-text-opacity]` на тех детях, где меняется opacity на hover/pressed |
| Иконки, текст, кастомные визуальные элементы                | Обычные DOM-ноды (`<span class={styles.icon}>`, `<span class={styles.label}>`)           | Токены типографики и цвета через `base.composite-var(...)` / `base.simple-var(...)`                                           |
| Variants (`size=s`, `disabled=true`, `load=true`)           | `data-*` атрибуты на корне (`data-size="s"`, `data-disabled`, `data-loading`)            | Селекторы `.root[data-size='s'] { ... }`, `.root[data-disabled] { ... }`                                                      |

**Важно:**

- `has-state-layer-as-child` и `has-content-with-text-opacity` вешаются на **класс корневого интерактивного элемента**, аргумент — имя класса потомка (в CSS Modules — `#{stateLayer}`, `#{content}`).
- Миксины не выставляют `position: relative` на корне и не задают `position: absolute`/`inset: 0`/`pointer-events: none` на дочерних слоях — это обязанность потребителя.

---

## Декодинг имён мастер-компонентов и инстансов

В Figma-файле `Snack-Ui-Kit-variables` имена мастеров и инстансов кодируют семантику. Чтобы корректно сматчить слой с кодом, читайте имя по следующим правилам.

### `stateLayer/<group>/<role>`

Пример: `2778:29915` — `stateLayer/regular/background`.

Маппинг:
- `<group>` ∈ `{regular, activated, onColor, onAccent}`;
- `<role>` ∈ `{background, border}`;
- результирующий атрибут: `data-state="<group><Role>"` (camelCase-соединение).

Примеры:

| Имя в Figma                             | `data-state`                    | Токен                                                                  |
| --------------------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `stateLayer/regular/background`         | `regularBackground`             | `base.$sn-theme-color-material-stateLayer-regular-default-background`  |
| `stateLayer/regular/border`             | `regularBorder`                 | `base.$sn-theme-color-material-stateLayer-regular-default-borderColor` |
| `stateLayer/activated/background`       | `activatedBackground`           | `base.$sn-theme-color-material-stateLayer-activated-default-background` |
| `stateLayer/onColor/background`         | `onColorBackground`             | `base.$sn-theme-color-material-stateLayer-onColor-default-background`  |
| `stateLayer/onAccent/background`        | `onAccentBackground`            | `base.$sn-theme-color-material-stateLayer-onAccent-default-background` |

Сами варианты `state=default|hovered|pressed` внутри мастера — это **не** отдельные DOM-ноды, а состояния корня (`:hover`, `:active`, `[data-loading]`, `[data-pressed="true"]`). Миксин `has-state-layer-as-child` применяет правильные токены для каждого состояния автоматически.

### `focusedFrame/...`

Пример: `2782:111254` — `focusedFrame/regular/outsideOffset` (в Figma идёт с `hidden="true"`).

**Не создавать DOM-ноду.** Это слой, который Figma показывает только для иллюстрации focus-состояния. В коде — `:focus-visible` на интерактивном корне:

```scss
&:focus-visible {
  outline: base.$sn-theme-color-available-complementary solid base.$sn-primitive-strokeWeight-strokeSemiBold;
  outline-offset: base.$sn-primitive-strokeWeight-strokeSemiBold;
}
```

Если в имени `insideOffset` (вместо `outsideOffset`) — берите отрицательный `outline-offset`:

```scss
outline-offset: calc(0px - base.$sn-primitive-strokeWeight-strokeSemiBold);
```

Исключения (когда focus всё-таки становится DOM-нодой): многослойное кольцо, анимированный focus. В таком случае оправдан отдельный `<span data-focus-ring aria-hidden />`, но это редкость и должно быть согласовано с дизайном.

### `material/<appearance><Level>`

Пример: `5004:102` — `material/neutralBackground1Level`.

Маппинг (чтение справа налево):
- `<Level>` ∈ `{default (нет суффикса), 1Level, 2Level}` → `data-acrylic-level="<level>"`;
- префикс — имя appearance ∈ `{primary, neutral, blue, red, yellow, green}` → `data-acrylic-appearance="<appearance>"`;
- сам слой в Figma обычно называется `background` или `background 1Level` / `background 2Level`.

Итог: на корне компонента — атрибуты `data-acrylic-appearance` и `data-acrylic-level`, в разметке — дочерний `<span class={styles.acrylic} aria-hidden />`, в SCSS — `@include m.with-material('acrylic', #{acrylic});`.

### Variants мастера (пары `<propName>=<value>`)

Пример: `2782:111011` — `buttonFilledPrimary` с вариантами вида `size=s, composition=iconBefore, load=false, disabled=false`.

Правило:
- `size=<value>` → `data-size="<value>"` на корне;
- `disabled=true` → `data-disabled` (boolean-атрибут, ставится только когда true);
- `load=true`/`loading=true` → `data-loading`;
- `checked=true` → `data-checked` или prop `checked` на `<input>` (если это native control);
- `composition=<value>` → `data-variant="<value>"` или `data-composition="<value>"` (зависит от компонента).

В коде обычно prop → `data-*` атрибут. Имя prop на стороне компонента может отличаться (например, Figma `composition` → prop `variant` у Button) — сопоставление фиксируется в `types.ts` пакета.

---

## `@design-system/materials`: справка по миксинам

> Пакет SCSS-only. **Никогда не импортируйте `@design-system/materials` в `.tsx`/`.ts`.** Подключение только через `@use`.

```scss
@use '@design-system/materials' as m;
```

### `m.has-state-layer-as-child($stateLayerSelector)`

- Вешается на класс интерактивного корня.
- `$stateLayerSelector` — имя класса потомка в том же SCSS-модуле (в CSS Modules — `#{stateLayer}`).
- В JSX: внутри корня `<span className={styles.stateLayer} aria-hidden data-state="..." />`.
- Миксин **не задаёт** `position: relative` на корне — задайте сами, иначе абсолютный slot state layer уйдёт не туда.
- Поддерживаемые `data-state`: `regularBackground`, `regularBorder`, `activatedBackground`, `activatedBorder`, `onColorBackground`, `onAccentBackground`.
- Реагирует на корневые состояния: `:hover:not([data-disabled], [data-loading])`, `:active:not([data-disabled], [data-loading])`, `[data-loading]`, `[data-pressed="true"]:not([data-disabled], [data-loading])`.

### `m.has-content-with-text-opacity($contentLayerSelector)`

- Вешается на класс интерактивного корня.
- `$contentLayerSelector` — имя класса обёртки контента (в CSS Modules — `#{content}`).
- Внутри обёртки все элементы с атрибутом `[data-text-opacity]` получат плавное изменение `opacity` на hover/pressed.
- Помечайте `[data-text-opacity]` только на иконках и тексте, где это действительно нужно (обычно это и есть единственная индикация взаимодействия у прозрачных кнопок).

### `m.with-material($material, $props...)`

- Сейчас поддерживается только `'acrylic'`:
  ```scss
  @include m.with-material('acrylic', #{acrylic}, #{acrylicEffect});
  ```
- Первый аргумент после имени материала — класс дочернего фона (обязателен); второй — класс дочернего color-dodge эффекта (опционален).
- Атрибуты на корне: `data-acrylic-appearance` ∈ `{primary, neutral, blue, red, yellow, green}`; `data-acrylic-level` ∈ `{default, 1Level, 2Level}`.
- Миксин **не** задаёт `position: relative` на корне и **не** задаёт `position: absolute`/`inset: 0`/`pointer-events: none`/`border-radius: inherit` на дочерних слоях — это обязанность потребителя.
- Минимальная SCSS-обвязка рядом с миксином:

```scss
.acrylic,
.acrylicEffect {
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.card {
  position: relative;
  @include m.with-material('acrylic', #{acrylic}, #{acrylicEffect});
}
```

Подробнее: `packages/materials/docs/index.mdx` — **не** дублировать его содержимое в новых документах.

---

## Worked example: Button

Исходник в Figma:
- мастер: `2782:111011` — `buttonFilledPrimary`;
- state layer внутри варианта кнопки: `2782:111253` — `state` (инстанс мастера `2778:29915` = `stateLayer/regular/background`);
- focus frame: `2782:111254` — `focusedFrame/regular/outsideOffset` (`hidden="true"`).

Код: `packages/button/src/Button/Button.tsx`, `packages/button/src/Button/styles.module.scss`.

### Маппинг слоёв Figma → JSX → SCSS

| Figma                                                     | JSX (`Button.tsx`)                                                                             | SCSS (`styles.module.scss`)                                                        |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Variants: `size=s/m/l`                                    | `data-size={size}`                                                                             | `&[data-size='s'] { ... }` + `base.composite-var(btn.$button, 'anatomy', 'size', ...)` |
| Variants: `composition=labelOnly/iconBefore/iconAfter/iconOnly` | `data-variant={variant}` (вычисляется в `getVariant`)                                     | `&[data-variant='icon-only'] { ... }`                                              |
| Variants: `disabled=true`                                 | `data-disabled={isDisabled || undefined}`                                                      | `&:disabled, &[data-disabled] { ... }`                                             |
| Variants: `load=true`                                     | `data-loading={loading || undefined}`                                                          | `&[data-loading] { ... }`                                                          |
| Border слой (только у view='outline')                     | `{view === 'outline' && <span data-border-layer aria-hidden />}`                               | `.root[data-view='outline'] [data-border-layer] { position: absolute; inset: 0; ... }` |
| `stateLayer/regular/background` (инстанс `2782:111253`)   | `<span className={styles.stateLayer} aria-hidden data-state="regularBackground" />`            | `@include m.has-state-layer-as-child(#{stateLayer});` на `.root`                   |
| `focusedFrame/regular/outsideOffset` (инстанс `2782:111254`) | **нет в DOM**                                                                               | `&:focus-visible { outline: ... solid ...; outline-offset: ...; }`                 |
| Контентная обёртка                                        | `<span className={styles.content}>...</span>`                                                  | `.content { ... }`; для view='function': `@include m.has-content-with-text-opacity(#{content});` |
| Иконка                                                    | `<span className={styles.icon} aria-hidden data-text-opacity>{iconNode}</span>`                | `.icon { display: flex; ... }`                                                     |
| Лейбл                                                     | `<span className={styles.label} data-text-opacity>{label}</span>`                              | `.label { @include base.composite-var(base.$base-styles, 'sn', 'regular', 'label', $size); }` |
| Счётчик (доп. слой в Figma у `iconAfter`-варианта)        | `<span className={styles.counterSlot} data-absolute={showCounterAsBadge || undefined}>...`    | `.counterSlot { ... }` + `.counterSlot[data-absolute] { position: absolute; transform: translate(50%, -50%); ... }` |

### На что обратить внимание

- Focus frame из Figma **не превратился** в DOM-ноду — он живёт в `.root:focus-visible { outline: ... }`. У view='function' используется отрицательный `outline-offset`, так как в Figma у «функциональной» кнопки focus frame с `insideOffset`.
- `view='outline'` потребовал отдельного DOM-слоя `<span data-border-layer />`, потому что у outline-варианта нужен бордер, визуально непересекающийся с state layer.
- `data-text-opacity` стоит на иконке и лейбле — это покрывает view='function' (прозрачная кнопка). Остальные view тоже его наследуют, но в их SCSS `has-content-with-text-opacity` не подключён — и это нормально.

---

## Мини-пример: Acrylic material

Исходник в Figma: `5004:102` — инстанс `material/neutralBackground1Level`.

Декодинг имени:
- `material` → применяется `m.with-material('acrylic', ...)`;
- `neutral` → `data-acrylic-appearance="neutral"`;
- `1Level` → `data-acrylic-level="1Level"`.

### JSX

```tsx
import cn from 'classnames';
import { type ReactNode } from 'react';

import styles from './styles.module.scss';

interface AcrylicCardProps {
  children: ReactNode;
  className?: string;
}

export function AcrylicCard({ children, className }: AcrylicCardProps) {
  return (
    <div
      className={cn(styles.root, className)}
      data-acrylic-appearance='neutral'
      data-acrylic-level='1Level'
    >
      <span className={styles.acrylic} aria-hidden />
      <span className={styles.acrylicEffect} aria-hidden />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
```

### SCSS

```scss
@use '@design-system/materials' as m;

.acrylic,
.acrylicEffect {
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.root {
  position: relative;
  @include m.with-material('acrylic', #{acrylic}, #{acrylicEffect});
}

.content {
  position: relative;
  z-index: 1;
}
```

Если в макете атрибуты `appearance`/`level` динамические — вытащите их в пропы (`appearance: AcrylicAppearance = 'neutral'`, `level: AcrylicLevel = 'default'`) и проставляйте через `data-*`.

---

## Мини-пример: Switch

Исходник в Figma: `2834:25184` — мастер `switchS`.

Варианты мастера:
- `checked=false, loading=false, disabled=false`
- `checked=true,  loading=false, disabled=false`
- `checked=false, loading=true,  disabled=false`
- `checked=true,  loading=true,  disabled=false`
- `checked=false, loading=false, disabled=true`
- `checked=true,  loading=false, disabled=true`

Размер: 36×24 px — это size=s.

### Маппинг

| Figma                                                 | JSX                                                         | SCSS                                         |
| ----------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------- |
| Track (корпус свитча)                                 | `<span className={styles.root} data-size='s' ...>`          | `.root { position: relative; ... }`          |
| `stateLayer/regular/background` (фон трека)           | `<span className={styles.stateLayer} aria-hidden data-state='regularBackground' />` | `@include m.has-state-layer-as-child(#{stateLayer});` |
| Thumb (движущийся кружок)                             | `<span className={styles.thumb} aria-hidden />`             | `.thumb { position: absolute; transition: transform ...; }` + сдвиг по `[data-checked]` |
| Variant `checked=true/false`                          | `data-checked={checked || undefined}` + `role='switch' aria-checked={checked}` | `.root[data-checked] .thumb { transform: ... }` |
| Variant `loading=true`                                | `data-loading={loading || undefined}`                       | `.root[data-loading] { cursor: progress; ... }` |
| Variant `disabled=true`                               | `data-disabled={disabled || undefined}` + `aria-disabled`   | `.root[data-disabled] { opacity: ...; cursor: not-allowed; }` |
| focusedFrame (если есть в мастере)                    | **нет в DOM**                                               | `&:focus-visible { outline: ...; outline-offset: ...; }` |

### Особенности, которые отличают Switch от Button

- Интерактивный элемент — это `<button role='switch'>` или `<input type='checkbox'>` + обёртка; у `role='switch'` важен `aria-checked={checked}`.
- Thumb — отдельный DOM-элемент, потому что в Figma это отдельный слой с собственной позицией, которая анимируется.
- `data-state="regularBackground"` работает так же, как у Button: токены подтянет `has-state-layer-as-child`.
- Нет `data-text-opacity` — Switch не содержит текст.
- `data-checked` — это **локальное** правило репо (не Figma-именование). Имя `checked` взято из имени variant в Figma (`сhecked=true`) и переведено в camelCase → `data-checked`.

---

## Gotchas и антипаттерны

1. **Не копируйте hex/rgba из кода-референса `get_design_context`.** Всегда переводите в токены `@sbercloud/figma-variables` через `base.simple-var(...)` или `base.composite-var(...)`. Для быстрой сверки используйте `get_variable_defs` на той же ноде — он вернёт имена токенов.
2. **Не создавайте DOM-ноду под focus frame.** Любой слой с именем `focusedFrame/...` (часто `hidden="true"`) маппится на `:focus-visible { outline }`, а не на `<span data-focus-ring />`.
3. **Не забывайте `position: relative` на интерактивном корне.** Миксины `has-state-layer-as-child` и `with-material('acrylic', ...)` не задают его сами. Без `position: relative` абсолютные дочерние слои уйдут к ближайшему позиционированному предку.
4. **Не выставляйте `position: absolute`/`inset: 0`/`pointer-events: none` внутри миксинов.** Это обязанность потребителя — задать на классах слоёв (`.stateLayer`, `.acrylic`, `.acrylicEffect`, `[data-border-layer]`).
5. **Не импортируйте `@design-system/materials` в `.tsx`.** Пакет SCSS-only. В `.tsx` импортируйте только `styles from './styles.module.scss'` и используйте `cn` из `classnames`.
6. **Не переносите Tailwind-классы из `get_design_context` дословно.** Вывод MCP — это reference, его нужно перепроектировать под SCSS Modules + токены репо.
7. **Не используйте `React.FC`, `React.ReactNode` и т.п.** Импортируйте типы напрямую из `'react'` (`ReactNode`, `CSSProperties`, `ElementType`, `HTMLAttributes`, `ComponentPropsWithoutRef`).
8. **Не объявляйте `react`/`react-dom` в `packages/<pkg>/package.json`.** React приходит из root workspace и от потребителей.
9. **Не используйте `^`/`~` в версиях зависимостей** внутри `packages/*/package.json` — только точные версии.
10. **Не добавляйте `tags: ['dev', 'test', 'autodocs']` во все stories.** Это исключительно для `Playground`. Подробнее — `.cursor/rules/components/stories-standard.mdc`.
11. **В meta story всегда указывайте Figma link**: `parameters.design = { type: 'figma', url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/...?node-id=...' }`.
12. **Не дублируйте материал поверх готового компонента.** Если используете `Block` из `@design-system/block`, он уже может применять `with-material('acrylic', ...)` — повторно подключать не нужно.
13. **Имена `data-state` — camelCase, не kebab-case.** Правильно: `data-state="regularBackground"`. Неправильно: `data-state="regular-background"`.

---

## Чеклист

Перед коммитом перенесённого компонента убедитесь, что:

- [ ] `get_code_connect_map` проверен, и если он вернул готовый маппинг — использован он (не переписан с нуля)
- [ ] Все hex/rgba из Figma заменены на токены `@sbercloud/figma-variables`
- [ ] Focus ring реализован через `:focus-visible { outline: ... }`, а не DOM-нодой
- [ ] На интерактивном корне стоит `position: relative`, если используются миксины с абсолютными слоями
- [ ] Миксин `has-state-layer-as-child(...)` подключён на корне, а `<span className={styles.stateLayer} data-state="..." aria-hidden />` лежит внутри
- [ ] Значения `data-state` — только из списка `regularBackground|regularBorder|activatedBackground|activatedBorder|onColorBackground|onAccentBackground`
- [ ] Для acrylic на корне стоят `data-acrylic-appearance` и `data-acrylic-level`, а `.acrylic`/`.acrylicEffect` получили `position: absolute; inset: 0; pointer-events: none; border-radius: inherit`
- [ ] Варианты из Figma (`size`, `disabled`, `load`, `checked`, `composition`) прокинуты как `data-*` атрибуты
- [ ] Нет `React.FC`, `React.ReactNode`, `any`, `@ts-ignore`
- [ ] В `packages/<pkg>/package.json` нет `react`/`react-dom`, все версии точные
- [ ] В meta story указан Figma `design.url`
- [ ] Нет stories без смысла (см. `.cursor/rules/components/stories-standard.mdc`)
- [ ] `pnpm lint` и `pnpm stylelint` проходят

---

## Ссылки на исходники и токены

- `packages/button/src/Button/Button.tsx`, `packages/button/src/Button/styles.module.scss` — канонический пример интеграции `has-state-layer-as-child` и `has-content-with-text-opacity`.
- `packages/materials/src/stateLayer/index.scss` — реализация state layer, список поддерживаемых `data-state`.
- `packages/materials/src/material/_acrylic.scss` — реализация acrylic, список `appearance` и `level`.
- `packages/materials/docs/index.mdx` — публичная документация пакета (на сайте Astro/Starlight).
- `.cursor/rules/components/stories-standard.mdc` — как писать stories для перенесённого компонента.
- Figma-файл: `https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables` (fileKey `aNPU3MHwRJiEwbk5F82zux`).
