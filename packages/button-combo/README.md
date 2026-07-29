# Button Combo

`@ds/button-combo` — Кнопка с основным действием и выпадающим списком дополнительных действий.

Комбинированная кнопка: основное действие слева и триггер выпадающего списка с остальными действиями справа. Обе части — `Button` из `@ds/button` с общими `view` / `appearance` / `size`; список — адаптивный `Droplist` из `@ds/list` (на мобильной раскладке раскрывается в `BottomSheet`). Выбор пункта делает его основным действием кнопки.

## Когда использовать

- Когда у действия есть основной сценарий и несколько родственных вариантов: Сохранить / Сохранить копию / Сохранить как шаблон.
- Когда нужно сэкономить место: вместо ряда кнопок — одна с выпадающим списком.

Когда **не** нужен:

- Для единственного действия — обычный `Button` из `@ds/button`.
- Для выбора значения (а не запуска действия) — `@ds/segment-control` или select.
- Для равнозначных несвязанных действий — `ButtonGroup` из `@ds/button`.

## Анатомия

### View (default `filled`)

Оформление обеих частей комбо. Совпадает с осью `view` у `@ds/button`:

- `filled` — заполненная акцентом.
- `tonal` — мягкая тонированная подложка.
- `outline` — обводка без заливки.
- `simple` — только текст, без фона и рамки.
- `elevated` — светлая карточка с тенью.
- `function` — компактная текстовая, минимум отступов.

### Appearance (default `primary`)

Цветовое назначение обеих частей:

- `primary` — брендовый акцент, основное действие экрана.
- `neutral` — нейтральное, второстепенное действие.
- `critical` — деструктивное действие.

### Size (default `m`)

Размер комбо: `s`, `m`, `l`. Прокидывается и в кнопки, и в выпадающий список.

## Установка

```bash
pnpm add @ds/button-combo
```

```ts
import { ButtonCombo } from '@ds/button-combo'
```

## Примеры использования

### Основной сценарий

Uncontrolled: defaultValue задаёт стартовое действие, выбор пункта меняет основную кнопку

```tsx
import { ButtonCombo, Item } from '@ds/button-combo';

const items: Item[] = [
  { id: 'save', label: 'Сохранить', onClick: () => console.info('Сохранить') },
  { id: 'save-copy', label: 'Сохранить копию', onClick: () => console.info('Сохранить копию') },
  { id: 'save-template', label: 'Сохранить как шаблон', onClick: () => console.info('Сохранить как шаблон') },
];

export function Basic() {
  return <ButtonCombo items={items} defaultValue='save' />;
}
```

### Варианты оформления

Ось view: filled, tonal, outline, function

```tsx
import { ButtonCombo, Item, VIEW } from '@ds/button-combo';

const items: Item[] = [
  { id: 'run', label: 'Запустить', onClick: () => console.info('Запустить') },
  { id: 'run-debug', label: 'Запустить с отладкой', onClick: () => console.info('Запустить с отладкой') },
];

export function Views() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ButtonCombo view={VIEW.Filled} items={items} defaultValue='run' />
      <ButtonCombo view={VIEW.Tonal} items={items} defaultValue='run' />
      <ButtonCombo view={VIEW.Outline} items={items} defaultValue='run' />
      <ButtonCombo view={VIEW.Function} items={items} defaultValue='run' />
    </div>
  );
}
```

### Controlled

Выбранное действие и раскрытие списка управляются извне через пары value/onChange и open/onOpenChange

```tsx
import { ButtonCombo, Item } from '@ds/button-combo';
import { ItemId } from '@ds/list';
import { useState } from 'react';

const items: Item[] = [
  { id: 'publish', label: 'Опубликовать', onClick: () => console.info('Опубликовать') },
  { id: 'draft', label: 'Сохранить черновик', onClick: () => console.info('Сохранить черновик') },
  { id: 'schedule', label: 'Запланировать', onClick: () => console.info('Запланировать') },
];

export function Controlled() {
  const [value, setValue] = useState<ItemId>('publish');
  const [open, setOpen] = useState(false);

  return <ButtonCombo items={items} value={value} onChange={setValue} open={open} onOpenChange={setOpen} />;
}
```

### На всю ширину

fullWidth растягивает основную кнопку по контейнеру, триггер сохраняет свою ширину

```tsx
import { ButtonCombo, Item } from '@ds/button-combo';

import styles from './styles.module.scss';

const items: Item[] = [
  { id: 'confirm', label: 'Подтвердить', onClick: () => console.info('Подтвердить') },
  { id: 'confirm-notify', label: 'Подтвердить и уведомить', onClick: () => console.info('Подтвердить и уведомить') },
];

export function FullWidth() {
  return (
    <div className={styles.narrow}>
      <ButtonCombo fullWidth items={items} defaultValue='confirm' />
    </div>
  );
}
```

## Props

**ButtonComboProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"critical"` \| `"neutral"` \| `"primary"` | `primary` | Цветовое назначение обеих кнопок |
| `className` | `string` | — | CSS-класс корневого контейнера |
| `data-test-id` | `string` | — |  |
| `defaultLabel` | `string` | `` | Начальный label основной кнопки, пока ничего не выбрано |
| `defaultValue` | `ItemId` | — | Начальный выбранный элемент (uncontrolled) |
| `disabled` | `boolean` | — | Отключена |
| `dropdownClassName` | `string` | — | CSS-класс выпадающего списка |
| `dropdownTriggerClassName` | `string` | — | CSS-класс кнопки-триггера выпадающего списка |
| `fullWidth` | `boolean` | — | Растянуть на всю ширину родителя |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `items` | `Item` | — | Основные элементы списка (действия) |
| `loading` | `boolean` | — | Состояние загрузки |
| `onChange` | `((value: ItemId) => void)` | — | Controlled: обработчик смены выбранного элемента |
| `onOpenChange` | `((open: boolean) => void)` | — | Обработчик изменения видимости выпадающего списка |
| `open` | `boolean` | — | Управляет видимостью выпадающего списка |
| `optionClassName` | `string` | — | CSS-класс основной (option) кнопки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `tabIndex` | `number` | — | HTML-атрибут tab-index корневого контейнера |
| `value` | `ItemId` | — | Controlled: выбранный элемент |
| `view` | `"elevated"` \| `"filled"` \| `"function"` \| `"outline"` \| `"simple"` \| `"tonal"` | `filled` | Вариант оформления обеих кнопок |

#### Related types

**Item**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Слот после основного контента |
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Слот до основного контента |
| `checked` | `boolean \| undefined` | — | Управляемое состояние выбранности айтема |
| `className` | `string \| undefined` | — | CSS-класс |
| `content` | `ItemContent` | — | Основной контент айтема |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Флаг неактивности элемента |
| `hidden` | `boolean \| undefined` | — | Скрыть элемент из списка (не рендерится и выпадает из навигации) |
| `id` | `ItemId` | — | Уникальный идентификатор |
| `inactive` | `boolean \| undefined` | — | Флаг отображения отключения реакции на любое css состояние (hover/focus и тд) <br/> <br> <br/> Так же элемент пропадает из навигации с клавиатуры, и не может быть выбран (selection) |
| `itemRef` | `RefObject<HTMLElement> \| undefined` | — | Ссылка на DOM-элемент айтема |
| `itemWrapRender` | `((item: ReactNode) => ReactNode) \| undefined` | — | Рендер-обёртка вокруг айтема (например, для проксирования в `Tooltip`/`Link`) |
| `label` | `string \| undefined` | — | Название действия: текст пункта списка и label основной кнопки при выборе |
| `onClick` | `(e: MouseEvent<HTMLElement>) => void` | — | Колбек обработки клика |
| `showSwitchIcon` | `boolean \| undefined` | — | Флаг отображения иконки у чекбоксов |
| `switch` | `boolean \| undefined` | — | Флаг отображения состояния выбранного элемента через switch |

## Смотри также

- [`@ds/button`](/button) — одиночная кнопка и `ButtonGroup`.
- [`@ds/list`](/list) — `Droplist`, лежащий в основе выпадающего списка.
