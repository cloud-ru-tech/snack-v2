# Toggles

`@ds/toggles` — Пакет компонентов выбора и переключения — Checkbox, Radio, Switch, Favourite и контейнер ToggleGroup с общими токенами размеров и состояний.

Пакет `@ds/toggles` объединяет пять компонентов для бинарных и мультиполярных состояний. Все компоненты разделяют единое API (`size`, `checked/defaultChecked`, `disabled`, `loading`, `onChange`) и два размера (`xs`, `s`).

## Состав пакета

- ****Checkbox**** — множественный выбор, поддерживает indeterminate.
- ****Radio**** — взаимоисключающий выбор в группе общего `name`.
- ****Switch**** — on/off с моментальным применением.
- ****Favourite**** — toggle «избранное» (звезда или сердце).
- ****ToggleGroup**** — контейнер с shared context для групп связанных toggle'ов.

## Установка

```bash
pnpm add @ds/toggles
```

```ts
import { Checkbox, Radio, Switch, Favourite, ToggleGroup } from '@ds/toggles'
import '@ds/toggles/style.css'
```

## Когда какой использовать

| Задача 

## Общие принципы

- **Два размера во всех компонентах** — `xs` (плотная компоновка) и `s` (формы, настройки).
- **Мгновенная визуальная обратная связь.** `loading` применяйте только к реально асинхронным операциям.
- **Семантика важнее внешнего вида.** Switch для on/off, Radio для one-of-many, Checkbox для many-of-many — не меняйте компонент ради визуала.

## Checkbox

Чекбокс для множественного выбора — два размера, состояния checked/indeterminate/disabled/loading и единое API с остальными toggles.

Чекбокс для множественного выбора из списка. Поддерживает три визуальных состояния — unchecked / checked / indeterminate — плюс disabled и loading.

## Демо

## Когда использовать

- Для множественного выбора из двух или более независимых опций.
- Для согласий («Я согласен с условиями»), чек-листов, фильтров.
- Для «выбрать всё» в группе — индикатор частичного выбора (`indeterminate`).

Когда **не** нужен Checkbox: для взаимоисключающего выбора — используйте [`Radio`](/components/toggles/radio), для on/off настроек — [`Switch`](/components/toggles/switch).

## Для дизайнеров

### Size

| Size | Размер | Применение |
|------|--------|-----------|
| `xs` | 16×16 | Плотные списки, таблицы |
| `s`  | 24×24 | Формы, карточки, согласия |

Размеры соответствуют Figma-токенам и фиксируются E2E-тестами на parity.

### Состояния

| Состояние | Когда |
|-----------|-------|
| `unchecked` | Опция не выбрана |
| `checked` | Опция выбрана |
| `indeterminate` | Частично выбрано — используется для «выбрать всё» при частичной подгруппе |
| `disabled` | Опция временно недоступна; сохраняет checked/indeterminate |
| `loading` | Асинхронная операция сохранения выбора — input скрывается, рендерится спиннер |

<Example title='Все состояния в ряд' code={CheckboxStatesSrc}>
  <CheckboxStates client:load />
</Example>

### Do / Don't

- ✅ `indeterminate` для родителя в иерархии «выбрать всё / часть».
- ❌ `indeterminate` как третье логическое состояние без иерархии — это не tristate, это «часть выбрано».
- ✅ Видимый label справа от чекбокса, кликабельный через `<label>`.
- ❌ Чекбокс без видимого лейбла в форме — используйте `aria-label` только в toolbar'ах.
- ✅ `loading` после оптимистичного клика до ответа бэка.
- ❌ `disabled` без подсказки, почему недоступно.

### Figma

<FigmaEmbed node={FIGMA_CHECKBOX} height={480} title='Checkbox в Figma (Snack UI Kit)' client:load />

## Для разработчиков

### Установка

```bash
pnpm add @ds/toggles
```

```ts
import { Checkbox } from '@ds/toggles'
import '@ds/toggles/style.css'
```

### Примеры использования

<Example title='1. Базовый чекбокс' code={CheckboxBasicSrc}>
  <CheckboxBasic client:load />
</Example>

<Example title='2. Indeterminate' description='Используется для частично выбранной группы' code={CheckboxIndeterminateSrc}>
  <CheckboxIndeterminate client:load />
</Example>

<Example title='3. Все состояния' code={CheckboxStatesSrc}>
  <CheckboxStates client:load />
</Example>

### States

- **`checked` / `defaultChecked`** — controlled и uncontrolled режимы.
- **`indeterminate` / `indeterminateDefault`** — аналогично, сбрасывается при любом клике.
- **`disabled`** — `data-disabled="true"` на корне и native `disabled` на input.
- **`loading`** — `data-loading="true"`, native input не рендерится, вместо иконки спиннер.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | HTML-аттрибут id |
| `name` | `string` | — | HTML-аттрибут name |
| `value` | `string` | — | HTML-аттрибут value |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `className` | `string` | — | CSS-класс |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `indeterminate` | `boolean` | — | Состояние частичного выбора |
| `indeterminateDefault` | `boolean` | — | Состояние частичного выбора по-умолчанию |

### Storybook

<StorybookEmbed storyId='components-toggles-checkbox--playground' height={360} client:load />

## Доступность

- `role="checkbox"` на корне + нативный `<input type="checkbox">` — клавиатура (Space) работает из коробки.
- `data-focusvisible` на корне при навигации с клавиатуры — для подсветки focus-ring.
- `data-indeterminate="true"` + `input.indeterminate = true` — скринридеры озвучивают как «partially checked».
- Для чекбокса без видимого текста — обязателен `aria-label` / `aria-labelledby`.

## Radio

Радиокнопка для взаимоисключающего выбора из группы опций — два размера, state controlled/uncontrolled, единое API с остальными toggles.

Радиокнопка для взаимоисключающего выбора из группы опций. Группировка — через общий `name` или через компонент [`ToggleGroup`](/components/toggles/toggle-group) с `selectionMode='single'`.

## Демо

## Когда использовать

- Для выбора **одной** опции из 2–5 взаимоисключающих вариантов.
- Когда все варианты должны быть видны одновременно (иначе используйте `Select`).

Когда **не** нужен Radio: для множественного выбора — [`Checkbox`](/components/toggles/checkbox), для on/off — [`Switch`](/components/toggles/switch).

## Для дизайнеров

### Size

| Size | Размер | Применение |
|------|--------|-----------|
| `xs` | 16×16 | Плотные списки, таблицы |
| `s`  | 24×24 | Формы, настройки, диалоги |

### Do / Don't

- ✅ Группа из 2–5 опций — Radio.
- ❌ Один Radio без группы — он не «чекбокс», пользователь не сможет снять выбор.
- ✅ Общий `name` на все Radio в группе.
- ❌ Разные `name` — браузер не объединит их в группу.
- ✅ Вертикальная раскладка по умолчанию.
- ❌ Горизонтальная раскладка > 3 опций — тяжело сканировать.

### Figma

<FigmaEmbed node={FIGMA_RADIO} height={480} title='Radio в Figma (Snack UI Kit)' client:load />

## Для разработчиков

### Установка

```bash
pnpm add @ds/toggles
```

```ts
import { Radio } from '@ds/toggles'
import '@ds/toggles/style.css'
```

### Примеры использования

<Example title='1. Базовый Radio' code={RadioBasicSrc}>
  <RadioBasic client:load />
</Example>

<Example title='2. Группа радиокнопок' description='Общий name объединяет Radio в группу; выбор переключается автоматически' code={RadioGroupSrc}>
  <RadioGroup client:load />
</Example>

<Example title='3. Все состояния' code={RadioStatesSrc}>
  <RadioStates client:load />
</Example>

### States

- **`checked` / `defaultChecked`** — controlled и uncontrolled.
- **`disabled`** — `data-disabled="true"` + native `disabled`.
- **`loading`** — native input скрывается, рендерится спиннер.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | HTML-аттрибут id |
| `name` | `string` | — | HTML-аттрибут name |
| `value` | `string` | — | HTML-аттрибут value |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `className` | `string` | — | CSS-класс |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |

### Storybook

<StorybookEmbed storyId='components-toggles-radio--playground' height={360} client:load />

## Доступность

- `role="radio"` на корне + native `<input type="radio">` — клавиатура (Space/Arrow) работает из коробки внутри группы `name`.
- `data-focusvisible` на корне для focus-ring только при навигации с клавиатуры.
- Для каждого Radio — связанный `<label>`; без label используйте `aria-label`.

## Switch

Переключатель on/off для бинарных настроек — два размера, моментальное применение без подтверждения, единое API с остальными toggles.

Переключатель on/off для бинарных настроек с моментальным применением. В отличие от `Checkbox`, Switch меняет состояние сразу — без кнопки «Сохранить».

## Демо

## Когда использовать

- Для бинарных настроек пользователя, применяемых немедленно (уведомления, тёмная тема).
- В ситуациях, где не нужен пакетный apply/cancel.

Когда **не** нужен Switch: если изменение требует подтверждения — используйте [`Checkbox`](/components/toggles/checkbox) с кнопкой submit.

## Для дизайнеров

### Size

| Size | Размеры (W×H) | Применение |
|------|--------------|-----------|
| `xs` | 24×16 | Плотные списки настроек |
| `s`  | 36×24 | Формы, settings |

### Do / Don't

- ✅ Моментальное применение с визуальной индикацией success.
- ❌ Switch с кнопкой «Сохранить» — противоречит семантике.
- ✅ Лейбл описывает состояние «включено» (например, «Уведомления»).
- ❌ Глагол в лейбле («Включить уведомления») — пользователь не знает, текущее состояние on или off.

### Figma

<FigmaEmbed node={FIGMA_SWITCH} height={480} title='Switch в Figma (Snack UI Kit)' client:load />

## Для разработчиков

### Установка

```bash
pnpm add @ds/toggles
```

```ts
import { Switch } from '@ds/toggles'
import '@ds/toggles/style.css'
```

### Примеры использования

<Example title='1. Базовый Switch' code={SwitchBasicSrc}>
  <SwitchBasic client:load />
</Example>

<Example title='2. Два размера' code={SwitchSizesSrc}>
  <SwitchSizes client:load />
</Example>

<Example title='3. Все состояния' code={SwitchStatesSrc}>
  <SwitchStates client:load />
</Example>

### States

- **`checked` / `defaultChecked`** — controlled и uncontrolled.
- **`disabled`** — `data-disabled="true"` + native `disabled`.
- **`loading`** — native input скрывается, рендерится спиннер. Используйте для асинхронных настроек.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | HTML-аттрибут id |
| `name` | `string` | — | HTML-аттрибут name |
| `value` | `string` | — | HTML-аттрибут value |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `className` | `string` | — | CSS-класс |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |

### Storybook

<StorybookEmbed storyId='components-toggles-switch--playground' height={360} client:load />

## Доступность

- Native `<input type="checkbox">` внутри — Space переключает из коробки.
- Формально `role="checkbox"` — скринридер озвучит как «checkbox checked/unchecked». Это ок для on/off семантики.
- `data-focusvisible` для focus-ring только при клавиатурной навигации.
- Связывайте с видимым `<label>`; в списках настроек используйте заголовок + описание.

## Favourite

Toggle для избранного — звезда или сердце, два размера, единое API с остальными toggles.

Toggle для «избранного» — карточка товара, трек в плейлисте, пост в ленте. Переключается между пустой и заполненной иконкой (звезда или сердце).

## Демо

## Когда использовать

- «Добавить в избранное», «лайк», «в wishlist».
- Каталоги, ленты, плейлисты — любой UI с персональными коллекциями.

Когда **не** нужен Favourite: для булевых настроек — [`Switch`](/components/toggles/switch); для выбора опций — [`Checkbox`](/components/toggles/checkbox).

## Для дизайнеров

### Icon

| Icon | Семантика |
|------|-----------|
| `star` | «Важно», «в избранное» — нейтральная коллекция |
| `heart` | «Нравится», «лайк» — эмоциональная реакция |

### Size

| Size | Размеры | Применение |
|------|---------|-----------|
| `xs` | 16×16 | Inline в карточке, строка таблицы |
| `s`  | 24×24 | Карточка товара, большая область action'ов |

### Do / Don't

- ✅ Одна иконка на контекст — выберите `star` **или** `heart` для всего приложения.
- ❌ Переключаться между иконками на разных экранах — пользователь теряет семантическую связку.
- ✅ Оптимистичный клик с моментальным визуальным ответом + `loading` до подтверждения бэка.
- ❌ Двойной клик = «лайк потом анлайк» — один `onChange` на клик.

### Figma

<FigmaEmbed node={FIGMA_FAVOURITE} height={480} title='Favourite в Figma (Snack UI Kit)' client:load />

## Для разработчиков

### Установка

```bash
pnpm add @ds/toggles
```

```ts
import { Favourite } from '@ds/toggles'
import '@ds/toggles/style.css'
```

### Примеры использования

<Example title='1. Звезда' code={FavouriteStarSrc}>
  <FavouriteStar client:load />
</Example>

<Example title='2. Сердце' code={FavouriteHeartSrc}>
  <FavouriteHeart client:load />
</Example>

<Example title='3. Все состояния' code={FavouriteStatesSrc}>
  <FavouriteStates client:load />
</Example>

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | HTML-аттрибут id |
| `name` | `string` | — | HTML-аттрибут name |
| `value` | `string` | — | HTML-аттрибут value |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `className` | `string` | — | CSS-класс |
| `size` | `"xs"` \| `"s"` | `xs` | Размер |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `icon` | `"star"` \| `"heart"` | `heart` | Вариант иконки: звезда или сердце |
| `onKeyUp` | `KeyboardEventHandler<HTMLSpanElement>` | — | Обработчик keyup |

### Storybook

<StorybookEmbed storyId='components-toggles-favourite--playground' height={360} client:load />

## Доступность

- `role="checkbox"` + native `<input type="checkbox">` — клавиатура (Space) работает из коробки.
- Для icon-only — обязательно `aria-label` (например, «Добавить в избранное»).
- `data-focusvisible` обеспечивает focus-ring только при клавиатурной навигации.

## ToggleGroup

Контейнер для группы связанных toggle'ов — single или multiple selection через общий context + useToggleGroup.

Контейнер для группы связанных toggle'ов (чипы, опции, сегментированный контрол) с общим режимом выбора. Предоставляет React Context — потомки читают текущий выбор через `useToggleGroup`.

## Демо

## Когда использовать

- Сегментированный контрол (выбор размера, периода, типа).
- Чипы-фильтры с `selectionMode='multiple'`.
- Любые связанные опции, где нужен shared state + unified controlled API.

Когда **не** нужен ToggleGroup: одна опция — [`Switch`](/components/toggles/switch) или [`Checkbox`](/components/toggles/checkbox); взаимоисключающий выбор с нативной семантикой radio — группа [`Radio`](/components/toggles/radio) c общим `name`.

## Для дизайнеров

### selectionMode

| Mode | Поведение |
|------|-----------|
| `single` | Один элемент выбран; клик по выбранному — deselect |
| `multiple` | Любая подмножество выбрано |

### Do / Don't

- ✅ 2–5 связанных опций в ряд.
- ❌ Больше 7 — используйте `Select` или `Combobox`.
- ✅ `single` по умолчанию.
- ❌ Менять `selectionMode` в рантайме — состояние сбрасывается.

### Figma

<FigmaEmbed node={FIGMA_TOGGLES} height={480} title='Toggle components в Figma' client:load />

## Для разработчиков

### Установка

```bash
pnpm add @ds/toggles
```

```ts
import { ToggleGroup, useToggleGroup } from '@ds/toggles'
```

### Как это работает

Потомки читают выбор и обработчик через `useToggleGroup({ value })` — хук возвращает `isChecked` и `handleClick` для конкретного элемента.

### Примеры использования

<Example title='1. Single selection (сегментированный контрол)' code={ToggleGroupSingleSrc}>
  <ToggleGroupSingle client:load />
</Example>

<Example title='2. Multiple selection (чипы-фильтры)' code={ToggleGroupMultipleSrc}>
  <ToggleGroupMultiple client:load />
</Example>

<Example title='3. Controlled + отображение значения' code={ToggleGroupControlledSrc}>
  <ToggleGroupControlled client:load />
</Example>

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string | string[]` | — | Начальное состояние |
| `value` | `string | string[]` | — | Controlled состояние |
| `onChange` | `((value: string) => void) | ((value: string[]) => void) | undefined` | — | Controlled обработчик измения состояния |
| `selectionMode` | `"single"` \| `"multiple"` | `single` | Режим выбора |

### Storybook

<StorybookEmbed storyId='components-toggles-toggle-group--playground' height={360} client:load />

## Доступность

- ToggleGroup — контейнер без собственной семантики. Ответственность за `role` и ARIA несёт потомок (кнопка-чип, сегментированный контрол).
- Для сегментированного контрола рекомендуется `role="radiogroup"` на обёртке и `aria-pressed` на элементах.
- Поддержку клавиатуры для навигации между элементами реализует потомок (Arrow keys).
