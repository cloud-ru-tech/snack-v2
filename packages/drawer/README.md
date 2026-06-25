# Drawer

`@ds/drawer` — Пакет выезжающих панелей — компоненты Drawer и DrawerCustom с едиными токенами позиции и ширины.

Пакет `@ds/drawer` предоставляет два компонента для боковых/нижних панелей: готовую сборку `Drawer` с пресетной шапкой, телом и футером и низкоуровневый `DrawerCustom` для ручной композиции.

- ****Drawer**** — готовая панель с шапкой, прокручиваемым телом и опциональным футером. Покрывает 90% сценариев.
- ****DrawerCustom**** — низкоуровневая версия без предопределённой структуры: собирайте из `DrawerCustom.Header`, `.Body`, `.Footer` или собственной разметки.

## Установка

```bash
pnpm add @ds/drawer
```

```ts
import { Drawer, DrawerCustom, POSITION, WIDTH } from '@ds/drawer'
```

## Смотри также

- **Modal** — центрированное модальное окно для блокирующих подтверждений.
- **Popover** — всплывающий слой рядом с триггером.

## Drawer

Панель, выезжающая со стороны экрана — пресетная шапка, прокручиваемое тело и опциональный футер.

Панель, выезжающая со стороны экрана — для дополнительного контекста, фильтров, форм и пошаговых сценариев. `Drawer` собирает шапку (медиа, заголовок, подзаголовок, back-button, слот после заголовка), прокручиваемое тело и опциональный футер. Для ручной композиции используйте [`DrawerCustom`](./drawer-custom).

### Когда использовать
- Форма, фильтры или детали, которые не помещаются в основной поток и требуют отдельного контекста.
- Пошаговый сценарий с кнопкой «назад» в шапке — возвращение между экранами без потери контекста.
- Нижний лист (bottom sheet) для компактных действий и подтверждений на мобильных устройствах.
- Стек из двух-трёх связанных панелей через `nestedDrawer`.

Когда **не** нужен: критическое подтверждение, блокирующее остальной интерфейс (берите `Modal`), всплывающий поповер рядом с элементом (`Popover`), тост-уведомление (не блокирует UI).

### Примеры использования
#### Базовое использование

Контролируемое open/onClose, footer из `ButtonGroup`.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function Basic() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        onClose={close}
        title='Заголовок'
        subtitle='Короткое пояснение сценария'
        content='Основной контент тела. Сюда помещается форма, предупреждение или подробный текст.'
        footer={
          <ButtonGroup
            primaryAction={{ label: 'Продолжить', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
          />
        }
      />
    </>
  );
}
```

#### Критическое действие

Critical primary, neutral outline secondary.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function WithFooter() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Удалить…' appearance='critical' view='outline' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        onClose={close}
        title='Удалить запись'
        subtitle='Действие необратимо.'
        content='После подтверждения запись и все её ссылки исчезнут из списка.'
        footer={
          <ButtonGroup
            primaryAction={{
              label: 'Удалить',
              appearance: 'critical',
              view: 'filled',
              onClick: close,
            }}
            secondaryAction={{
              label: 'Отмена',
              appearance: 'neutral',
              view: 'outline',
              onClick: close,
            }}
          />
        }
      />
    </>
  );
}
```

#### С медиа-слотом

`media` рендерится над шапкой на всю ширину панели.

```tsx
import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function WithMedia() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть онбординг' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        width='m'
        onClose={close}
        media={
          <div
            style={{
              height: 200,
              background: 'linear-gradient(135deg, rgb(102 126 234), rgb(118 75 162))',
            }}
          />
        }
        title='Добро пожаловать'
        subtitle='Кратко о том, что изменилось в этой версии.'
        content='Список ключевых улучшений и ссылки на подробности могут размещаться в теле.'
      />
    </>
  );
}
```

#### Bottom sheet

`position="bottom"` + `heightAuto` — высота по контенту.

```tsx
import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function HeightAuto() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть bottom sheet' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='bottom'
        heightAuto
        onClose={close}
        title='Bottom sheet'
        subtitle='Высота рассчитывается по контенту'
        content='Подходит для компактных подтверждений на мобильных устройствах.'
      />
    </>
  );
}
```

#### Вложенный Drawer

Родитель сдвигается влево при открытии дочернего.

```tsx
import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function NestedDrawer() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  const closeAll = () => {
    setInnerOpen(false);
    setOuterOpen(false);
  };

  return (
    <>
      <Button label='Открыть родительский' appearance='primary' view='filled' onClick={() => setOuterOpen(true)} />
      <Drawer
        open={outerOpen}
        position='right'
        width='m'
        onClose={closeAll}
        title='Родительский Drawer'
        subtitle='При открытии вложенного — родитель сдвигается влево.'
        content={
          <Button label='Открыть вложенный' appearance='primary' view='outline' onClick={() => setInnerOpen(true)} />
        }
        nestedDrawer={
          <Drawer
            open={innerOpen}
            position='right'
            width='s'
            onClose={() => setInnerOpen(false)}
            title='Вложенный Drawer'
            subtitle='Кнопка «назад» возвращает к родителю'
            onBackButtonClick={() => setInnerOpen(false)}
            content='Вложенный Drawer рендерится через проп nestedDrawer родителя.'
          />
        }
      />
    </>
  );
}
```

### Props

**DrawerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс для элемента с контентом <br/> CSS-класс |
| `closeOnPopstate` | `boolean` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `content` | `ReactNode` | — | Контент |
| `data-test-id` | `string` | — |  |
| `footer` | `(ReactElement<any, string \| JSXElementConstructor<any>> & (string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<...> \| ReactPortal \| null))` | — | Футер |
| `heightAuto` | `boolean` | `false` | Высота панели по контенту (только при `position: "top" \| "bottom"`). <br/> При `position: "left" \| "right"` не используется — поведение и ширина задаются только `width` (`'s' \| 'm' \| 'l'` или число/строка). |
| `media` | `ReactNode` | — | Медиа-контент |
| `nestedDrawer` | `DrawerCustomProps` | — | Вложенный Drawer |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке "назад". Отсутствие скрывает кнопку |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `push` | `boolean \| PushConfig` | — | Смещение при открытии "вложенного" компонента |
| `rootClassName` | `string` | — | CSS-класс для корневого элемента |
| `showBlackout` | `boolean` | `true` | Отображение темной подложки |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `title` | `ReactNode` | — | Заголовок |
| `width` | `Width` | `'s'` | Ширина (только при position: "left" \| "right") |

##### Related types

**DrawerCustomProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string \| undefined` | — | CSS-класс для элемента с контентом |
| `closeOnPopstate` | `boolean \| undefined` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement \| undefined` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `data-test-id` | `string \| undefined` | — |  |
| `footer` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | — | Футер |
| `heightAuto` | `boolean \| undefined` | — | Высота панели по контенту (только при `position: "top" \| "bottom"`). <br/> При `position: "left" \| "right"` не используется — поведение и ширина задаются только `width` (`'s' \| 'm' \| 'l'` или число/строка). |
| `nestedDrawer` | `DrawerCustomProps` | — | Вложенный Drawer |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `push` | `boolean \| PushConfig \| undefined` | — | Смещение при открытии "вложенного" компонента |
| `rootClassName` | `string \| undefined` | — | CSS-класс для корневого элемента |
| `showBlackout` | `boolean \| undefined` | — | Отображение темной подложки |
| `width` | `Width` | — | Ширина (только при position: "left" \| "right") |

- `Position` = `"bottom"` \| `"left"` \| `"right"` \| `"top"`

- `Width` = `"l"` \| `"m"` \| `"s"`

## DrawerCustom

Низкоуровневая сборка Drawer — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`DrawerCustom` — низкоуровневая версия `Drawer`, которая не диктует структуру содержимого. Вы сами компонуете шапку, тело и футер из субкомпонентов `DrawerCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Используйте `DrawerCustom`, когда стандартной шапки из `Drawer` недостаточно — например, нужна своя раскладка заголовка с несколькими действиями, кастомный футер с группами кнопок или нестандартный порядок секций.

### Когда использовать

- Стандартная шапка / футер из `Drawer` не подходят — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одной панели.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `Drawer` — он дешевле в поддержке и даёт консистентные отступы.

### Анатомия

#### Position
Сторона, с которой выезжает панель: `right` — стандартный side-panel (по умолчанию), `left` — для навигации и фильтров, `top`/`bottom` — для уведомлений и bottom-sheets на мобильных.

#### Width
Предустановленная ширина панели для `position: left | right`: `s` — для узких форм и фильтров, `m` — дефолт, `l` — для сложных форм и просмотрщиков. Также принимает число или строку CSS для точного контроля.

### Примеры использования

#### Ручная композиция

Header + Body + Footer собираются вручную.

```tsx
import { Button } from '@ds/button';
import { DrawerCustom } from '@ds/drawer';
import { useState } from 'react';

export function CustomComposition() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть custom drawer' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <DrawerCustom open={open} position='right' width='s' onClose={close}>
        <DrawerCustom.Header title='Ручная композиция' subtitle='Header + Body + Footer собираются вручную.' />
        <DrawerCustom.Body
          content={
            <div style={{ padding: 24 }}>
              <p>Тело Drawer собирается из произвольной разметки.</p>
              <p>Скролл включается автоматически при большом содержимом.</p>
            </div>
          }
        />
        <DrawerCustom.Footer>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button label='Закрыть' appearance='neutral' view='outline' onClick={close} />
            <Button label='Подтвердить' appearance='primary' view='filled' onClick={close} />
          </div>
        </DrawerCustom.Footer>
      </DrawerCustom>
    </>
  );
}
```

### Props

**DrawerCustomProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс для элемента с контентом |
| `closeOnPopstate` | `boolean` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `data-test-id` | `string` | — |  |
| `footer` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — | Футер |
| `heightAuto` | `boolean` | `false` | Высота панели по контенту (только при `position: "top" \| "bottom"`). <br/> При `position: "left" \| "right"` не используется — поведение и ширина задаются только `width` (`'s' \| 'm' \| 'l'` или число/строка). |
| `nestedDrawer` | `DrawerCustomProps` | — | Вложенный Drawer |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `push` | `boolean \| PushConfig` | — | Смещение при открытии "вложенного" компонента |
| `rootClassName` | `string` | — | CSS-класс для корневого элемента |
| `showBlackout` | `boolean` | `true` | Отображение темной подложки |
| `width` | `Width` | `'s'` | Ширина (только при position: "left" \| "right") |

##### Related types

**DrawerCustomProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string \| undefined` | — | CSS-класс для элемента с контентом |
| `closeOnPopstate` | `boolean \| undefined` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement \| undefined` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `data-test-id` | `string \| undefined` | — |  |
| `footer` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | — | Футер |
| `heightAuto` | `boolean \| undefined` | — | Высота панели по контенту (только при `position: "top" \| "bottom"`). <br/> При `position: "left" \| "right"` не используется — поведение и ширина задаются только `width` (`'s' \| 'm' \| 'l'` или число/строка). |
| `nestedDrawer` | `DrawerCustomProps` | — | Вложенный Drawer |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `push` | `boolean \| PushConfig \| undefined` | — | Смещение при открытии "вложенного" компонента |
| `rootClassName` | `string \| undefined` | — | CSS-класс для корневого элемента |
| `showBlackout` | `boolean \| undefined` | — | Отображение темной подложки |
| `width` | `Width` | — | Ширина (только при position: "left" \| "right") |

- `Position` = `"bottom"` \| `"left"` \| `"right"` \| `"top"`

- `Width` = `"l"` \| `"m"` \| `"s"`
