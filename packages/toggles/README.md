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

### Когда использовать
- Для множественного выбора из двух или более независимых опций.
- Для согласий («Я согласен с условиями»), чек-листов, фильтров.
- Для «выбрать всё» в группе — индикатор частичного выбора (`indeterminate`).

Когда **не** нужен Checkbox: для взаимоисключающего выбора — используйте **`Radio`**, для on/off настроек — **`Switch`**.

### Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Checkbox } from '@ds/toggles'
```

### Примеры использования
#### 1. Базовый чекбокс

```tsx
import { Checkbox } from '@ds/toggles';

export function CheckboxBasic() {
  return <Checkbox defaultChecked />;
}
```

#### 2. Indeterminate

Используется для частично выбранной группы

```tsx
import { Checkbox } from '@ds/toggles';

export function CheckboxIndeterminate() {
  return <Checkbox indeterminateDefault />;
}
```

#### 3. Все состояния

```tsx
import { Checkbox } from '@ds/toggles';

export function CheckboxStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
      <Checkbox loading />
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `id` | `string` | — | HTML-аттрибут id |
| `indeterminate` | `boolean` | — | Состояние частичного выбора |
| `indeterminateDefault` | `boolean` | — | Состояние частичного выбора по-умолчанию |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `name` | `string` | — | HTML-аттрибут name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `value` | `string` | — | HTML-аттрибут value |

### Анатомия

#### Size
`xs` — для плотных таблиц и инлайновых списков, `s` — дефолт в формах.

## Radio

Радиокнопка для взаимоисключающего выбора из группы опций — два размера, state controlled/uncontrolled, единое API с остальными toggles.

Радиокнопка для взаимоисключающего выбора из группы опций. Группировка — через общий `name` или через компонент **`ToggleGroup`** с `selectionMode='single'`.

### Когда использовать
- Для выбора **одной** опции из 2–5 взаимоисключающих вариантов.
- Когда все варианты должны быть видны одновременно (иначе используйте `Select`).

Когда **не** нужен Radio: для множественного выбора — **`Checkbox`**, для on/off — **`Switch`**.

### Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Radio } from '@ds/toggles'
```

### Примеры использования
#### 1. Базовый Radio

```tsx
import { Radio } from '@ds/toggles';

export function RadioBasic() {
  return <Radio defaultChecked />;
}
```

#### 2. Группа радиокнопок

Общий name объединяет Radio в группу; выбор переключается автоматически

```tsx
import { Radio } from '@ds/toggles';

export function RadioGroup() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <label htmlFor='delivery-courier'>
        <Radio id='delivery-courier' name='delivery' value='courier' defaultChecked /> Курьер
      </label>
      <label htmlFor='delivery-pickup'>
        <Radio id='delivery-pickup' name='delivery' value='pickup' /> Самовывоз
      </label>
      <label htmlFor='delivery-post'>
        <Radio id='delivery-post' name='delivery' value='post' /> Почта
      </label>
    </div>
  );
}
```

#### 3. Все состояния

```tsx
import { Radio } from '@ds/toggles';

export function RadioStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Radio />
      <Radio defaultChecked />
      <Radio disabled />
      <Radio disabled defaultChecked />
      <Radio loading />
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `id` | `string` | — | HTML-аттрибут id |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `name` | `string` | — | HTML-аттрибут name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `value` | `string` | — | HTML-аттрибут value |

### Анатомия

#### Size
`xs` — для плотных списков опций, `s` — дефолт в формах.

## Switch

Переключатель on/off для бинарных настроек — два размера, моментальное применение без подтверждения, единое API с остальными toggles.

Переключатель on/off для бинарных настроек с моментальным применением. В отличие от `Checkbox`, Switch меняет состояние сразу — без кнопки «Сохранить».

### Когда использовать
- Для бинарных настроек пользователя, применяемых немедленно (уведомления, тёмная тема).
- В ситуациях, где не нужен пакетный apply/cancel.

Когда **не** нужен Switch: если изменение требует подтверждения — используйте **`Checkbox`** с кнопкой submit.

### Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Switch } from '@ds/toggles'
```

### Примеры использования
#### 1. Базовый Switch

```tsx
import { Switch } from '@ds/toggles';

export function SwitchBasic() {
  return <Switch defaultChecked />;
}
```

#### 2. Два размера

```tsx
import { Switch } from '@ds/toggles';

export function SwitchSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Switch size='xs' defaultChecked />
      <Switch size='s' defaultChecked />
    </div>
  );
}
```

#### 3. Все состояния

```tsx
import { Switch } from '@ds/toggles';

export function SwitchStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
      <Switch disabled defaultChecked />
      <Switch loading />
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `id` | `string` | — | HTML-аттрибут id |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `name` | `string` | — | HTML-аттрибут name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `value` | `string` | — | HTML-аттрибут value |

### Анатомия

#### Size
`xs` — для плотных настроек и таблиц, `s` — дефолт в формах и карточках.

## Favourite

Toggle для избранного — звезда или сердце, два размера, единое API с остальными toggles.

Toggle для «избранного» — карточка товара, трек в плейлисте, пост в ленте. Переключается между пустой и заполненной иконкой (звезда или сердце).

### Когда использовать
- «Добавить в избранное», «лайк», «в wishlist».
- Каталоги, ленты, плейлисты — любой UI с персональными коллекциями.

Когда **не** нужен Favourite: для булевых настроек — **`Switch`**; для выбора опций — **`Checkbox`**.

### Установка
```bash
pnpm add @ds/toggles
```

```ts
import { Favourite } from '@ds/toggles'
```

### Примеры использования
#### 1. Звезда

```tsx
import { Favourite } from '@ds/toggles';

export function FavouriteStar() {
  return <Favourite icon='star' defaultChecked />;
}
```

#### 2. Сердце

```tsx
import { Favourite } from '@ds/toggles';

export function FavouriteHeart() {
  return <Favourite icon='heart' defaultChecked />;
}
```

#### 3. Все состояния

```tsx
import { Favourite } from '@ds/toggles';

export function FavouriteStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Favourite icon='star' />
      <Favourite icon='star' defaultChecked />
      <Favourite icon='heart' disabled />
      <Favourite icon='heart' loading />
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autofocus` | `boolean` | — | HTML-аттрибут autofocus |
| `checked` | `boolean` | — | HTML-аттрибут checked |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultChecked` | `boolean` | — | HTML-аттрибут checked по-умолчанию |
| `disabled` | `boolean` | `false` | HTML-аттрибут disabled |
| `icon` | `"heart"` \| `"star"` | `heart` | Вариант иконки: звезда или сердце |
| `id` | `string` | — | HTML-аттрибут id |
| `inputRef` | `RefObject<HTMLInputElement>` | — |  |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `name` | `string` | — | HTML-аттрибут name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек потери фокуса |
| `onChange` | `((checked: boolean) => void)` | — | Колбек смены значения |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек клика |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек приобретения фокуса |
| `onKeyUp` | `KeyboardEventHandler<HTMLSpanElement>` | — | Обработчик keyup |
| `size` | `"s"` \| `"xs"` | `xs` | Размер |
| `tabIndex` | `number` | — | HTML-аттрибут tab-index |
| `value` | `string` | — | HTML-аттрибут value |

### Анатомия

#### Size
`xs` — для плотных списков, `s` — дефолт в карточках.

#### Favourite icon
Форма иконки: `star` — «в избранное», `heart` — «нравится».

## ToggleGroup

Контейнер для группы связанных toggle'ов — single или multiple selection через общий context + useToggleGroup.

Контейнер для группы связанных toggle'ов (чипы, опции, сегментированный контрол) с общим режимом выбора. Предоставляет React Context — потомки читают текущий выбор через `useToggleGroup`.

### Когда использовать
- Сегментированный контрол (выбор размера, периода, типа).
- Чипы-фильтры с `selectionMode='multiple'`.
- Любые связанные опции, где нужен shared state + unified controlled API.

Когда **не** нужен ToggleGroup: одна опция — **`Switch`** или **`Checkbox`**; взаимоисключающий выбор с нативной семантикой radio — группа **`Radio`** c общим `name`.

### Установка
```bash
pnpm add @ds/toggles
```

```ts
import { ToggleGroup, useToggleGroup } from '@ds/toggles'
```

### Примеры использования
#### 1. Single selection (сегментированный контрол)

```tsx
import { ToggleGroup, useToggleGroup } from '@ds/toggles';
import { useState } from 'react';

function Chip({ id, label }: { id: string; label: string }) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });
  return (
    <button onClick={handleClick} aria-pressed={isChecked}>
      {label}
    </button>
  );
}

export function ToggleGroupSingle() {
  const [value, setValue] = useState<string | undefined>('a');
  return (
    <ToggleGroup selectionMode='single' value={value} onChange={setValue}>
      <Chip id='a' label='A' />
      <Chip id='b' label='B' />
      <Chip id='c' label='C' />
    </ToggleGroup>
  );
}
```

#### 2. Multiple selection (чипы-фильтры)

```tsx
import { ToggleGroup, useToggleGroup } from '@ds/toggles';
import { useState } from 'react';

function Chip({ id, label }: { id: string; label: string }) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });
  return (
    <button onClick={handleClick} aria-pressed={isChecked}>
      {label}
    </button>
  );
}

export function ToggleGroupMultiple() {
  const [value, setValue] = useState<string[]>(['a']);
  return (
    <ToggleGroup selectionMode='multiple' value={value} onChange={next => setValue(next ?? [])}>
      <Chip id='a' label='A' />
      <Chip id='b' label='B' />
      <Chip id='c' label='C' />
    </ToggleGroup>
  );
}
```

#### 3. Controlled + отображение значения

```tsx
import { ToggleGroup, useToggleGroup } from '@ds/toggles';
import { useState } from 'react';

function Option({ id, label }: { id: string; label: string }) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });
  return (
    <button onClick={handleClick} aria-pressed={isChecked}>
      {label}
    </button>
  );
}

export function ToggleGroupControlled() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ToggleGroup selectionMode='single' value={value} onChange={setValue}>
        <Option id='s' label='S' />
        <Option id='m' label='M' />
        <Option id='l' label='L' />
      </ToggleGroup>
      <p>Selected: {value ?? '—'}</p>
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined` | — |  |
| `defaultValue` | `string | string[]` | — | Начальное состояние |
| `onChange` | `((value: string) => void) | ((value: string[]) => void) | undefined` | — | Controlled обработчик измения состояния |
| `selectionMode` | `"multiple"` \| `"single"` | `single` | Режим выбора |
| `value` | `string | string[]` | — | Controlled состояние |

### Анатомия

#### Mode
Тип дочерних контролов: `checkbox` — мультивыбор/независимые, `radio` — одиночный выбор.

#### Size
Размер вложенных тогглов: `xs` — плотный, `s` — дефолт.

#### Selection mode
Правила выбора: `single` — ровно один элемент (как radio-group), `multiple` — любое подмножество (как checkbox-group).
