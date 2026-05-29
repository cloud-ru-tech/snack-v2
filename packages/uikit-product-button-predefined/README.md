# ButtonDropdown

`@ds/uikit-product-button-predefined` — Function-кнопка с выпадающим списком (desktop) или modal (mobile).

Кнопка `view='function'` с `AdaptiveDroplist`: на **desktop** — `@sbercloud/snack-v2-list` `Droplist`, на **`layoutType='mobile'`** — `@ds/modal` со списком. Используется, в частности, в **`PriceSummary`** для выбора периода биллинга.

## Демо

{/* client:only — @sbercloud/snack-v2-list Droplist не резолвится при SSR */}

## Когда использовать

- Нужен выбор одного значения из короткого списка (период, валюта, режим) без отдельного поля формы.
- На desktop достаточно выпадающего списка у триггера; на mobile — полноэкранный modal со списком.

Когда **не** нужен `ButtonDropdown`:

- Произвольный контент в overlay без списка — **`Dropdown`**.
- Одиночное действие без меню — **`Button`** `view='function'`.

## Анатомия

### Trigger

`Button` `view='function'` `appearance='neutral'` (как `buttonFunctionNeutral` в Figma) с `label` и chevron up/down. При `open={true}` на триггер вешается `data-pressed` — в макете это `stateLayer/text/opacity` (прозрачность label/icon через `@ds/materials`).

### AdaptiveDroplist

- **`layoutType='desktop'`** (по умолчанию) — `Droplist` из `@sbercloud/snack-v2-list`, позиционирование через popover.
- **`layoutType='mobile'`** — `ModalCustom` + `List`; пункты из `items`.

### items

Массив пунктов `Droplist` (`content.option`, `onClick`, `id`). При `closeDroplistOnItemClick` список закрывается после выбора.

### Size

`xs` | `s` | `m` | `l` — для `xs` кнопка рендерится как `s`, droplist остаётся `s`.

### open / onOpenChange

Controlled API через `useValueControl` (как у `@ds/utils`).

## Установка

```bash
pnpm add @ds/uikit-product-button-predefined
```

```ts
import { ButtonDropdown } from '@ds/uikit-product-button-predefined'
```

### Базовый пример

```tsx
<ButtonDropdown
  label='Period'
  size='s'
  layoutType='desktop'
  closeDroplistOnItemClick
  items={[
    { id: 'month', content: { option: 'Month' }, onClick: () => setPeriod('month') },
    { id: 'year', content: { option: 'Year' }, onClick: () => setPeriod('year') },
  ]}
/>
```

## Примеры использования

### Mobile layout

layoutType=mobile открывает modal со списком.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { useRef } from 'react';

const items = [
  { id: 'month', content: { option: 'Month' }, onClick: () => undefined },
  { id: 'year', content: { option: 'Year' }, onClick: () => undefined },
];

export function MobileLayout() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <ButtonDropdown label='Period' size='s' layoutType='mobile' closeDroplistOnItemClick items={items} />
      </div>
    </PortalContextProvider>
  );
}
```

## Props

**ButtonDropdownProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"critical"` \| `"neutral"` \| `"primary"` | — | Вариант оформления |
| `as` | `"button"` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `barHideStrategy` | `"leave"` \| `"move"` \| `"never"` \| `"scroll"` | — | Управление скрытием скролл баров: <br/> <br> - `Never` - показывать всегда <br/> <br> - `Leave` - скрывать когда курсор покидает компонент <br/> <br> - `Scroll` - показывать только когда происходит скроллинг <br/> <br> - `Move` - показывать при движении курсора над компонентом |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс <br/> CSS-класс |
| `closeDroplistOnItemClick` | `boolean` | `false` | Закрывать выпадающий список после клика на базовый айтем. <br/> Работает в режимах selection: 'none' \| 'single' |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при пекреходе по истории браузера |
| `collapse` | `CollapseState` | — | Настройки раскрытия элементов |
| `contentRender` | `((props: ContentRenderProps) => ReactNode)` | — | Рендер функция основного контента айтема |
| `counter` | `CounterProps` | — | Пропсы для counter |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — |  |
| `dataFiltered` | `boolean` | — |  |
| `disabled` | `boolean` | — | Отключена |
| `errorDataState` | `EmptyStateProps` | — | Экран при ошибке запроса |
| `footer` | `ReactNode ;` | — | Кастомизируемый элемент в конце списка |
| `footerActiveElementsRefs` | `RefObject<HTMLElement>[]` | — | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| `fullWidth` | `boolean` | — | На всю ширину |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `items` | `Item[]` | — |  |
| `label` | `string` | — | Текст кнопки |
| `layoutType` | `"desktop"` \| `"mobile"` | — |  |
| `listRef` | `RefObject<HTMLElement>` | — | Ссылка на элемент выпадающего списка |
| `loading` | `boolean` | — | Состояние загрузки <br/> Флаг, отвещающий за состояние загрузки списка |
| `marker` | `boolean` | — | Отображать ли маркер у выбранного жлемента списка |
| `noDataState` | `EmptyStateProps` | — | Экран при отстутствии данных |
| `noResultsState` | `EmptyStateProps` | — | Экран при отстутствии результатов поиска или фильтров |
| `onOpenChange` | `(((open: boolean) => void) & ((isOpen: boolean) => void))` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `onScroll` | `(UIEventHandler<HTMLButtonElement> & ((event?: Event) => void)) \| undefined` | — | Колбек на скролл прокручиваемого списка |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `pinBottom` | `Item[]` | — | Элементы списка, закрепленные снизу |
| `pinTop` | `Item[]` | — | Элементы списка, закрепленные сверху |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `scroll` | `boolean` | — | Включить ли скролл для основной части списка |
| `scrollContainerClassName` | `string` | — | CSS-класс для scroll обертки основного списка айтемов |
| `scrollContainerRef` | `Ref<HTMLElement>` | — | Ссылка на контейнер, который скроллится |
| `scrollRef` | `Ref<HTMLElement>` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `scrollToSelectedItem` | `boolean` | — | Флаг, отвещающий за прокручивание до выбранного элемента |
| `search` | `SearchState` | — | Настройки поисковой строки |
| `selection` | `SelectionSingleState \| SelectionMultipleState` | — |  |
| `size` | `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` |  |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | — | Условие отображения поповера: <br/> <br> - `click` - открывать по клику <br/> <br> - `hover` - открывать по ховеру <br/> <br> - `focusVisible` - открывать по focus-visible <br/> <br> - `focus` - открывать по фокусу <br/> <br> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> <br> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> <br> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerElemRef` | `RefObject<HTMLElement>` | — | Ссылка на элемент-триггер для дроплиста |
| `untouchableScrollbars` | `boolean` | — | Отключает возможность взаимодействовать со скролбарами мышью. |
| `virtualized` | `boolean` | — | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `auto` | Стратегия управления шириной контейнера поповера <br/> <br> - `auto` - соответствует ширине контента, <br/> <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> <br> - `eq` - Equal, строго равен ширине таргета. |

#### Related types

- `ButtonDropdownSize` = `"l"` \| `"m"` \| `"s"` \| `"xs"`

- `LayoutType` = `"desktop"` \| `"mobile"`
