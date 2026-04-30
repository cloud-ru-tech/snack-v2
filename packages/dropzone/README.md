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

export function DropzoneSingleImage() {
  return (
    <Dropzone mode='single' accept='image/*' onFilesUpload={() => {}}>
      <span>Только одно изображение</span>
    </Dropzone>
  );
}
```

#### Disabled

Состояние заблокированной загрузки

```tsx
import { Dropzone } from '@ds/dropzone';

export function DropzoneDisabled() {
  return (
    <Dropzone disabled onFilesUpload={() => {}}>
      <span>Загрузка недоступна</span>
    </Dropzone>
  );
}
```

### Props
**DropzoneProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | — | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| `children` | `ReactNode` | — | Контент dropzone |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Деактивирован ли компонент |
| `mode` | `"multiple"` \| `"single"` | `multiple` | Режим загрузки |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек загрузки файла |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер компонента |

##### Related types

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

### Примеры использования
#### Кнопка-триггер

FileUpload оборачивает Button

```tsx
import { Button } from '@ds/button';
import { FileUpload } from '@ds/dropzone';

export function FileUploadBasic() {
  return (
    <FileUpload onFilesUpload={() => {}}>
      <Button type='button' label='Загрузить файлы' />
    </FileUpload>
  );
}
```

### Props
**FileUploadProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | — | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| `children` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — |  |
| `data-test-id` | `string` | — |  |
| `mode` | `"multiple"` \| `"single"` | `multiple` | Режим |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек загрузки файла |

##### Related types

- `UploadMode` = `"multiple"` \| `"single"`

## HiddenDropZone

Скрытая зона загрузки файлов, накрывающая оверлеем произвольный контент при перетаскивании файлов — формы, карточки, редакторы.

Скрытая зона загрузки, которая становится видимой только во время перетаскивания файлов. Оверлей рендерится поверх произвольного контента (форма, карточка, редактор) и позволяет прикрепить файлы к существующей сущности без отдельной визуальной области.

### Когда использовать
- Прикрепление файлов к форме, где уже есть другие поля и нет места под явную зону.
- Drop-to-attach поверх карточки задачи, чата, редактора.
- Массовая загрузка поверх полноэкранного списка.

Когда **не** подходит: когда загрузка — первичный сценарий страницы и должна быть видна сразу — используйте **Dropzone**.

### Примеры использования
#### Оверлей над формой

HiddenDropZone накрывает форму при drag

```tsx
import { HiddenDropZone } from '@ds/dropzone';

export function HiddenDropZoneBasic() {
  return (
    <HiddenDropZone onFilesUpload={() => {}} content={<span>Отпустите, чтобы прикрепить файлы</span>}>
      <form>
        <label>
          Имя <input type='text' />
        </label>
      </form>
    </HiddenDropZone>
  );
}
```

### Props
**HiddenDropZoneProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | — | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| `children` | `ReactNode` | — | Дочерний контент, поверх которого отображается dropzone при drag |
| `className` | `string` | — | CSS-класс |
| `content` | `ReactNode` | — | Контент dropzone при drag (overlay) |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `mode` | `"multiple"` \| `"single"` | `multiple` | Режим загрузки |
| `onFilesUpload` | `(files: File[]) => void` | — | Колбек загрузки файла |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер компонента |

##### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

- `UploadMode` = `"multiple"` \| `"single"`
