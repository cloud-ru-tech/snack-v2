# Dropdown

`@ds/dropdown` — Выпадающий блок с произвольным контентом и встроенными состояниями loading / not-found / no-data / data-error.

Выпадающий блок над триггером: произвольный контент (меню, фильтры, справочная информация) + встроенные состояния `loading / not-found / no-data / data-error` через `state`. Поверх `PopoverPrivate` — те же пропсы позиционирования, плюс готовая визуальная обработка асинхронных случаев.

## Когда использовать
- Меню действий над кнопкой (экспорт, фильтры, настройки).
- Асинхронные подсказки и suggestions — встроенный `state` скрывает ручное ветвление UI.
- Композитные виджеты: селекторы, комбобоксы, авторасшифровки.

Когда **не** нужен `Dropdown`: для одиночного подсказывающего текста используйте `Tooltip`, для модального выбора — `Modal` или `Popover`.

## Анатомия

### State
Встроенные состояния контента, позволяющие не ветвить UI вручную: `loading` — идёт запрос (скелетон/спиннер), `no-data` — у источника пусто (первая загрузка), `not-found` — пользователь ввёл фильтр и ничего не нашлось, `data-error` — запрос упал (с опцией повтора).

## Установка
```bash
pnpm add @ds/dropdown
```

```ts
import { Dropdown, STATE } from '@ds/dropdown'
```

## Примеры использования
### Базовый Dropdown

```tsx
import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

export function Basic() {
  return (
    <Dropdown content={<div style={{ padding: 12 }}>Контент меню</div>}>
      <Button label='Открыть' />
    </Dropdown>
  );
}
```

### Открытое меню для визуальной сверки

Управляемый режим — open

```tsx
import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

export function OpenForReview() {
  return (
    <Dropdown content={<div style={{ padding: 12 }}>Видимое содержимое</div>}>
      <Button label='Триггер' />
    </Dropdown>
  );
}
```

### Состояние loading

```tsx
import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';

export function Loading() {
  return (
    <Dropdown state={{ type: STATE.Loading }} content={null}>
      <Button label='Загрузка' />
    </Dropdown>
  );
}
```

### Состояние not-found с действием

```tsx
import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';

export function NotFound() {
  return (
    <Dropdown
      state={{
        type: STATE.NotFound,
        description: 'Ничего не нашли',
        actionLabel: 'Сбросить фильтры',
        onActionClick: () => {},
      }}
      content={null}
    >
      <Button label='Поиск' />
    </Dropdown>
  );
}
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при пекреходе по истории браузера |
| `content` | `ReactNode` | — | Содержимое внутри поповера |
| `data-test-id` | `string` | — |  |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера
<br/>
Пригодится для элементов с `position: absolute` |
| `fallbackPlacements` | `Placement[]` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `outsideClick` | `boolean | OutsideClickHandler` | — | Закрывать ли при клике вне поповера |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `bottom-start` | Положение поповера относительно своего триггера (children). |
| `state` | `DropdownState` | — | Состояние |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | `click` | Условие отображения поповера:
<br/> - `click` - открывать по клику
<br/> - `hover` - открывать по ховеру
<br/> - `focusVisible` - открывать по focus-visible
<br/> - `focus` - открывать по фокусу
<br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible
<br/> - `hoverAndFocus` - открывать по ховеру и фокусу
<br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerClickByKeys` | `boolean` | `true` | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| `triggerRef` | `ForwardedRef<ReferenceType | HTMLElement | null>` | — | Ref ссылка на триггер |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `gte` | Стратегия управления шириной контейнера поповера
<br/> - `auto` - соответствует ширине контента,
<br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
<br/> - `eq` - Equal, строго равен ширине таргета. |
