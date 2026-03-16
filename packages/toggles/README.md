# Toggles

Пакет **@design-system/toggles** содержит примитивы **`Radio`**, **`Checkbox`**, **`Switch`**, **`Favourite`** и обёртку **`ToggleGroup`** с хуком **`useToggleGroup`**. Визуальные контролы строятся на скрытом нативном `<input>` (кроме состояния **`loading`**, когда инпут не монтируется), поддерживают размеры **`SIZE.XS`** / **`SIZE.S`** и общий контракт пропов на базе **`ToggleProps`**.

## Installation

```bash
npm install @design-system/toggles
# or
yarn add @design-system/toggles
# or
pnpm add @design-system/toggles
```

## Exports

```typescript
import {
  FAVOURITE_ICON,
  SIZE,
  SELECTION_MODE,
  type FavouriteIcon,
  type Size,
  type SelectionMode
} from '@design-system/toggles';
```

## Live examples

### Одна радиокнопка (выбрана по умолчанию)

```tsx
import { Radio } from '@design-system/toggles';

export function Example() {
  return <Radio name="demo-single" value="on" defaultChecked aria-label="Включено" />;
}
```

### Группа (неконтролируемая)

```tsx
import { Radio } from '@design-system/toggles';

export function PlanChoice() {
  return (
    <>
      <Radio name="plan" value="month" defaultChecked aria-label="Ежемесячно" />
      <Radio name="plan" value="year" aria-label="Ежегодно" />
    </>
  );
}
```

### Размеры

```tsx
import { Radio, SIZE } from '@design-system/toggles';

<Radio name="sz-xs" value="a" size={SIZE.XS} defaultChecked aria-label="XS" />
<Radio name="sz-s" value="a" size={SIZE.S} defaultChecked aria-label="S" />
```

### Загрузка и отключено

```tsx
import { Radio } from '@design-system/toggles';

<Radio name="ld" value="x" loading aria-label="Загрузка" />
<Radio name="dis" value="x" disabled aria-label="Недоступно" />
```

### Чекбокс (включён по умолчанию)

```tsx
import { Checkbox } from '@design-system/toggles';

export function Example() {
  return <Checkbox defaultChecked aria-label="Согласие с условиями" />;
}
```

### Чекбокс в состоянии indeterminate

```tsx
import { Checkbox } from '@design-system/toggles';

export function PartialSelectionHeader() {
  return <Checkbox indeterminateDefault aria-label="Частичный выбор в таблице" />;
}
```

### Чекбокс: размеры

```tsx
import { Checkbox, SIZE } from '@design-system/toggles';

<Checkbox size={SIZE.XS} defaultChecked aria-label="Размер XS" />
<Checkbox size={SIZE.S} defaultChecked aria-label="Размер S" />
```

### Чекбокс: загрузка и отключено

```tsx
import { Checkbox } from '@design-system/toggles';

<Checkbox loading aria-label="Загрузка" />
<Checkbox disabled aria-label="Недоступно" />
```

### Switch (вкл по умолчанию)

```tsx
import { Switch } from '@design-system/toggles';

export function Example() {
  return <Switch defaultChecked aria-label="Получать уведомления" />;
}
```

### Switch: размеры

```tsx
import { SIZE, Switch } from '@design-system/toggles';

<Switch size={SIZE.XS} defaultChecked aria-label="Размер XS" />
<Switch size={SIZE.S} defaultChecked aria-label="Размер S" />
```

### Switch: загрузка и отключено

```tsx
import { Switch } from '@design-system/toggles';

<Switch loading aria-label="Загрузка" />
<Switch disabled defaultChecked aria-label="Недоступно" />
```

### Favourite (звезда и сердце)

```tsx
import { Favourite, FAVOURITE_ICON } from '@design-system/toggles';

export function BookmarkRow() {
  return (
    <>
      <Favourite icon={FAVOURITE_ICON.Star} defaultChecked aria-label="Добавить в избранное (звезда)" />
      <Favourite icon={FAVOURITE_ICON.Heart} aria-label="Добавить в избранное (сердце)" />
    </>
  );
}
```


## Usage

### Контролируемый режим

```tsx
import { Radio } from '@design-system/toggles';
import { useState } from 'react';

export function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Radio
      name="option"
      value="a"
      checked={checked}
      onChange={setChecked}
      aria-label="Согласие"
    />
  );
}
```

### С `inputRef`

```tsx
import { Radio } from '@design-system/toggles';
import { useRef, useEffect } from 'react';

export function Example() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <Radio name="x" value="1" inputRef={inputRef} aria-label="Фокус при монтировании" />;
}
```

### Checkbox: контролируемый режим и indeterminate

```tsx
import { Checkbox } from '@design-system/toggles';
import { useState } from 'react';

export function Example() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={(next) => {
        setChecked(next);
        setIndeterminate(false);
      }}
      aria-label="Выбрать все"
    />
  );
}
```

## Props

### RadioProps
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"xs"`, `"s"` | xs | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
| loading | `boolean` | - | Состояние загрузки |
### CheckboxProps
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"xs"`, `"s"` | xs | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
| loading | `boolean` | - | Состояние загрузки |
| indeterminate | `boolean` | - | Состояние частичного выбора |
| indeterminateDefault | `boolean` | - | Состояние частичного выбора по-умолчанию |
### SwitchProps
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"xs"`, `"s"` | xs | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
| loading | `boolean` | - | Состояние загрузки |
### FavouriteProps
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"xs"`, `"s"` | xs | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
| loading | `boolean` | - | Состояние загрузки |
| icon | enum FavouriteIcon: `"star"`, `"heart"` | heart | Вариант иконки: звезда или сердце |
| onKeyUp | `KeyboardEventHandler<HTMLSpanElement>` | - | Обработчик keyup |
### ToggleGroupProps
| name | type | default value | description |
|------|------|---------------|-------------|
| defaultValue | `string \| string[]` | - | Начальное состояние |
| value | `string \| string[]` | - | Controlled состояние |
| onChange | `((value: string) => void) \| ((value: string[]) => void)` | - | Controlled обработчик измения состояния |
| selectionMode | "single" \| "multiple" | single | Режим выбора |
### useToggleGroupProps
| name | type | default value | description |
|------|------|---------------|-------------|
| value* | `string` | - |  |
### ToggleGroupContextProps
| name | type | default value | description |
|------|------|---------------|-------------|

## Best Practices

### Radio

1. **Один `name` на группу** — иначе радиокнопки не будут взаимоисключающими.
2. **Уникальные `value`** внутри группы — для корректной отправки форм и состояния.
3. **Не дублировать `defaultChecked`** у нескольких элементов с одним `name` — поведение браузера непредсказуемо; для начального выбора оставьте один `defaultChecked` или управляйте **`checked`** сами.

### Checkbox

1. **`indeterminate`** используйте для «выбрано частично» (например, заголовок колонки в таблице), **`checked`** — для полного включения; при переключении пользователем обновляйте оба флага согласованно.
2. **Не полагайтесь только на визуал «минуса»** — синхронизируйте `checked` и `indeterminate` в состоянии, чтобы нативный инпут и вспомогательные технологии совпадали.
3. В группах с логикой «выбрать все» держите состояние родителя в одном месте и прокидывайте **`checked`** / **`indeterminate`** в заголовочный `Checkbox`.
4. В **`loading`** не ждите значения из поля формы — инпут не смонтирован; для Storybook и ссылок с `args` в Playground объявляйте **`id`** и **`name`** в `args` сторис, иначе они не подставятся из URL.

### Switch

1. Используйте для настроек «да/нет», где не нужен **indeterminate**; для трёхсостоятельных списков — **`Checkbox`**.
2. Учитывайте, что визуал — тумблер с галочкой, а роль остаётся **чекбоксом**; формулируйте **`aria-label`** как вкл/выкл или согласованный текст.
3. Те же правила **`loading`** и форм, что у **`Checkbox`**.

### Favourite

1. Задавайте **`name`** / **`value`**, если компонент участвует в отправке формы или в группе переключателей.
2. Выбирайте **`icon`** (звезда или сердце) в соответствии с продуктовой терминологией («избранное», «лайк» и т.д.) и согласуйте подпись **`aria-label`** с этим смыслом.
3. В **`loading`** не рассчитывайте на значение нативного поля — инпут отсутствует в DOM, как у `Checkbox`.

### ToggleGroup

1. Стабильные строковые **`value`** для элементов списка — они и есть ключ состояния в контексте.
2. Для **multiple** держите **`value`** как массив и нормализуйте его в родителе; для **single** допускайте **`undefined`** после снятия выбора.
3. Не смешивайте **`ToggleGroup`** с нативной отправкой **`Radio`** по **`name`** без явной синхронизации состояния — это разные механизмы.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
