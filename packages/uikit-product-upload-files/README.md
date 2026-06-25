# UploadFiles

`@ds/uikit-product-upload-files` — Поле загрузки файлов с drag-and-drop, валидацией по формату/размеру/количеству и кастомной функцией upload.

Поле загрузки файлов с поддержкой drag-and-drop и клика. Валидирует выбранные файлы по формату, размеру и количеству, показывает прогресс и ошибки по каждому вложению и загружает их через переданную функцию `upload`. Компонент управляет только UI и состоянием вложений — сетевой запрос остаётся за потребителем.

## Когда использовать

- Загрузка вложений в форме (договоры, изображения, отчёты) с превью и удалением.
- Когда нужна валидация формата/размера/количества файлов на клиенте до отправки.
- Когда загрузка идёт на ваш бэкенд через кастомный запрос — он передаётся в `upload`.

Когда **не** нужен:

- Для одиночного триггера-кнопки без зоны перетаскивания — используйте `FileUpload` из **@ds/dropzone**.
- Для скрытой оверлей-зоны над произвольным контентом — `HiddenDropZone` из **@ds/dropzone**.

## Анатомия

### Accept (по умолчанию — любые файлы)

`accept` — массив допустимых типов файлов. По умолчанию `[{ extention: '*' }]` — принимаются файлы любого формата без иконок и подписей. Каждый элемент описывает:

- `extention` — расширение файла (например `.pdf`, либо `*` для всех типов), попадает в нативный атрибут `accept` диалога выбора.
- `displayExtension` — человекочитаемое имя формата для подписи и текста ошибки (например `PDF`).
- `icon` — иконка вложения для файлов этого типа.

### Лимит файлов (default `3`)

`maxFiles` ограничивает количество вложений. При превышении поле показывает сводную ошибку и счётчик `текущее/максимум`.

### Размер файла (default `5 МБ`)

`maxSize` (в байтах) ограничивает размер одного файла. Файл больше лимита попадает во вложения как ошибочный, с подписью о превышении размера.

## Установка

```bash
pnpm add @ds/uikit-product-upload-files
```

```ts
import { UploadFiles } from '@ds/uikit-product-upload-files'
```

## Примеры использования

### 1. Базовое поле

Любые файлы, до 3 файлов, до 5 МБ. Загрузка через кастомную функцию upload

```tsx
import { LocaleProvider } from '@ds/locale';
import { UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';
import { useState } from 'react';

async function upload(file: File) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return { url: `https://example.com/${file.name}` };
}

export function Basic() {
  const [files, setFiles] = useState<UploadFileItem[]>([]);

  return (
    <LocaleProvider lang='ru-RU'>
      <UploadFiles label='Документы' value={files} onChange={setFiles} upload={upload} />
    </LocaleProvider>
  );
}
```

### 2. Свои форматы и лимиты

accept, maxFiles и maxSize настраивают допустимые типы и ограничения

```tsx
import { LocaleProvider } from '@ds/locale';
import { UploadFileItem, UploadFiles, UploadFilesAcceptItem } from '@ds/uikit-product-upload-files';
import { useState } from 'react';

async function upload(file: File) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return { url: `https://example.com/${file.name}` };
}

const accept: UploadFilesAcceptItem[] = [
  { extention: '.png', displayExtension: 'PNG' },
  { extention: '.jpg', displayExtension: 'JPG' },
];

export function CustomFormats() {
  const [files, setFiles] = useState<UploadFileItem[]>([]);

  return (
    <LocaleProvider lang='ru-RU'>
      <UploadFiles
        label='Изображения'
        hint='До 5 файлов, каждый не больше 2 МБ'
        accept={accept}
        maxFiles={5}
        maxSize={2 * 1024 * 1024}
        value={files}
        onChange={setFiles}
        upload={upload}
      />
    </LocaleProvider>
  );
}
```

### 3. Обязательное поле формы

optional=false + error: ошибка показывается, пока ни один файл не загружен

```tsx
import { LocaleProvider } from '@ds/locale';
import { UPLOAD_STATUS, UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';
import { useState } from 'react';

async function upload(file: File) {
  await new Promise(resolve => setTimeout(resolve, 600));

  return { url: `https://example.com/${file.name}` };
}

export function FormField() {
  const [files, setFiles] = useState<UploadFileItem[]>([]);
  const hasUploaded = files.some(item => item.status === UPLOAD_STATUS.Success);

  return (
    <LocaleProvider lang='ru-RU'>
      <UploadFiles
        label='Договор'
        optional={false}
        value={files}
        onChange={setFiles}
        upload={upload}
        error={hasUploaded ? undefined : 'Обязательное поле'}
      />
    </LocaleProvider>
  );
}
```

### 4. Заблокировано

disabled блокирует выбор и удаление, сохраняя уже загруженные вложения

```tsx
import { LocaleProvider } from '@ds/locale';
import { UPLOAD_STATUS, UploadFileItem, UploadFiles } from '@ds/uikit-product-upload-files';

async function upload(file: File) {
  return { url: `https://example.com/${file.name}` };
}

function buildValue(): UploadFileItem[] {
  return [
    {
      id: 'demo-1',
      file: new File([new Uint8Array(1024)], 'договор.pdf', { type: 'application/pdf' }),
      status: UPLOAD_STATUS.Success,
      result: { url: 'https://example.com/договор.pdf' },
    },
  ];
}

export function Disabled() {
  return (
    <LocaleProvider lang='ru-RU'>
      <UploadFiles label='Документы' disabled value={buildValue()} upload={upload} />
    </LocaleProvider>
  );
}
```

## Props

**UploadFilesProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `UploadFilesAcceptItem` | `[{ extention: '*' }]` | Допустимые типы файлов с иконкой для каждого расширения |
| `attachmentClassname` | `string` | — | CSS-класс прикрепленного файла |
| `className` | `string` | — | CSS-класс корня |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `TResult` \| `UploadFileItem` | — | Начальное значение |
| `disabled` | `boolean` | `false` | Заблокировано |
| `error` | `string` | — | Ошибка формы (например required из RHF) |
| `hint` | `ReactNode` | — | Подсказка question tooltip у метки |
| `label` | `string` | — | Текст метки поля |
| `maxFiles` | `number` | `3` | Максимальное количество файлов |
| `maxSize` | `number` | `5 * 1024 * 1024` | Максимальный размер файла в байтах |
| `name` | `string` | — | Имя поля формы |
| `onBlur` | `FocusEventHandler<HTMLDivElement>` | — |  |
| `onChange` | `((items: UploadFileItem<unknown>[]) => void)` | — | Колбэк изменения значения |
| `optional` | `boolean` | `true` | Показывает «Опционально» справа от метки |
| `upload` | `TResult` \| `UploadFn` | — | Обязательная кастомная функция загрузки |
| `value` | `TResult` \| `UploadFileItem` | — | Контролируемое значение |

#### Related types

**UploadFileItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string \| undefined` | — |  |
| `file` | `File` | — |  |
| `id` | `string` | — |  |
| `progress` | `number \| undefined` | — |  |
| `result` | `TResult` | — |  |
| `status` | `"error"` \| `"success"` \| `"uploading"` | — |  |

**UploadFilesAcceptItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `displayExtension` | `string \| undefined` | — | Отображаемое расширение файла для пользователя (например `PDF`) |
| `extention` | `string` | — | Расширение файла (например `.pdf` или `*` для всех типов файлов) |
| `icon` | `IconPredefinedProps` | — | Иконка, отображаемая для файлов этого типа во вложениях |

- `UploadFn` = `(file: File, ctx: { signal: AbortSignal; }) => Promise<TResult>`

- `UploadStatus` = `"error"` \| `"success"` \| `"uploading"`

## Do / Don't

- ✅ Передавайте реальный сетевой запрос в `upload`, возвращая промис с результатом загрузки.
- ❌ Не делайте `upload` no-op — без промиса вложение зависнет в статусе загрузки.
- ✅ Описывайте `accept` через `displayExtension` — формат попадёт в подсказку и текст ошибки.
- ❌ Не дублируйте ограничения текстом в `hint`, если они уже заданы через `maxFiles` / `maxSize` — описание дропзоны соберётся автоматически.
- ✅ Используйте `error` для ошибок уровня формы (например required из react-hook-form).
- ❌ Не используйте `error` для ошибок отдельных файлов — формат и размер компонент валидирует и показывает на вложениях сам.
- ✅ Прерывайте загрузку через `ctx.signal` (`AbortSignal`) внутри `upload` — компонент отменяет запрос при удалении и размонтировании.
- ❌ Не игнорируйте `signal` — отменённые запросы продолжат расходовать сеть.
