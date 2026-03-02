# Input Private

Примитивный (private) компонент поля ввода — базовый `<input>` с единым стилем дизайн-системы, без обёрток (label, hint, error). Предназначен для использования внутри других компонентов (Input, InputPhone, Search и т.п.) или когда нужен минималистичный инпут с поддержкой темы и data-атрибутов.

## Installation

```bash
npm install @design-system/input-private
# or
yarn add @design-system/input-private
# or
pnpm add @design-system/input-private
```

## Exports



## Live examples

### Basic usage

```tsx
import { InputPrivate } from '@design-system/input-private';

<InputPrivate
  value=""
  onChange={() => {}}
  placeholder="Введите значение"
/>
```

### With value (controlled)

```tsx
import { InputPrivate } from '@design-system/input-private';

<InputPrivate
  value="Пример текста"
  onChange={() => {}}
  placeholder="Плейсхолдер"
/>
```

### Disabled and readonly

```tsx
import { InputPrivate } from '@design-system/input-private';

<InputPrivate value="Disabled" onChange={() => {}} disabled />
<InputPrivate value="Read only" onChange={() => {}} readonly />
```

### Types: password, email, number

```tsx
import { InputPrivate } from '@design-system/input-private';

<InputPrivate type="password" value="" onChange={() => {}} placeholder="Пароль" />
<InputPrivate type="email" value="" onChange={() => {}} placeholder="email@example.com" />
<InputPrivate type="number" value="" onChange={() => {}} placeholder="Число" />
```


## Usage

### Basic example (controlled)

```tsx
import { useState } from 'react';
import { InputPrivate } from '@design-system/input-private';

export function Example() {
  const [value, setValue] = useState('');
  return (
    <InputPrivate
      value={value}
      onChange={setValue}
      placeholder="Введите текст"
    />
  );
}
```

### With type and inputMode

```tsx
import { InputPrivate } from '@design-system/input-private';
import { TYPE, INPUT_MODE } from '@design-system/input-private';

<InputPrivate
  type={TYPE.Password}
  value={password}
  onChange={setPassword}
  placeholder="Пароль"
/>

<InputPrivate
  type={TYPE.Tel}
  inputMode={INPUT_MODE.Tel}
  value={phone}
  onChange={setPhone}
  placeholder="+7 (999) 000-00-00"
/>
```

### With ref

```tsx
import { useRef } from 'react';
import { InputPrivate } from '@design-system/input-private';

function Example() {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => inputRef.current?.focus();
  return (
    <>
      <InputPrivate ref={inputRef} value="" onChange={() => {}} />
      <button type="button" onClick={focusInput}>Фокус в поле</button>
    </>
  );
}
```

## Props

### InputPrivateProps
| name | type | default value | description |
|------|------|---------------|-------------|
| name | `string` | - | Значение html-атрибута name |
| value | `string` | - | Значение input |
| onChange | `(value: string, e?: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| id | `string` | - | Значение html-атрибута id |
| className | `string` | - | CSS-класс |
| placeholder | `string` | - | Значение плейсхолдера |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| type | enum Type: `"number"`, `"text"`, `"password"`, `"tel"`, `"email"`, `"url"` | text | Тип инпута |
| inputMode | enum InputMode: `"text"`, `"tel"`, `"email"`, `"url"`, `"decimal"`, `"numeric"`, `"search"`, `"none"` | text | Режим работы экранной клавиатуры |
| disabled | `boolean` | - | Является ли поле деактивированным |
| autoComplete | `string \| boolean` | false | Включен ли автокомплит для поля |
| autoFocus | `boolean` | - | Включен ли авто-фокус для поля |
| maxLength | `number` | - | Максимальная длина вводимого значения |
| min | `number` | - | Минимальное значение поля |
| max | `number` | - | Максимальное значение поля |
| step | `string \| number` | - | Максимальное значение поля |
| tabIndex | `number` | - | Значение атрибута tab-index |
| spellCheck | `boolean` | true | Значение атрибута spellcheck (проверка орфографии) |
| pattern | `string` | - | Регулярное выражение валидного инпута |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| onKeyDown | `KeyboardEventHandler<HTMLInputElement>` | - | Колбек обработки начала нажатия клавиши клавиатуры |
| onPaste | `ClipboardEventHandler<HTMLInputElement>` | - | Колбек обработки вставки значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек обработки клика |
| onMouseDown | `MouseEventHandler<HTMLInputElement>` | - | Колбек обработки нажатия кнопки мыши |

## Best Practices

1. **Контролируемый режим** — всегда передавайте `value` и `onChange`; для неконтролируемого сценария используйте обёртку с `defaultValue` и внутренним state
2. **Тип и inputMode** — задавайте `type` и при необходимости `inputMode` под тип данных (пароль, email, телефон, число), чтобы на мобильных открывалась подходящая клавиатура
3. **Обёртка для форм** — для полноценного поля ввода (подпись, ошибка, хинт) используйте компоненты уровня Input/InputPhone и т.д., которые внутри применяют Input Private

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
