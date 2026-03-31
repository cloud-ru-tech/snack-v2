# Drawer

Выезжающая панель для вторичного контекста: фильтры, детали объекта, мастер-шаги, настройки. Компонент **Drawer** собирает шапку: опциональный медиа-слот (`media`), заголовок и подзаголовок, кнопку «назад», слот после заголовка (`slotAfterHeadline`), прокручиваемое тело и опциональный футер. Низкоуровневая сборка без фиксированной шапки — через **DrawerCustom** и субкомпоненты `Header`, `Body`, `Footer`.

## Installation

```bash
npm install @design-system/drawer
# or
yarn add @design-system/drawer
# or
pnpm add @design-system/drawer
```

## Exports



## Live examples

### Базовое использование

```tsx
import { DrawerBasicExample } from '@design-system/drawer';

Панель справа с заголовком, подзаголовком и текстом в теле. Состояние `open` / `onClose` задаётся снаружи (контролируемый компонент).
<DrawerBasicExample client:load />
```


## Usage

### Базовый пример

```tsx
import { Drawer } from '@design-system/drawer';
import { useState } from 'react';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Открыть
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position='right'
        title='Заголовок'
        content={<p>Контент</p>}
      />
    </>
  );
}
```

### С футером и кнопкой «назад»

```tsx
import { Drawer } from '@design-system/drawer';
import { useState } from 'react';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Открыть
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position='left'
        title='Редактирование'
        onBackButtonClick={() => setOpen(false)}
        content={<form>{/* поля */}</form>}
        footer={<div className='actions'>{/* кнопки сохранения */}</div>}
      />
    </>
  );
}
```

### DrawerCustom

```tsx
import { DrawerCustom } from '@design-system/drawer';
import { useState } from 'react';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Открыть
      </button>
      <DrawerCustom open={open} onClose={() => setOpen(false)} position='right' width='m'>
        <DrawerCustom.Header title='Заголовок' />
        <DrawerCustom.Body content={<div>Произвольный контент</div>} />
        <DrawerCustom.Footer>Панель действий</DrawerCustom.Footer>
      </DrawerCustom>
    </>
  );
}
```

## Props

### DrawerProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Контент |
| position* | enum Position: `"left"`, `"right"`, `"top"`, `"bottom"` | - | Расположение |
| onClose* | `() => void` | - | Колбэк закрытия |
| open* | `boolean` | - | Управление состоянием показан/не показан. |
| showBlackout | `boolean` | true | Отображение темной подложки |
| width | `string \| number` | 's' | Ширина (только при position: "left" \| "right") |
| heightAuto | `boolean` | false | Высота панели по контенту (только при `position: "top" \| "bottom"`). При `position: "left" \| "right"` не используется — поведение и ширина задаются только `width` (`'s' \| 'm' \| 'l'` или число/строка). |
| className | `string` | - | CSS-класс для элемента с контентом CSS-класс |
| rootClassName | `string` | - | CSS-класс для корневого элемента |
| push | `boolean \| PushConfig` | - | Смещение при открытии "вложенного" компонента |
| container | `string \| HTMLElement` | - | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| nestedDrawer | `ReactElement<DrawerCustomProps, string \| JSXElementConstructor<any>> & ReactElement<DrawerProps, string \| JSXElementConstructor<...>>` | - | Вложенный Drawer |
| closeOnPopstate | `boolean` | - | Закрывать дровер при перемещении по истории браузера |
| footer | `ReactElement<unknown, string \| JSXElementConstructor<any>> & ReactNode` | - | Футер |
| title | `ReactNode` | - | Заголовок |
| slotAfterHeadline | `ReactNode` | - | Слот после заголовка |
| subtitle | `ReactNode` | - | Подзаголовок |
| onBackButtonClick | `() => void` | - | Действие при клике по кнопке "назад". Отсутствие скрывает кнопку |
| media | `ReactNode` | - | Медиа-контент |
### DrawerCustomProps
| name | type | default value | description |
|------|------|---------------|-------------|
| position* | enum Position: `"left"`, `"right"`, `"top"`, `"bottom"` | - | Расположение |
| onClose* | `() => void` | - | Колбэк закрытия |
| open* | `boolean` | - | Управление состоянием показан/не показан. |
| showBlackout | `boolean` | true | Отображение темной подложки |
| width | `string \| number` | 's' | Ширина (только при position: "left" \| "right") |
| heightAuto | `boolean` | false | Высота панели по контенту (только при `position: "top" \| "bottom"`). При `position: "left" \| "right"` не используется — поведение и ширина задаются только `width` (`'s' \| 'm' \| 'l'` или число/строка). |
| className | `string` | - | CSS-класс для элемента с контентом |
| rootClassName | `string` | - | CSS-класс для корневого элемента |
| push | `boolean \| PushConfig` | - | Смещение при открытии "вложенного" компонента |
| container | `string \| HTMLElement` | - | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| nestedDrawer | `ReactElement<DrawerCustomProps, string \| JSXElementConstructor<any>>` | - | Вложенный Drawer |
| closeOnPopstate | `boolean` | - | Закрывать дровер при перемещении по истории браузера |
| footer | `ReactElement<unknown, string \| JSXElementConstructor<any>>` | - | Футер |
### DrawerCustom.HeaderProps
| name | type | default value | description |
|------|------|---------------|-------------|
| title | `ReactNode` | - | Заголовок |
| slotAfterHeadline | `ReactNode` | - | Слот после заголовка |
| subtitle | `ReactNode` | - | Подзаголовок |
| className | `string` | - | CSS-класс |
| onBackButtonClick | `() => void` | - | Действие при клике по кнопке "назад". Отсутствие скрывает кнопку |
### DrawerCustom.BodyProps
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Контент |
| className | `string` | - | CSS-класс |
### DrawerCustom.FooterProps
| name | type | default value | description |
|------|------|---------------|-------------|
| className | `string` | - | CSS-класс |

## Best Practices

1. **Держите состояние снаружи** — `open` и `onClose` должны отражать единый источник правды (URL, store, родительский layout), чтобы панель не «залипала» при ре-рендерах.
2. **Не дублируйте логику закрытия** — для согласованного поведения с модалками дизайн-системы используйте `closeOnPopstate`, если панель должна закрываться при `popstate`.
3. **Боковая vs верхняя/нижняя** — для `top` / `bottom` явно решайте, нужна ли `heightAuto`, и проверяйте переполнение на маленьких экранах; для `left` / `right` опирайтесь на `width` (пресеты или число в пикселях).
4. **Футер для основных действий** — размещайте подтверждение и отмену в `footer`, чтобы они оставались на виду при прокрутке тела.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
