# Dropdown

`@ds/dropdown` — Выпадающий блок с произвольным контентом и встроенными состояниями loading / not-found / no-data / data-error.

Выпадающий блок над триггером: произвольный контент (меню, фильтры, справочная информация) + встроенные состояния `loading / not-found / no-data / data-error` через `state`. Поверх `PopoverPrivate` — те же пропсы позиционирования, плюс готовая визуальная обработка асинхронных случаев.

## Демо
<DropdownDemo client:visible />

## Когда использовать
- Меню действий над кнопкой (экспорт, фильтры, настройки).
- Асинхронные подсказки и suggestions — встроенный `state` скрывает ручное ветвление UI.
- Композитные виджеты: селекторы, комбобоксы, авторасшифровки.

Когда **не** нужен `Dropdown`: для одиночного подсказывающего текста используйте `Tooltip`, для модального выбора — `Modal` или `Popover`.

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
<Example title='Базовый Dropdown' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Открытое меню для визуальной сверки' description='Управляемый режим — open' code={OpenForReviewSrc}>
  <OpenForReview client:visible />
</Example>

<Example title='Состояние loading' code={LoadingSrc}>
  <Loading client:visible />
</Example>

<Example title='Состояние not-found с действием' code={NotFoundSrc}>
  <NotFound client:visible />
</Example>

## Props
<PropsTable data={dropdownDoc.Dropdown} />

## Storybook
<StorybookEmbed storyId='components-dropdown--playground' height={360} />

## Dropdown

```tsx
import { Dropdown } from '@ds/dropdown'

export function Example() {
  return <Dropdown widthStrategy="gte" offset="0" closeOnEscapeKey triggerClickByKeys trigger="click" placement="bottom-start">Click me</Dropdown>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `content` | `ReactNode` | — | Содержимое внутри поповера |
| `state` | `DropdownState` | — | Состояние |
| `className` | `string` | — | CSS-класс |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `widthStrategy` | `"auto"` \| `"gte"` \| `"eq"` | `gte` | Стратегия управления шириной контейнера поповера
<br/> - `auto` - соответствует ширине контента,
<br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
<br/> - `eq` - Equal, строго равен ширине таргета. |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `triggerClickByKeys` | `boolean` | `true` | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| `triggerRef` | `ForwardedRef<ReferenceType | HTMLElement | null>` | — | Ref ссылка на триггер |
| `outsideClick` | `boolean | OutsideClickHandler` | — | Закрывать ли при клике вне поповера |
| `fallbackPlacements` | `Placement[]` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера
<br/>
Пригодится для элементов с `position: absolute` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при пекреходе по истории браузера |
| `trigger` | `"click"` \| `"hover"` \| `"focusVisible"` \| `"focus"` \| `"hoverAndFocusVisible"` \| `"hoverAndFocus"` \| `"clickAndFocusVisible"` | `click` | Условие отображения поповера:
<br/> - `click` - открывать по клику
<br/> - `hover` - открывать по ховеру
<br/> - `focusVisible` - открывать по focus-visible
<br/> - `focus` - открывать по фокусу
<br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible
<br/> - `hoverAndFocus` - открывать по ховеру и фокусу
<br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `placement` | `"left"` \| `"left-start"` \| `"left-end"` \| `"right"` \| `"right-start"` \| `"right-end"` \| `"top"` \| `"top-start"` \| `"top-end"` \| `"bottom"` \| `"bottom-start"` \| `"bottom-end"` | `bottom-start` | Положение поповера относительно своего триггера (children). |
