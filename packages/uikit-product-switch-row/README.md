# SwitchRow

`@ds/uikit-product-switch-row` — Кликабельная строка настройки с заголовком, описанием и Switch — целиком кликабельна, поддерживает клавиатуру и tooltip-подсказки.

Строка настройки: заголовок + опциональное описание + `Switch`. Корень кликабелен целиком, поддерживает Enter/Space, проксирует tooltip-подсказки рядом с заголовком и поверх отключённого переключателя.

## Когда использовать

- В формах настроек, где каждая строка — одна бинарная опция с моментальным применением.
- Когда у опции нужен поясняющий текст под заголовком и/или подсказка-вопрос рядом с ним.
- Когда хочется увеличить hit-area переключателя на всю ширину карточки/строки.

Когда **не** нужен `SwitchRow`:

- Одиночный inline-переключатель без описания:
  - используйте **`Switch`**.
- Опция, требующая отдельного «Сохранить»:
  - используйте `Checkbox` в форме.

## Анатомия

### Type (default `block`)

Визуальная ось `type` из `constants.ts`:

- `block` — карточка с паддингами и фоновым state-layer'ом, описание под заголовком.
- `line` — inline-вариант без паддингов, для плотных списков; Switch слева от заголовка.

### Состояния

- `disabled` — `tabIndex=-1`, клики игнорируются. Опционально `disabledToggleTip` — тултип поверх Switch.
- `loading` — Switch крутит индикатор, состояние не меняется до завершения.
- `checked` / `defaultChecked` — controlled / uncontrolled API через `useUncontrolledProp`.

### Слоты

- `title` — обязательный заголовок строки. По умолчанию truncate'ится; `disableTitleTruncate` отключает обрезание.
- `description` — опциональный второй ряд под заголовком.
- `tip` — `?`-иконка с тултипом справа от заголовка.

## Установка

```bash
pnpm add @ds/uikit-product-switch-row
```

```ts
import { SwitchRow } from '@ds/uikit-product-switch-row'
```

## Примеры использования

### Базовый SwitchRow

```tsx
import { SwitchRow } from '@ds/uikit-product-switch-row';

export function Basic() {
  return (
    <SwitchRow title='Включить уведомления' description='Раз в сутки будет приходить дайджест событий' defaultChecked />
  );
}
```

### Inline-вариант (type=line)

```tsx
import { SWITCH_ROW_TYPES, SwitchRow } from '@ds/uikit-product-switch-row';

export function Line() {
  return (
    <SwitchRow
      type={SWITCH_ROW_TYPES.Line}
      title='Тёмная тема'
      description='Применяется ко всему интерфейсу'
      defaultChecked
    />
  );
}
```

### Controlled

Состояние хранится снаружи, описание реагирует на checked.

```tsx
import { SwitchRow } from '@ds/uikit-product-switch-row';
import { useState } from 'react';

export function Controlled() {
  const [checked, setChecked] = useState(false);

  return (
    <SwitchRow
      title='Контролируемый переключатель'
      description={checked ? 'Включено' : 'Выключено'}
      checked={checked}
      onChange={setChecked}
    />
  );
}
```

### С подсказкой у заголовка

```tsx
import { SwitchRow } from '@ds/uikit-product-switch-row';

export function WithTip() {
  return (
    <SwitchRow
      title='Двухфакторная аутентификация'
      description='Подтверждение входа кодом из приложения'
      tip='Защищает аккаунт, даже если кто-то узнает пароль'
      defaultChecked
    />
  );
}
```

### Disabled с тултипом поверх Switch

```tsx
import { SwitchRow } from '@ds/uikit-product-switch-row';

export function Disabled() {
  return (
    <SwitchRow
      title='Push-уведомления'
      description='Доступно после подтверждения email'
      disabled
      disabledToggleTip='Подтвердите email, чтобы включить'
    />
  );
}
```

### Loading

```tsx
import { SwitchRow } from '@ds/uikit-product-switch-row';

export function Loading() {
  return <SwitchRow title='Синхронизация данных' description='Применяем изменение на сервере' defaultChecked loading />;
}
```

## Props

**SwitchRowProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Состояние переключателя (controlled) |
| `className` | `string` | — | CSS-класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `defaultChecked` | `boolean` | — | Начальное состояние переключателя (uncontrolled) |
| `description` | `string` | — | Дополнительное описание под заголовком |
| `disableTitleTruncate` | `boolean` | `false` | Отключить truncation заголовка |
| `disabled` | `boolean` | — | Отключённое состояние |
| `disabledToggleTip` | `ReactNode` | — | Тултип поверх переключателя, когда он disabled |
| `loading` | `boolean` | — | Состояние загрузки — переключатель крутит Sun |
| `name` | `string` | — | Атрибут `name` для нативного `<input>` внутри Switch |
| `onChange` | `((checked: boolean) => void)` | — | Колбэк при переключении |
| `tip` | `ReactNode` | — | Подсказка рядом с заголовком (иконка «?») |
| `title` | `string` | — | Заголовок переключателя |
| `type` | `"block"` \| `"line"` | `block` | Тип лейаута: `block` (карточка с отступами) или `line` (inline без паддингов) |

#### Related types

- `SwitchRowType` = `"block"` \| `"line"`
