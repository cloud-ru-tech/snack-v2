# Dropdown

Список пуст

## Installation

```bash
npm install @design-system/dropdown
# or
yarn add @design-system/dropdown
# or
pnpm add @design-system/dropdown
```

## Exports

```typescript
import {
  Dropdown,
  type DropdownProps
} from '@design-system/dropdown';
```

## Live examples

### Базовое использование

```tsx
import { Button, Dropdown } from '@design-system/dropdown';

<Dropdown content="Содержимое выпадающего списка">
  <Button label="Открыть dropdown" view="filled" />
</Dropdown>
```

### С триггером по ховеру

```tsx
import { Button, Dropdown } from '@design-system/dropdown';

<Dropdown content="Открывается при наведении" trigger="hover">
  <Button label="Наведи курсор" view="outline" />
</Dropdown>
```


## Usage

### Базовый пример

```tsx
import { Button } from '@design-system/button';
import { Dropdown } from '@design-system/dropdown';

export function Example() {
  return (
    <Dropdown content={<div>Контент поповера</div>}>
      <Button label="Открыть" view="filled" />
    </Dropdown>
  );
}
```

### Управление открытием (controlled)

```tsx
import { Button } from '@design-system/button';
import { Dropdown } from '@design-system/dropdown';
import { useState } from 'react';

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      content={<div>Контент</div>}
      open={open}
      onOpenChange={setOpen}
    >
      <Button label={open ? 'Закрыть' : 'Открыть'} view="filled" />
    </Dropdown>
  );
}
```

### Триггер по ref (без children)

```tsx
import { Button } from '@design-system/button';
import { Dropdown } from '@design-system/dropdown';
import { useRef } from 'react';

export function Example() {
  const buttonRef = useRef(null);
  return (
    <>
      <Dropdown content={<div>Контент</div>} triggerRef={buttonRef} />
      <Button innerRef={buttonRef} label="Триггер" view="filled" />
    </>
  );
}
```

## Props

### DropdownProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Содержимое внутри поповера |
| state | `DropdownState` | - | Состояние |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | gte | Стратегия управления шириной контейнера поповера <br/> - `auto` - соответствует ширине контента, <br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> - `eq` - Equal, строго равен ширине таргета. |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| triggerRef | `ForwardedRef<ReferenceType \| HTMLElement>` | - | Ref ссылка на триггер |
| outsideClick | `boolean \| OutsideClickHandler` | - | Закрывать ли при клике вне поповера |
| fallbackPlacements | `Placement[]` | - | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| disableSpanWrapper | `boolean` | - | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` |
| closeOnPopstate | `boolean` | - | Закрывать ли поповер при пекреходе по истории браузера |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | click | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | bottom-start | Положение поповера относительно своего триггера (children). |

## Best Practices

1. **Триггер** — используйте явный элемент управления (кнопку, иконку). Для кнопки без обёртки передавайте `triggerRef` и `innerRef` на кнопку.
2. **Ширина** — по умолчанию `widthStrategy="gte"` обеспечивает ширину поповера не меньше триггера; для узких списков опций этого обычно достаточно.
3. **Состояния** — при асинхронной загрузке контента передавайте `state={{ type: 'loading' }}`, после загрузки — `state={undefined}` и актуальный `content`. Для пустых выборок или ошибок используйте `'no-data'` / `'data-error'` с опциональным `onActionClick`.
4. **Локализация** — тексты состояний задаются в `@design-system/locale` (ключи `Dropdown.states.*`); при кастомных описаниях передавайте `description` и `actionLabel` в объекте `state`.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
