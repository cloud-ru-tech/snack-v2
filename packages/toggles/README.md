# Toggles

`@ds/toggles` — Пакет компонентов выбора и переключения — Checkbox, Radio, Switch, Favourite и контейнер ToggleGroup с общими токенами размеров и состояний.

Пакет `@ds/toggles` объединяет пять компонентов для бинарных и мультиполярных состояний. Все компоненты разделяют единое API (`size`, `checked/defaultChecked`, `disabled`, `loading`, `onChange`) и два размера (`xs`, `s`).

## Установка

```bash
pnpm add @ds/toggles
```

```ts
import { Checkbox, Radio, Switch, Favourite, ToggleGroup } from '@ds/toggles'
```

## Checkbox

Чекбокс для множественного выбора — два размера, состояния checked/indeterminate/disabled/loading и единое API с остальными toggles.

Чекбокс для множественного выбора из списка. Поддерживает три визуальных состояния — unchecked / checked / indeterminate — плюс disabled и loading.

## Когда использовать
- Для множественного выбора из двух или более независимых опций.
- Для согласий («Я согласен с условиями»), чек-листов, фильтров.
- Для «выбрать всё» в группе — индикатор частичного выбора (`indeterminate`).

Когда **не** нужен Checkbox: для взаимоисключающего выбора — используйте [`Radio`](/components/toggles/radio), для on/off настроек — [`Switch`](/components/toggles/switch).

## Figma
<FigmaEmbed node={FIGMA_CHECKBOX} height={480} title='Checkbox в Figma (Snack UI Kit)' />

## Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Checkbox } from '@ds/toggles'
```

## Примеры использования
<Example title='1. Базовый чекбокс' code={CheckboxBasicSrc}>
  <CheckboxBasic client:visible />
</Example>

<Example title='2. Indeterminate' description='Используется для частично выбранной группы' code={CheckboxIndeterminateSrc}>
  <CheckboxIndeterminate client:visible />
</Example>

<Example title='3. Все состояния' code={CheckboxStatesSrc}>
  <CheckboxStates client:visible />
</Example>

## Props
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

## Storybook
<StorybookEmbed storyId='components-toggles-checkbox--playground' height={360} />

## Анатомия

### Size
`xs` — для плотных таблиц и инлайновых списков, `s` — дефолт в формах.

## Radio

Радиокнопка для взаимоисключающего выбора из группы опций — два размера, state controlled/uncontrolled, единое API с остальными toggles.

Радиокнопка для взаимоисключающего выбора из группы опций. Группировка — через общий `name` или через компонент [`ToggleGroup`](/components/toggles/toggle-group) с `selectionMode='single'`.

## Когда использовать
- Для выбора **одной** опции из 2–5 взаимоисключающих вариантов.
- Когда все варианты должны быть видны одновременно (иначе используйте `Select`).

Когда **не** нужен Radio: для множественного выбора — [`Checkbox`](/components/toggles/checkbox), для on/off — [`Switch`](/components/toggles/switch).

## Figma
<FigmaEmbed node={FIGMA_RADIO} height={480} title='Radio в Figma (Snack UI Kit)' />

## Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Radio } from '@ds/toggles'
```

## Примеры использования
<Example title='1. Базовый Radio' code={RadioBasicSrc}>
  <RadioBasic client:visible />
</Example>

<Example title='2. Группа радиокнопок' description='Общий name объединяет Radio в группу; выбор переключается автоматически' code={RadioGroupSrc}>
  <RadioGroup client:visible />
</Example>

<Example title='3. Все состояния' code={RadioStatesSrc}>
  <RadioStates client:visible />
</Example>

## Props
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

## Storybook
<StorybookEmbed storyId='components-toggles-radio--playground' height={360} />

## Анатомия

### Size
`xs` — для плотных списков опций, `s` — дефолт в формах.

## Switch

Переключатель on/off для бинарных настроек — два размера, моментальное применение без подтверждения, единое API с остальными toggles.

Переключатель on/off для бинарных настроек с моментальным применением. В отличие от `Checkbox`, Switch меняет состояние сразу — без кнопки «Сохранить».

## Когда использовать
- Для бинарных настроек пользователя, применяемых немедленно (уведомления, тёмная тема).
- В ситуациях, где не нужен пакетный apply/cancel.

Когда **не** нужен Switch: если изменение требует подтверждения — используйте [`Checkbox`](/components/toggles/checkbox) с кнопкой submit.

## Figma
<FigmaEmbed node={FIGMA_SWITCH} height={480} title='Switch в Figma (Snack UI Kit)' />

## Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Switch } from '@ds/toggles'
```

## Примеры использования
<Example title='1. Базовый Switch' code={SwitchBasicSrc}>
  <SwitchBasic client:visible />
</Example>

<Example title='2. Два размера' code={SwitchSizesSrc}>
  <SwitchSizes client:visible />
</Example>

<Example title='3. Все состояния' code={SwitchStatesSrc}>
  <SwitchStates client:visible />
</Example>

## Props
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

## Storybook
<StorybookEmbed storyId='components-toggles-switch--playground' height={360} />

## Анатомия

### Size
`xs` — для плотных настроек и таблиц, `s` — дефолт в формах и карточках.

## Favourite

Toggle для избранного — звезда или сердце, два размера, единое API с остальными toggles.

Toggle для «избранного» — карточка товара, трек в плейлисте, пост в ленте. Переключается между пустой и заполненной иконкой (звезда или сердце).

## Когда использовать
- «Добавить в избранное», «лайк», «в wishlist».
- Каталоги, ленты, плейлисты — любой UI с персональными коллекциями.

Когда **не** нужен Favourite: для булевых настроек — [`Switch`](/components/toggles/switch); для выбора опций — [`Checkbox`](/components/toggles/checkbox).

## Figma
<FigmaEmbed node={FIGMA_FAVOURITE} height={480} title='Favourite в Figma (Snack UI Kit)' />

## Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Favourite } from '@ds/toggles'
```

## Примеры использования
<Example title='1. Звезда' code={FavouriteStarSrc}>
  <FavouriteStar client:visible />
</Example>

<Example title='2. Сердце' code={FavouriteHeartSrc}>
  <FavouriteHeart client:visible />
</Example>

<Example title='3. Все состояния' code={FavouriteStatesSrc}>
  <FavouriteStates client:visible />
</Example>

## Props
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

## Storybook
<StorybookEmbed storyId='components-toggles-favourite--playground' height={360} />

## Анатомия

### Size
`xs` — для плотных списков, `s` — дефолт в карточках.

### Favourite icon
Форма иконки: `star` — «в избранное», `heart` — «нравится».

## ToggleGroup

Контейнер для группы связанных toggle'ов — single или multiple selection через общий context + useToggleGroup.

Контейнер для группы связанных toggle'ов (чипы, опции, сегментированный контрол) с общим режимом выбора. Предоставляет React Context — потомки читают текущий выбор через `useToggleGroup`.

## Когда использовать
- Сегментированный контрол (выбор размера, периода, типа).
- Чипы-фильтры с `selectionMode='multiple'`.
- Любые связанные опции, где нужен shared state + unified controlled API.

Когда **не** нужен ToggleGroup: одна опция — [`Switch`](/components/toggles/switch) или [`Checkbox`](/components/toggles/checkbox); взаимоисключающий выбор с нативной семантикой radio — группа [`Radio`](/components/toggles/radio) c общим `name`.

## Figma
<FigmaEmbed node={FIGMA_TOGGLES} height={480} title='Toggle components в Figma' />

## Установка
```bash
pnpm add @ds/toggles
```

```ts
import { ToggleGroup, useToggleGroup } from '@ds/toggles'
```

## Примеры использования
<Example title='1. Single selection (сегментированный контрол)' code={ToggleGroupSingleSrc}>
  <ToggleGroupSingle client:visible />
</Example>

<Example title='2. Multiple selection (чипы-фильтры)' code={ToggleGroupMultipleSrc}>
  <ToggleGroupMultiple client:visible />
</Example>

<Example title='3. Controlled + отображение значения' code={ToggleGroupControlledSrc}>
  <ToggleGroupControlled client:visible />
</Example>

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string | string[]` | — | Начальное состояние |
| `value` | `string | string[]` | — | Controlled состояние |
| `onChange` | `((value: string) => void) | ((value: string[]) => void) | undefined` | — | Controlled обработчик измения состояния |
| `selectionMode` | `"single"` \| `"multiple"` | `single` | Режим выбора |

## Storybook
<StorybookEmbed storyId='components-toggles-toggle-group--playground' height={360} />

## Анатомия

### Mode
Тип дочерних контролов: `checkbox` — мультивыбор/независимые, `radio` — одиночный выбор.

### Size
Размер вложенных тогглов: `xs` — плотный, `s` — дефолт.

### Selection mode
Правила выбора: `single` — ровно один элемент (как radio-group), `multiple` — любое подмножество (как checkbox-group).
