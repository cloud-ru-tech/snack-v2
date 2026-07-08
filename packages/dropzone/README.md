# Dropzone

`@ds/dropzone` — Пакет загрузки файлов — видимая зона Dropzone, триггер FileUpload и скрытая оверлей-зона HiddenDropZone над произвольным контентом.

Пакет `@ds/dropzone` предоставляет три компонента для загрузки файлов через drag-n-drop и клик:

- ****Dropzone**** — видимая зона для перетаскивания и клика. Три размера `s/m/l`, режимы `single/multiple`, состояние `disabled`.
- ****FileUpload**** — обёртка над произвольным триггером (например, кнопкой), открывающая нативный диалог выбора файлов. Без визуальной зоны.
- ****HiddenDropZone**** — скрытая оверлей-зона, накрывающая произвольный контент (форму, карточку) при перетаскивании файлов.

## Установка

```bash
pnpm add @ds/dropzone
```

```ts
import { Dropzone, FileUpload, HiddenDropZone } from '@ds/dropzone'
```

## Смотри также

- [Паттерны форм](/patterns/form-patterns) — композиция загрузки файлов внутри форм.

## Dropzone

Видимая зона загрузки файлов с поддержкой drag-n-drop и клика — три размера, режимы single/multiple, состояние disabled.

Видимая зона для загрузки файлов — перетаскиванием или кликом. Подходит, когда загрузка файлов является самостоятельным действием на странице (галерея, форма с вложениями, мастер импорта).

### Когда использовать
- Когда загрузка файлов — отдельная область UI, которую пользователь сразу видит.
- Когда нужно подсказать контекст через контент слота (иконка, подпись, список форматов).
- Когда требуется поддержать сразу и drag-n-drop, и клик по зоне.

Когда **не** подходит: если загрузка — вспомогательное действие в форме, используйте **FileUpload** с обычной кнопкой.

### Анатомия

#### Size
Три размера: `s` для плотных форм, `m` — дефолт, `l` — для крупных страниц загрузки.

#### Upload mode
`single` — один файл за раз, повторный выбор заменяет предыдущий; `multiple` — батч-загрузка, файлы накапливаются.

#### Поле формы
`Dropzone` проксирует нативные атрибуты скрытого `<input type="file">` — компонент работает как полноценное поле формы:

- `name`, `id`, `required`, `capture`, `form` — стандартные атрибуты input.
- `innerRef` — ссылка на нативный input (для интеграции с react-hook-form: `ref` из `register(name)`).
- `onChange` — нативный `onChange` input, вызывается до валидации с исходным событием.

#### Валидация
Ограничения `accept` (MIME-тип, шаблон `image/*` или расширение `.pdf`; строка или массив) и `maxSize` (байты) применяются и к выбору через диалог, и к drag-n-drop:

- принятые файлы уходят в `onFilesUpload(files)`;
- отклонённые — в `onFilesReject(rejections)` с причиной `maxSize` или `mime`.

### Примеры использования
#### Базовая зона

Multiple-режим, размер M

```tsx
import { Dropzone } from '@ds/dropzone';
import { useState } from 'react';

export function DropzoneBasic() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Dropzone onFilesUpload={uploaded => setFiles(prev => [...prev, ...uploaded])}>
        <span>Перетащите файлы или нажмите, чтобы выбрать</span>
      </Dropzone>
      {files.length > 0 && (
        <ul>
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              {f.name} — {Math.ceil(f.size / 1024)} KB
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

#### Одно изображение

Режим single и фильтр accept

```tsx
import { Dropzone } from '@ds/dropzone';
import { useState } from 'react';

export function DropzoneSingleImage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Dropzone mode='single' accept='image/*' onFilesUpload={files => setFile(files[0] ?? null)}>
      <span>{file ? file.name : 'Только одно изображение'}</span>
    </Dropzone>
  );
}
```

#### Disabled

Состояние заблокированной загрузки

```tsx
import { Dropzone } from '@ds/dropzone';
import { useState } from 'react';

export function DropzoneDisabled() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dropzone disabled onFilesUpload={setFiles}>
      <span>Загрузка недоступна{files.length ? ` (выбрано: ${files.length})` : ''}</span>
    </Dropzone>
  );
}
```

### Props
**DropzoneProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `AcceptInput` | — | Разрешённые типы: MIME-тип (`image/png`), шаблон (`image/*`) или расширение (`.pdf`). Строка или массив. |
| `capture` | `boolean \| "user" \| "environment"` | — | Нативный `capture` скрытого input — источник захвата на мобильных (камера/микрофон). |
| `children` | `ReactNode` | — | Контент dropzone |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Деактивирован ли компонент |
| `form` | `string` | — | Нативный `form` скрытого input — привязка к форме по `id`. |
| `id` | `string` | — | Нативный `id` скрытого input — для связи с `<label htmlFor>`. |
| `innerRef` | `Ref<HTMLInputElement>` | — | Ссылка на нативный `<input type="file">` — для интеграции с формами (react-hook-form `ref`). |
| `maxSize` | `number` | — | Максимальный размер одного файла в байтах. Превысившие уходят в `onFilesReject`. |
| `mode` | `"multiple"` \| `"single"` | `multiple` | Режим загрузки |
| `name` | `string` | — | Нативный `name` скрытого input — для отправки формы и интеграции с form-библиотеками. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | Нативный `onChange` скрытого input. Вызывается до валидации с исходным событием. |
| `onFilesReject` | `((rejections: FileRejection[]) => void)` | — | Колбек с отклонёнными файлами и причиной (`maxSize` / `mime`). |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек с принятыми файлами (прошедшими проверку `maxSize` и `accept`). |
| `required` | `boolean` | — | Нативный `required` скрытого input. |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер компонента |

##### Related types

- `AcceptInput` = `string | string[] | undefined`

- `Size` = `"l"` \| `"m"` \| `"s"`

- `UploadMode` = `"multiple"` \| `"single"`

## FileUpload

Обёртка над произвольным триггером — открывает нативный диалог выбора файлов по клику. Без визуальной зоны.

Невизуальная обёртка над произвольным триггером — как правило, кнопкой. Клик по триггеру открывает системный диалог выбора файлов. Используйте, когда загрузка — вспомогательное действие в форме или toolbar, и не нужна отдельная зона перетаскивания.

### Когда использовать
- Кнопка «Загрузить файлы» рядом с другими полями формы.
- Иконка-загрузка в toolbar.
- Скрытый триггер, когда загрузка инициируется программно через клик на дочерний элемент.

Когда **не** подходит: если нужна явная зона drag-n-drop — используйте **Dropzone** или **HiddenDropZone**.

### Анатомия

#### Upload mode
`single` — один файл за раз, повторный выбор заменяет предыдущий; `multiple` — батч-загрузка, файлы накапливаются.

#### Поле формы
`FileUpload` проксирует нативные атрибуты `<input type="file">` на скрытый input — компонент работает как полноценное поле формы:

- `name`, `id`, `required`, `capture`, `form` — стандартные атрибуты; `id` связывает input с `<label htmlFor>`.
- `innerRef` — ссылка на нативный input (для интеграции с react-hook-form: `ref` из `register(name)`).
- `onChange` — нативный `onChange` input, вызывается до валидации с исходным событием (точка интеграции с form-библиотеками).
- `disabled` — деактивирует триггер и input.

#### Валидация
Ограничения `accept` (MIME-тип, шаблон `image/*` или расширение `.pdf`; строка или массив) и `maxSize` (байты) разбивают выбранные файлы на две группы:

- принятые уходят в `onFilesUpload(files)`;
- отклонённые — в `onFilesReject(rejections)` с причиной `maxSize` или `mime`.

Размер проверяется раньше типа: превысивший лимит файл отклоняется с причиной `maxSize`.

### Примеры использования
#### Кнопка-триггер

FileUpload оборачивает Button

```tsx
import { Button } from '@ds/button';
import { FileUpload } from '@ds/dropzone';
import { useState } from 'react';

export function FileUploadBasic() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <FileUpload onFilesUpload={setFiles}>
        <Button type='button' label='Загрузить файлы' />
      </FileUpload>
      {files.length > 0 && <span>Выбрано: {files.map(f => f.name).join(', ')}</span>}
    </div>
  );
}
```

#### Поле формы с валидацией

name/id/required, accept + maxSize, отказ через onFilesReject

```tsx
import { Button } from '@ds/button';
import { FileRejection, FileUpload } from '@ds/dropzone';
import { useState } from 'react';

const MAX_SIZE = 5 * 1024 * 1024;

export function FileUploadFormField() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReject = (rejections: FileRejection[]) => {
    const [first] = rejections;
    setError(first?.reason === 'maxSize' ? 'Файл больше 5 МБ' : 'Недопустимый тип файла');
  };

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <FileUpload
        name='resume'
        id='resume'
        required
        mode='single'
        accept={['.pdf', '.doc', '.docx']}
        maxSize={MAX_SIZE}
        onFilesReject={handleReject}
        onFilesUpload={files => {
          if (!files.length) return;
          setError(null);
          setFile(files[0]);
        }}
      >
        <Button type='button' label='Прикрепить резюме' />
      </FileUpload>
      {file && <span>{file.name}</span>}
      {error && <span>{error}</span>}
    </div>
  );
}
```

### Props
**FileUploadProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `AcceptInput` | — | Разрешённые типы файлов: MIME-тип (`image/png`), шаблон (`image/*`) или расширение (`.pdf`). <br/> Строка (через запятую, как нативный `accept`) или массив. Задаёт нативный `accept` и валидацию. |
| `children` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — | Триггер открытия диалога выбора файлов (кнопка / лейбл). Клонируется, к нему добавляется `onClick`. |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Деактивирует триггер и input. |
| `innerRef` | `Ref<HTMLInputElement>` | — | Ссылка на нативный `<input type="file">` — для интеграции с формами (react-hook-form `ref`). |
| `maxSize` | `number` | — | Максимальный размер одного файла в байтах. Превысившие уходят в `onFilesReject`. |
| `mode` | `"multiple"` \| `"single"` | `multiple` | Режим выбора файлов |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | Нативный `onChange` скрытого input. Вызывается до валидации с исходным событием — <br/> точка интеграции с react-hook-form и другими form-библиотеками. |
| `onFilesReject` | `((rejections: FileRejection[]) => void)` | — | Колбек с отклонёнными файлами и причиной отказа (`maxSize` / `mime`). <br/> Вызывается только когда задан `maxSize` и/или `accept` и есть отклонённые файлы. |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек с принятыми файлами (прошедшими проверку `maxSize` и `accept`). |

##### Related types

- `AcceptInput` = `string | string[] | undefined`

- `UploadMode` = `"multiple"` \| `"single"`

## HiddenDropZone

Скрытая зона загрузки файлов, накрывающая оверлеем произвольный контент при перетаскивании файлов — формы, карточки, редакторы.

Скрытая зона загрузки, которая становится видимой только во время перетаскивания файлов. Оверлей рендерится поверх произвольного контента (форма, карточка, редактор) и позволяет прикрепить файлы к существующей сущности без отдельной визуальной области.

### Когда использовать
- Прикрепление файлов к форме, где уже есть другие поля и нет места под явную зону.
- Drop-to-attach поверх карточки задачи, чата, редактора.
- Массовая загрузка поверх полноэкранного списка.

Когда **не** подходит: когда загрузка — первичный сценарий страницы и должна быть видна сразу — используйте **Dropzone**.

Валидация (`accept`, `maxSize` → `onFilesReject`) и колбеки работают так же, как у `Dropzone`. Но скрытая зона рендерит нативный `<input type="file">` **только во время перетаскивания**, поэтому нативные form-атрибуты (`name`, `required`, submit по форме) на ней ненадёжны — для полноценного поля формы берите **Dropzone** или **FileUpload**.

### Примеры использования
#### Оверлей над формой

HiddenDropZone накрывает форму при drag

```tsx
import { HiddenDropZone } from '@ds/dropzone';
import { useState } from 'react';

export function HiddenDropZoneBasic() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <HiddenDropZone onFilesUpload={setFiles} content={<span>Отпустите, чтобы прикрепить файлы</span>}>
      <form>
        <label>
          Имя <input type='text' />
        </label>
        {files.length > 0 && <p>Прикреплено: {files.map(f => f.name).join(', ')}</p>}
      </form>
    </HiddenDropZone>
  );
}
```

### Props
**HiddenDropZoneProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `AcceptInput` | — | Разрешённые типы: MIME-тип (`image/png`), шаблон (`image/*`) или расширение (`.pdf`). Строка или массив. |
| `capture` | `boolean \| "user" \| "environment"` | — | Нативный `capture` скрытого input — источник захвата на мобильных (камера/микрофон). |
| `children` | `ReactNode` | — | Дочерний контент, поверх которого отображается dropzone при drag |
| `className` | `string` | — | CSS-класс |
| `content` | `ReactNode` | — | Контент dropzone при drag (overlay) |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `form` | `string` | — | Нативный `form` скрытого input — привязка к форме по `id`. |
| `id` | `string` | — | Нативный `id` скрытого input — для связи с `<label htmlFor>`. |
| `innerRef` | `Ref<HTMLInputElement>` | — | Ссылка на нативный `<input type="file">` — для интеграции с формами (react-hook-form `ref`). |
| `maxSize` | `number` | — | Максимальный размер одного файла в байтах. Превысившие уходят в `onFilesReject`. |
| `mode` | `"multiple"` \| `"single"` | `multiple` | Режим загрузки |
| `name` | `string` | — | Нативный `name` скрытого input — для отправки формы и интеграции с form-библиотеками. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | Нативный `onChange` скрытого input. Вызывается до валидации с исходным событием. |
| `onFilesReject` | `((rejections: FileRejection[]) => void)` | — | Колбек с отклонёнными файлами и причиной (`maxSize` / `mime`). |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек с принятыми файлами (прошедшими проверку `maxSize` и `accept`). |
| `required` | `boolean` | — | Нативный `required` скрытого input. |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер компонента |

##### Related types

- `AcceptInput` = `string | string[] | undefined`

- `Size` = `"l"` \| `"m"` \| `"s"`

- `UploadMode` = `"multiple"` \| `"single"`
