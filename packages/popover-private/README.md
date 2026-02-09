# Popover Private

Низкоуровневый компонент поповера на базе Floating UI. Используется для построения Tooltip, Dropdown и других overlay-компонентов. Поддерживает триггеры click, hover, focus, гибкое позиционирование и опциональную стрелку.

## Installation

```bash
npm install @design-system/popover-private
# or
yarn add @design-system/popover-private
# or
pnpm add @design-system/popover-private
```

## Exports



## Live examples

### Basic usage

```tsx
import { PopoverBasicExample } from '@design-system/popover-private';

Поповер с триггером по клику и контентом справа от кнопки:
<PopoverBasicExample client:load/>
```


## Usage

### Basic example

```tsx
import { PopoverPrivate } from '@design-system/popover-private';

export function Example() {
  return (
    <PopoverPrivate
      trigger='click'
      placement='top'
      popoverContent={<div>Контент поповера</div>}
    >
      <button type="button">Открыть</button>
    </PopoverPrivate>
  );
}
```

### With additional props

```tsx
import { PopoverPrivate } from '@design-system/popover-private';

export function Example() {
  return (
    <PopoverPrivate
      trigger='hover'
      placement='top'
      hasArrow
      outsideClick
      popoverContent={
        <div style={{ padding: 12, borderRadius: 8 }}>
          Дополнительная информация
        </div>
      }
    >
      <button type="button">Подсказка</button>
    </PopoverPrivate>
  );
}
```

## Props

### PopoverPrivateProps
| name | type | default value | description |
|------|------|---------------|-------------|
| trigger* | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | - | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| popoverContent* | `ReactNode \| ReactNode[]` | - | Контент поповера |
| placement* | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Положение поповера относительно своего триггера (children). |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| outsideClick | `boolean \| OutsideClickHandler` | - | Закрывать ли при клике вне поповера |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| hasArrow | `boolean` | - | Параметр наличия стрелки у поповера. В размеры стрелки встроен отступ. Дополнительный отступ может быть задан параметром `offset`. У элемента стрелки нет цвета, необходимо задавать его через параметр `arrowClassName`. |
| arrowContainerClassName | `string` | - | CSS-класс контейнера стрелки поповера |
| arrowElementClassName | `string` | - | CSS-класс стрелки поповера |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | auto | Стратегия управления шириной контейнера поповера <br/> - `auto` - соответствует ширине контента, <br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> - `eq` - Equal, строго равен ширине таргета. |
| heightStrategy | enum PopoverHeightStrategy: `"auto"`, `"eq"`, `"lte"` | auto | Стратегия управления высотой контейнера поповера <br/> - `auto` - соответствует высоте контента, <br/> - `lte` - Less Than or Equal, равен высоте таргета или меньше ее, если контент в поповере меньше, <br/> - `eq` - Equal, строго равен высоте таргета. |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| fallbackPlacements | `Placement[]` | - | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| disableSpanWrapper | `boolean` | - | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` |
| closeOnPopstate | `boolean` | - | Закрывать ли поповер при пекреходе по истории браузера |
| triggerRef | `ForwardedRef<ReferenceType \| HTMLElement>` | - | Ref ссылка на триггер |
| children | `ReactNode \| ChildrenFunction` | - | Триггер поповера (подробнее читайте ниже) |

## Best Practices

1. **Выбор триггера** — используйте `click` для выпадающих меню и действий с выбором; `hover` или `hoverAndFocusVisible` для подсказок и дополнительной информации, чтобы не перегружать интерфейс кликами.
2. **Закрытие и границы экрана** — включайте `outsideClick: true` для закрытия по клику вне поповера. Задавайте `fallbackPlacements`, чтобы при нехватке места поповер переворачивался в подходящую сторону, а не уходил за край вьюпорта.
3. **Низкоуровневый слой** — не используйте Popover Private как готовый UI-блок. Стройте на нём компоненты уровня Tooltip, Dropdown, Menu с нужными стилями, ролями и описаниями для скринридеров.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
