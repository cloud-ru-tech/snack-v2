# ModalPredefined

`@ds/uikit-product-modal-predefined` — Product preset-компоненты для delete, recall и release notes сценариев на базе Modal и BottomSheet.

Пакет `@ds/uikit-product-modal-predefined` предоставляет готовые product-сценарии поверх `@ds/modal` и `@ds/bottom-sheet`.

- **DeleteModal** — удаление объекта с опциональным подтверждением через ввод текста.
- **RecallModal** — отзыв действия с тем же Figma-first `confirmable` состоянием.
- **ReleaseNotesModal** — desktop release notes surface с состояниями `data`, `noData`, `error`.
- **ReleaseNotesBottomSheet** — mobile release notes surface по макету `releaseNotesBottomSheet`.

## Установка

```bash
pnpm add @ds/uikit-product-modal-predefined
```

```ts
import {
  DeleteModal,
  RecallModal,
  ReleaseNotesModal,
  ReleaseNotesBottomSheet,
} from '@ds/uikit-product-modal-predefined'
```

## Figma

Источник: `Product UI Kit (variables)`, root node `3179:1987`.

Пакет следует Figma-first API: `confirmable` и `contentState` являются публичными визуальными осями. Legacy `@cloud-ru/uikit-product-modal-predefined` используется как источник поведения, но новый пакет не является drop-in заменой legacy API.

## DeleteModal

Preset-модалка удаления с Figma-first состоянием confirmable.

`DeleteModal` — готовый сценарий удаления объекта. Для варианта из макета `deleteModalConfirmable` используйте `confirmable` и `confirmText`.

### Примеры использования

#### Базовое удаление

```tsx
import { DeleteModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function DeleteBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open delete modal
      </button>
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        objectType='виртуальную машину'
        onDelete={close => close()}
      />
    </>
  );
}
```

#### Удаление с подтверждением

```tsx
import { DeleteModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function DeleteConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open confirmable delete modal
      </button>
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        objectType='виртуальную машину'
        confirmable
        confirmText='vm-production-01'
        onDelete={close => close()}
      />
    </>
  );
}
```

### Props

**DeleteModalProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `confirmText` | `string` | — | Текст, который нужно ввести для подтверждения |
| `confirmTextVariant` | `"name"` \| `"text"` | `name` | Тип текста подтверждения |
| `confirmable` | `boolean` | `false` | Состояние с подтверждением через ввод текста |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`. <br/> Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| `data-test-id` | `string` | — |  |
| `deleting` | `boolean` | — | Состояние загрузки кнопки удаления |
| `description` | `ReactNode` | — | Описание |
| `hideConfirmCopyButton` | `boolean` | — | Скрыть кнопку копирования текста подтверждения |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `MODE.Regular` | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc. <br/> blur подложки — только у Aggressive и Forced. |
| `objectType` | `string` | — | Тип удаляемого объекта, отображается в заголовке |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onDelete` | `(onClose: () => void) => void` | — | Колбэк подтверждения удаления |
| `open` | `boolean` | — | Управление состоянием показан/не показан |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `titleTooltip` | `ReactNode` | — | Подсказка рядом с заголовком |

##### Related types

- `ConfirmTextVariant` = `"name"` \| `"text"`

## RecallModal

Preset-модалка отзыва действия с опциональным confirmable состоянием.

`RecallModal` — готовый сценарий отзыва действия. Визуальная ось `confirmable` соответствует макету `recallModalConfirmable`.

### Примеры использования

#### Базовый отзыв

```tsx
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open recall modal
      </button>
      <RecallModal open={open} onClose={() => setOpen(false)} onRecall={close => close()} />
    </>
  );
}
```

#### Отзыв с подтверждением

```tsx
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open confirmable recall modal
      </button>
      <RecallModal
        open={open}
        onClose={() => setOpen(false)}
        confirmable
        confirmText='recall-operation-01'
        onRecall={close => close()}
      />
    </>
  );
}
```

### Props

**RecallModalProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `confirmText` | `string` | — | Текст, который нужно ввести для подтверждения |
| `confirmable` | `boolean` | `false` | Состояние с подтверждением через ввод текста |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`. <br/> Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| `data-test-id` | `string` | — |  |
| `description` | `ReactNode` | — | Описание |
| `hideConfirmCopyButton` | `boolean` | — | Скрыть кнопку копирования текста подтверждения |
| `loading` | `boolean` | — | Состояние загрузки кнопки отзыва |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `MODE.Regular` | Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc. <br/> blur подложки — только у Aggressive и Forced. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onRecall` | `(onClose: () => void) => void` | — | Колбэк подтверждения отзыва |
| `open` | `boolean` | — | Управление состоянием показан/не показан |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `titleTooltip` | `ReactNode` | — | Подсказка рядом с заголовком |

## ReleaseNotesModal

Desktop release notes preset с состояниями data, noData и error.

`ReleaseNotesModal` — desktop surface для release notes. Публичная визуальная ось `contentState` принимает `data`, `noData`, `error`.

### Примеры использования

#### Данные

```tsx
import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open release notes
      </button>
      <ReleaseNotesModal open={open} onClose={() => setOpen(false)} items={releaseNotesItems} />
    </>
  );
}
```

#### Нет данных

```tsx
import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesNoData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open no-data release notes
      </button>
      <ReleaseNotesModal open={open} onClose={() => setOpen(false)} contentState='noData' items={releaseNotesItems} />
    </>
  );
}
```

#### Ошибка загрузки

```tsx
import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesError() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open error release notes
      </button>
      <ReleaseNotesModal
        open={open}
        onClose={() => setOpen(false)}
        contentState='error'
        items={releaseNotesItems}
        onDataErrorRetryClick={() => undefined}
      />
    </>
  );
}
```

#### Видео в новости

```tsx
import { ReleaseNotesModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open video release notes
      </button>
      <ReleaseNotesModal
        open={open}
        onClose={() => setOpen(false)}
        items={[
          {
            ...releaseNotesItems[0],
            video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
        ]}
      />
    </>
  );
}
```

### Props

**ReleaseNotesModalProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `container` | `ModalContainer` | — | Явный DOM-контейнер для `createPortal`. <br/> Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`. |
| `contentState` | `"data"` \| `"error"` \| `"noData"` | `data` | Визуальное состояние контента по Figma |
| `data-test-id` | `string` | — |  |
| `items` | `NoteItemProps` | — | Массив новостей |
| `loading` | `boolean` | — | Состояние загрузки контента |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onDataErrorRetryClick` | `(() => void)` | — | Действие перезагрузки на экране ошибки |
| `onReadLaterClick` | `(() => void)` | — | Действие "Ознакомиться позже" |
| `onSlideChange` | `((slide: number) => void)` | — | Действие при смене слайда |
| `open` | `boolean` | — | Управление состоянием показан/не показан |

##### Related types

**NoteItemProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | — | Описание новости в markdown |
| `image` | `{ src: string; alt: string; }` | — | Иллюстрация |
| `title` | `string` | — | Заголовок новости |
| `video` | `string \| undefined` | — | Видео вместо статичной иллюстрации |

- `ReleaseNotesContentState` = `"data"` \| `"error"` \| `"noData"`

## ReleaseNotesBottomSheet

Mobile release notes preset на базе BottomSheet.

`ReleaseNotesBottomSheet` — mobile surface для release notes по макету `releaseNotesBottomSheet`. API совпадает с `ReleaseNotesModal` по данным и состояниям контента.

### Примеры использования

#### Mobile release notes

```tsx
import { ReleaseNotesBottomSheet as ReleaseNotesBottomSheetComponent } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesData';

export function ReleaseNotesBottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open release notes bottom sheet
      </button>
      <ReleaseNotesBottomSheetComponent open={open} onClose={() => setOpen(false)} items={releaseNotesItems} />
    </>
  );
}
```

### Props

**ReleaseNotesBottomSheetProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnPopstate` | `boolean` | `true` | Закрывать sheet при `popstate` (browser-back на mobile). |
| `container` | `string \| HTMLElement` | — | Контейнер для портала. По дефолту — `body` либо контекст-провайдер `@ds/portal-context`. |
| `contentState` | `"data"` \| `"error"` \| `"noData"` | `data` | Визуальное состояние контента по Figma |
| `data-test-id` | `string` | — |  |
| `items` | `NoteItemProps` | — | Массив новостей |
| `loading` | `boolean` | — | Состояние загрузки контента |
| `onClose` | `(() => void) & (() => void)` | — | Колбэк закрытия (вызывается при click outside, Esc, swipe-down, browser-back). <br/> Колбэк закрытия |
| `onDataErrorRetryClick` | `(() => void)` | — | Действие перезагрузки на экране ошибки |
| `onReadLaterClick` | `(() => void)` | — | Действие "Ознакомиться позже" |
| `onSlideChange` | `((slide: number) => void)` | — | Действие при смене слайда |
| `open` | `boolean` | — | Управление состоянием показан / не показан. <br/> Управление состоянием показан/не показан |
| `readLaterButtonProps` | `ButtonProps` | — | Дополнительные пропсы action-кнопки "Ознакомиться позже" |

##### Related types

**NoteItemProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | — | Описание новости в markdown |
| `image` | `{ src: string; alt: string; }` | — | Иллюстрация |
| `title` | `string` | — | Заголовок новости |
| `video` | `string \| undefined` | — | Видео вместо статичной иллюстрации |

- `ReleaseNotesContentState` = `"data"` \| `"error"` \| `"noData"`
