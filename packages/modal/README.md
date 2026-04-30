# Modal

`@ds/modal` — Пакет модальных окон — компоненты Modal и ModalCustom с едиными токенами ширины и режимов закрытия.

Пакет `@ds/modal` предоставляет два компонента для блокирующих диалогов: готовую сборку `Modal` с пресетной шапкой, телом и футером и низкоуровневый `ModalCustom` для ручной композиции.

- ****Modal**** — готовое модальное окно с шапкой, прокручиваемым телом и опциональным футером. Покрывает 90% сценариев.
- ****ModalCustom**** — низкоуровневая версия без предопределённой структуры: собирайте из `ModalCustom.Header`, `.Body`, `.Footer` или собственной разметки.

## Установка

```bash
pnpm add @ds/modal
```

```ts
import { Modal, ModalCustom, MODE, WIDTH } from '@ds/modal'
```

## Смотри также

- **Drawer** — боковая/нижняя панель для форм и фильтров.
- **Popover** — всплывающий слой рядом с триггером.

## Modal

Центрированное модальное окно с пресетной шапкой, телом и футером.

Модальное окно для подтверждений, форм и важных сообщений. `Modal` собирает шапку (медиа, заголовок, подзаголовок, back-button, слот после заголовка), прокручиваемое тело и опциональный футер. Для ручной композиции — [`ModalCustom`](./modal-custom).

### Когда использовать
- Критическое подтверждение, блокирующее остальной интерфейс (удалить, отправить, выйти).
- Короткая форма, которая прерывает основной поток и требует завершения.
- Важное сообщение или онбординг, которое нужно явно закрыть.

Когда **не** нужен: всплывающий поповер рядом с элементом (берите `Popover`), боковая панель или drawer для сложных форм, тост-уведомления (не блокируют UI).

### Анатомия

#### Width
Три ширины: `s` — короткие подтверждения, `m` — дефолт для форм и сообщений, `l` — сложные формы и контент-окна.

#### Mode
`regular` — обычный диалог, закрывается overlay/Esc/крестиком; `aggressive` — требует явного действия, overlay-click заблокирован; `forced` — полностью блокирующий, без способов закрыть кроме явной кнопки действия (критичные подтверждения).

### Установка
```bash
pnpm add @ds/modal
```

```ts
import { Modal, MODE, WIDTH } from '@ds/modal'
```

### Примеры использования
#### Базовое использование

Контролируемое open/onClose, footer из `ButtonGroup`.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function Basic() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Открыть' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={close}
          title='Заголовок'
          subtitle='Короткое пояснение действия'
          content='Основной контент тела модалки. Сюда помещается форма, предупреждение или подробный текст.'
          footer={
            <ButtonGroup
              primaryAction={{ label: 'Продолжить', view: 'filled', onClick: close }}
              secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
            />
          }
        />
      </div>
    </PortalContextProvider>
  );
}
```

#### С критичным действием

Critical primary, neutral outline secondary.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function WithFooter() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Удалить…' appearance='critical' view='outline' onClick={() => setOpen(true)} />
        <Modal
          open={open}
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
      </div>
    </PortalContextProvider>
  );
}
```

#### Состояние загрузки

`loading` прячет футер и показывает спиннер в теле.

```tsx
import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function Loading() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Запустить сохранение' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title='Сохранение изменений'
          subtitle='Пожалуйста, подождите'
          content='Основной контент'
          loading
        />
      </div>
    </PortalContextProvider>
  );
}
```

#### Forced — без кнопки закрытия

Закрытие только через действие в футере.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Modal, MODE } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function Forced() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Принять условия' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={close}
          mode={MODE.Forced}
          title='Требуется действие'
          subtitle='Без кнопки закрытия и Esc — закрыть можно только через футер.'
          content='Закрытие по клику по overlay и по Escape отключено.'
          footer={
            <ButtonGroup
              primaryAction={{ label: 'Принять', view: 'filled', onClick: close }}
              secondaryAction={{ label: 'Отклонить', appearance: 'neutral', view: 'outline', onClick: close }}
            />
          }
        />
      </div>
    </PortalContextProvider>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс для окна |
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`.
Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| `content` | `ReactNode` | — | Основной контент |
| `data-test-id` | `string` | — |  |
| `footer` | `ReactNode` | — | Контент футера |
| `heightAuto` | `boolean` | `true` | Растягивать по высоте в пределах контейнера |
| `loading` | `boolean` | `false` | Состояние загрузки: в теле показывается спиннер или `loadingState`, футер скрыт |
| `loadingState` | `ReactNode` | — | Контент тела вместо спиннера при `loading` |
| `media` | `ReactNode` | — | Медиа-контент |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `regular` | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc.
blur подложки — только у Aggressive и Forced. |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке «назад». Отсутствие скрывает кнопку |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | `false` | Управление состоянием показан/не показан |
| `rootClassName` | `string` | — | CSS-класс корневого слоя портала |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; subtitle?: number; } | undefined` | `title: 1; subtitle (string): 2` | Максимальное число строк перед обрезкой (`TruncateString`).
Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется. |
| `width` | `"l"` \| `"m"` \| `"s"` | `s` | Размер окна |

## ModalCustom

Низкоуровневая сборка Modal — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`ModalCustom` — низкоуровневая версия `Modal`, которая не диктует структуру содержимого. Вы сами компонуете шапку, тело и футер из субкомпонентов `ModalCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Используйте `ModalCustom`, когда стандартной шапки из `Modal` недостаточно — например, нужна своя раскладка заголовка с несколькими действиями, кастомный футер с группами кнопок или нестандартный порядок секций.

### Когда использовать

- Стандартная шапка / футер из `Modal` не подходят — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одного окна.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `Modal` — он дешевле в поддержке и даёт консистентные отступы.

### Установка

```bash
pnpm add @ds/modal
```

```ts
import { ModalCustom } from '@ds/modal'
```

### Примеры использования

#### Ручная композиция

Header + Body + Footer собираются вручную.

```tsx
import { Button } from '@ds/button';
import { ModalCustom } from '@ds/modal';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

export function CustomComposition() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ position: 'relative', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <Button label='Открыть' appearance='primary' view='filled' onClick={() => setOpen(true)} />
        <ModalCustom open={open} onClose={close} width='m'>
          <ModalCustom.Header title='Ручная композиция' subtitle='Header, Body и Footer собираются вручную.' />
          <ModalCustom.Body
            content={
              <div style={{ padding: 24 }}>
                <p>В теле может быть любая разметка — скролл включается автоматически.</p>
                <p>Это нужно, когда пресетной структуры Modal недостаточно.</p>
              </div>
            }
          />
          <ModalCustom.Footer>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button label='Закрыть' appearance='neutral' view='outline' onClick={close} />
              <Button label='Подтвердить' appearance='primary' view='filled' onClick={close} />
            </div>
          </ModalCustom.Footer>
        </ModalCustom>
      </div>
    </PortalContextProvider>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Содержимое окна (композиция Header/Body/Footer) |
| `className` | `string` | — | CSS-класс окна |
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`.
Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| `data-test-id` | `string` | — |  |
| `heightAuto` | `boolean` | `true` | Растягивать по высоте в пределах контейнера |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `regular` | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc.
blur подложки — только у Aggressive и Forced. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | `false` | Управление состоянием показан/не показан |
| `rootClassName` | `string` | — | CSS-класс корневого слоя портала |
| `width` | `"l"` \| `"m"` \| `"s"` | `s` | Размер окна |

## Body

```tsx
import { Body } from '@ds/modal'

export function Example() {
  return <Body>Click me</Body>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс для обёртки body |
| `content` | `ReactNode` | — | Основной контент |
| `data-test-id` | `string` | — |  |

## ButtonClose

```tsx
import { ButtonClose } from '@ds/modal'

export function Example() {
  return <ButtonClose>Click me</ButtonClose>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `onClick` | `() => void` | — | Действие при клике |

## Footer

```tsx
import { Footer } from '@ds/modal'

export function Example() {
  return <Footer>Click me</Footer>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |

## Header

```tsx
import { Header } from '@ds/modal'

export function Example() {
  return <Header truncate="title: 1; subtitle (string): 2">Click me</Header>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке «назад». Отсутствие скрывает кнопку |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `title` | `string` | — | Заголовок |
| `titleId` | `string` | — | id для aria-labelledby |
| `truncate` | `{ title?: number; subtitle?: number; } | undefined` | `title: 1; subtitle (string): 2` | Максимальное число строк перед обрезкой (`TruncateString`).
Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется. |

## ModalCustom.Body

```tsx
import { ModalCustom.Body } from '@ds/modal'

export function Example() {
  return <ModalCustom.Body>Click me</ModalCustom.Body>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс для обёртки body |
| `content` | `ReactNode` | — | Основной контент |
| `data-test-id` | `string` | — |  |

## ModalCustom.Footer

```tsx
import { ModalCustom.Footer } from '@ds/modal'

export function Example() {
  return <ModalCustom.Footer>Click me</ModalCustom.Footer>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |

## ModalCustom.Header

```tsx
import { ModalCustom.Header } from '@ds/modal'

export function Example() {
  return <ModalCustom.Header truncate="title: 1; subtitle (string): 2">Click me</ModalCustom.Header>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке «назад». Отсутствие скрывает кнопку |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `title` | `string` | — | Заголовок |
| `titleId` | `string` | — | id для aria-labelledby |
| `truncate` | `{ title?: number; subtitle?: number; } | undefined` | `title: 1; subtitle (string): 2` | Максимальное число строк перед обрезкой (`TruncateString`).
Для `subtitle` типа `string` — по умолчанию 2 строки; для произвольного `ReactNode` не применяется. |
