# ModalPredefined

`@ds/uikit-product-modal-predefined` — Product preset-компоненты для delete, recall и release notes сценариев на базе Modal и BottomSheet.

Пакет `@ds/uikit-product-modal-predefined` предоставляет готовые product-сценарии поверх `@ds/modal` и `@ds/bottom-sheet`.

- **DeleteModal** — удаление объекта с опциональным подтверждением через ввод текста.
- **RecallModal** — отзыв действия с тем же Figma-first `confirmable` состоянием.
- **ReleaseNotes** — адаптивный release notes: модальное окно на desktop, bottom sheet на mobile; состояния `data`, `noData`, `error`.

## Установка

```bash
pnpm add @ds/uikit-product-modal-predefined
```

```ts
import { DeleteModal, RecallModal, ReleaseNotes } from '@ds/uikit-product-modal-predefined'
```

## Figma

Источник: `Product UI Kit (variables)`, root node `3179:1987`.

Пакет следует Figma-first API: `confirmable` и `contentState` являются публичными визуальными осями. Legacy `@cloud-ru/uikit-product-modal-predefined` используется как источник поведения, но новый пакет не является drop-in заменой legacy API.

## DeleteModal

Готовое модальное окно удаления с Figma-first состоянием confirmable.

`DeleteModal` — готовый сценарий удаления объекта. Для варианта из макета `deleteModalConfirmable` используйте `confirmable` и `confirmText`.

### Примеры использования

#### Базовое удаление

```tsx
import { Button } from '@ds/button';
import { DeleteModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function DeleteBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open delete modal' view='filled' appearance='primary' onClick={() => setOpen(true)} />
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
import { Button } from '@ds/button';
import { DeleteModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function DeleteConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open confirmable delete modal' view='filled' appearance='primary' onClick={() => setOpen(true)} />
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
| `content` | `ReactNode` | — | Основной текст модалки |
| `data-test-id` | `string` | — |  |
| `deleting` | `boolean` | — | Состояние загрузки кнопки удаления |
| `hideConfirmCopyButton` | `boolean` | — | Скрыть кнопку копирования текста подтверждения |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `MODE.Regular` | Режим закрытия: Regular — overlay/Esc/кнопка; Aggressive — только кнопка; Forced — без кнопки и overlay/Esc. |
| `objectType` | `string` | — | Тип удаляемого объекта, отображается в заголовке |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onDelete` | `(onClose: () => void) => void` | — | Колбэк подтверждения удаления |
| `open` | `boolean` | — | Управление состоянием показан/не показан |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `titleTooltip` | `ReactNode` | — | Подсказка рядом с заголовком |

##### Related types

- `ConfirmTextVariant` = `"name"` \| `"text"`

## RecallModal

Готовое модальное окно отзыва действия с опциональным confirmable состоянием.

`RecallModal` — готовый сценарий отзыва действия. Визуальная ось `confirmable` соответствует макету `recallModalConfirmable`.

### Примеры использования

#### Базовый отзыв

```tsx
import { Button } from '@ds/button';
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open recall modal' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <RecallModal open={open} onClose={() => setOpen(false)} onRecall={close => close()} />
    </>
  );
}
```

#### Отзыв с подтверждением

```tsx
import { Button } from '@ds/button';
import { RecallModal } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

export function RecallConfirmable() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open confirmable recall modal' view='filled' appearance='primary' onClick={() => setOpen(true)} />
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
| `content` | `ReactNode` | — | Основной текст модалки |
| `data-test-id` | `string` | — |  |
| `hideConfirmCopyButton` | `boolean` | — | Скрыть кнопку копирования текста подтверждения |
| `loading` | `boolean` | — | Состояние загрузки кнопки отзыва |
| `mode` | `"aggressive"` \| `"forced"` \| `"regular"` | `MODE.Regular` | Режим закрытия: Regular — overlay/Esc/кнопка; Aggressive — только кнопка; Forced — без кнопки и overlay/Esc. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onRecall` | `(onClose: () => void) => void` | — | Колбэк подтверждения отзыва |
| `open` | `boolean` | — | Управление состоянием показан/не показан |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `titleTooltip` | `ReactNode` | — | Подсказка рядом с заголовком |

## ReleaseNotes

Адаптивный release notes preset — модальное окно на desktop, bottom sheet на mobile.

`ReleaseNotes` — адаптивный preset для показа новостей платформы. На desktop это модальное окно, на mobile — bottom sheet; поверхность выбирается автоматически по раскладке. Публичная визуальная ось `contentState` принимает `data`, `noData`, `error`.

### Примеры использования

#### Данные

```tsx
import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes open={open} onClose={() => setOpen(false)} items={releaseNotesItems} />
    </>
  );
}
```

#### Нет данных

```tsx
import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesNoData() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open no-data release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes open={open} onClose={() => setOpen(false)} contentState='noData' items={releaseNotesItems} />
    </>
  );
}
```

#### Ошибка загрузки

```tsx
import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesError() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open error release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes
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
import { Button } from '@ds/button';
import { ReleaseNotes } from '@ds/uikit-product-modal-predefined';
import { useState } from 'react';

import { releaseNotesItems } from './releaseNotesItems';

export function ReleaseNotesVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open video release notes' view='filled' appearance='primary' onClick={() => setOpen(true)} />
      <ReleaseNotes
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

**ReleaseNotesProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnPopstate` | `boolean` | — | Закрытие при навигации по истории |
| `contentState` | `"data"` \| `"error"` \| `"noData"` | — | Визуальное состояние контента по Figma |
| `data-test-id` | `string` | — |  |
| `items` | `NoteItemProps` | — | Массив новостей |
| `loading` | `boolean` | — | Состояние загрузки контента |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onDataErrorRetryClick` | `(() => void)` | — | Действие перезагрузки на экране ошибки |
| `onReadLaterClick` | `(() => void)` | — | Действие "Ознакомиться позже" |
| `onSlideChange` | `((slide: number) => void)` | — | Действие при смене слайда |
| `open` | `boolean` | — | Управление состоянием показан/не показан |
| `readLaterButtonProps` | `ButtonProps` | — | Только mobile: дополнительные пропсы action-кнопки "Ознакомиться позже" (на desktop игнорируется). |

##### Related types

**NoteItemProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | — | Описание новости в markdown |
| `image` | `{ src: string; alt: string; }` | — | Иллюстрация |
| `title` | `string` | — | Заголовок новости |
| `video` | `string \| undefined` | — | Видео вместо статичной иллюстрации |

- `ReleaseNotesContentState` = `"data"` \| `"error"` \| `"noData"`

### Адаптивность

`ReleaseNotes` — адаптивный компонент с переключением поверхности (surface-swap). Раскладку он берёт из `AdaptiveProvider` (контекст `@ds/adaptive`); публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — модальное окно (`ModalCustom` из `@ds/modal`) с каруселью новостей и постраничной навигацией.
- **mobile** — контент рендерится в `BottomSheet` из `@ds/bottom-sheet` (панель снизу со свайпом для закрытия).

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поверхность включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

#### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <ReleaseNotes open={open} onClose={close} items={items} />
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { ReleaseNotes } from '@ds/uikit-product-modal-predefined'

  const MobileReleaseNotes = withLayoutType(ReleaseNotes, 'mobile')
  ```

#### Платформенные пропы

Таблица синхронизирована с type-level JSDoc у `ReleaseNotesProps`.

| Пропы | desktop | mobile |
|-------|---------|--------|
| `readLaterButtonProps` | игнорируется | используется |
| `open`, `onClose`, `container`, `closeOnPopstate`, `contentState`, `items`, `loading`, `onReadLaterClick`, `onDataErrorRetryClick`, `onSlideChange` | используется | используется |

Подробнее о модели адаптивности — **Adaptive**.
