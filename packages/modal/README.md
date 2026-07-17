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

### Примеры использования
#### Базовое использование

Контролируемое open/onClose, footer из `ButtonGroup`.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { useState } from 'react';

export function Basic() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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
    </>
  );
}
```

#### С критичным действием

Critical primary, neutral outline secondary.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Modal } from '@ds/modal';
import { useState } from 'react';

export function WithFooter() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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
    </>
  );
}
```

#### Состояние загрузки

`loading` прячет футер и показывает спиннер в теле.

```tsx
import { Button } from '@ds/button';
import { Modal } from '@ds/modal';
import { useState } from 'react';

export function Loading() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Запустить сохранение' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title='Сохранение изменений'
        subtitle='Пожалуйста, подождите'
        content='Основной контент'
        loading
      />
    </>
  );
}
```

#### Forced — без кнопки закрытия

Закрытие только через действие в футере.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Modal, MODE } from '@ds/modal';
import { useState } from 'react';

export function Forced() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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
    </>
  );
}
```

### Props

**ModalProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `additionalButton` | `BottomSheetActionButton` | — | Дополнительная (третья) кнопка — пропсы `Button` (дефолт `view='simple'`, `appearance='neutral'`). |
| `approveButton` | `BottomSheetActionButton` | — | Основная кнопка действия — пропсы `Button` (дефолт `view='filled'`, `appearance='primary'`). |
| `cancelButton` | `BottomSheetActionButton` | — | Кнопка отмены — объект пропсов `Button` (по умолчанию `view='outline'`, `appearance='neutral'`). |
| `className` | `string` | — | CSS-класс для окна |
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`; иначе `usePortalContext()` или `document.body`. |
| `content` | `ReactNode` | — | Содержимое body (альтернатива `children`). |
| `data-test-id` | `string` | — |  |
| `disclaimer` | `ReactNode` | — | Небольшой текст под кнопками футера (дисклеймер, ссылка и т.п.). |
| `footer` | `ReactNode` | — | Произвольный футер. Приоритетнее `approveButton` / `cancelButton` / `additionalButton` / `disclaimer`. |
| `footerActionsOrientation` | `"horizontal"` \| `"vertical"` | `'horizontal'` | Ориентация кнопок футера. Применяется только при двух кнопках; игнорируется при заданном `footer`. |
| `heightAuto` | `boolean` | — | Растягивать по высоте в пределах контейнера |
| `loading` | `boolean` | — | Состояние загрузки: в теле показывается спиннер или `loadingState`, футер скрыт |
| `loadingState` | `ReactNode` | — | Контент тела вместо спиннера при `loading` |
| `media` | `ReactNode` | — | Медиа-контент |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `MODE.Regular` | Режим закрытия: Regular — overlay/Esc/кнопка; Aggressive — только кнопка; Forced — без кнопки и overlay/Esc. |
| `onBackButtonClick` | `(() => void)` | — | Callback клика на back-кнопку (слева в шапке). <br/> Наличие callback'а авто-рендерит `Button view='function' icon={<ArrowLeftSVG />}`. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан |
| `rootClassName` | `string` | — | CSS-класс корневого слоя портала |
| `slotAfterTitle` | `ReactNode` | — | Slot справа от title (например, `QuestionTooltip` из `@ds/tooltip`). |
| `subtitle` | `ReactNode` | — | Slot под title-строкой во весь блок subtitleWrapper — <br/> типично `SearchBar`, `SegmentControl` или `Filter`. <br/> Подзаголовок под заголовком. |
| `title` | `ReactNode` | — | Заголовок (Typography title-l). |
| `truncate` | `{ title?: number; subtitle?: number; } \| undefined` | — | Усечение `title`/`subtitle` (TruncateString). |
| `width` | `"l"` \| `"m"` \| `"s"` | — | Размер окна |

##### Related types

- `ModalContainer` = `string | HTMLElement`

- `ModalMode` = `"aggressive"` \| `"forced"` \| `"regular"`

- `ModalWidth` = `"l"` \| `"m"` \| `"s"`

### Адаптивность

`Modal` — адаптивный компонент с переключением поверхности (surface-swap). Раскладку он берёт из `AdaptiveProvider` (контекст `@ds/adaptive`); публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — центрированное модальное окно с overlay и focus-trap.
- **mobile** — контент рендерится в `BottomSheet` из `@ds/bottom-sheet` (панель снизу со свайпом для закрытия).

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поверхность включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

#### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <Modal open={open} onClose={close} content={…} />
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { Modal } from '@ds/modal'

  const MobileModal = withLayoutType(Modal, 'mobile')
  ```

#### Платформенные пропы

Часть пропов управляет геометрией desktop-окна и на mobile молча игнорируется (у `BottomSheet` своя поверхность снизу). Таблица синхронизирована с type-level JSDoc у `ModalProps`.

| Пропы | desktop | mobile |
|-------|---------|--------|
| `mode`, `width`, `heightAuto`, `truncate` | используется | игнорируется |
| `title`, `subtitle`, `slotAfterTitle`, `onBackButtonClick`, `media`, `content`, `footer` | используется | используется |
| `loading`, `loadingState`, `open`, `onClose`, `container`, `closeOnPopstate`, `className`, `rootClassName` | используется | используется |

Подробнее о модели адаптивности — **Adaptive**.

## ModalCustom

Низкоуровневая сборка Modal — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`ModalCustom` — низкоуровневая версия `Modal`, которая не диктует структуру содержимого. Вы сами компонуете шапку, тело и футер из субкомпонентов `ModalCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Используйте `ModalCustom`, когда стандартной шапки из `Modal` недостаточно — например, нужна своя раскладка заголовка с несколькими действиями, кастомный футер с группами кнопок или нестандартный порядок секций.

### Когда использовать

- Стандартная шапка / футер из `Modal` не подходят — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одного окна.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `Modal` — он дешевле в поддержке и даёт консистентные отступы.

### Примеры использования

#### Ручная композиция

Header + Body + Footer собираются вручную.

```tsx
import { Button } from '@ds/button';
import { ModalCustom } from '@ds/modal';
import { useState } from 'react';

export function CustomComposition() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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
    </>
  );
}
```

### Props

**ModalCustomProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Содержимое окна (композиция Header/Body/Footer) |
| `className` | `string` | — | CSS-класс окна |
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`; иначе `usePortalContext()` или `document.body`. |
| `data-test-id` | `string` | — |  |
| `heightAuto` | `boolean` | — | Растягивать по высоте в пределах контейнера |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `MODE.Regular` | Режим закрытия: Regular — overlay/Esc/кнопка; Aggressive — только кнопка; Forced — без кнопки и overlay/Esc. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан |
| `rootClassName` | `string` | — | CSS-класс корневого слоя портала |
| `safeArea` | `boolean` | `true` | Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом <br/> на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop) <br/> inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный. <br/> Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch). |
| `showBackdrop` | `boolean` | `true` | Отображение тёмной подложки за sheet'ом. При `false` фон не затемняется и click-outside <br/> не закрывает sheet (нет backdrop-узла, по которому ловится клик). |
| `snapPoints` | `SnapPoint` | — | Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` — <br/> sheet `height: auto` с одним snap'ом по высоте контента. <br/> Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает <br/> до full-viewport; drag вниз ниже `0.5` ведёт к закрытию. <br/> Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на <br/> стороне потребителя): <br/> - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded; <br/> - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут <br/> одну высоту → дубль-индекс будет недостижим свайпом); <br/> - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива <br/> фиксированных позиций его «контентная» высота не определена. |
| `swipeEnabled` | `boolean` | `true` | Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point. <br/> При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом. |
| `width` | `"l"` \| `"m"` \| `"s"` | — | Размер окна |

##### Related types

- `ModalContainer` = `string | HTMLElement`

- `ModalMode` = `"aggressive"` \| `"forced"` \| `"regular"`

- `ModalWidth` = `"l"` \| `"m"` \| `"s"`
