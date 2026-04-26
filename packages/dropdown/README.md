# Dropdown

`@ds/dropdown` — Выпадающий блок с произвольным контентом и встроенными состояниями loading / not-found / no-data / data-error.

Выпадающий блок над триггером: произвольный контент (меню, фильтры, справочная информация) + встроенные состояния `loading / not-found / no-data / data-error` через `state`. Поверх `PopoverPrivate` — те же пропсы позиционирования, плюс готовая визуальная обработка асинхронных случаев.

## Когда использовать

- Меню действий над кнопкой (экспорт, фильтры, настройки).
- Асинхронные подсказки и suggestions — встроенный `state` скрывает ручное ветвление UI.
- Композитные виджеты: селекторы, комбобоксы, авторасшифровки.

Когда **не** нужен `Dropdown`: для одиночного подсказывающего текста используйте `Tooltip`, для модального выбора — `Modal` или `Popover`.

### Trigger

| Trigger | Когда |
|---------|-------|
| `click` | Меню действий, фильтры — явное намерение открыть |
| `hover` | Подсказки и preview — снять трение |
| `focus` | Инлайн-подсказки внутри форм |

### Placement

8 позиций: `top/bottom` с суффиксами `-start/-end` и `left/right`. По умолчанию — `bottom-start`. При нехватке места Dropdown автоматически пробует fallback-позиции.

### Встроенные состояния

| State | Визуал | Когда |
|-------|--------|-------|
| `loading` | Spinner по центру | Асинхронная подгрузка списка |
| `not-found` | InfoBlock с описанием + action | Поиск ничего не нашёл |
| `no-data` | InfoBlock с иконкой + action | Пустой датасет, предложить создать |
| `data-error` | InfoBlock c иконкой + retry | Ошибка загрузки, предложить повторить |

### Do / Don't

- ✅ Используйте `state` вместо ручной композиции `Spinner`/`EmptyState`.
- ❌ Делать свой loading и `state={{ type: 'loading' }}` одновременно — выберите одно.
- ✅ Контент в Dropdown должен быть короче одного экрана — для длинных форм берите `Modal`.
- ❌ Вкладывать Dropdown в Dropdown — пользователь теряет контекст, лучше показать второй уровень в том же контейнере.

### Установка

```bash
pnpm add @ds/dropdown
```

```ts
import { Dropdown, STATE } from '@ds/dropdown'
import '@ds/dropdown/style.css'
```

### Примеры использования

<Example title='Базовый Dropdown'>
  <Dropdown content={<div style={{ padding: 12 }}>Контент меню</div>}>
    <Button label='Открыть' />
  </Dropdown>
</Example>

<Example title='Открытое меню для визуальной сверки' description='Управляемый режим — open'>
  <Dropdown open content={<div style={{ padding: 12 }}>Видимое содержимое</div>}>
    <Button label='Триггер' />
  </Dropdown>
</Example>

<Example title='Состояние loading'>
  <Dropdown open state={{ type: STATE.Loading }} content={null}>
    <Button label='Загрузка' />
  </Dropdown>
</Example>

<Example title='Состояние not-found с действием'>
  <Dropdown
    open
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
</Example>

### States

- **`loading`** — контент заменяется `Spinner`'ом; реальный `content` игнорируется.
- **`not-found` / `no-data` / `data-error`** — контент заменяется `InfoBlock`'ом; `actionLabel` + `onActionClick` рендерят повторный запрос / сброс.
- **Без `state`** — рендерится `content` как есть.

### Props

<PropsTable data={dropdownDoc.Dropdown} />

### Storybook

<StorybookEmbed storyId='components-dropdown--playground' height={360} client:load />

## Доступность

- Триггер — любой интерактивный элемент (`Button`, `<a>`); клавиатура работает из коробки.
- Открытие по клавиатуре — Enter / Space на триггере, закрытие — Escape (по умолчанию `closeOnEscapeKey`).
- Фокус возвращается на триггер при закрытии.
- Для меню-списков рекомендуем внутри `content` ставить `role='menu'` с `role='menuitem'` на элементах — Dropdown сам не навязывает эти роли, чтобы не мешать произвольному контенту.
- `trigger='hover'` дублируется фокусом — открытие работает и для клавиатурных пользователей.

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
