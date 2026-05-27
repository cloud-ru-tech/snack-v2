# Attachment

`@ds/attachment` — Пакет компонентов для отображения прикреплённых файлов — Attachment (горизонтальный) и AttachmentSquare (квадратный).

Пакет `@ds/attachment` предоставляет два компонента для отображения прикреплённых файлов:

- ****Attachment**** — горизонтальный список-айтем с иконкой/превью, заголовком, описанием и actions.
- ****AttachmentSquare**** — квадратный тайл с hover-оверлеем; удобен для галерей превью.

Оба используют общие токены `s` / `m`, поддерживают `loading`/`error`/`disabled`/`checked` (множественный выбор) и автоматически показывают image-превью, если `file` — изображение.

## Когда использовать

- В списках прикреплённых файлов с возможностью скачать/удалить — `Attachment`.
- В галереях превью со state `hovered`-overlay — `AttachmentSquare`.

Когда **не** нужен пакет: для drag&drop-загрузки — `Dropzone`; для одиночных preview-карточек без actions — `Card`.

## Анатомия

Оба компонента строятся вокруг трёх слотов: превью (иконка или image из `file`), текстовый блок (заголовок + описание / сообщение об ошибке), панель actions (`download` / `delete`, или `retry` при error).

## Установка

```bash
pnpm add @ds/attachment
```

```ts
import { Attachment, AttachmentSquare } from '@ds/attachment'
```

## Attachment

Горизонтальный айтем прикреплённого файла с превью/иконкой, заголовком, описанием, ошибкой и actions (download/delete/retry).

Горизонтальный айтем прикреплённого файла. Слева — иконка типа файла или превью (если `file` — изображение), в середине — заголовок и описание (или сообщение об ошибке), справа — actions (`download` / `delete`, или `retry` в состоянии ошибки).

### Когда использовать

- В списках прикреплённых файлов с возможностью скачать/удалить.
- Когда у вас есть `File`-объект — заголовок и расширение проставляются автоматически.

Когда **не** нужен `Attachment`:

- Для галерей превью — используйте `AttachmentSquare`.
- Для drag&drop загрузки — используйте `Dropzone`.

### Анатомия

#### Size (default `s`)

- `s` — компактная строка, высота 48px (emblem 32 + 2×8 padding).
- `m` — увеличенная строка, высота 56px (emblem 40 + 2×8 padding).

Высота строки content-driven: задаётся размером emblem'а и вертикальным padding'ом Card-корня (8px фиксированно). Токены `attachment.anatomy.size.*.container.height` относятся к [`AttachmentSquare`](./attachment-square.mdx), а не к строке.

#### State

Состояния выражаются через смежные пропы (а не через одну ось):

- `loading` — спиннер вместо иконки, actions скрыты.
- `disabled` — карточка не реагирует на клик; actions всё равно доступны если passed `onDelete`/`onDownload`.
- `error` — показывается ошибочное сообщение, action `retry` заменяет `download`; фон карточки переключается на `red/background`.
- `checked` — accent-border `primary/accent` + accent-state-layer (`activated/default/filled`, на hover — `activated/hovered/filled`) поверх фона + check-badge в левом верхнем углу.

Внутри использует `Card` с `view='outline'`; реакция на курсор (`cursor: pointer`, focus-ring) подключается только если задан `onClick`.

### Примеры использования

#### Базовый Attachment

File с автозаголовком и onDownload

```tsx
import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef } from 'react';

import { PDF_FILE } from './sample';

export function BasicAttachment() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment file={PDF_FILE} onDownload={file => console.info('download', file?.name)} />
      </div>
    </PortalContextProvider>
  );
}
```

#### С изображением

Превью автоматически из image-файла через useImage

```tsx
import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useEffect, useRef, useState } from 'react';

import pictureUrl from './picture.jpg';

export function AttachmentWithImage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    fetch(pictureUrl.src)
      .then(r => r.blob())
      .then(blob => setFile(new File([blob], 'picture.jpg', { type: 'image/jpg' })));
  }, []);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment
          file={file}
          title='Скриншот'
          description='JPG'
          onDownload={f => console.info('download', f?.name)}
          onDelete={f => console.info('delete', f?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}
```

#### Loading

Спиннер вместо иконки, actions скрыты

```tsx
import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentLoading() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment file={PDF_FILE} loading />
      </div>
    </PortalContextProvider>
  );
}
```

#### Ошибка с retry

error заменяет description; retry button заменяет download

```tsx
import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentError() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [retries, setRetries] = useState(0);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment
          file={PDF_FILE}
          error={`Не удалось загрузить (попыток: ${retries})`}
          onRetry={() => setRetries(n => n + 1)}
          onDelete={file => console.info('delete', file?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}
```

#### Выбираемый (controlled)

checked + onClick — типичный паттерн multiSelect

```tsx
import { Attachment } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef, useState } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentSelectable() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(false);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <Attachment
          file={PDF_FILE}
          checked={checked}
          onClick={() => setChecked(v => !v)}
          onDelete={file => console.info('delete', file?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}
```

### Props

**AttachmentProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Состояние «выбран» (множественный выбор) |
| `className` | `string` | — | CSS-класс корня |
| `data-test-id` | `string` | — |  |
| `description` | `string` | `fileExtension` | Описание |
| `disabled` | `boolean` | — | Заблокировано |
| `error` | `string` | — | Сообщение об ошибке |
| `file` | `File` | — | Файл |
| `icon` | `IconPredefinedProps` | — | Иконка для файла <br/> @defaultIcon FileSVG |
| `loading` | `boolean` | — | Управление состоянием загрузки |
| `onClick` | `((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)` | — | Клик по карточке |
| `onDelete` | `((file?: File) => void)` | — | Колбек на клик по кнопке удаления |
| `onDownload` | `((file?: File) => void)` | — | Колбек на клик по кнопке скачивания |
| `onRetry` | `(() => void)` | — | Колбек на клик по кнопке повторения |
| `size` | `"m"` \| `"s"` | `s` | Размер |
| `title` | `string` | `fileName` | Заголовок |
| `truncate` | `{ title?: number; description?: number; error?: number \| undefined; } \| undefined` | — |  |
| `truncateVariant` | `"end"` \| `"middle"` | — | Вариант обрезания строки: <br/> <br> - `end` — с конца; <br/> <br> - `middle` — по середине |

##### Related types

- `Size` = `"m"` \| `"s"`

## AttachmentSquare

Квадратный тайл прикреплённого файла с hover-оверлеем — для галерей превью и компактных списков.

Квадратный тайл прикреплённого файла. По умолчанию показывает превью или иконку; при hover (или фокусе на actions) поверх появляется overlay с заголовком/описанием и actions.

### Когда использовать

- В галереях превью и сетках, где у файлов есть визуальный смысл.
- Когда важна плотность — `s` (80×80) и `m` (100×100).

### Анатомия

#### Size (default `s`)

- `s` — 80×80.
- `m` — 100×100.

#### Hover-overlay

При hover и при фокусе на любой action-кнопке (`download`/`delete`/`retry`) над основным контентом появляется overlay с заголовком/описанием и actions. В **image-mode** overlay плотный (solid `neutral/background1Level`) и перекрывает превью; в **icon-mode** — прозрачный, текст MainContent проступает сквозь, а Actions подменяют слот иконки. Состояние «фокус удерживает overlay» реализовано через внутренний контекст `AttachmentFocusActionsContext`.

#### State

- `loading` — спиннер вместо превью, actions скрыты, hover-overlay отключён.
- `disabled` — карточка не реагирует на клик, opacity снижается до `effect/opacity/disabled`.
- `error` — фон тайла переключается на `red/background`, action `retry` заменяет `download`; в error-режиме overlay прозрачный, чтобы красная заливка пропускалась.
- `checked` — accent-border + собственный `checkedOverlay` поверх MainContent с токенами `activated/default/filled` → `activated/hovered/filled` (Card-овский state-layer закрыт full-bleed image, поэтому overlay рендерится отдельным слоем). Check-badge в верхнем левом углу.

### Примеры использования

#### Базовый

Файл с иконкой и кнопками

```tsx
import { AttachmentSquare } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useRef } from 'react';

import { PDF_FILE } from './sample';

export function AttachmentSquareBasic() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <AttachmentSquare
          file={PDF_FILE}
          onDownload={file => console.info('download', file?.name)}
          onDelete={file => console.info('delete', file?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}
```

#### С изображением (size m)

Превью автоматически из image-файла

```tsx
import { AttachmentSquare } from '@ds/attachment';
import { PortalContextProvider } from '@ds/portal-context';
import { useEffect, useRef, useState } from 'react';

import pictureUrl from './picture.jpg';

export function AttachmentSquareImage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    fetch(pictureUrl.src)
      .then(r => r.blob())
      .then(blob => setFile(new File([blob], 'picture.jpg', { type: 'image/jpg' })));
  }, []);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <AttachmentSquare
          size='m'
          file={file}
          onDownload={f => console.info('download', f?.name)}
          onDelete={f => console.info('delete', f?.name)}
        />
      </div>
    </PortalContextProvider>
  );
}
```

### Props

**AttachmentSquareProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Состояние «выбран» (множественный выбор) |
| `className` | `string` | — | CSS-класс корня |
| `data-test-id` | `string` | — |  |
| `description` | `string` | `fileExtension` | Описание |
| `disabled` | `boolean` | — | Заблокировано |
| `error` | `string` | — | Сообщение об ошибке |
| `file` | `File` | — | Файл |
| `icon` | `IconPredefinedProps` | — | Иконка для файла <br/> @defaultIcon FileSVG |
| `loading` | `boolean` | — | Управление состоянием загрузки |
| `onClick` | `((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)` | — | Клик по карточке |
| `onDelete` | `((file?: File) => void)` | — | Колбек на клик по кнопке удаления |
| `onDownload` | `((file?: File) => void)` | — | Колбек на клик по кнопке скачивания |
| `onRetry` | `(() => void)` | — | Колбек на клик по кнопке повторения |
| `size` | `"m"` \| `"s"` | `s` | Размер |
| `title` | `string` | `fileName` | Заголовок |
| `truncateVariant` | `"end"` \| `"middle"` | — | Вариант обрезания строки: <br/> <br> - `end` — с конца; <br/> <br> - `middle` — по середине |

##### Related types

- `Size` = `"m"` \| `"s"`
